import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  buttonEl: document.querySelector('button'),
  daysValueEl: document.querySelector('.value[data-days]'),
  hoursValueEl: document.querySelector('.value[data-hours]'),
  minutesValueEl: document.querySelector('.value[data-minutes]'),
  secondsValueEl: document.querySelector('.value[data-seconds]'),
  selectedDates: null,
};
refs.buttonEl.addEventListener('click', onStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      // alert('Please choose a date in the future');
      Notiflix.Notify.warning('Please choose a date in the future');
      Notiflix.Notify.warning('Пожалуйста, выберите дату в будущем');
    } else {
      refs.buttonEl.disabled = false;
      refs.selectedDates = selectedDates;
      console.log(refs.selectedDates);
    }
  },
};

flatpickr(refs.inputEl, options);

function onStart() {
  const timeId = setInterval(() => {
    refs.buttonEl.disabled = true;
    const currentTime = new Date();
    const deadlineTime = refs.selectedDates[0].getTime();
    const deltaTime = deadlineTime - currentTime;
    const timeSelected = convertMs(deltaTime);
    setTimeValue(timeSelected);
    if (deltaTime < 1000) {
      clearInterval(timeId);
    }
    // console.log(timeSelected);
  }, 1000);
}
function setTimeValue({ days, hours, minutes, seconds }) {
  refs.daysValueEl.textContent = `${days}`;
  refs.hoursValueEl.textContent = `${hours}`;
  refs.minutesValueEl.textContent = `${minutes}`;
  refs.secondsValueEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
// const date = new Date();
