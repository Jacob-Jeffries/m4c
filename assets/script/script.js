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
    "Q": 'What is the correct JavaScript syntax to change the content of the HTML element below?\n\n<p id="demo">This is a demonstration.</p>',
    "A": [true, 'document.getElementById("demo").innerHTML = "Hello World!"'],
    "B": [false, 'document.getElement("p").innerHTML = "Hello World!"'],
    "C": [false, 'document.GetElementByName("p").innerHTML = "Hello World!"'],
    "D": [false, '#demo.innerHTML = "Hello World!"']
  }
];

let highScore = localStorage.getItem('highScore');

start.addEventListener("click", function(){
  main(tracker[0], tracker[1]);
});

function main(i, score){
  newQuestion(i);
  select(i, score);
};

function newQuestion (i){
  q.innerText = questions[i]["Q"];
    prompt.style.display = "none";
    start.style.display = "none";

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
    currScore = checkA(i, score);
  });

  btnB.addEventListener("click", function(){
    currScore = checkB(i, score);
  });

  btnC.addEventListener("click", function(){
    ret = checkC(i, score);
    console.log(ret);
  });

  btnD.addEventListener("click", function(){
    currScore = checkD(i, score);
  });
};

function checkA(i, currScore){
  if(questions[i]["A"][0]){
    currScore++;
  }else{
    return;
  }
 };

function checkB(i, currScore){
  if(questions[i]["B"][0]){
    currScore++;
    i++;
    return [i, currScore];
  }else{
    return;
  }
  };

function checkC(i, currScore){
  if(questions[i]["C"][0]){
    currScore++;
    i++;
    return [i, currScore];
  }else{
    return;
  }
  };

function checkD(i, currScore){
  if(questions[i]["D"][0]){
    currScore++;
  }else{
    return;
  }
};