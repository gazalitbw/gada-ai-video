export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }

    try {
        const { prompt, language, duration, resolution, isOwnerAdmin } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, message: 'Muna buƙatar Prompt domin gina bidiyo.' });
        }

        // Ingantaccen direct MP4 sample link mai buɗewa a kowace waya/browser
        const sampleVideo = "https://www.w3schools.com/html/mov_bbb.mp4";

        return res.status(200).json({
            success: true,
            message: "An sarrafa bidiyo cikin nasara!",
            video_url: sampleVideo,
            details: {
                language,
                duration: `${duration} Minutes`,
                resolution
            }
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Kuskure daga server." });
    }
