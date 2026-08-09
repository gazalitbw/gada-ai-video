module.exports = async (req, res) => {
    // Shiga tsarin CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
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
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const { prompt, language, duration, resolution, isOwnerAdmin } = req.body || {};

        if (!prompt) {
            return res.status(400).json({ success: false, message: 'Muna buƙatar Prompt domin gina bidiyo.' });
        }

        // Direct MP4 link mai aiki
        const sampleVideo = "https://www.w3schools.com/html/mov_bbb.mp4";

        return res.status(200).json({
            success: true,
            message: "An sarrafa bidiyo cikin nasara!",
            video_url: sampleVideo,
            details: {
                language: language || "HAUSA",
                duration: `${duration || 5} Minutes`,
                resolution: resolution || "360p"
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Kuskure daga server." });
    }
};
