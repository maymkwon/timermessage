import Timer from "../timer";
import { timeConvert, toSec } from "../common/utils";
export default class Model {
  constructor() {
    this.timerList = [];
    this.id = 0;
  }

  bindTimerListChanged(callback) {
    this.onTimerListChanged = callback;
  }

  _commit(timers) {
    this.onTimerListChanged(timers);
  }

  addTimerItem(timerInfo) {
    const { title, time } = timerInfo;
    this.id++;
    const id = this.id;
    // 실행과 동시에 타이머 스타트
    const timerInstance = new Timer(() => this.destroy(id), timeConvert(time));

    const timerItem = {
      id,
      title,
      time: toSec(timerInstance.time),
      timerInstance
    };

    this.timerList.push(timerItem);
    // 갱신
    this._commit(this.timerList);
  }

  _findIndex(id) {
    const index = this.timerList.findIndex(o => o.id === id);
    return index;
  }

  destroy(id) {
    if (this.timerList.length) {
      // 타임 인스턴스 제거
      const index = this._findIndex(id);
      const target = this.timerList[index];
      if (index > -1) {
        target.time = 0;
        clearTimeout(target.timerInstance.timer);
        target.timerInstance = null;
        this.timerList.splice(index, 1);
      }
    }
    console.log("삭제됨?", this.timerList);
    // 갱신
    this._commit(this.timerList);
  }

  // 시간 증가 감소
  controlTime(id, time, type) {
    const index = this._findIndex(id);
    console.log(index, "번째 타이머", time, type);
    const target = this.timerList[index];

    if (type === "increse") {
      target.timerInstance.increse(timeConvert(time));
    } else if (type === "decrese") {
      target.timerInstance.decrese(timeConvert(time));
    }
    target.time = toSec(target.timerInstance.time);
    // 갱신
    this._commit(this.timerList);
  }
}
