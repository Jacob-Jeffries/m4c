let hsBtn = document.querySelector('#high-score');
let currHS = document.querySelector('#curr-leader');
let timeRemaining = document.querySelector('#time');
let testArea = document.querySelector('#test-wrapper');
let start = document.querySelector('#start');

let highScore = localStorage.getItem('highScore');

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
    "Q": 'What is the correct JavaScript syntax to change the content of the HTML element below?\n<p id="demo">This is a demonstration.</p>',
    "A": [true, 'document.getElementById("demo").innerHTML = "Hello World!"'],
    "B": [false, 'document.getElement("p").innerHTML = "Hello World!"'],
    "C": [false, 'document.GetElementByName("p").innerHTML = "Hello World!"'],
    "D": [false, '#demo.innerHTML = "Hello World!"']
  }
];

