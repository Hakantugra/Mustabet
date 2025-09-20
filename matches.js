export default async function handler(req, res) {
  try {
    const r = await fetch(
      "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all",
      {
        headers: {
          "X-RapidAPI-Key": process.env.API_KEY,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }
      }
    );
    const data = await r.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "API error", details: err.message });
  }
}