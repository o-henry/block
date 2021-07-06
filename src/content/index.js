/**
 * chat-message
 * @param { message } : array
 * chat-user
 * @param { user } : array
 **/

let message;
let user;

window.addEventListener('load', function () {
  message = document.getElementsByClassName('text-fragment');
  user = document.getElementsByClassName('chat-author__display-name');

  console.log('user :', user, 'message :', message, message.innerText);
});

chrome.runtime.onMessage.addListener((request, sender, response) => {
  filter('ㅋㅋㅋ');

  if (request.message) {
    console.log('message', request.message, message);
  }
});

function filter(words) {
  let chat = document.getElementsByClassName('text-fragment');

  for (let content of chat) {
    let text = content.innerHTML;
    console.log('content', words, text);

    if (words.includes(text)) {
      console.log('ok???@@@@@');
      content = content.replace(/<span>/g, '<span class="block">');
    }
  }
}
