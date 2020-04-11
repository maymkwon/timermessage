import { EventName } from "./const";
export default class CustomEventDom {
  static destroy(elemId) {
    var evt = new CustomEvent(EventName.destroy, {
      detail: {
        elemId
      }
    });
    document.dispatchEvent(evt);
  }
}
