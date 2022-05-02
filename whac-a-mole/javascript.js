let score = 0;
let seconds = 60;
const map = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
const scores = [1, 5, 10];
const types = ["red", "yellow", "blue"];
for(let i = 0; i < 9; i ++){
  document.getElementsByTagName("span")[i].style = "top: 101%";
}
let timeInterval = setInterval(time, 1000);
let appearInterval = setInterval(appear, 1500);

function time(){
  seconds --;
  document.getElementById("time").innerHTML = "Time: " + seconds;
  if(seconds == 40){
    clearInterval(appearInterval);
    appearInterval = setInterval(appear, 1000);
  }else if(seconds == 20){
    clearInterval(appearInterval);
    appearInterval = setInterval(appear, 750);
  }else if(seconds == 0){
    endGame();
  }
}

function appear(){
  let i = 0;
  for(let j = 0; j < 9; j ++){
    if(map[j] == -1){
      i ++;
    }
  }
  if(i == 0){
    return;
  }
  let pos;
  do{
    pos = Math.floor(Math.random() * 9);
  }while(map[pos] != -1);
  let type = Math.floor(Math.random() * 3);
  map[pos] = type;
  document.getElementsByTagName("span")[pos].style = "top: 0; transition: top 0.3s; background-color: " + types[type] + ";";
  setTimeout(function(){disappear(pos);}, 2000);
}

function disappear(i){
  document.getElementsByTagName("span")[i].style = "top: 101%; transition: top 0.3s; background-color: " + types[map[i]] + ";";
  if(map[i] > -1){
    map[i] = -1;
  }
}

function hit(i){
  if(map[i] > -1){
    document.getElementsByTagName("span")[i].style = "top: 101%;";
    score += scores[map[i]];
    document.getElementById("score").innerHTML = "Score: " + score;
    map[i] = -2;
    setTimeout(function(){map[i] = -1;}, 2000);
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
  clearInterval(appearInterval);
  appearInterval = setInterval(appear, 1500);
  clearInterval(timeInterval);
  timeInterval = setInterval(time, 1000);
  document.getElementById("time").innerHTML = "Time: " + seconds;
  document.getElementById("score").innerHTML = "Score: " + score;
  for(let i = 0; i < 9; i ++){
    document.getElementsByTagName("span")[i].style = "top: 101%";
    map[i] = -1;
  }
}
