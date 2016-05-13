/// <reference path='../typings/jquery/jquery.d.ts'/>

let startTime:number;
let timeAlreadyUsed:number = 0;
let time:number = 1500;

function timer() {
  startTime = Date.now();
  window.setInterval(function() {
    postTimeActive();
  }, 1000);

}

function postTime(div:string){
    var secondsLeft = time - ((Date.now() - startTime + timeAlreadyUsed) / 1000);
    var countInMin = Math.floor(secondsLeft / 60);
    var countInSec = Math.floor(secondsLeft % 60);
    if(countInMin <= 0 && countInSec <= 0){
      $(div).text("Done");
    }else{
      $(div).text(countInMin + ":" + doubleDigitFormat(countInSec));
    }
}

function postTimeActive(){
  postTime('#time');
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
  startTime = Date.now()
  timeAlreadyUsed = 0;
  postTime('#stoptime');
}

function add() {
  time += 300;
  refreshPomodoroTime();
  postTimeActive();
}

function refreshPomodoroTime() {
  $('#pomodorotime').html('&nbsp;&nbsp;&nbsp;' + time / 60  + " Minutes" + '&nbsp;&nbsp;&nbsp;');
}

function sub() {
  time -= 300;
  refreshPomodoroTime();
  postTimeActive();
}

$(()=>{
  refreshPomodoroTime();
  timer();
  resetTimer();
})
