const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    // CORS Headers setup
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const filePath = path.join(process.cwd(), 'data', 'materials.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return res.status(200).json(JSON.parse(data));
        } else {
            // Fallback hardcoded catalog if file missing
            const fallback = [
                { id: "statuario", name: "Italian Statuario Marble", category: "Italian Marble", texture: "assets/images/italian_statuario.png", price: 500 },
                { id: "calacatta", name: "Italian Calacatta Gold", category: "Italian Marble", texture: "assets/images/calacatta_gold.png", price: 550 },
                { id: "black_marquina", name: "Black Marquina", category: "Luxury Marble", texture: "assets/images/black_marquina.png", price: 420 },
                { id: "armani_grey", name: "Armani Grey", category: "Premium Granite", texture: "assets/images/armani_grey.png", price: 410 },
                { id: "travertine", name: "Travertine Beige", category: "Travertine", texture: "assets/images/travertine_beige.png", price: 350 },
                { id: "panda_white", name: "Panda White Marble", category: "Luxury Marble", texture: "assets/images/panda_white.png", price: 480 }
            ];
            return res.status(200).json(fallback);
        }
    } catch (error) {
        console.error('Materials API error:', error);
        return res.status(500).json({ error: 'Failed to read materials catalog.' });
    }
};
