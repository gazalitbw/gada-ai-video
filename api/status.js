export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Ana bukatar GET request." });
  }

  const { status_url, response_url } = req.query;

  if (!status_url) {
    return res.status(400).json({
      success: false,
      message: "Ana bukatar status_url (wanda /api/generate ya bayar) domin duba matsayin bidiyo.",
    });
  }

  const FAL_KEY = process.env.FAL_KEY;
  if (!FAL_KEY) {
    return res.status(500).json({ success: false, message: "Ba a saita FAL_KEY ba tukuna." });
  }

  try {
    const statusResponse = await fetch(status_url, {
      headers: { Authorization: `Key ${FAL_KEY}` },
    });

    if (!statusResponse.ok) {
      const errorBody = await statusResponse.text();
      console.error("fal.ai status check ya gaza:", statusResponse.status, errorBody);
      return res.status(502).json({ success: false, message: "An kasa duba matsayin bidiyo." });
    }

    const statusData = await statusResponse.json();

    if (statusData.status !== "COMPLETED") {
      return res.status(200).json({
        success: true,
        status: statusData.status,
        message: "Ana ci gaba da sarrafa bidiyon, jira dan lokaci...",
      });
    }

    if (!response_url) {
      return res.status(400).json({
        success: false,
        message: "Bidiyon ya shirya amma response_url bata zo ba — ka tura ta daga /api/generate.",
      });
    }

    const resultResponse = await fetch(response_url, {
      headers: { Authorization: `Key ${FAL_KEY}` },
    });
    const resultData = await resultResponse.json();

    return res.status(200).json({
      success: true,
      status: "COMPLETED",
      message: "An sarrafa bidiyo cikin nasara!",
      video_url: resultData?.video?.url || null,
    });
  } catch (err) {
    console.error("status.js kuskure:", err);
    return res.status(500).json({ success: false, message: "Kuskure wajen duba matsayin bidiyo." });
  }
}
