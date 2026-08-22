/**
 * Vercel Serverless Function: /api/delete-image
 * Securely deletes an image from Cloudinary using signed API requests.
 * API Secret never leaves the server.
 */

import { createHash } from 'crypto';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { publicId } = req.body;
  if (!publicId) {
    return res.status(400).json({ error: 'publicId is required' });
  }

  const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME || 'dwhjng2ph';
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Cloudinary credentials not configured on server' });
  }

  try {
    const timestamp = Math.round(Date.now() / 1000);
    // Params must be sorted alphabetically for signature
    const paramStr = `invalidate=true&public_id=${publicId}&timestamp=${timestamp}`;
    const signature = createHash('sha1')
      .update(paramStr + apiSecret)
      .digest('hex');

    const formData = new URLSearchParams({
      public_id: publicId,
      timestamp: timestamp.toString(),
      api_key: apiKey,
      signature,
      invalidate: 'true'
    });

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      }
    );

    const data = await cloudinaryRes.json();

    if (data.result === 'ok' || data.result === 'not found') {
      return res.status(200).json({ success: true, result: data.result });
    }

    return res.status(400).json({ error: data.error?.message || 'Cloudinary deletion failed' });
  } catch (err) {
    console.error('Delete image error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
