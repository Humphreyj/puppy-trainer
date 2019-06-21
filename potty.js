//DOM ELEMENTS
const fed = document.getElementById('fed'),
    watered = document.getElementById('watered'),
    success1 = document.getElementById('success1'),
    success2 = document.getElementById('success2'),
    accident1 = document.getElementById('accident1'),
    accident2 = document.getElementById('accident2'),
    countdown = document.getElementById('countdown'),
    log = document.getElementById('log'),
    timeButtons = document.getElementById('timeButtons'),
    addFive = document.getElementById('addFive'),
    addTen = document.getElementById('addTen'),
    //Used for outputting succ/acc
    succ = document.getElementById('succ'),
    acc = document.getElementById('acc');
    //Used for outputting succ/acc

//DOM ELEMENTS

//VARIABLES
let petName = 'Dot',
    history = [], //where the log data is stored.
    //finding average pottyTimes
    outsideArr = [],
    difference,
    avg,
    //finding average pottyTimes
    startTime = 0,
    markedTime = 0,
    timeLeft = 0,
    //variables for getDate function
    today,
    day,
    hour,
    minutes,
    sec,
    now,
    //timer
    countdownTime,
    //timer
    //variables for getDate function
    currentDate = '',
    amPM,
    alarmTone = new Audio('./audio/you-have-new-message.mp3'),
    //Used for outputting succ/acc
    successes = 0,
    accidents = 0;

    //Used for outputting succ/acc;
//VARIABLES


//getDate Function
function getDate() {
    countdown.innerText === '' ? timeButtons.style.display = 'none' : timeButtons.style.display = 'block';
    today = new Date(),
        month = today.getMonth(),
        day = today.getDate(),
        year = today.getFullYear(),
        hour = today.getHours(),
        minutes = today.getMinutes(),
        sec = today.getSeconds(),
        now = Math.floor((Date.now() / 1000));
    //get AM or PM
    amPm = hour >= 12 ? 'PM' : 'AM';
    //get AM or PM
    //12Hr Format
    hour = hour % 12 || 12
    //12Hr Format
    //console.log(day,hour,minutes,sec)

    setTimeout(getDate, 1000);
}
//getDate Function


//LOG DATE FUNCTION
function logDate(str) {
    let t = document.createElement('P');
    let history2;
    t.className = 'log-data';
    t.innerText = str;
    currentDate = new Date();
    history.push(str);
    console.log(history);
    log.prepend(t);
}
//LOG DATE FUNCTION

//LOG FED FUNCTION
function logFed() {
    logDate(` ${month}-${day}-${year} ${petName} was fed at ${hour}:${minutes}:${sec} ${amPm}`);
    markedTime = now;
    updateTimeLeft();
    timer(avg);
    
}
//LOG FED FUNCTION

//LOG Watered FUNCTION
function logWatered() {
    logDate(` ${month}-${day}-${year} ${petName} was watered at ${hour}:${minutes}:${sec} ${amPm}`);
    updateTimeLeft();
    markedTime = now;
    timer(avg);
    console.log(startTime);
}
//LOG FED FUNCTION

//LOG Success FUNCTION
function logSuccess() {
    logDate(`${month}-${day}-${year} ${petName} was successful at ${hour}:${minutes}:${sec} ${amPm}`);
    markedTime = now;
    updateTimeLeft();
    timer(avg);
    successes +=1;
    succ.innerText = successes;
}
//LOG Success FUNCTION

//LOG Accident FUNCTION
function logAccident() {
    logDate(`${month}-${day}-${year} ${petName} had an accident at ${hour}:${minutes}:${sec} ${amPm}`);
    markedTime = now;
    updateTimeLeft();
    timer(avg);
    accidents +=1;
    acc.innerText = accidents;
}

//LOG Accident FUNCTION

//average potty time function

function getPottyTime(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += outsideArr[i];
    }
    avg = total / arr.length;
    console.log(Math.floor(avg))
    return Math.floor(avg);
}
//average potty time function


function updateTimeLeft() {

    if (startTime === 0) {
        startTime = now;
        timeLeft = 300;
        
    } else {
        timeLeft = markedTime - startTime;
    }
    outsideArr.push(timeLeft);
    getPottyTime(outsideArr);
    console.log(outsideArr);
    timer(timeLeft);
    startReset();
}

function startReset() {
    startTime = markedTime;
    console.log({startTime})
}


//Timer function
function timer(seconds) {

    clearInterval(countdownTime);
    const current = Date.now();
    const then = current + seconds * 1000;
    displayTimeLeft(seconds);

    countdownTime = setInterval(() => {
        let secondsLeft = Math.round((then - Date.now()) / 1000);


        //check if the timer should stop.
        if (secondsLeft === 1) {
            alarmTone.play();
            countdown.innerText = `Take ${petName} Outside!`
        } else if (secondsLeft < 0) {
            alarmTone.pause();
        }
        //check if the timer should stop.

        //display it
        displayTimeLeft(secondsLeft);
    }, 1000);

}

function displayTimeLeft(seconds) {

    const minutes1 = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;

    const display = `Take ${petName} out in ${minutes1}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    minutes1 > 1000 ? countdown.innerText = `Gathering ${petName}'s data...` : countdown.innerText = display;
    //console.log({minutes1, remainderSeconds});
    seconds < 0 ? countdown.innerText = `Clock is running!` : countdown.innerText = display;
}

function addFiveMin() {
 avg += 300;
 alert('works')
}
//Timer function
//EVENT LISTENERS
fed.addEventListener('click', logFed);
watered.addEventListener('click', logWatered);
success1.addEventListener('click', logSuccess);
success2.addEventListener('click', logSuccess);
accident1.addEventListener('click', logAccident);
accident2.addEventListener('click', logAccident);
addFive.addEventListener('click', addFiveMin);
addTen.addEventListener('click', addTen);
//EVENT LISTENERS
//Run Zone
getDate()
//Run Zone