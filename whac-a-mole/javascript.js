let score = 0;
let seconds = 60;
let difficulty = 0;
let changeTime = 0;
let startCount = 3;
let startInterval;
let timeInterval;
let appearInterval;
let firstStart = true;
const count = [1, 1, 2, 2];
const appearTime = [[1500, 1250, 1000], [1000, 750, 500], [1250, 1000, 750], [750, 500, 350]];
const disappearTime = [2001, 2001, 1501, 1001];
const map = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
const scores = [1, 5, 10, -10];
const types = ["images/mole1.png", "images/mole2.png", "images/mole3.png", "images/bomb.png"];
const probability = [4, 7, 9, 10];
let timeout = [0, 0, 0, 0, 0, 0, 0, 0, 0];
for(let i = 0; i < 9; i ++){
  document.getElementsByTagName("img")[i].style = "top: 101%";
  document.getElementsByTagName("img")[i].src = types[i];
}


function start(){
  for(let i = 0; i < 4; i ++){
    if(document.getElementsByTagName("option")[i].selected == true){
      difficulty = i;
    }
  }
  document.getElementById("startPage").style = "display: inline-block";
  if(firstStart){
    document.getElementById("start").style = "display: none";
    firstStart = false;
  }
  startInterval = setInterval(startCountdown, 1000);
}

function startCountdown(){
  document.getElementById("startPage").innerHTML = startCount;
  startCount --;
  if(startCount == -1){
    clearInterval(startInterval);
    document.getElementById("startPage").innerHTML = "";
    document.getElementById("startPage").style = "display: none;";
    appearInterval = setInterval(appear, appearTime[difficulty][0]);
    timeInterval = setInterval(time, 1000);
  }
}

function time(){
  seconds --;
  if(seconds < 0){
    seconds = 0;
  }
  document.getElementById("time").innerHTML = "Time: " + seconds;
  if(seconds <= 40 && changeTime == 0){
    clearInterval(appearInterval);
    appearInterval = setInterval(appear, appearTime[difficulty][1]);
    changeTime ++;
  }else if(seconds <= 20 && changeTime == 1){
    clearInterval(appearInterval);
    appearInterval = setInterval(appear, appearTime[difficulty][2]);
    changeTime ++;
  }else if(seconds == 0){
    endGame();
  }
}

function appear(){
  for(let i = 0; i < count[difficulty]; i ++){
    let j = 0;
    for(let k of map){
      if(k == -1){
        j ++;
      }
    }
    if(j == 0){
      return;
    }
    let pos;
    do{
      pos = Math.floor(Math.random() * 9);
    }while(map[pos] != -1);
    let type = Math.floor(Math.random() * 10);
    for(j = 0; j < 4; j ++){
      if(type < probability[j]){
        type = j;
        break;
      }
    }
    map[pos] = type;
    document.getElementsByTagName("img")[pos].src = types[type];
    document.getElementsByTagName("img")[pos].style = "top: 0; transition: top 0.3s;";
    timeout[pos] = setTimeout(function(){disappear(pos);}, disappearTime[difficulty]);
  }
}

function disappear(i){
  document.getElementsByTagName("img")[i].style = "top: 101%; transition: top 0.3s;";
  if(map[i] < 3){
    score --;
    document.getElementById("score").innerHTML = "Score: " + score;
  }
  setTimeout(function(){map[i] = -1}, 300);
}

function hit(i){
  if(map[i] > -1){
    clearTimeout(timeout[i]);
    document.getElementsByTagName("img")[i].style = "top: 101%;";
    score += scores[map[i]];
    document.getElementById("score").innerHTML = "Score: " + score;
    if(map[i] == 3){
      seconds -= 3;
      if(seconds < 0){
        seconds = 0;
      }
      document.getElementById("time").innerHTML = "Time: " + seconds;
    }
    map[i] = -2;
    setTimeout(function(){map[i] = -1}, 100);
  }
}

function endGame(){
  clearInterval(timeInterval);
  clearInterval(appearInterval);
  for(let i = 0; i < 9; i ++){
    document.getElementsByTagName("img")[i].style = "top: 101%";
    map[i] = -1;
    clearTimeout(timeout[i]);
  }
}

function restart(){
  clearInterval(appearInterval);
  clearInterval(timeInterval);
  score = 0;
  seconds = 60;
  changeTime = 0;
  startCount = 3;
  document.getElementById("time").innerHTML = "Time: " + seconds;
  document.getElementById("score").innerHTML = "Score: " + score;
  for(let i = 0; i < 9; i ++){
    document.getElementsByTagName("img")[i].style = "top: 101%";
    map[i] = -1;
    clearTimeout(timeout[i]);
  }
  clearInterval(startInterval);
  start();
}
