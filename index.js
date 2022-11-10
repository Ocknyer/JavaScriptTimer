const btnHrs = document.querySelector('.HRS');
const btnMin = document.querySelector('.MIN');
const btnSec = document.querySelector('.SEC');
const btnStart = document.querySelector('.btn-start');
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
    btnStart.classList.remove('active', 'pause')
    btnReset.classList.remove('active')

    imgStart.setAttribute('src', '/img/icon-start-disabled.png')
    imgReset.setAttribute('src', '/img/icon-reset-disabled.png')

    btnHrs.textContent = (timeHrs + '').padStart(2, "0");
    btnMin.textContent = (timeMin + '').padStart(2, "0");
    btnSec.textContent = (timeSec + '').padStart(2, "0");
};


function setBtn() {
    if (btnStart.classList.contains('active')) {
        btnStart.classList.replace('active', 'pause')
        btnStart.innerHTML = `
        <img src="img/icon-stop.png" alt="" class="img-start">PAUSE
        `
    } else if (btnStart.classList.contains('pause')) {
        btnStart.classList.replace('pause', 'active')
        btnStart.innerHTML = `
        <img src="img/icon-start.png" alt="" class="img-start">START
        `
    }

    if (btnStart.disabled === true && btnReset.disabled === true) {
        btnReset.innerHTML = `
        <img src="img/icon-reset-disabled.png" alt="" class="img-reset">RESET
        `
        btnStart.innerHTML = `
        <img src="img/icon-start-disabled.png" alt="" class="img-start">START
        `
    }
}

let time = 0;
let timer;
let timeHrs = 0;
let timeMin = 0;
let timeSec = 0;

btnHrs.textContent = (timeHrs + '').padStart(2, "0");
btnMin.textContent = (timeMin + '').padStart(2, "0");
btnSec.textContent = (timeSec + '').padStart(2, "0");

// if (time === 0) {
//     btnStart.disabled = true;
//     btnReset.disabled = true;
// }

function startTimer() {
    timer = setInterval(() => {
        time--;
        timeSec--;

        if (timeSec < 10) {
            // btnSec.textContent = '0' + timeSec;
            btnSec.textContent = (timeSec + '').padStart(2, '0');
        } else {
            btnSec.textContent = timeSec;
        }

        if (timeMin >= 1 && timeSec === 0) {
            timeMin--;

            if (timeMin < 10) {
                btnMin.textContent = '0' + timeMin;
            } else {
                btnMin.textContent = timeMin;
            }

            timeSec = 60;
            btnSec.textContent = timeSec;
        }

        if (timeSec < 1 && timeMin >= 1) {
            timeMin--;

            if (timeMin < 10) {
                btnMin.textContent = '0' + timeMin;
            } else {
                btnMin.textContent = timeMin;
            }

            timeSec = 59;
            btnSec.textContent = timeSec;
        }

        if (timeSec < 1 && timeMin < 1 && timeHrs >= 1) {
            timeHrs--;

            if (timeHrs < 10) {
                btnHrs.textContent = '0' + timeHrs;
            } else {
                btnHrs.textContent = timeHrs;
            }
        

            timeMin = 59;
            btnMin.textContent = timeMin;
            timeSec = 59;
            btnSec.textContent = timeSec;
        }
              
        if (timeHrs === 0 && timeMin === 0 && timeSec === 0) {
            clearInterval(timer);
            resetTimer()
            setBtn()

            btnStart.disabled = true;
            btnReset.disabled = true;
        }
    }, 1000)
};

function setBtnImg (button, time) {
    button.textContent = (time + '').padStart(2, "0");
    btnStart.disabled = false;
    btnReset.disabled = false;
    imgStart.setAttribute('src', '/img/icon-start.png');
    imgReset.setAttribute('src', '/img/icon-reset.png');
};

function addTime(type) {
    if (type === 'sec') {
        time += 10;
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
    setBtnImg(btnSec, timeSec);
});

btnMin.addEventListener('click', () => {
    addTime('min');
    setBtnImg(btnMin, timeMin);
});

btnHrs.addEventListener('click', () => {
    addTime('hrs');
    setBtnImg(btnHrs, timeHrs);
});

btnStart.addEventListener('click', () => {
    if (btnStart.classList.contains('active')) {
        startTimer();
        setBtn();
    } else if (btnStart.classList.contains('pause')) {
        clearInterval(timer);
        setBtn();
    }
});

btnReset.addEventListener('click', () => {
    resetTimer();
});