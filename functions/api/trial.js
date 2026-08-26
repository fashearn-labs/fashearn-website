export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();

    const payload = {
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      drivers: String(formData.get("drivers") || "").trim(),
      carriers: String(formData.get("carriers") || "").trim(),
      pay_method: String(formData.get("pay_method") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };

    if (
      !payload.name ||
      !payload.company ||
      !payload.email ||
      !payload.drivers ||
      !payload.carriers ||
      !payload.pay_method
    ) {
      return new Response("Please complete all required fields.", {
        status: 400
      });
    }

    const turnstileSecret = context.env.TURNSTILE_SECRET_KEY;
    const turnstileToken = String(
      formData.get("cf-turnstile-response") || ""
    ).trim();

    if (!turnstileSecret) {
      return new Response("Spam protection is not configured.", {
        status: 500
      });
    }

    if (!turnstileToken) {
      return new Response("Please complete the security check.", {
        status: 400
      });
    }

    const verification = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken,
          remoteip: context.request.headers.get("CF-Connecting-IP") || ""
        })
      }
    );

    const verificationResult = await verification.json();

    if (!verificationResult.success) {
      return new Response("Security verification failed.", {
        status: 403
      });
    }

    const webhookUrl = context.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      return new Response("Trial enquiry service is not configured.", {
        status: 500
      });
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      return new Response("Unable to submit trial enquiry.", {
        status: 502
      });
    }

    return new Response("OK", {
      status: 200
    });

  } catch (error) {
    return new Response("Unable to submit trial enquiry.", {
      status: 500
    });
  }
}