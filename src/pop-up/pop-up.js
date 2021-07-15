document.addEventListener('DOMContentLoaded', documentEvents, false);

function popup(input) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: input.value });
  });

  // document.getElementById('add-word').addEventListener('click', input.value);
}

function documentEvents() {
  document.getElementById('send').addEventListener('click', () => {
    popup(document.getElementById('block-content'));
  });
}

// make simple reserve list
loadEvents();

function loadEvents() {
  document.querySelector('form').addEventListener('submit', submit);
  document.querySelector('ul').addEventListener('click', deleteReserved);
}

function submit(e) {
  e.preventDefault();
  let input = document.querySelector('input');
  if (input.value != '') addReserved(input.value);
  input.value = '';
}

function addReserved(word) {
  let ul = document.querySelector('ul');
  let li = document.createElement('li');

  li.innerHTML = `
    <span class="words">${word}</span>
    <button class="delete">x</button>
  `;
  ul.appendChild(li);
  document.querySelector('.reserved-words').style.display = 'block';
}

function deleteReserved(e) {
  if (e.target.className === 'delete') {
    let remove = e.target.parentNode;
    let parentNode = remove.parentNode;
    parentNode.removeChild(remove);
  }
}
