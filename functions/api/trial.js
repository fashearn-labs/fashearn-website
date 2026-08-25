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

    const redirectUrl = new URL("/?trial=success#trial", context.request.url);

    return Response.redirect(redirectUrl.toString(), 303);

  } catch (error) {
    return new Response("Unable to submit trial enquiry.", {
      status: 500
    });
  }
}
