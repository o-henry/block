/**
 * chat-message
 * @param { message } : array
 * chat-user
 * @param { user } : array
 **/

let wrapper;
let message;
let user;

window.addEventListener('load', function () {
  message = document.getElementsByClassName('text-fragment');
  user = document.getElementsByClassName('chat-author__display-name');

  console.log('user :', user, 'message :', message, message.innerText);
});

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.message) {
    filter(request.message);
  }
});

/* ====================================================
                      filter message
   ==================================================== */
function filter(message) {
  let chat = document.getElementsByClassName('text-fragment');

  for (let content of chat) {
    let text = content.innerHTML;

    // if (message.includes(text)) {
    //   return content.replace(/<span>/g, '<span class="block">');
    // }
  }
}

/* ====================================================
                      observe message
   ==================================================== */
let observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log('mutation', mutation.type);
  });
});

if (message) {
  [...message].map((node) => {
    console.log('@@@@@@", node');

    observer.observe(node, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
      attributeOldValue: true,
      attributeFilter: true,
      characterDataOldValue: true,
    });
  });
}

// when clicked stop button
// observer.disconnect();

/* ====================================================
                 create wrapper element
   ==================================================== */
function createWrapper() {
  let chat = document.getElementsByClassName(
    'sc-AxjAm gwkXPf chat-scrollable-area__message-container',
  );

  wrapper = document.createElement('div');
  wrapper.id = 'observer';

  let parent = chat[0].firstChild;
  chat.insterBefore(wrapper, parent);
}
