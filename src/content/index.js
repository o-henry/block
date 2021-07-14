/**
 * chat-message
 * @param { message } : array
 * chat-user
 * @param { user } : array
 **/

window.addEventListener('load', function () {});

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.message) {
    /* ====================================================
                      observe message
    ==================================================== */

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

  // 특정 url에서만 동작하도록 변경
  observer.observe(document.body, config);
});
