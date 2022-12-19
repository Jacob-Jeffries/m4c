let hsBtn = document.querySelector('#high-score');
let currHS = document.querySelector('#curr-leader');
let timeRemaining = document.querySelector('#time');
let testArea = document.querySelector('#test-wrapper');
let q = document.querySelector('#Q');
let prompt = document.querySelector('#prompt');
let btns = document.querySelector('#btns');
let start = document.querySelector('#start');
let tracker = [0,0];

//Question pool pulled from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
let questions = [
  {
    "Q": 'Inside which HTML element do we put the Javascript?',
    "A": [false, '<javascript>'],
    "B": [false, '<js>'],
    "C": [true, '<script>'],
    "D": [false, '<scripting>']
  },
  {
    "Q": "Where is the correct place to insert a JavaScript?",
    "A": [false, "Both in the <head> section and the <body> section."],
    "B": [false, "At the top of the <body> section."],
    "C": [false, "In the <head> section."],
    "D": [true, "At the bottom of the <body> section."]
  },
  {
    "Q": 'What is the correct JavaScript syntax to change the content of the HTML element below?\n\n<p id="demo">This is a demonstration.</p>',
    "A": [true, 'document.getElementById("demo").innerHTML = "Hello World!"'],
    "B": [false, 'document.getElement("p").innerHTML = "Hello World!"'],
    "C": [false, 'document.GetElementByName("p").innerHTML = "Hello World!"'],
    "D": [false, '#demo.innerHTML = "Hello World!"']
  }
];

if(!JSON.parse(localStorage.getItem('highScore'))){
  let highScore = [
    {
    "int": "New Player",
    "score": 0
    }
  ];
  localStorage.setItem('highScore', JSON.stringify(highScore));
};

highScore = JSON.parse(localStorage.getItem('highScore'));
currHS.innerText = "Current Leader: "+ highScore[0]["int"];


start.addEventListener("click", function(){
  main(tracker[0], tracker[1]);
});

function main(i, score){
  
  if(questions[i]){
    newQuestion(i);
    select(i, score);
  }else{
    endSeries(i, score)
  }

};

function removeBtns(){
  let BtnA = document.querySelector('#A');
  let BtnB = document.querySelector('#B');
  let BtnC = document.querySelector('#C');
  let BtnD = document.querySelector('#D');

  if(BtnA){
    BtnA.remove();
  }

  if(BtnB){
    BtnB.remove();
  }

  if(BtnC){
    BtnC.remove();
  }

  if(BtnD){
    BtnD.remove();
  }
};

function newQuestion (i){
  q.innerText = questions[i]["Q"];
  prompt.style.display = "none";
  start.style.display = "none";

  removeBtns();

  let btnA = document.createElement("button");
    btnA.setAttribute("type", "button");
    btnA.setAttribute("id", "A");
    btnA.setAttribute("class", "btn bg-dark rounded btn-outline-secondary text-white w-100 m-1");
    btnA.innerText = questions[i]["A"][1];
    btns.appendChild(btnA);

  let btnB = document.createElement("button");
    btnB.setAttribute("type", "button");
    btnB.setAttribute("id", "B");
    btnB.setAttribute("class", "btn bg-dark rounded btn-outline-secondary text-white w-100 m-1");
    btnB.innerText = questions[i]["B"][1];
    btns.appendChild(btnB);

  let btnC = document.createElement("button");
    btnC.setAttribute("type", "button");
    btnC.setAttribute("id", "C");
    btnC.setAttribute("class", "btn bg-dark rounded btn-outline-secondary text-white w-100 m-1");
    btnC.innerText = questions[i]["C"][1];
    btns.appendChild(btnC);

  let btnD = document.createElement("button");
    btnD.setAttribute("type", "button");
    btnD.setAttribute("id", "D");
    btnD.setAttribute("class", "btn bg-dark rounded btn-outline-secondary text-white w-100 m-1");
    btnD.innerText = questions[i]["D"][1];
    btns.appendChild(btnD);
    
  return;
};

//https://www.w3schools.com/js/js_htmldom_eventlistener.asp
//When passing parameter values, use an "anonymous function" that calls the specified function with the parameters
//element.addEventListener("click", function(){ myFunction(p1, p2); });
//Like WTF JS - just pass a parameter!

function select(i, score){

  let btnA = document.querySelector('#A');
  let btnB = document.querySelector('#B');
  let btnC = document.querySelector('#C');
  let btnD = document.querySelector('#D');

  btnA.addEventListener("click", function(){
    tracker = checkA(i, score);
    console.log(tracker);
    main(tracker[0], tracker[1]);
  });

  btnB.addEventListener("click", function(){
    tracker = checkB(i, score);
    console.log(tracker);
    main(tracker[0], tracker[1]);
  });

  btnC.addEventListener("click", function(){
    tracker = checkC(i, score);
    console.log(tracker);
    main(tracker[0], tracker[1]);
  });

  btnD.addEventListener("click", function(){
    tracker = checkD(i, score);
    console.log(tracker);
    main(tracker[0], tracker[1]);
  });
};

function checkA(i, currScore){
  if(questions[i]["A"][0]){
    currScore++;
    i++;
    return [i, currScore];
  }else{
    i++;
    return [i, currScore];
  }
};

function checkB(i, currScore){
  if(questions[i]["B"][0]){
    currScore++;
    i++;
    return [i, currScore];
  }else{
    i++;
    return [i, currScore];
  }
};

function checkC(i, currScore){
  if(questions[i]["C"][0]){
    currScore++;
    i++;
    return [i, currScore];
  }else{
    i++;
    return [i, currScore];
  }
};

function checkD(i, currScore){
  if(questions[i]["D"][0]){
    currScore++;
    i++;
    return [i, currScore];
  }else{
    i++;
    return [i, currScore];
  }
};

function endSeries(i, finalScore){

  let br = document.createElement("br");

  removeBtns();
  q.innerText = "Your Final Score is: " + finalScore +" out of a possible " + i + ".";

  if((finalScore/i)*100 == 100){
    let excellent = document.createElement("img");
    excellent.setAttribute("src", "./images/excellent.jpg");
    excellent.setAttribute("alt", "excellent");
    excellent.setAttribute("class", "img-fluid rounded mx-auto d-block"); 
    btns.appendChild(excellent);
    btns.appendChild(br);
  }

  let form = document.createElement("form");
  let label = document.createElement("label");
  label.setAttribute("for", "int");
  label.innerText = "Enter your initials, and save your score:";

  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "int");
  input.setAttribute("name", "init");
  input.setAttribute("placeholder", "JWJ");
  input.setAttribute("size", "3");
  input.setAttribute("class", "m-2");
  let submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Submit Score");
  submit.setAttribute("class", "btn bg-dark rounded btn-outline-secondary text-white w-100 m-1");
  btns.appendChild(br);
  btns.appendChild(br);
  btns.appendChild(form);
  form.appendChild(label);
  form.appendChild(br);
  form.appendChild(input);
  form.appendChild(submit);

  let initials = document.querySelector('#int');


  submit.addEventListener("click", function(){
    event.preventDefault();
    saveScore(initials.value.trim(), finalScore);
  });
}
function loadScore(){
  let highScore = localStorage.getItem('highScore');
};

function saveScore(int, score){

  let newScore = [];
  newScore = {"int": int, "score": score};
  highScore.push(newScore);
  console.log(highScore);

  highScore.sort((a, b) => b.score - a.score);
  console.log(highScore);

  localStorage.setItem('highScore', JSON.stringify(highScore));

  scoreScreen();
};



function scoreScreen(){
};
