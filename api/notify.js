// Simple in-memory rate limiter — resets on cold start, but stops casual
// spam/abuse without needing a paid Redis/KV store. Good enough for a
// booking form that isn't high-traffic. If this ever needs to be bulletproof
// across serverless instances, swap this for Vercel KV or Upstash Redis.
const submissions = new Map(); // ip -> array of timestamps (ms)

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 3;         // max submissions per IP per hour

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissions.get(ip) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_PER_WINDOW) {
    submissions.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  submissions.set(ip, timestamps);

  // Prevent the Map from growing forever on a long-running warm instance —
  // periodically drop IPs with no recent activity.
  if (submissions.size > 500) {
    for (const [key, times] of submissions.entries()) {
      const fresh = times.filter((t) => now - t < WINDOW_MS);
      if (fresh.length === 0) submissions.delete(key);
      else submissions.set(key, fresh);
    }
  }

  return false;
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { name: 100, email: 200, car: 150, location: 150, details: 2000, timeframe: 150 };

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const { name, email, car, location, details, timeframe } = req.body || {};

  if (!name || !email || !car || !details) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const fields = { name, email, car, location, details, timeframe };
  for (const [key, max] of Object.entries(MAX_LENGTHS)) {
    if (fields[key] && String(fields[key]).length > max) {
      return res.status(400).json({ error: `${key} is too long` });
    }
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ModGuide On-Site <onboarding@resend.dev>",
        to: process.env.OWNER_EMAIL,
        subject: `New On-Site Request — ${escapeHtml(car)}`,
        html: `
          <h2>New service request</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Car:</strong> ${escapeHtml(car)}</p>
          <p><strong>Location:</strong> ${escapeHtml(location || "Not provided")}</p>
          <p><strong>Timeframe:</strong> ${escapeHtml(timeframe || "Not provided")}</p>
          <p><strong>What's going on:</strong></p>
          <p>${escapeHtml(details)}</p>
        `,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}