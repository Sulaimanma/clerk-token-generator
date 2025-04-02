require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Endpoint to generate a sign-in token
app.post('/generate-token', async (req, res) => {
  const { user_id, expires_in_seconds } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  // Prepare payload based on Clerk’s Sign-in Tokens API reference
  const payload = { user_id };
  if (expires_in_seconds) {
    payload.expires_in_seconds = expires_in_seconds;
  }

  try {
    // Call Clerk's API to generate a sign-in token
    const response = await axios.post(
      'https://api.clerk.com/v1/sign_in_tokens',
      payload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the token data (this may include a URL or a raw token)
    res.json(response.data);
  } catch (error) {
    console.error('Error generating token:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
