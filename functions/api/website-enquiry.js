// Website Services enquiries only. Separate from /api/trial (Route Operations).
// This handler is not included in the current release's _routes.json allowlist.
// Secrets must be set as Cloudflare Pages environment variables, never in HTML.

const MAX_REQUEST_BYTES = 16384;
const MAX_LENGTH = Object.freeze({
  name: 120,
  company: 150,
  email: 200,
  project_details: 1800
});
const PROJECT_TYPES = Object.freeze({
  "one-page": "One-page Starter Website",
  "multi-page": "Multi-page business website",
  "existing-site": "Update an existing website",
  "unsure": "Not sure yet"
});

function reply(message, status) {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

function textField(form, field) {
  const raw = form.get(field);
  if (raw === null && field === "phone") return "";
  if (typeof raw !== "string") return null;
  const clean = raw.replace(/\r\n?/g, "\n")
    .replace(field === "message" ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, "")
    .trim();
  return clean.length <= MAX_LENGTH[field] ? clean : null;
}

function safeMakeWebhook(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      /^hook(?:\.[a-z0-9-]+)?\.make\.com$/i.test(url.hostname) &&
      !url.port && !url.username && !url.password &&
      url.pathname.length > 1 && !url.search && !url.hash;
  } catch {
    return false;
  }
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const contentType = request.headers.get("content-type") || "";
    if (!/^(multipart\/form-data|application\/x-www-form-urlencoded)(?:;|$)/i.test(contentType)) {
      return reply("Unsupported form format.", 415);
    }
    const length = Number(request.headers.get("content-length") || 0);
    if (!Number.isFinite(length) || length > MAX_REQUEST_BYTES) {
      return reply("Enquiry is too large.", 413);
    }

    const form = await request.formData();
    const submitted = {};
    for (const field of Object.keys(MAX_LENGTH)) {
      submitted[field] = textField(form, field);
      if (submitted[field] === null) return reply("Please check the enquiry fields.", 400);
    }
    const projectType = form.get("project_type");
    if (!submitted.name || !submitted.company || !submitted.email ||
        !submitted.project_details ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitted.email) ||
        typeof projectType !== "string" ||
        !Object.hasOwn(PROJECT_TYPES, projectType)) {
      return reply("Please complete all required fields.", 400);
    }
    const category = PROJECT_TYPES[projectType];
    const payload = {
      name: submitted.name,
      company: submitted.company,
      email: submitted.email,
      phone: "",
      message: "Website request: " + category +
        "\n\nProject details:\n" + submitted.project_details
    };
    const token = form.get("cf-turnstile-response");
    if (typeof token !== "string" || !token.trim() || token.length > 2048) {
      return reply("Please complete the security check.", 400);
    }

    const secret = env.TURNSTILE_SECRET_KEY;
    const webhook = env.WEBSITE_ENQUIRY_MAKE_WEBHOOK_URL;
    const apiKey = env.WEBSITE_ENQUIRY_MAKE_API_KEY;
    if (!secret || !apiKey || typeof apiKey !== "string" || !safeMakeWebhook(webhook)) {
      return reply("Website enquiry service is not configured.", 503);
    }

    const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token.trim(),
        remoteip: request.headers.get("CF-Connecting-IP") || ""
      }),
      redirect: "manual"
    });
    if (!check.ok) return reply("Security verification unavailable.", 502);
    const verified = await check.json();
    if (verified.success !== true) return reply("Security verification failed.", 403);

    const upstream = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-make-apikey": apiKey
      },
      body: JSON.stringify(payload),
      redirect: "manual"
    });
    if (!upstream.ok) return reply("Unable to submit website enquiry.", 502);
    return reply("OK", 200);
  } catch {
    return reply("Unable to submit website enquiry.", 500);
  }
}
