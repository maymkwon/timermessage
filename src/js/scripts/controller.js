export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // 렌더링
    this.model.bindTimerListChanged(this.onTimerListChanged);

    // 타이머 추가
    this.view.bindAddItem(this.handleAddTimer);

    //시간 조절
    this.view.bindControlTime(this.handleControlTime);

    // 타이머 개별 삭제
    this.view.bindDeleteTimerItem(this.handleDeleteTimerItem);

    // 초기 로딩
    this.onTimerListChanged(this.model.timerList);
  }

  onTimerListChanged = todos => {
    this.view.displayItems(todos);
  };

  handleAddTimer = timerInfo => {
    this.model.addTimerItem(timerInfo);
  };

  handleControlTime = (id, time, type) => {
    this.model.controlTime(id, time, type);
  };

  handleDeleteTimerItem = id => {
    this.model.destroy(id);
  };
}
