// Frontend for Website Services enquiries only; no Make URL or API key in browser.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("website-enquiry-form");
  if (!form) return;

  const button = form.querySelector('button[type="submit"]');
  const status = document.createElement("p");
  status.id = "website-enquiry-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  status.style.marginTop = "18px";
  status.style.lineHeight = "1.6";
  form.insertAdjacentElement("afterend", status);

  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    if (!data.get("cf-turnstile-response")) {
      status.textContent = "Please complete the security check before sending.";
      return;
    }
    const originalLabel = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }
    status.textContent = "";

    try {
      const response = await fetch(form.action, { method: "POST", body: data });
      if (!response.ok) throw new Error("Website enquiry submission failed");
      form.reset();
      status.style.color = "#5BF0B4";
      status.textContent = "Thank you. Your website enquiry has been received. We will reply by email.";
    } catch {
      status.style.color = "#F3F7F8";
      status.textContent = "Sorry, your website enquiry could not be sent. Please try again or email info@fashearn.io.";
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalLabel;
      }
      // This script runs only on /services/, where there is one Turnstile widget.
      if (window.turnstile) window.turnstile.reset();
    }
  });
});
