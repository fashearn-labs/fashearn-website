// Only create the third-party video player after the visitor chooses to load it.
// No consent cookies, local storage or automatic playback are introduced.
document.addEventListener('DOMContentLoaded', () => {
  for (const container of document.querySelectorAll('[data-video-player]')) {
    const placeholder = container.firstElementChild.cloneNode(true);
    const options = container.nextElementSibling;
    const remove = options.querySelector('[data-remove-video]');
    const status = options.nextElementSibling;
    function loadPlayer() {
      if (container.querySelector('iframe')) return;
      const player = document.createElement('iframe');
      player.src = container.dataset.videoSrc;
      player.title = 'Fashearn Labs Route Operations Dashboard v1.1 overview video';
      player.allow = 'encrypted-media; gyroscope; picture-in-picture; web-share';
      player.referrerPolicy = 'strict-origin-when-cross-origin';
      player.allowFullscreen = true;
      player.tabIndex = 0;
      container.replaceChildren(player);
      container.classList.add('is-loaded');
      remove.hidden = false;
      status.textContent = 'YouTube player loaded. Use its controls to start the video.';
      player.focus();
    }
    container.addEventListener('click', event => {
      if (event.target.closest('[data-load-video]')) loadPlayer();
    });
    remove.addEventListener('click', () => {
      container.replaceChildren(placeholder.cloneNode(true));
      container.classList.remove('is-loaded');
      remove.hidden = true;
      status.textContent = 'YouTube player removed. Removing it does not erase information already received by YouTube.';
      container.querySelector('[data-load-video]').focus();
    });
  }
});

