document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form01");

  if (!form) return;

  const button = form.querySelector('button[type="submit"]');

  const status = document.createElement("p");
  status.id = "trial-form-status";
  status.style.marginTop = "18px";
  status.style.lineHeight = "1.6";
  status.style.fontSize = "15px";

  form.insertAdjacentElement("afterend", status);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const originalLabel = button ? button.textContent : "";

    if (button) {
      button.disabled = true;
      button.textContent = "Sending...";
    }

    status.textContent = "";

    try {
      const response = await fetch("/api/trial", {
        method: "POST",
        body: new FormData(form)
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();

      status.style.color = "#5BF0B4";
      status.textContent =
        "Thanks - your RouteOps trial request has been received. We'll contact you to arrange your private 14-day setup.";

    } catch (error) {

      status.style.color = "#F3F7F8";
      status.textContent =
        "Sorry - your request could not be sent. Please try again or email info@fashearn.io.";

    } finally {

      if (button) {
        button.disabled = false;
        button.textContent = originalLabel;
      }

      if (window.turnstile) {
        window.turnstile.reset();
      }

    }
  });
});
