/// <reference path='../typings/jquery/jquery.d.ts'/>

let startTime:number;
let timeAlreadyUsed:number = 0;
let alarmGoingOff:boolean = false;
var time = 1300;

function timer() {
  startTime = Date.now();
  window.setInterval(function() {
    postTime('#time');
  }, 1000);

}

function postTime(div:string){
    var secondsLeft = time - ((Date.now() - startTime + timeAlreadyUsed) / 1000);
    var countInMin = Math.floor(secondsLeft / 60);
    var countInSec = Math.floor(secondsLeft % 60);
    if(countInMin <= 0 && countInSec <= 0){
      alarmGoingOff = true;
      $(div).text("-- Done --");
    }else{
      $(div).text(countInMin + ":" + doubleDigitFormat(countInSec));
    }
}

function doubleDigitFormat(x:number):string{
  let formated:string = (x<10)?'0':'';
  return formated + x;
}

function stopTimer() {
  $('#time').attr('id', 'stoptime');
  timeAlreadyUsed = Date.now() - startTime + timeAlreadyUsed;
}

function startTimer() {
  $('#stoptime').attr('id', 'time');
  startTime = Date.now();
}

function resetTimer() {
  stopTimer();
  alarmGoingOff = false;
  startTime = Date.now()
  timeAlreadyUsed = 0;
  postTime('#stoptime');
}

function add5() {
  time += 300;
  refreshPomodoroTime();
}

function refreshPomodoroTime() {
  $('#pomodorotime').html(time / 60  + " minutes");
}

function sub5() {
  time -= 300;
  refreshPomodoroTime();
}

refreshPomodoroTime();
timer();
