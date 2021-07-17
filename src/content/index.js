/* ====================================================
                      observe message
==================================================== */

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.message) {
    console.log('request', request.message);

    var observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((chat) => {
          if (chat.innerText && compare(request.message, chat.innerText)) {
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

function compare(reserved, chat) {
  return reserved.some((item) => {
    if (isNaN(item)) item = item.replace(/\s/g, '');
    if (isNaN(chat)) chat = chat.replace(/\s/g, '');
    if (pattern_eng.test(item)) item = item.toLowerCase();
    return chat.includes(item);
  });
}

/* ====================================================
                      pattern
==================================================== */

const pattern_eng = /[a-zA-Z]/g;
