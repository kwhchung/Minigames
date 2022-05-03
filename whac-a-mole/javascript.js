let score = 0;
let seconds = 60;
let difficulty = 0;
const count = [1, 1, 2, 2];
const appearTime = [[1500, 1000, 750], [1000, 750, 500], [1250, 1000, 750], [1000, 750, 500]];
const disappearTime = [2001, 2001, 1501, 1001];
const map = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
const scores = [1, 5, 10];
const types = ["red", "yellow", "blue"];
let timeout = [0, 0, 0, 0, 0, 0, 0, 0, 0];
for(let i = 0; i < 9; i ++){
  document.getElementsByTagName("span")[i].style = "top: 101%";
}
let timeInterval = setInterval(time, 1000);
let appearInterval = setInterval(appear, appearTime[0][0]);

function time(){
  seconds --;
  document.getElementById("time").innerHTML = "Time: " + seconds;
  if(seconds == 40){
    clearInterval(appearInterval);
    appearInterval = setInterval(appear, appearTime[difficulty][1]);
  }else if(seconds == 20){
    clearInterval(appearInterval);
    appearInterval = setInterval(appear, appearTime[difficulty][2]);
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
    let type = Math.floor(Math.random() * 3);
    map[pos] = type;
    document.getElementsByTagName("span")[pos].style = "top: 0; transition: top 0.3s; background-color: " + types[type] + ";";
    timeout[pos] = setTimeout(function(){disappear(pos);}, disappearTime[difficulty]);
  }
}

function disappear(i){
  document.getElementsByTagName("span")[i].style = "top: 101%; transition: top 0.3s; background-color: " + types[map[i]] + ";";
    map[i] = -1;
}

function hit(i){
  if(map[i] > -1){
    clearTimeout(timeout[i]);
    document.getElementsByTagName("span")[i].style = "top: 101%;";
    score += scores[map[i]];
    document.getElementById("score").innerHTML = "Score: " + score;
    map[i] = -2;
    setTimeout(function(){map[i] = -1}, 100);
  }
}

function endGame(){
  clearInterval(timeInterval);
  clearInterval(appearInterval);
  for(let i = 0; i < 9; i ++){
    document.getElementsByTagName("span")[i].style = "top: 101%";
    map[i] = -1;
  }
}

function restart(){
  score = 0;
  seconds = 60;
  for(let i = 0; i < 4; i ++){
    if(document.getElementsByTagName("option")[i].selected == true){
      difficulty = i;
    }
  }
  clearInterval(appearInterval);
  appearInterval = setInterval(appear, appearTime[difficulty][0]);
  clearInterval(timeInterval);
  timeInterval = setInterval(time, 1000);
  document.getElementById("time").innerHTML = "Time: " + seconds;
  document.getElementById("score").innerHTML = "Score: " + score;
  for(let i = 0; i < 9; i ++){
    document.getElementsByTagName("span")[i].style = "top: 101%";
    map[i] = -1;
  }
}
