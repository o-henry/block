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

function filter(message) {
  let chat = document.getElementsByClassName('text-fragment');

  for (let content of chat) {
    let text = content.innerHTML;
    console.log('content', words, text);

    if (message.includes(text)) {
      console.log('ok???@@@@@');
      return content.replace(/<span>/g, '<span class="block">');
    }
  }
}

// 예약어를 등록 ----> 쿠키
// 등록한 예약어의 background color 바꾸기
