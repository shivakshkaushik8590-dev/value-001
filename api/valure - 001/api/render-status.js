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

    const { id, materialId, roomType } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Prediction ID query parameter is required.' });
    }

    try {
        // If it is a simulation prediction
        if (id.startsWith('sim_')) {
            // We simulate completed renders immediately for developer testing
            const simulatedRenders = {
                statuario: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1000',
                calacatta: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000',
                black_marquina: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1000',
                armani_grey: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=1000',
                travertine: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=1000',
                panda_white: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000'
            };

            const outputUrl = simulatedRenders[materialId] || 'https://images.unsplash.com/photo-1600210491866-e742330efc00?auto=format&fit=crop&q=80&w=1000';

            return res.status(200).json({
                success: true,
                status: 'succeeded',
                output: outputUrl,
                simulated: true
            });
        }

        const replicateToken = process.env.REPLICATE_API_TOKEN;
        if (!replicateToken) {
            return res.status(401).json({ error: 'Unauthorized: Replicate Token is not configured.' });
        }

        const replicateResponse = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
            headers: {
                'Authorization': `Token ${replicateToken}`
            }
        });

        const prediction = await replicateResponse.json();

        if (replicateResponse.ok) {
            let finalOutput = prediction.output;
            if (Array.isArray(prediction.output)) {
                finalOutput = prediction.output[0];
            }

            return res.status(200).json({
                success: true,
                status: prediction.status,
                output: finalOutput,
                error: prediction.error
            });
        } else {
            console.error('Replicate Status API Error:', prediction);
            return res.status(500).json({ error: prediction.detail || 'Failed to retrieve prediction status.' });
        }

    } catch (error) {
        console.error('Render Status API error:', error);
        return res.status(500).json({ error: 'Failed to query rendering status.' });
    }
};
