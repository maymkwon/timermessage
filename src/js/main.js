import ListItem from './scripts/ListItem';
import { createElement } from './common/utils';
const messageInput = document.getElementById('message-input');
const timeOptionInput = document.getElementById('message-time-option');
const addMessageBtn = document.getElementById('message-add-btn');
const listContainer = document.getElementById('message-list-container');

addMessageBtn.onclick = addNew;

let id = 0;
function addNew() {
  if (messageInput.value.trim().length <= 3) {
    alert('3자이상 입력해 주세요');
  } else {
    id++;

    const li = createElement('li');
    li.id = id;
    const list = new ListItem({
      elem: li,
      title: messageInput.value,
      time: timeOptionInput.value,
    });
    resetInput();
    listContainer.appendChild(list.render());
  }
}

function resetInput() {
  messageInput.value = '';
}

class Observer {
  constructor() {
    this.update = function () {};
  }
}

// create an observer instance
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    console.log(mutation);
  });
});

// configuration of the observer:
var config = { attributes: true, childList: true, characterData: true };

// pass in the target node, as well as the observer options
observer.observe(listContainer, config);
