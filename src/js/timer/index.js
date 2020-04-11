export default class Timer {
  constructor(callback, time) {
    this.setTimeout(callback, time);
  }
}

Timer.prototype.setTimeout = function(callback, time) {
  var self = this;
  if (this.timer) {
    console.log("기존 타이머 해제", this.timer);
    clearTimeout(this.timer);
  }
  this.finished = false;
  this.callback = callback;
  this.time = time;
  this.timer = setTimeout(function() {
    self.finished = true;
    callback();
  }, time);
  this.start = Date.now();
};

Timer.prototype.increse = function(time) {
  if (!this.finished) {
    let newTime = this.time - (Date.now() - this.start);
    if (time === "double") {
      newTime = this.time * 2 - (Date.now() - this.start);
    } else if (time === "triple") {
      newTime = this.time * 3 - (Date.now() - this.start);
    } else {
      newTime = newTime + time;
    }
    this.setTimeout(this.callback, newTime);
  }
};
Timer.prototype.decrease = function(time) {
  if (!this.finished) {
    time = this.time - (Date.now() - this.start) - time;
    this.setTimeout(this.callback, time);
  }
};
