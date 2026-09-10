export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { quotes } = req.body;

    if (!quotes || !Array.isArray(quotes)) {
      return res.status(400).json({ error: 'Invalid quotes data' });
    }

    // POST to Google Apps Script endpoint
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbza2_8FUIwiHgIzM0-FipYrttH8legyQYzHDKwMs9z7qLVzLVuMBQPuHZItZTPUWlgt/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quotes })
      }
    );

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to append quotes to sheet'
    });
  }
}
