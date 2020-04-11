import Timer from "./src/js/timer";
import { IncreseTimeOption, decreaseTimeOption } from "./src/js/common/const";
import { createElement } from "./src/js/common/utils";
import CustomEventDom from "./src/js/common/customEvent";

export default class ListItem {
  constructor(props) {
    this.timer = null;
    this.elem = props.elem;
    this.props = { ...props, timer: this.timer };
    console.log(this);
  }

  timeConvert = time => {
    const convertTime = parseInt(time) * 1000;
    return convertTime;
  };

  controlTime = (time, type) => {
    console.log("in", time, type);
    if (this.props.timer) {
      const convertTime = this.timeConvert(time);
      this.props.time = parseInt(this.props.time) + parseInt(time) + "";
      if (type === "increse") {
        this.props.timer.increse(convertTime);
      } else if (type === "decrease") {
        this.props.timer.decrease(convertTime);
      }
    }
  };

  localEventListener = () => {
    this.elem.addEventListener;
  };

  destroy = () => {
    console.log("destroy");
    // 없어졌다고 알려줘야함
    // 인스턴스 변수 = null
    // dom 삭제
    // localEventListener 삭제X
    // this.elem.dispatchEvent()

    clearInterval(this.props.timer.timer);
    this.props.timer = null;
    // this.elem.dispatchEvent(
    //   new CustomEvent("awesome", {
    //     bubbles: true,
    //     detail: { text: () => textarea.value }
    //   })
    // );
    console.log(this.elem.id);
    this.elem.classList.add("destroy");
    console.log("타이머가 끝남");
    return CustomEventDom.destroy(this.elem.id);
  };

  initTimer = () => {
    const { time } = this.props;
    this.props.timer = new Timer(this.destroy, this.timeConvert(time));
  };

  // 타임옵션
  createTimeOption = (target, options) => {
    if (!options.length) return;
    options.forEach(option => {
      return target.options.add(new Option(option.title, option.value));
    });
  };

  renderInnerNode = () => {
    const increseSelect = createElement("select", "increse-select");
    const increseButton = createElement("button", "increse-button");
    increseButton.textContent = "증가";
    increseButton.name = "increse";
    this.createTimeOption(increseSelect, IncreseTimeOption);
    const decreaseSelect = createElement("select", "decrease-select");
    const decreaseButton = createElement("button", "decrease-button");
    decreaseButton.textContent = "감소";
    decreaseButton.name = "decrease";
    this.createTimeOption(decreaseSelect, decreaseTimeOption);

    const deleteButton = createElement("button", "delete-button");
    deleteButton.name = "delete";
    deleteButton.onclick = () => this.destroy();

    return {
      increseSelect,
      increseButton,
      decreaseSelect,
      decreaseButton,
      deleteButton
    };
  };

  render = () => {
    const { title, time } = this.props;
    console.log("render", this.props);
    this.initTimer();

    // const li = createElement('li');
    // 타이틀
    const p = createElement("p");
    p.textContent = title;
    // 남은시간
    const span = createElement("span", "time-remain");
    span.textContent = time;
    p.appendChild(span);
    // 시간변경 nodes
    const {
      increseSelect,
      increseButton,
      decreaseSelect,
      decreaseButton,
      deleteButton
    } = this.renderInnerNode();
    //

    increseButton.onclick = e =>
      this.controlTime(increseSelect.value, e.target.name);
    decreaseButton.onclick = e =>
      this.controlTime(decreaseSelect.value, e.target.name);

    this.elem.append(
      p,
      increseSelect,
      increseButton,
      decreaseSelect,
      decreaseButton,
      deleteButton
    );

    return this.elem;
  };
}
