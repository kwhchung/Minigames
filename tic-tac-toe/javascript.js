const map = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function gameRound(i, j){
  map[i][j] = 1;
  document.getElementsByTagName("button")[i * 3 + j].innerHTML = "<img src = 'images/cross.png' width = '100%' height = '100%'>";
  document.getElementsByTagName("button")[i * 3 + j].disabled = true;
  if(win(1)){
    document.getElementById("result").innerHTML = "You win!";
    for(let i = 0; i < 9; i ++){
      document.getElementsByTagName("button")[i].disabled = true;
    }
    return;
  }
  if(draw()){
    document.getElementById("result").innerHTML = "Draw";
    for(let i = 0; i < 9; i ++){
      document.getElementsByTagName("button")[i].disabled = true;
    }
    return;
  }
  let pos = computer();
  map[pos[0]][pos[1]] = 2;
  document.getElementsByTagName("button")[pos[0] * 3 + pos[1]].innerHTML = "<img src = 'images/circle.png' width = '100%' height = '100%'>";
  document.getElementsByTagName("button")[pos[0] * 3 + pos[1]].disabled = true;
  if(win(2)){
    document.getElementById("result").innerHTML = "You lose!";
    for(let i = 0; i < 9; i ++){
      document.getElementsByTagName("button")[i].disabled = true;
    }
  }
}

function win(n){
  for(let i = 0; i < 3; i ++){
    if(map[i][0] == n && map[i][1] == n && map[i][2] == n){
      return true;
    }
    if(map[0][i] == n && map[1][i] == n && map[2][i] == n){
      return true;
    }
  }
  if(map[0][0] == n && map[1][1] == n && map[2][2] == n){
    return true;
  }
  if(map[0][2] == n && map[1][1] == n && map[2][0] == n){
    return true;
  }
  return false;
}

function computer(){
  let count = 0;
  for(let i = 0; i < 3; i ++){
    count = 0;
    for(let j = 0; j < 3; j ++){
      if(map[i][j] == 2){
        count += j + 2;
      }
    }
    if(count > 4 && map[i][7 - count] == 0){
      return [i, 7 - count];
    }
  }
  for(let i = 0; i < 3; i ++){
    count = 0;
    for(let j = 0; j < 3; j ++){
      if(map[j][i] == 2){
        count += j + 2;
      }
    }
    if(count > 4 && map[7 - count][i] == 0){
      return [7 - count, i];
    }
  }
  count = 0;
  for(let i = 0; i < 3; i ++){
    if(map[i][i] == 2){
      count += i + 2;
    }
  }
  if(count > 4 && map[7 - count][7 - count] == 0){
    return [7 - count, 7 - count];
  }
  count = 0;
  for(let i = 0; i < 3; i ++){
    if(map[i][2 - i] == 2){
      count += i + 2;
    }
  }
  if(count > 4 && map[7 - count][count - 5] == 0){
    return [7 - count, count - 5];
  }
  for(let i = 0; i < 3; i ++){
    count = 0;
    for(let j = 0; j < 3; j ++){
      if(map[i][j] == 1){
        count += j + 2;
      }
    }
    if(count > 4 && map[i][7 - count] == 0){
      return [i, 7 - count];
    }
  }
  for(let i = 0; i < 3; i ++){
    count = 0;
    for(let j = 0; j < 3; j ++){
      if(map[j][i] == 1){
        count += j + 2;
      }
    }
    if(count > 4 && map[7 - count][i] == 0){
      return [7 - count, i];
    }
  }
  count = 0;
  for(let i = 0; i < 3; i ++){
    if(map[i][i] == 1){
      count += i + 2;
    }
  }
  if(count > 4 && map[7 - count][7 - count] == 0){
    return [7 - count, 7 - count];
  }
  count = 0;
  for(let i = 0; i < 3; i ++){
    if(map[i][2 - i] == 1){
      count += i + 2;
    }
  }
  if(count > 4 && map[7 - count][count - 5] == 0){
    return [7 - count, count - 5];
  }
  return [0, 1];
  for(let i = 0; i < 3; i += 2){
    if(map[i][i] == 0){
      return [i, i];
    }
    if(map[i][2 - i] == 0){
      return [i, 2 - i];
    }
  }
  for(let i = 0; i < 3; i ++){
    for(let j = 0; j < 3; j ++){
      if(map[i][j] == 0){
        return [i, j];
      }
    }
  }
}

function draw(){
  let count = 0;
  for(let i = 0; i < 3; i ++){
    for(let j = 0; j < 3; j ++){
      if(map[i][j] == 0){
        count ++;
      }
    }
  }
  if(count == 0){
    return true;
  }
  return false;
}

function restart(){
  for(let i = 0; i < 3; i ++){
    for(let j = 0; j < 3; j ++){
      map[i][j] = 0;
    }
  }
  for(let i = 0; i < 9; i ++){
    document.getElementsByTagName("button")[i].innerHTML = "";
    document.getElementsByTagName("button")[i].disabled = false;
  }
  document.getElementById("result").innerHTML = "";
}
