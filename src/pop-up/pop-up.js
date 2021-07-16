document.addEventListener('DOMContentLoaded', documentEvents, false);

function popup(input) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: input.value });
  });
}

function documentEvents() {
  document.getElementById('send').addEventListener('click', () => {
    // localstorage에서 가져오는 코드로 수정필요.
    popup(document.getElementById('block-content'));
  });

  getStorage();
}

/* ====================================================
                      word list
==================================================== */

loadEvents();

function loadEvents() {
  document.querySelector('form').addEventListener('submit', submit);
  document.querySelector('ul').addEventListener('click', deleteWords);
}

function submit(e) {
  e.preventDefault();
  let input = document.querySelector('input');
  if (input.value != '') {
    addWords(input.value);
    saveWords(input.value);
  }
  input.value = '';
}

function addWords(word) {
  renderList(word);
}

function deleteWords(e) {
  if (e.target.className === 'delete') {
    let remove = e.target.parentNode;
    removeItem(remove.querySelector('.words').innerHTML);
    let parentNode = remove.parentNode;
    parentNode.removeChild(remove);
  }
}

/* ====================================================
                      Handle Storage
==================================================== */

function saveWords(word) {
  chrome.storage.sync.get('reservedWords', (userText) => {
    let reservedWords = userText.reservedWords;

    if (reservedWords) {
      chrome.storage.sync.set({ reservedWords: [...reservedWords, word] });
    } else {
      chrome.storage.sync.set({ reservedWords: [word] });
    }
  });
}

function getStorage() {
  chrome.storage.sync.get('reservedWords', (userText) => {
    let reservedWords = userText.reservedWords;
    if (reservedWords) {
      reservedWords.forEach((word) => {
        renderList(word);
      });
    }
  });
}

function removeItem(item) {
  chrome.storage.sync.get('reservedWords', (userText) => {
    let reservedWords = userText.reservedWords;
    let index = reservedWords.indexOf(item);
    if (index > -1) reservedWords.splice(index, 1);
    chrome.storage.sync.set({ reservedWords: reservedWords });
  });
}

/* ====================================================
                      Render list
==================================================== */

function renderList(word) {
  let ul = document.querySelector('ul');
  let li = document.createElement('li');
  li.innerHTML = `
    <span class="words">${word}</span>
    <button class="delete">x</button>
  `;
  ul.appendChild(li);
  document.querySelector('.reserved-words').style.display = 'block';
}
