const btnStart = document.querySelector('.btn-start')
const btnReset = document.querySelector('.btn-reset')
const timeHrs = document.querySelector('.HRS')
const timeMin = document.querySelector('.MIN')
const timeSec = document.querySelector('.SEC')

// timeHrs.addEventListener('click', (e) => {
//     const hrs = timeHrs.innerHTML
//     hrs += 1;
// })


timeSec.addEventListener('click', (e) => {
    timeSec.value = 10
    timeSec.innerHTML = `${timeSec.value}`
    btnStart.classList.add('active')
    btnReset.classList.add('active')

    const imgStart = document.querySelector('.img-start')
    const imgReset = document.querySelector('.img-reset')

    imgStart.setAttribute('src', 'img/icon-start.png')
    imgReset.setAttribute('src', 'img/icon-reset.png')
})

btnStart.addEventListener('click', (e) => {
    setTimeout(function () {
        timeSec.value -= 1
        timeSec.innerHTML = `${timeSec.value}`
    }, 1000)
})