export default function handler(req, res) {
    if (req.method === 'POST') {
        const { prompt, language, duration, resolution, isOwnerAdmin } = req.body || {};

        if (!prompt) {
            return res.status(400).json({ success: false, message: 'Muna buƙatar Prompt domin gina bidiyo.' });
        }

        // Direct Sample MP4 link
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
    } else {
        return res.status(200).json({ success: true, message: "GADA AI Video API is Running Active." });
    }
}
