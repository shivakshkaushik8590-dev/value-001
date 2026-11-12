const { generateToken } = require('../authHelper');

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

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { passcode } = req.body;
        if (!passcode) {
            return res.status(400).json({ error: 'Passcode is required.' });
        }

        const expectedPasscode = process.env.ADMIN_PASSWORD || '1234';

        if (String(passcode) === expectedPasscode) {
            const token = generateToken({ role: 'admin' });
            return res.status(200).json({
                success: true,
                message: 'Authentication successful.',
                token
            });
        } else {
            return res.status(401).json({ error: 'Incorrect Passcode. Access Denied.' });
        }
    } catch (error) {
        console.error('Auth API failure:', error);
        return res.status(500).json({
            error: 'Failed to authenticate due to an internal server error.'
        });
    }
};
