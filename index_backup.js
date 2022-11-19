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
    timer = setInterval(() => {
        time--;
        timeSec--;

        timeSec < 10 ? btnSec.textContent = '0' + timeSec : btnSec.textContent = timeSec;

        if (timeMin >= 1 && timeSec === 0) {
            // timeSec = 00;
            if (time % 60 === 0) {
                timeMin--;
                setTimeout(() => {
                    timeSec = 59;
                }, 1000)
            }

            timeMin < 10 ? btnMin.textContent = '0' + timeMin : btnMin.textContent = timeMin;

            
            btnSec.textContent = timeSec;
        }

        if (timeSec < 1 && timeMin >= 1) {
            timeMin--;

            timeMin < 10 ? btnMin.textContent = '0' + timeMin : btnMin.textContent = timeMin;


            timeSec = 59;
            btnSec.textContent = timeSec;
        }

        if (timeSec < 1 && timeMin < 1 && timeHrs >= 1) {
            timeHrs--;

            timeHrs < 10 ? btnHrs.textContent = '0' + timeHrs : btnHrs.textContent = timeHrs;
        

            timeMin = 59;
            btnMin.textContent = timeMin;
            timeSec = 59;
            btnSec.textContent = timeSec;

        }
              
        if (timeHrs === 0 && timeMin === 0 && timeSec === 0) {
            setTimeout(() => {
                clearInterval(timer);
                resetTimer()

                btnStart.disabled = true;
                btnReset.disabled = true;
            }, 1000)
        }
    }, 1000)
};

function setBtn (button, time) {
    button.textContent = (time + '').padStart(2, "0");
    btnStart.disabled = false;
    btnReset.disabled = false;
    btnStart.classList.add('active');
    btnReset.classList.add('active');
    imgStart.setAttribute('src', '/img/icon-start.png');
    imgReset.setAttribute('src', '/img/icon-reset.png');
};

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

btnSec.addEventListener('click', () => {
    btnStart.classList.add('active');
    btnReset.classList.add('active')
    addTime('sec');
    setBtn(btnSec, timeSec);
});

btnMin.addEventListener('click', () => {
    addTime('min');
    setBtn(btnMin, timeMin);
});

btnHrs.addEventListener('click', () => {
    addTime('hrs');
    setBtn(btnHrs, timeHrs);
});

btnStart.addEventListener('click', () => {
    startTimer();
    btnStart.style.display = 'none'
    btnPause.style.display = 'inline'
});

btnPause.addEventListener('click', () => {
    clearInterval(timer);
    btnPause.style.display = 'none'
    btnStart.style.display = 'inline'
})

btnReset.addEventListener('click', () => {
    resetTimer();
});