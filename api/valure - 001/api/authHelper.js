const crypto = require('crypto');

const secret = process.env.JWT_SECRET || 'valure-secret-key-12345';

// Pure Node.js JWT Generation helper
function generateToken(payloadData) {
    const header = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
    const payload = JSON.stringify({
        ...payloadData,
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours expiry
    });
    
    const base64Header = Buffer.from(header).toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    const base64Payload = Buffer.from(payload).toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
        
    const signature = crypto.createHmac('sha256', secret)
        .update(`${base64Header}.${base64Payload}`)
        .digest('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
        
    return `${base64Header}.${base64Payload}.${signature}`;
}

// Pure Node.js JWT Verification helper
function verifyToken(token) {
    if (!token) return null;
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        
        const [base64Header, base64Payload, signature] = parts;
        const expectedSignature = crypto.createHmac('sha256', secret)
            .update(`${base64Header}.${base64Payload}`)
            .digest('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
            
        if (signature !== expectedSignature) {
            return null;
        }
        
        const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString('utf8'));
        if (payload.exp < Date.now()) {
            return null; // Expired
        }
        return payload;
    } catch (err) {
        return null;
    }
}

// Middleware-like function to validate admin auth header
function validateAdminAuth(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    if (payload && payload.role === 'admin') {
        return payload;
    }
    return null;
}

module.exports = {
    generateToken,
    verifyToken,
    validateAdminAuth
};
