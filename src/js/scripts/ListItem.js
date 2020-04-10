import Timer from '../timer';
import { IncreseTimeOption, DecreseTimeOption } from '../common/const';
import { createElement } from '../common/utils';

export default class ListItem {
  constructor(props) {
    this.timer = null;
    this.elem = props.elem;
    this.props = { ...props, timer: this.timer };
    console.log(this);
  }

  timeConvert = (time) => {
    const convertTime = parseInt(time) * 1000;
    return convertTime;
  };

  controlTime = (time, type) => {
    console.log('in', time, type);
    if (this.props.timer) {
      const convertTime = this.timeConvert(time);
      this.props.time = parseInt(this.props.time) + parseInt(time) + '';
      if (type === 'increse') {
        this.props.timer.increse(convertTime);
      } else if (type === 'decrese') {
        this.props.timer.decrese(convertTime);
      }
    }
  };

  destroy = () => {
    console.log('destroy');
    // 없어졌다고 알려줘야함
    // 인스턴스 변수 = null
    // dom 삭제
    // localEventListener 삭제X
    console.log(this.props.timer.timer);
    clearInterval(this.props.timer.timer);
    // this.elem
    this.props.timer = null;
    this.elem.classList.add('destroy');
    console.log(this.elem);
    console.log('타이머가 끝남', this.props);
  };

  initTimer = () => {
    const { time } = this.props;
    this.props.timer = new Timer(this.destroy, this.timeConvert(time));
  };

  // 타임옵션
  createTimeOption = (target, options) => {
    if (!options.length) return;
    options.forEach((option) => {
      return target.options.add(new Option(option.title, option.value));
    });
  };

  // localEventListener = () => {
  //   // 상위에서 이벤트 위임을 처리하는게 필요
  //   if (this.elem !== null) {
  //     this.elem.addEventListener('click', (e) => {
  //       const elemTarget = e.target;
  //       console.log(elemTarget);
  //       if (elemTarget && elemTarget.dataset.action === 'increse') {
  //         console.log('increse');
  //         this.addTime('5');
  //       } else if (elemTarget && elemTarget.dataset.action === 'decrese') {
  //         console.log('decrese');
  //       }
  //     });
  //   }
  // };

  renderInnerNode = () => {
    const increseSelect = createElement('select', 'increse-select');
    const increseButton = createElement('button', 'increse-button');
    increseButton.textContent = '증가';
    increseButton.name = 'increse';
    this.createTimeOption(increseSelect, IncreseTimeOption);
    const decreseSelect = createElement('select', 'decrese-select');
    const decreseButton = createElement('button', 'decrese-button');
    decreseButton.textContent = '감소';
    decreseButton.name = 'decrese';
    this.createTimeOption(decreseSelect, DecreseTimeOption);

    const deleteButton = createElement('button', 'delete-button');
    deleteButton.name = 'delete';
    deleteButton.onclick = () => this.destroy();

    return {
      increseSelect,
      increseButton,
      decreseSelect,
      decreseButton,
      deleteButton,
    };
  };

  render = () => {
    const { title, time } = this.props;
    console.log('render', this.props);
    this.initTimer();

    // const li = createElement('li');
    // 타이틀
    const p = createElement('p');
    p.textContent = title;
    // 남은시간
    const span = createElement('span', 'time-remain');
    span.textContent = time;
    p.appendChild(span);
    // 시간변경 nodes
    const {
      increseSelect,
      increseButton,
      decreseSelect,
      decreseButton,
      deleteButton,
    } = this.renderInnerNode();
    //

    increseButton.onclick = (e) =>
      this.controlTime(increseSelect.value, e.target.name);
    decreseButton.onclick = (e) =>
      this.controlTime(decreseSelect.value, e.target.name);

    this.elem.append(
      p,
      increseSelect,
      increseButton,
      decreseSelect,
      decreseButton,
      deleteButton
    );

    return this.elem;
  };
}
