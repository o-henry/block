document.addEventListener('DOMContentLoaded', documentEvents, false);

function popup(input) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: input });
  });
}

function documentEvents() {
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
    removeItem(remove.querySelector('.words').innerText);
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

      document.getElementById('block').addEventListener('click', () => {
        popup(reservedWords);
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
    <button class="delete">𝗫</button>
  `;
  ul.appendChild(li);
  document.querySelector('.reserved-words').style.display = 'block';
}
