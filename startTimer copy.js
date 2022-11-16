const btnHrs = document.querySelector('.HRS');
const btnMin = document.querySelector('.MIN');
const btnSec = document.querySelector('.SEC');
const btnStart = document.querySelector('.btn-start');
const btnPause = document.querySelector('.btn-pause');
const btnReset = document.querySelector('.btn-reset');
const imgStart = document.querySelector('.img-start')
const imgReset = document.querySelector('.img-reset')

const resetTimer = () => {
    clearInterval(timer);

    time = 0;
    timeHrs = 0;
    timeMin = 0;
    timeSec = 0;

    btnStart.disabled = true;
    btnReset.disabled = true;
    btnStart.classList.remove('active')
    btnReset.classList.remove('active')
    btnStart.style.display = 'inline'
    btnPause.style.display = 'none'

    imgStart.setAttribute('src', '/img/icon-start-disabled.png')
    imgReset.setAttribute('src', '/img/icon-reset-disabled.png')

    btnHrs.textContent = (timeHrs + '').padStart(2, "0");
    btnMin.textContent = (timeMin + '').padStart(2, "0");
    btnSec.textContent = (timeSec + '').padStart(2, "0");
};

let time = 0;
let timer;
let timeHrs = 0;
let timeMin = 0;
let timeSec = 0;

btnHrs.textContent = (timeHrs + '').padStart(2, "0");
btnMin.textContent = (timeMin + '').padStart(2, "0");
btnSec.textContent = (timeSec + '').padStart(2, "0");

if (time === 0) {
    btnStart.disabled = true;
    btnReset.disabled = true;
}

function startTimer() {
    timer  = setInterval(() => {
        time--;


    })
}


function addTime(type) {
    if (type === 'sec') {
        time += 1;
        timeSec = time % 60;
    }

    else if (type === 'min') {
        timeMin++;

        if  (timeMin > 60) {
            timeMin = 60;
        } else {
            time += 60;
        }
    }

    else if (type === 'hrs') {
        time += 3600;
        timeHrs = ~~(time / 3600);
    }
}