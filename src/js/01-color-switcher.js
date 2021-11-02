const bodyEl = document.querySelector('body');
const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');

btnStartEl.addEventListener('click', () => {
  timerChangeColor.start();
});
btnStopEl.addEventListener('click', () => {
  timerChangeColor.stop();
});

const timerChangeColor = {
  intervalId: null,

  start() {
    btnStartEl.disabled = true;
    btnStopEl.disabled = false;
    this.intervalId = setInterval(() => {
      bodyEl.style.backgroundColor = getRandomRGBColor();
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);

    btnStartEl.disabled = false;
    btnStopEl.disabled = true;
  },
};

function getRandomIntegerFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomRGBColor() {
  return `rgb(${getRandomIntegerFromInterval(0, 255)},
    ${getRandomIntegerFromInterval(0, 255)},
    ${getRandomIntegerFromInterval(0, 255)})`;
}
