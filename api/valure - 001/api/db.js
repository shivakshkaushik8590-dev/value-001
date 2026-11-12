const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

let pool = null;

// Initialize Postgres Pool if POSTGRES_URL or POSTGRES_PRISMA_URL is present
if (process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL) {
    const connectionString = process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;
    pool = new Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });
}

// Self-healing database initialization helper
async function initDb() {
    if (!pool) return false;
    
    try {
        // Create leads table if not exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS leads (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                product TEXT,
                message TEXT,
                location VARCHAR(255),
                date VARCHAR(255),
                submission_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(50) DEFAULT 'New',
                type VARCHAR(50) NOT NULL,
                consultation_date VARCHAR(255),
                slot VARCHAR(255)
            );
        `);

        // Create settings table if not exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS settings (
                key VARCHAR(255) PRIMARY KEY,
                value VARCHAR(255) NOT NULL
            );
        `);

        // Seed default settings if not exists
        const res = await pool.query("SELECT COUNT(*) FROM settings");
        if (parseInt(res.rows[0].count) === 0) {
            await pool.query(`
                INSERT INTO settings (key, value) VALUES 
                ('royal_palace_surcharge', '15'),
                ('gst_percentage', '18'),
                ('luxury_architect_surcharge', '10')
                ON CONFLICT (key) DO NOTHING;
            `);
        }

        return true;
    } catch (err) {
        console.error("Database initialization failed:", err);
        return false;
    }
}

module.exports = {
    pool,
    initDb,
    isPostgres: () => !!pool
};
