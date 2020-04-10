import { timeOptions } from '../js/common/const';

// var timer = new Timer(function () {
//   // init timer with 5 seconds
//   alert('foo');
// }, 5000);

// timer.add(2000);
/**
 * @class Model
 *
 * Manages the data of the application.
 */

class Model {
  constructor() {
    this.timerItems = [];
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  _commit(timerItems) {
    this.onTodoListChanged(timerItems);
  }

  addTodo(itemInfo) {
    let id =
      this.timerItems.length > 0
        ? this.timerItems[this.timerItems.length - 1].id + 1
        : 1;
    const item = {
      id,
      message: itemInfo.message,
      time: itemInfo.time,
    };

    this.timerItems.push(item);
    // console.log('1111', this.timerItems);

    this._commit(this.timerItems);
  }

  editTodo(id, updatedText) {
    this.timerItems = this.timerItems.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: updatedText, complete: todo.complete }
        : todo
    );

    this._commit(this.timerItems);
  }

  deleteTodo(id) {
    this.timerItems = this.timerItems.filter((todo) => todo.id !== id);

    this._commit(this.timerItems);
  }

  toggleTodo(id) {
    this.timerItems = this.timerItems.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: todo.text, complete: !todo.complete }
        : todo
    );

    this._commit(this.timerItems);
  }
}

// Model.prototype.setTimeout = function (callback, time) {
//   var self = this;
//   if (this.timer) {
//     clearTimeout(this.timer);
//   }
//   this.finished = false;
//   this.callback = callback;
//   this.time = time;
//   this.timer = setTimeout(function () {
//     self.finished = true;
//     callback();
//   }, time);
//   this.start = Date.now();
// };

// Model.prototype.add = function (time) {
//   if (!this.finished) {
//     // add time to time left
//     time = this.time - (Date.now() - this.start) + time;
//     this.setTimeout(this.callback, time);
//   }
// };

/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
  constructor() {
    this.app = this.getElement('#root');
    // 등록 form
    this.form = this.createElement('form');
    // message 인풋
    this.input = this.createElement('input');
    this.input.type = 'text';
    this.input.placeholder = 'Enter Message';
    this.input.name = 'message';
    // 시간 select
    this.select = this.createElement('select');
    this.createOption(this.select, timeOptions);
    // 등록 버튼
    this.submitButton = this.createElement('button');
    this.submitButton.textContent = '추가';
    // 폼 렌더
    this.form.append(this.input, this.select, this.submitButton);
    // 앱 렌더
    this.title = this.createElement('h1');
    this.title.textContent = '펑리스트';
    this.timerList = this.createElement('ul', 'timer-list');
    this.app.append(this.title, this.form, this.timerList);

    this._temporaryTodoText = '';
    this._initLocalListeners();
  }

  get _itemInfos() {
    return { message: this.input.value, time: this.select.value };
  }

  // form 초기화
  _resetInput() {
    this.input.value = '';
    this.select.value = '3000';
  }

  // dom생성함수
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  // 옵션생성함수
  createOption(target, options) {
    if (!options.length) return;
    options.forEach((option) => {
      return target.options.add(new Option(option.title, option.value));
    });
  }

  // dom get
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  displayItems(items) {
    // 모든 노드 삭제
    while (this.timerList.firstChild) {
      this.timerList.removeChild(this.timerList.firstChild);
    }
    // 리스트 아이템이 없을떄
    if (items.length === 0) {
      const p = this.createElement('p');
      p.textContent = '등록해 주세요';
      this.timerList.append(p);
    } else {
      // 아이템 생성
      console.log('들어와?');
      console.log(items);
      items.forEach((info) => {
        const li = this.createElement('li');
        li.id = info.id;
        const span = this.createElement('span');
        span.textContent = info.message;
        const deleteButton = this.createElement('button', 'delete');
        deleteButton.textContent = 'Delete';
        li.append(span, deleteButton);

        // Append nodes
        this.timerList.append(li);
      });
    }

    // 디버깅
    console.log(items);
  }

  // 내부 타이머 증가 / 감소 이벤트
  _initLocalListeners() {
    this.timerList.addEventListener('input', (event) => {
      if (event.target.className === 'editable') {
        this._temporaryTodoText = event.target.innerText;
      }
    });
  }

  bindAddItem(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log('this._itemInfos', this._itemInfos);
      if (this._itemInfos.message.trim().length >= 3) {
        handler(this._itemInfos);
        this._resetInput();
      } else {
        alert('최소 3글자 이상을 입력해주세요');
      }
    });
  }

  bindDeleteTodo(handler) {
    this.timerList.addEventListener('click', (event) => {
      if (event.target.className === 'delete') {
        const id = parseInt(event.target.parentElement.id);

        handler(id);
      }
    });
  }

  bindEditTodo(handler) {
    this.timerList.addEventListener('focusout', (event) => {
      if (this._temporaryTodoText) {
        const id = parseInt(event.target.parentElement.id);

        handler(id, this._temporaryTodoText);
        this._temporaryTodoText = '';
      }
    });
  }

  bindToggleTodo(handler) {
    this.timerList.addEventListener('change', (event) => {
      if (event.target.type === 'checkbox') {
        const id = parseInt(event.target.parentElement.id);

        handler(id);
      }
    });
  }
  bindAddtime(handler) {
    this.timerList.addEventListener('change', (event) => {
      if (event.target.type === 'checkbox') {
        const id = parseInt(event.target.parentElement.id);

        handler(id);
      }
    });
  }
}

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Explicit this binding
    this.model.bindTodoListChanged(this.onTodoListChanged);
    this.view.bindAddItem(this.handleAddTodo);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);

    // Display initial todos
    this.onTodoListChanged(this.model.timerItems);
  }

  onTodoListChanged = (todos) => {
    this.view.displayItems(todos);
  };

  handleAddTodo = (todoText) => {
    this.model.addTodo(todoText);
  };

  handleEditTodo = (id, todoText) => {
    this.model.editTodo(id, todoText);
  };

  handleDeleteTodo = (id) => {
    this.model.deleteTodo(id);
  };

  handleToggleTodo = (id) => {
    this.model.toggleTodo(id);
  };
}

// const app = new Controller(new Model(), new View());
export { Model, Controller, View };
