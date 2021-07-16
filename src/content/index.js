/* ====================================================
                      observe message
==================================================== */

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.message) {
    var observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((chat) => {
          if (chat.innerText && chat.innerText.includes(request.message)) {
            return (chat.innerText = ' ');
          }
        });
      });
    });
  }

  const config = {
    childList: true,
    subtree: true,
  };

  window.location.href.includes('https://www.twitch.tv') &&
    observer.observe(document.body, config);
});
