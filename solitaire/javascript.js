class Card{
  constructor(type, num){
    this.type = type;
    this.num = num;
    this.display = false;
    this.image = "images/" + type + num + ".png";
  }
}

const cards = [];
const types = ["H", "S", "D", "C"];
const deck = [];
const finals = [[], [], [], []];
const stacks = [[], [], [], [], [], [], []];
const picked = [];
const dragged = [-1, -1];
let deckPos = -1;
let dropped = false;

for(let i = 0; i < 4; i ++){
  for(let j = 1; j <= 13; j ++){
    cards.push(new Card(types[i], j));
  }
}
start();

function start(){
  for(let i = 0; i < 7; i ++){
    for(let j = 0; j <= i; j ++){
      let n;
      do{
        n = Math.floor(Math.random() * 52);
      }while(picked.includes(n));
      stacks[i].push(cards[n]);
      picked.push(n);

      if(j == i){
        stacks[j][j].display = true;
      }
      let card;
      if(stacks[i][j].display){
        card = document.createElement("img");
        card.src = stacks[i][j].image;
        card.setAttribute("width", "100%");
        card.setAttribute("height", "100%");
        card.style.position = "absolute";
        card.style.top = (20 * j) + "px";
        card.setAttribute("ondragstart", "drag(" + i + ", " + j + ")");
        card.setAttribute("ondragend", "endDrag()");
      }else{
        card = document.createElement("img");
        card.src = "images/back.png";
        card.setAttribute("width", "100%");
        card.setAttribute("height", "100%");
        card.style.position = "absolute";
        card.style.top = (20 * j) + "px";
        card.setAttribute("draggable", "false");
        card.setAttribute("onclick", "displayCard(" + i + ", " + j + ")");
      }
      document.getElementsByClassName("stack")[i].getElementsByClassName("place")[0].appendChild(card);
      document.getElementsByClassName("droppable")[i].style.height = document.getElementsByClassName("place")[0].offsetHeight * 2 + 20 * (stacks[i].length - 1) + "px";
    }
  }
  for(let i = 0; i < 24; i ++){
    let n;
    do{
      n = Math.floor(Math.random() * 52);
    }while(picked.includes(n));
    deck.push(cards[n]);
    picked.push(n);
  }
  document.getElementById("deck").getElementsByClassName("place")[0].innerHTML = "<img src = 'images/back.png' width = '100%' height = '100%' draggable = 'false'>";
}

function displayDeck(){
  deckPos ++;
  if(deckPos >= 0 && deckPos < deck.length){
    let card = document.createElement("img");
    card.src = deck[deckPos].image;
    card.setAttribute("width", "100%");
    card.setAttribute("height", "100%");
    card.style.position = "absolute";
    card.setAttribute("ondragstart", "drag(-1, " + deckPos + ")");
    card.setAttribute("ondragend", "endDrag()");
    document.getElementById("display").getElementsByClassName("place")[0].appendChild(card);
  }
  if(deckPos == deck.length - 1){
    document.getElementById("deck").getElementsByClassName("place")[0].innerHTML = "";
  }
  if(deckPos == deck.length){
    deckPos = -1;
    document.getElementById("deck").getElementsByClassName("place")[0].innerHTML = "<img src = 'images/back.png' width = '100%' height = '100%' draggable = 'false'>";
    document.getElementById("display").getElementsByClassName("place")[0].innerHTML = "";
  }
}

function displayCard(i, j){
  if(j == stacks[i].length - 1){
    document.getElementsByClassName("stack")[i].getElementsByTagName("img")[j].src = stacks[i][j].image;
    document.getElementsByClassName("stack")[i].getElementsByTagName("img")[j].draggable = "true";
    document.getElementsByClassName("stack")[i].getElementsByTagName("img")[j].setAttribute("ondragstart", "drag(" + i + ", " + j + ")");
    document.getElementsByClassName("stack")[i].getElementsByTagName("img")[j].setAttribute("ondragend", "endDrag()");
    document.getElementsByClassName("stack")[i].getElementsByTagName("img")[j].removeAttribute("onclick");
  }
}

function drag(i, j){
  dragged[0] = i;
  dragged[1] = j;
  if(i > 6){
    document.getElementsByClassName("final")[i - 7].getElementsByTagName("img")[j].style.opacity = "0";
  }else if(i > -1){
    for(let k = j; k < stacks[i].length; k ++){
      document.getElementsByClassName("stack")[i].getElementsByTagName("img")[k].style.opacity = "0";
    }
  }else{
    document.getElementById("display").getElementsByTagName("img")[j].style.opacity = "0";
  }
}

function endDrag(){
  if(dropped){
    dropped = false;
  }else{
    if(dragged[0] > 6){
      document.getElementsByClassName("final")[dragged[0] - 7].getElementsByTagName("img")[dragged[1]].style.opacity = "1";
    }else if(dragged[0] > -1){
      for(let k = dragged[1]; k < stacks[dragged[0]].length; k ++){
        document.getElementsByClassName("stack")[dragged[0]].getElementsByTagName("img")[k].style.opacity = "1";
      }
    }else{
      document.getElementById("display").getElementsByTagName("img")[dragged[1]].style.opacity = "1";
    }
  }
  for(let k = 0; k < 2; k ++){
    dragged[k] = -1;
  }
}

function allowDrop(){
  event.preventDefault();
}

function stackDrop(i){
  let valid = false;
  if(dragged[0] > 6){
    if(stacks[i].length > 0){
      if(finals[dragged[0] - 7][dragged[1]].num == stacks[i][stacks[i].length - 1].num - 1){
        if(finals[dragged[0] - 7][dragged[1]].type == "S" || finals[dragged[0] - 7][dragged[1]].type == "C"){
          if(stacks[i][stacks[i].length - 1].type == "H" || stacks[i][stacks[i].length - 1].type == "D"){
            valid = true;
          }
        }else{
          if(stacks[i][stacks[i].length - 1].type == "S" || stacks[i][stacks[i].length - 1].type == "C"){
            valid = true;
          }
        }
      }
    }else{
      if(finals[dragged[0] - 7][dragged[1]].num == 13){
        valid = true;
      }
    }
    if(valid){
      stacks[i].push(finals[dragged[0] - 7][dragged[1]]);
      finals[dragged[0] - 7].pop();
      document.getElementsByClassName("final")[dragged[0] - 7].getElementsByTagName("img")[dragged[1]].style.top = 20 * (stacks[i].length - 1) + "px";
      document.getElementsByClassName("final")[dragged[0] - 7].getElementsByTagName("img")[dragged[1]].style.opacity = "1";
      document.getElementsByClassName("final")[dragged[0] - 7].getElementsByTagName("img")[dragged[1]].setAttribute("ondragstart", "drag(" + i + ", " + (stacks[i].length - 1) + ")");
      document.getElementsByClassName("stack")[i].getElementsByClassName("place")[0].appendChild(document.getElementsByClassName("final")[dragged[0] - 7].getElementsByTagName("img")[dragged[1]]);
      document.getElementsByClassName("droppable")[i].style.height = document.getElementsByClassName("place")[0].offsetHeight * 2 + 20 * (stacks[i].length - 1) + "px";
      dropped = true;
    }
  }else if(dragged[0] > -1){
    if(stacks[i].length > 0){
      if(stacks[dragged[0]][dragged[1]].num == stacks[i][stacks[i].length - 1].num - 1){
        if(stacks[dragged[0]][dragged[1]].type == "S" || stacks[dragged[0]][dragged[1]].type == "C"){
          if(stacks[i][stacks[i].length - 1].type == "H" || stacks[i][stacks[i].length - 1].type == "D"){
            valid = true;
          }
        }else{
          if(stacks[i][stacks[i].length - 1].type == "S" || stacks[i][stacks[i].length - 1].type == "C"){
            valid = true;
          }
        }
      }
    }else{
      if(stacks[dragged[0]][dragged[1]].num == 13){
        valid = true;
      }
    }
    if(valid){
      let n = stacks[dragged[0]].length
      for(let j = dragged[1]; j < n; j ++){
        stacks[i].push(stacks[dragged[0]][dragged[1]]);
        stacks[dragged[0]].splice(dragged[1], 1);
        document.getElementsByClassName("stack")[dragged[0]].getElementsByTagName("img")[dragged[1]].style.top = 20 * (stacks[i].length - 1) + "px";
        document.getElementsByClassName("stack")[dragged[0]].getElementsByTagName("img")[dragged[1]].style.opacity = "1";
        document.getElementsByClassName("stack")[dragged[0]].getElementsByTagName("img")[dragged[1]].setAttribute("ondragstart", "drag(" + i + ", " + (stacks[i].length - 1) + ")");
        document.getElementsByClassName("stack")[i].getElementsByClassName("place")[0].appendChild(document.getElementsByClassName("stack")[dragged[0]].getElementsByTagName("img")[dragged[1]]);
        document.getElementsByClassName("droppable")[i].style.height = document.getElementsByClassName("place")[0].offsetHeight * 2 + 20 * (stacks[i].length - 1) + "px";
      }
      dropped = true;
    }
  }else{
    if(stacks[i].length > 0){
      if(deck[dragged[1]].num == stacks[i][stacks[i].length - 1].num - 1){
        if(deck[dragged[1]].type == "S" || deck[dragged[1]].type == "C"){
          if(stacks[i][stacks[i].length - 1].type == "H" || stacks[i][stacks[i].length - 1].type == "D"){
            valid = true;
          }
        }else{
          if(stacks[i][stacks[i].length - 1].type == "S" || stacks[i][stacks[i].length - 1].type == "C"){
            valid = true;
          }
        }
      }
    }else{
      if(deck[dragged[1]].num == 13){
        valid = true;
      }
    }
    if(valid){
      stacks[i].push(deck[dragged[1]]);
      deck.splice(dragged[1], 1);
      deckPos --;
      document.getElementById("display").getElementsByTagName("img")[dragged[1]].style.top = 20 * (stacks[i].length - 1) + "px";
      document.getElementById("display").getElementsByTagName("img")[dragged[1]].style.opacity = "1";
      document.getElementById("display").getElementsByTagName("img")[dragged[1]].setAttribute("ondragstart", "drag(" + i + ", " + (stacks[i].length - 1) + ")");
      document.getElementsByClassName("stack")[i].getElementsByClassName("place")[0].appendChild(document.getElementById("display").getElementsByTagName("img")[dragged[1]]);
      document.getElementsByClassName("droppable")[i].style.height = document.getElementsByClassName("place")[0].offsetHeight * 2 + 20 * (stacks[i].length - 1) + "px";
      dropped = true;
    }
  }
}

function finalDrop(i){
  let valid = false;
  if(dragged[0] > 6){
    if(finals[i].length > 0){
      if(finals[dragged[0] - 7][dragged[1]].type == finals[i][finals[i].length - 1].type && finals[dragged[0] - 7][dragged[1]].num == finals[i][finals[i].length - 1].num + 1){
        valid = true;
      }
    }else{
      if(finals[dragged[0] - 7][dragged[1]].num == 1){
        valid = true;
      }
    }
    if(valid){
      finals[i].push(finals[dragged[0] - 7][dragged[1]]);
      finals[dragged[0] - 7].pop();
      deckPos --;
      document.getElementsByClassName("final")[dragged[0] - 7].getElementsByTagName("img")[dragged[1]].style.top = "0";
      document.getElementsByClassName("final")[dragged[0] - 7].getElementsByTagName("img")[dragged[1]].style.opacity = "1";
      document.getElementsByClassName("final")[dragged[0] - 7].getElementsByTagName("img")[dragged[1]].setAttribute("ondragstart", "drag(" + (i + 7) + ", " + (finals[i].length - 1) + ")");
      document.getElementsByClassName("final")[i].getElementsByClassName("place")[0].appendChild(document.getElementsByClassName("final")[dragged[0] - 7].getElementsByTagName("img")[dragged[1]]);
      dropped = true;
    }
  }else if(dragged[0] > -1){
    if(dragged[1] == stacks[dragged[0]].length - 1){
      if(finals[i].length > 0){
        if(stacks[dragged[0]][dragged[1]].type == finals[i][finals[i].length - 1].type && stacks[dragged[0]][dragged[1]].num == finals[i][finals[i].length - 1].num + 1){
          valid = true;
        }
      }else{
        if(stacks[dragged[0]][dragged[1]].num == 1){
          valid = true;
        }
      }
    }
    if(valid){
      finals[i].push(stacks[dragged[0]][dragged[1]]);
      stacks[dragged[0]].pop();
      document.getElementsByClassName("stack")[dragged[0]].getElementsByTagName("img")[dragged[1]].style.top = "0";
      document.getElementsByClassName("stack")[dragged[0]].getElementsByTagName("img")[dragged[1]].style.opacity = "1";
      document.getElementsByClassName("stack")[dragged[0]].getElementsByTagName("img")[dragged[1]].setAttribute("ondragstart", "drag(" + (i + 7) + ", " + (finals[i].length - 1) + ")");
      document.getElementsByClassName("final")[i].getElementsByClassName("place")[0].appendChild(document.getElementsByClassName("stack")[dragged[0]].getElementsByTagName("img")[dragged[1]]);
      dropped = true;
    }
  }else{
    if(finals[i].length > 0){
      if(deck[dragged[1]].type == finals[i][finals[i].length - 1].type && deck[dragged[1]].num == finals[i][finals[i].length - 1].num + 1){
        valid = true;
      }
    }else{
      if(deck[dragged[1]].num == 1){
        valid = true;
      }
    }
    if(valid){
      finals[i].push(deck[dragged[1]]);
      deck.splice(dragged[1], 1);
      deckPos --;
      document.getElementById("display").getElementsByTagName("img")[dragged[1]].style.top = "0";
      document.getElementById("display").getElementsByTagName("img")[dragged[1]].style.opacity = "1";
      document.getElementById("display").getElementsByTagName("img")[dragged[1]].setAttribute("ondragstart", "drag(" + (i + 7) + ", " + (finals[i].length - 1) + ")");
      document.getElementsByClassName("final")[i].getElementsByClassName("place")[0].appendChild(document.getElementById("display").getElementsByTagName("img")[dragged[1]]);
      dropped = true;
    }
  }
  if(win()){
    console.log("win");
  }
}

function win(){
  for(let i = 0; i < 4; i ++){
    if(finals[i].length < 13){
      return false;
    }
  }
  return true;
}

function restart(){
  picked.splice(0, picked.length);
  deck.splice(0, deck.length);
  for(let i = 0; i < 52; i ++){
    cards[i].display = false;
    if(i < 13){
      document.getElementsByClassName("place")[i].innerHTML = "";
    }
    if(i < 7){
      stacks[i].splice(0, stacks[i].length);
    }
    if(i < 4){
      finals[i].splice(0, finals[i].length);
    }
  }
  start();
}
