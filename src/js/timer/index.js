export default class Timer {
  constructor(callback, time) {
    this.setTimeout(callback, time);
  }
}

Timer.prototype.setTimeout = function (callback, time) {
  var self = this;
  if (this.timer) {
    clearTimeout(this.timer);
  }
  this.finished = false;
  this.callback = callback;
  this.time = time;
  this.timer = setTimeout(function () {
    self.finished = true;
    callback();
  }, time);
  this.start = Date.now();
};

Timer.prototype.increse = function (time) {
  if (!this.finished) {
    // add time to time left
    time = this.time - (Date.now() - this.start) + time;
    this.setTimeout(this.callback, time);
  }
};
Timer.prototype.decrese = function (time) {
  if (!this.finished) {
    // add time to time left
    time = this.time - (Date.now() - this.start) - time;
    this.setTimeout(this.callback, time);
  }
};
