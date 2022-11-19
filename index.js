const btnHrs = document.querySelector('.HRS');
const btnMin = document.querySelector('.MIN');
const btnSec = document.querySelector('.SEC');
const btnStart = document.querySelector('.btn-start');
const btnPause = document.querySelector('.btn-pause');
const btnReset = document.querySelector('.btn-reset');
const imgStart = document.querySelector('.img-start')
const imgReset = document.querySelector('.img-reset')

console.log(btnHrs)

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

    btnHrs.value = (timeHrs + '').padStart(2, "0");
    btnMin.value = (timeMin + '').padStart(2, "0");
    btnSec.value = (timeSec + '').padStart(2, "0");
};

let time = 0;
let timer;
let timeHrs = 0;
let timeMin = 0;
let timeSec = 0;

btnHrs.value = (timeHrs + '').padStart(2, "0");
btnMin.value = (timeMin + '').padStart(2, "0");
btnSec.value = (timeSec + '').padStart(2, "0");

if (time === 0) {
    btnStart.disabled = true;
    btnReset.disabled = true;
}

// function startTimer() {
//     timer = setInterval(() => {
//         time--;
//         timeSec--;
//         // timeSec < 10 ? btnSec.value = '0' + timeSec : btnSec.value = timeSec;
//         btnSec.value < 10 ? btnSec.value = '0' + timeSec : btnSec.value = timeSec;

//         if (timeMin >= 1 && timeSec === 0) {
//             timeMin--;

//             timeSec = 59;

//             // timeMin < 10 ? btnMin.value = '0' + timeMin : btnMin.value = timeMin;
//             btnMin.value < 10 ? btnMin.value = '0' + timeMin : btnMin.value = timeMin;

            
//             btnSec.value = timeSec;
//         }

//         // if (timeSec < 1 && timeMin >= 1) {
//         //     timeMin--;

//         //     timeMin < 10 ? btnMin.textContent = '0' + timeMin : btnMin.textContent = timeMin;


//         //     timeSec = 59;
//         //     btnSec.textContent = timeSec;
//         // }

//         if (timeSec < 1 && timeMin < 1 && timeHrs >= 1) {
//             timeHrs--;

//             // timeHrs < 10 ? btnHrs.value = '0' + timeHrs : btnHrs.value = timeHrs;
//             btnHrs.value < 10 ? btnHrs.value = '0' + timeHrs : btnHrs.value = timeHrs;
        

//             timeMin = 59;
//             btnMin.value = timeMin;
//             timeSec = 59;
//             btnSec.value = timeSec;

//         }
              
//         if (timeHrs === 0 && timeMin === 0 && timeSec === 0) {
//             setTimeout(() => {
//                 clearInterval(timer);
//                 resetTimer()

//                 btnStart.disabled = true;
//                 btnReset.disabled = true;
//             }, 1000)
//         }
//     }, 1000)
// };

function startTimer() {
    timer = setInterval(() => {
        time--;
        timeSec--;
        console.log(time, timeSec, timeMin, timeHrs)

        timeSec < 10 ? btnSec.value = (timeSec + '').padStart(2, "0") : btnSec.value = timeSec;

        if ( timeHrs > 0 && timeMin > 0 && timeSec > 0 ) {
            btnSec.value = time - (timeMin * 60) - (timeHrs * 3600);            
            btnMin.value = time - (timeHrs * 3600) - timeSec;
            btnHrs.value = time / 3600;
        } else if ( timeHrs === 0 && timeMin > 0 && timeSec > 0 ) {
            btnSec.value = time - (timeMin * 60);            
            btnMin.value = (time - timeSec)/60;
            // btnHrs.value = 0;
        } else if ( timeHrs === 0 && timeMin === 0 && timeSec > 0 ) {
            btnSec.value = time;
        }

        if ( time > 60 && timeSec == Number(0)) {
            timeMin--;
            timeSec = 59
        }

        if ( timeHrs > 0 && timeMin == 0) {
            timeHrs--;
            timeMin = 59
        }
        
        

        if (timeHrs === 0 && timeMin == 0 && timeSec == 0) {
            setTimeout(() => {
                clearInterval(timer);
                resetTimer()

                btnStart.disabled = true;
                btnReset.disabled = true;
            }, 1000)
        }
    }, 1000)
}

function setBtn (button, time) {
    // button.value = (time + '').padStart(2, "0");
    btnStart.disabled = false;
    btnReset.disabled = false;
    btnStart.classList.add('active');
    btnReset.classList.add('active');
    imgStart.setAttribute('src', '/img/icon-start.png');
    imgReset.setAttribute('src', '/img/icon-reset.png');
};

// function addTime(type) {
//     if (type === 'sec') {
//         time += 1;
//         timeSec = time % 60;
//     }

//     else if (type === 'min') {
//         timeMin++;

//         if  (timeMin > 60) {
//             timeMin = 60;
//         } else {
//             time += 60;
//         }
//     }

//     else if (type === 'hrs') {
//         time += 3600;
//         timeHrs = ~~(time / 3600);
//     }
// }

function getValue() {
    timeSec = parseInt(btnSec.value);
    if (btnSec.value >= 60) {
        alert('59초를 초과해 입력하실 수 없습니다.')
        btnSec.value = 59;
        timeSec = 59;
    }
    
    timeMin = parseInt(btnMin.value);
    if (btnMin.value >= 60) {
        alert('59분을 초과해 입력하실 수 없습니다.')
        btnMin.value = 59;
        timeMin = 59;
    }

    timeHrs = parseInt(btnHrs.value);
    if (btnHrs.value >= 100) {
        alert('99시간을 초과해 입력하실 수 없습니다.')
        btnHrs.value = 59;
        timeHrsbtnHrs = 59;
    }

    time = parseInt(btnSec.value) + parseInt(btnMin.value * 60) + parseInt(btnHrs.value * 3600);

    if (btnSec.value !== '00' || btnMin.value !== '00' || btnHrs.value !== '00') {
        btnStart.classList.add('active');
        btnReset.classList.add('active');
        setBtn()
    }
}
    
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