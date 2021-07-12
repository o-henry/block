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
