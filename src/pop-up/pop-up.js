document.addEventListener('DOMContentLoaded', documentEvents, false);

function popup(input) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: input.value });
  });

  document.getElementById('add-word').addEventListener('click', input.value);
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
  document.getElementById('clear').addEventListener('click', clearList);
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

  li.innerHTML = `<span class="delete">x</span><label>${word}</label>`;
  ul.appendChild(li);
  document.querySelector('.reserved-word').style.display = 'block';
}

function clearList(e) {
  let ul = (document.querySelector('ul').innerHTML = '');
}

function deleteReserved(e) {
  let remove = e.target.parentNode;
  let parentNode = remove.parentNode;
  parentNode.removeChild(remove);
}
