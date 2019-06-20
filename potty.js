//DOM ELEMENTS
	const fed = document.getElementById('fed'),
		  success = document.getElementById('success'),
		  accident = document.getElementById('accident'),
		  countdown = document.getElementById('countdown')
		  log = document.getElementById('log');

//DOM ELEMENTS

//VARIABLES
 let petName = 'Dot',
 	 history = [],//where the log data is stored.
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
 	 alarmTone = new Audio('./audio/you-have-new-message.mp3');
//VARIABLES


//getDate Function
function getDate()  {
	today = new Date(),
	month = today.getMonth(),
	day = today.getDate(),
	year = today.getFullYear(),
	hour = today.getHours(),
	minutes = today.getMinutes(),
	sec = today.getSeconds(),
	now = Math.floor( (Date.now()/ 1000));
	//get AM or PM
    amPm = hour >= 12? 'PM' : 'AM';
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
		t.className='log-data';
		t.innerText = str;
		currentDate = new Date();
		history.push(str);
		console.log(history);
		log.prepend(t);
	}
//LOG DATE FUNCTION

//LOG FED FUNCTION
	function logFed() {
		logDate(` ${month},${day},${year} ${petName} was fed at ${hour}:${minutes}:${sec} ${amPm}`);
		if(startTime === 0) {
			countdown.innerText = `Gathering ${petName}'s data...`;
			startTime = now;
		}
		
		
	 	console.log(startTime);
	}
//LOG FED FUNCTION

//LOG Success FUNCTION
	function logSuccess() {
		logDate(`${month},${day},${year} ${petName} was successful at ${hour}:${minutes}:${sec} ${amPm}`);
		markedTime = now;
		updateTimeLeft();
	}
//LOG Success FUNCTION

//LOG Accident FUNCTION
	function logAccident() {
		logDate(`${month},${day},${year} ${petName} had an accident at ${hour}:${minutes}:${sec} ${amPm}`);
		markedTime = now;
		updateTimeLeft();
	}

	function updateTimeLeft() {
		timeLeft = markedTime - startTime;

		if(startTime === 0) {
			startTime = now;
			countdown.innerText = `Gathering ${petName}'s data...`;
		}else if(timeLeft > 0) {
			startTime = now;
			//resets start time if a timer is already running. 
		}

		

		console.log(startTime);
		timer(timeLeft);
	}
//LOG Accident FUNCTION

//Timer function
function timer(seconds) {

	clearInterval(countdownTime);
	const current  = Date.now();
	const then = current + seconds  * 1000;
	displayTimeLeft(seconds);
	
	countdownTime = setInterval(() => {
		let secondsLeft = Math.round((then - Date.now()) /1000);

		//check if the timer should stop.
		if(secondsLeft < .5) {
			alarmTone.play();
			countdown.innerText = `Take ${petName} Outside!`
		}
		if(secondsLeft < 0) {
			clearInterval(countdownTime);
			return;
		}
		//check if the timer should stop.

		//display it
		displayTimeLeft(secondsLeft);
	},1000);
}

function displayTimeLeft(seconds) {
	const minutes1 = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `Take ${petName} out in ${minutes1}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`
	minutes1 > 1000 ? countdown.innerText = `Gathering ${petName}'s data...` : countdown.innerText = display;;
	

	//console.log({minutes1, remainderSeconds});

}

//EVENT LISTENERS
fed.addEventListener('click', logFed);
success.addEventListener('click', logSuccess);
accident.addEventListener('click', logAccident);
//EVENT LISTENERS
//Run Zone
 getDate()
//Run Zone