// load -> update 하는 무언가로 변경해야 할듯
window.addEventListener('load', function () {
  /**
   * chat-message
   * @param { message } : array
   * chat-user
   * @param { user } : array
   **/

  const message = document.getElementsByClassName('text-fragment');
  const user = document.getElementsByClassName('chat-author__display-name');

  console.log(user, message);
});

chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.message) {
    console.log('message', request.message);
  }
});
