const MODEL_ENDPOINT = "fal-ai/kling-video/v2.1/standard/text-to-video";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ success: true, message: "GADA AI VIDEO API tana aiki" });
  }

  const { prompt, language, duration, resolution, isOwnerAdmin } = req.body || {};

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: "Muna bukatar prompt/labari domin kirkirar bidiyo.",
    });
  }

  const FAL_KEY = process.env.FAL_KEY;
  if (!FAL_KEY) {
    return res.status(500).json({
      success: false,
      message: "Ba a saita FAL_KEY a Environment Variables na Vercel ba tukuna.",
    });
  }

  const allowedDurations = ["5", "10"];
  const videoDuration = allowedDurations.includes(String(duration)) ? String(duration) : "5";

  try {
    const submitResponse = await fetch(`https://queue.fal.run/${MODEL_ENDPOINT}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        duration: videoDuration,
        generate_audio: false,
      }),
    });

    if (!submitResponse.ok) {
      const errorBody = await submitResponse.text();
      console.error("fal.ai submit ya gaza:", submitResponse.status, errorBody);
      return res.status(502).json({
        success: false,
        message: "AI video API ta ki karɓar buƙatarmu. Ka duba FAL_KEY ko yawan kuɗin account ɗinka.",
      });
    }

    const submitData = await submitResponse.json();

    return res.status(202).json({
      success: true,
      message: "An fara sarrafa bidiyon — jira dan lokaci sannan a duba matsayinsa.",
      request_id: submitData.request_id,
      status_url: submitData.status_url,
      response_url: submitData.response_url,
      details: {
        language: language || "HAUSA",
        duration: `${videoDuration} Seconds`,
        resolution: resolution || "360p",
      },
    });
  } catch (err) {
    console.error("generate.js kuskure:", err);
    return res.status(500).json({
      success: false,
      message: "Kuskure ya faru wajen tuntuɓar AI video API.",
    });
  }
}
