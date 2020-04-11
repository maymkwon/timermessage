export const createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);
  return element;
};

export const timeConvert = time => {
  let convertTime = 0;
  if (isNaN(time)) {
    convertTime = time;
  } else {
    convertTime = parseInt(time) * 1000;
  }
  return convertTime;
};

export const toSec = time => ((time % 60000) / 1000).toFixed(0);
