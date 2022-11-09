const btnHrs = document.querySelector('.HRS');
const btnMin = document.querySelector('.MIN');
const btnSec = document.querySelector('.SEC');
const btnStart = document.querySelector('.btn-start');
const btnReset = document.querySelector('.btn-reset');
const imgStart = document.querySelector('.img-start')
const imgReset = document.querySelector('.img-reset')
const btnStop = document.querySelector('.btn-stop')


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

        if (timeSec < 10) {
            btnSec.textContent = `0 + ${timeSec})`
            // btnSec.textContent = (timeSec + '').padStart(2, '0');
        } else {
            btnSec.textContent = timeSec;
        }

        if (timeMin >= 1 && timeSec === 0) {
            timeMin--;

            if (timeMin < 10) {
                btnMin.textContent = `0 + ${timeMin})`
            } else {
                btnMin.textContent = timeMin;
            }

            timeSec = 60;
            btnSec.textContent = timeSec;
        }

        if (timeSec < 1 && timeMin >= 1) {
            timeMin--;

            if (timeMin < 10) {
                btnMin.textContent = `0 + ${timeMin})`
            } else {
                btnMin.textContent = timeMin;
            }

            timeSec = 59;
            btnSec.textContent = timeSec;
        }

        if (timeSec < 1 && timeMin < 1 && timeHour >= 1) {
            timeHour--;

            if (timeHrs < 10) {
                btnHrs.textContent = `0 + ${timeHrs})`
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

            btnStart.disabled = true;
            btnReset.disabled = true;
            imgStart.setAttribute('src', '/img/icon-start-disabled.png')
            imgReset.setAttribute('src', '/img/icon-reset-disabled.png')
            stopBtn.classList.remove("active");
            startBtn.classList.add("active");
        }
    }, 1000)
};


function resetTimer () {
    clearInterval(timer);
    time = 0;
    timeHrs = 0;
    timeMin = 0;
    timeSec = 0;
    btnStart.disabled = true;
    btnReset.disabled = true;
    imgStart.setAttribute('src', '/img/icon-start-disabled.png')
    imgReset.setAttribute('src', '/img/icon-reset-disabled.png')
    btnHrs.textContent = (timeHrs + '').padStart(2, "0");
    btnMin.textContent = (timeMin + '').padStart(2, "0");
    btnSec.textContent = (timeSec + '').padStart(2, "0");
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
    btnStop.classList.add('active');
    btnStart.classList.remove('active');
    timerStart();
});

btnReset.addEventListener('click', () => {
    timerReset();
});

// btnStop.addEventListener('click', () => {
//     clearInterval(timer);
//     btnStop.classList.remove('active');
//     btnStart.classList.add('active');
// });






// btnSec.addEventListener('click', (e) => {
//     btnSec.value = 10
//     btnSec.innerHTML = `${btnSec.value}`
//     btnStart.classList.add('active')
//     btnReset.classList.add('active')



//     imgStart.setAttribute('src', 'img/icon-start.png')
//     imgReset.setAttribute('src', 'img/icon-reset.png')
// })

// btnStart.addEventListener('click', (e) => {
//         btnStart.style.background = '#15c2b8'
//         btnStart.innerHTML = `
//         <img src="img/icon-stop.png" alt="" class="img-start">PAUSE
//         `
//         setInterval(function () {
//             btnSec.value -= 1
//             btnSec.innerHTML = `${btnSec.value}`
//         }, 1000)
// })