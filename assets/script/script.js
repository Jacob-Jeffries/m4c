let hsBtn = document.querySelector('#high-score');
let currHS = document.querySelector('#curr-leader');
let timeRemaining = document.querySelector('#time');
let testArea = document.querySelector('#test-wrapper');
let q = document.querySelector('#Q');
let prompt = document.querySelector('#prompt');
let btns = document.querySelector('#btns');
let start = document.querySelector('#start');

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

console.log(questions[0]["Q"]);

let highScore = localStorage.getItem('highScore');

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

function selectAnswer(currScore){


};


function main(){

  let i = 1;
  let currScore = 0;

  newQuestion(i);
  selectAnswer(currScore);
};

start.addEventListener("click", main);
