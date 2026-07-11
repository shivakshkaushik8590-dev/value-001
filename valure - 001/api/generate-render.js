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
        const { image, mask, materialId, roomType, prompt } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'Original image is required.' });
        }

        const replicateToken = process.env.REPLICATE_API_TOKEN;

        // If no token is provided, operate in high-fidelity simulation mode
        if (!replicateToken) {
            // We generate a simulation prediction ID
            const simulatedId = 'sim_' + Math.random().toString(36).substring(2, 15);
            return res.status(200).json({
                success: true,
                id: simulatedId,
                status: 'starting',
                simulated: true,
                message: 'Simulation Mode Active: REPLICATE_API_TOKEN is not configured.'
            });
        }

        // We use the SDXL inpainting model: lucataco/sdxl-inpainting
        // Version: a5b13068cc81a89a4fbeefeccc774869fcb34df4dbc92c1555e0f2771d49dde7
        const versionId = 'a5b13068cc81a89a4fbeefeccc774869fcb34df4dbc92c1555e0f2771d49dde7';

        // Build a detailed prompt using material descriptions if possible
        let detailedPrompt = prompt || '';
        if (materialId) {
            const fs = require('fs');
            const path = require('path');
            try {
                const filePath = path.join(process.cwd(), 'data', 'materials.json');
                if (fs.existsSync(filePath)) {
                    const materials = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    const mat = materials.find(m => m.id === materialId);
                    if (mat) {
                        detailedPrompt = `luxury interior design, replace the floor/wall with ${mat.name}: ${mat.description}. Extremely high-end, photorealistic 8k, architectural digest photography style. ${prompt || ''}`;
                    }
                }
            } catch (err) {
                console.error('Error fetching materials for prompt:', err);
            }
        }

        if (!detailedPrompt) {
            detailedPrompt = `luxury interior design, replace surface with high-end polished marble, photorealistic 8k, architectural photography.`;
        }

        const replicateResponse = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${replicateToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                version: versionId,
                input: {
                    image: image,
                    mask: mask,
                    prompt: detailedPrompt,
                    negative_prompt: "low quality, blurry, distorted, bad proportions, worst quality, unrealistic, bad lighting, out of frame",
                    strength: 0.85,
                    num_inference_steps: 25
                }
            })
        });

        const prediction = await replicateResponse.json();

        if (replicateResponse.ok) {
            return res.status(200).json({
                success: true,
                id: prediction.id,
                status: prediction.status
            });
        } else {
            console.error('Replicate API Error response:', prediction);
            return res.status(500).json({
                error: prediction.detail || 'Replicate generation request failed.'
            });
        }

    } catch (error) {
        console.error('Generate Render API error:', error);
        return res.status(500).json({ error: 'Failed to process AI visual rendering.' });
    }
};
