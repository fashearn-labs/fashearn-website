/* Load the optional RouteOps YouTube player only after user action. No external video request on initial page load. */
document.addEventListener("DOMContentLoaded", () => {
  const region = document.getElementById("pilot-video-frame");
  const load = document.getElementById("pilot-video-load");
  if (!region || !load) return;
  const id = region.dataset.videoId;
  if (!/^[A-Za-z0-9_-]{11}$/.test(id || "")) return;
  let frame = null;
  let remove = null;
  load.addEventListener("click", () => {
    if (frame) return;
    frame = document.createElement("iframe");
    frame.title = "Fashearn Labs Route Operations Dashboard v1.1 overview video";
    frame.src = "https://www.youtube-nocookie.com/embed/" + id + "?rel=0";
    frame.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    region.appendChild(frame);
    load.hidden = true;
    remove = document.createElement("button");
    remove.type = "button";
    remove.className = "button";
    remove.textContent = "Remove YouTube player";
    remove.addEventListener("click", () => {
      frame.remove();
      frame = null;
      remove.remove();
      remove = null;
      load.hidden = false;
    });
    region.after(remove);
  });
});
