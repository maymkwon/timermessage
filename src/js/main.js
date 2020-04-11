import Model from "./scripts/model";
import View from "./scripts/view";
import Controller from "./scripts/controller";
const model = new Model();
const view = new View();
const app = new Controller(model, view);
console.log(app);
