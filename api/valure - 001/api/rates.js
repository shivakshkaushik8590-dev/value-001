const { pool, initDb, isPostgres } = require('./db');
const { validateAdminAuth } = require('./authHelper');

module.exports = async (req, res) => {
    // CORS Headers setup
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        try {
            if (isPostgres()) {
                await initDb();
                const dbRes = await pool.query("SELECT * FROM settings");
                const rates = {};
                dbRes.rows.forEach(row => {
                    if (row.key === 'royal_palace_surcharge') rates.palace = parseFloat(row.value);
                    else if (row.key === 'gst_percentage') rates.gst = parseInt(row.value);
                    else if (row.key === 'luxury_architect_surcharge') rates.fee = parseInt(row.value);
                });

                // Ensure all default values exist if not in database
                if (rates.palace === undefined) rates.palace = 0.35;
                if (rates.gst === undefined) rates.gst = 18;
                if (rates.fee === undefined) rates.fee = 15;

                return res.status(200).json(rates);
            }
        } catch (dbErr) {
            console.error('Failed to get rates from Postgres, using default rates:', dbErr);
        }

        // Fallback default rates
        return res.status(200).json({
            palace: 0.35,
            gst: 18,
            fee: 15
        });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
        // Authenticate admin token
        const auth = validateAdminAuth(req);
        if (!auth) {
            return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
        }

        try {
            const { palace, gst, fee } = req.body;
            if (palace === undefined || gst === undefined || fee === undefined) {
                return res.status(400).json({ error: 'Missing pricing values: palace, gst, and fee are required.' });
            }

            if (isPostgres()) {
                await initDb();
                // Upsert settings in database
                await pool.query(
                    `INSERT INTO settings (key, value) VALUES ($1, $2)
                     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
                    ['royal_palace_surcharge', String(palace)]
                );
                await pool.query(
                    `INSERT INTO settings (key, value) VALUES ($1, $2)
                     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
                    ['gst_percentage', String(gst)]
                );
                await pool.query(
                    `INSERT INTO settings (key, value) VALUES ($1, $2)
                     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
                    ['luxury_architect_surcharge', String(fee)]
                );

                return res.status(200).json({ success: true, message: 'Surcharge rates updated successfully in database.' });
            } else {
                return res.status(200).json({ success: true, message: 'Postgres not configured. Local CRM fallback active.' });
            }
        } catch (error) {
            console.error('Failed to update rates:', error);
            return res.status(500).json({ error: 'Failed to update rates due to server error.', details: error.message });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
};
