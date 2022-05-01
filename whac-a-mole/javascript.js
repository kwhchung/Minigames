let score = 0;
let count = 0;
const map = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
const scores = [1, 5, 10];
const types = ["red", "yellow", "blue"];
for(let i = 0; i < 9; i ++){
  document.getElementsByTagName("span")[i].style = "top: 101%";
}
setInterval(appear, 1000);

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
  }while(map[pos] > -1);
  let type = Math.floor(Math.random() * 3);
  map[pos] = type;
  document.getElementsByTagName("span")[pos].style = "top: 0; transition: top 0.3s; background-color: " + types[type] + ";";
  count ++;
  setTimeout(function(){disappear(pos);}, 2000);
}

function disappear(i){
  document.getElementsByTagName("span")[i].style = "top: 101%; transition: top 0.3s; background-color: " + types[map[i]] + ";";
  map[i] = -1;
}

function hit(i){
  if(map[i] > -1){
    document.getElementsByTagName("span")[i].style = "top: 101%;";
    score += scores[map[i]];
    document.getElementById("score").innerHTML = "Score: " + score;
    setTimeout(function(){map[i] = -1;}, 2000);
  }
}

function restart(){
  score = 0;
  document.getElementById("score").innerHTML = "Score: " + score;
  for(let i = 0; i < 9; i ++){
    map[i] = -1;
    document.getElementsByTagName("span")[i].style = "top: 101%";
  }
}
