import { IncreseTimeOption, decreaseTimeOption } from "../common/const";
import { timeConvert } from "../common/utils";
export default class View {
  constructor() {
    // this.app = this.getElement("#root");
    this.select = this.getElement("#message-time-option");
    this.form = this.getElement("#message-form");
    this.input = this.getElement("#message-input");
    this.submitButton = this.getElement("#message-add-btn");
    this.timerListElement = this.getElement("#message-list-container");
  }

  get _timerInfo() {
    return {
      title: this.input.value,
      time: this.select.value
    };
  }

  _resetInput() {
    this.input.value = "";
    // this.select.value = "3";
  }

  // util 함수(dom create)
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
  }

  // util 함수(dom find)
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  // 타임옵션 생성함수
  createTimeOption = (target, options) => {
    if (!options.length) return;
    options.forEach(option => {
      return target.options.add(new Option(option.title, option.value));
    });
  };

  // 내부 elem
  renderInnerNode = parentId => {
    // 증가영역
    const increseBox = this.createElement("div", "increse-area");
    const increseSelect = this.createElement("select");
    increseSelect.id = `increse-select-${parentId}`;
    const increseButton = this.createElement("button", "time-control-btn");
    increseButton.textContent = "증가";
    increseButton.name = "increse";
    this.createTimeOption(increseSelect, IncreseTimeOption);
    // increseBox.append(increseSelect, increseButton);

    // 감소 영역
    const decreaseBox = this.createElement("div", "decrease-area");
    const decreaseSelect = this.createElement("select");
    decreaseSelect.id = `decrease-select-${parentId}`;
    const decreaseButton = this.createElement("button", "time-control-btn");
    decreaseButton.textContent = "감소";
    decreaseButton.name = "decrease";
    this.createTimeOption(decreaseSelect, decreaseTimeOption);
    // decreaseBox.append(decreaseSelect, decreaseButton);

    // 삭제버튼
    const deleteButton = this.createElement("button", "delete-button");
    deleteButton.name = "delete";
    deleteButton.textContent = "삭제";
    return {
      deleteButton,
      increseSelect,
      increseButton,
      decreaseSelect,
      decreaseButton
    };
  };

  // 내부 elem + 리스트 렌더
  displayItems(timerList) {
    while (this.timerListElement.firstChild) {
      this.timerListElement.removeChild(this.timerListElement.firstChild);
    }

    // 리스트가 없을떄
    if (timerList.length === 0) {
      const p = this.createElement("p");
      p.textContent = "등록해주세요";
      this.timerListElement.append(p);
    } else {
      // node 생성
      timerList.forEach(timer => {
        const { id, title, time } = timer;
        const li = this.createElement("li");
        li.id = id;
        // 타이틀
        const p1 = this.createElement("p");
        p1.textContent = title;
        const span = this.createElement("span", "time-remain");
        span.textContent = time;
        // 남은시간

        p1.append(span);

        const {
          deleteButton,
          increseSelect,
          increseButton,
          decreaseSelect,
          decreaseButton
        } = this.renderInnerNode(id);

        li.append(
          p1,
          increseSelect,
          increseButton,
          decreaseSelect,
          decreaseButton,
          deleteButton
        );

        // this.timerListElement의 자식 엘리먼트로 append
        this.timerListElement.append(li);
      });
    }
    console.log("타이머 데이터 입니다.", timerList);
  }

  bindAddItem(handler) {
    this.form.addEventListener("submit", event => {
      event.preventDefault();
      if (this._timerInfo.title.trim().length <= 3) {
        alert("3자이상 입력해 주세요");
        return;
      }
      handler(this._timerInfo);
      this._resetInput();
    });
  }

  bindDeleteTimerItem(handler) {
    this.timerListElement.addEventListener("click", event => {
      if (event.target.className === "delete-button") {
        const id = parseInt(event.target.parentElement.id);
        handler(id);
      }
    });
  }

  // todo
  bindControlTime(handler) {
    this.timerListElement.addEventListener("click", event => {
      if (event.target.className === "time-control-btn") {
        const parent = event.target.parentElement;
        const id = parseInt(event.target.parentElement.id);
        const type = event.target.name;
        const select = this.getElement(`#${type}-select-${id}`);
        handler(id, select.value, type);
      }
    });
  }
}
