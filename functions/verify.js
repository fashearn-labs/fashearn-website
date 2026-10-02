const VERIFY_PATH = "/verify";
const DEFAULT_SANDBOX_ORIGIN = "https://fashearn-trial-signup-sandbox.onrender.com";

function page(title, message, status = 200) {
  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${title} | Fashearn Labs</title>
<style>
:root{color-scheme:dark;--bg:#07151b;--panel:#0d2028;--text:#f4f8f7;--muted:#a9b8b8;--accent:#5bf0b4}
*{box-sizing:border-box}body{margin:0;min-height:100vh;background:radial-gradient(circle at 50% 20%,#12303a 0,var(--bg) 55%);color:var(--text);font:16px/1.6 system-ui,-apple-system,Segoe UI,sans-serif;display:grid;place-items:center;padding:24px}
main{width:min(680px,100%);background:var(--panel);border:1px solid rgba(91,240,180,.22);border-radius:24px;padding:clamp(28px,6vw,56px);box-shadow:0 24px 80px rgba(0,0,0,.3)}
.brand{font-weight:700;letter-spacing:.04em;color:var(--accent);margin:0 0 36px}h1{font-size:clamp(30px,6vw,46px);line-height:1.08;margin:0 0 18px}p{color:var(--muted);margin:0 0 16px}a{color:var(--accent)}
</style>
</head>
<body><main>
<p class="brand">FASHEARN LABS</p>
<h1>${title}</h1>
<p>${message}</p>
<p><a href="/">Return to Fashearn Labs</a></p>
</main></body></html>`;

  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer"
    }
  });
}

export async function onRequestGet(context) {
  const incoming = new URL(context.request.url);
  const token = String(incoming.searchParams.get("token") || "").trim();

  if (!token) {
    return page(
      "Verification link incomplete",
      "This verification link is missing its secure token. Please use the complete link from your Fashearn Labs verification email.",
      400
    );
  }

  const origin = String(
    context.env.FASHEARN_TRIAL_SANDBOX_ORIGIN || DEFAULT_SANDBOX_ORIGIN
  ).replace(/\/$/, "");

  if (!origin.startsWith("https://")) {
    return page(
      "Verification unavailable",
      "The trial verification service is not configured correctly.",
      500
    );
  }

  try {
    const target = new URL(VERIFY_PATH, origin);
    target.searchParams.set("token", token);

    const response = await fetch(target.toString(), {
      method: "GET",
      headers: { "Accept": "application/json" },
      redirect: "error"
    });

    let result = null;
    try {
      result = await response.json();
    } catch (_) {
      result = null;
    }

    if (
      response.ok &&
      result &&
      result.status === "email_verified" &&
      result.mode === "sandbox" &&
      result.next_step === "stripe_checkout" &&
      result.checkout_started === false
    ) {
      return page(
        "Email verified",
        "Your email address has been verified. Secure card setup is the next step. Your 14-day trial has not started yet."
      );
    }

    if (response.status === 400) {
      return page(
        "Verification link unavailable",
        "This verification link is invalid, expired or has already been used. Please return to the trial signup journey for a new verification link.",
        400
      );
    }

    return page(
      "Verification temporarily unavailable",
      "We could not complete email verification right now. Please try again shortly.",
      502
    );
  } catch (_) {
    return page(
      "Verification temporarily unavailable",
      "We could not complete email verification right now. Please try again shortly.",
      502
    );
  }
}
