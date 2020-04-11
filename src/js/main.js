import Model from "./scripts/model";
import View from "./scripts/view";
import Controller from "./scripts/controller";
const model = new Model();
const view = new View();
const app = new Controller(model, view);
console.log(app.view.timerListElement);

function intervalCount() {
  const parent = app.view.timerListElement;
  const countTextElem = parent.querySelectorAll(".remain-time");
  console.log(countTextElem);
}

intervalCount();
