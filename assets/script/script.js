//Setting global variables 
let hsBtn = document.querySelector('#high-score');
let currHS = document.querySelector('#curr-leader');
let timeRemaining = document.querySelector('#time');
let testArea = document.querySelector('#test-wrapper');
let card = document.querySelector('#cardWrapper');
let q = document.querySelector('#Q');
let prompt = document.querySelector('#prompt');
let btns = document.querySelector('#btns');
let start = document.querySelector('#start');
let tracker = [0,0];
let timeLeft = 60;
let timeInterval;

//Question pool pulled from https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
//More questions could be added without changing the function of the page
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

//The following code pulls the local storage and if nothing exists, it creates a high score object
if(!JSON.parse(localStorage.getItem('highScore'))){
  let highScore = [
    {
    "int": "New Player",
    "score": 0
    }
  ];
  localStorage.setItem('highScore', JSON.stringify(highScore));
};

//Setting the starting screen display for the remaining time
timeRemaining.innerText = "60";

//The following code calls the local storage and presents the current high score leader 
highScore = JSON.parse(localStorage.getItem('highScore'));
currHS.innerText = "Current Leader: "+ highScore[0]["int"];

//This event listener monitors the High Score button and calls the score screen
hsBtn.addEventListener("click", scoreScreen);

//This event listener calls the main function of the page - beginning the quiz and starting the counter
start.addEventListener("click", function(){

  //This is the countdown timer - I had a hell of a time trying to figure out where to put this so it didn't get stuck in the question loop!
  timeInterval = setInterval(function() {
    if (timeLeft > 1){
      timeRemaining.innerText = timeLeft;
      timeLeft--;
    }else{
      clearInterval(timeInterval);
      timeRemaining.innerText = "END";
      endSeries(tracker[0], tracker[1]);
    }
  }, 1000);

  //Calling the main function to begin the quiz, it is fed the tracker array that tracks [0] the question, and [1] the score
  main(tracker[0], tracker[1]);
});

//This is the main function that helps iterate through the questions, it checks if all the questions have been asked and then points to the endSeries() function
function main(i, score){
    if(questions[i]){
    newQuestion(i);
    select(i, score);
  //This else if, prevents calling the endSeries() twice!
  }else if(timeLeft <= 0){
    return;
  }else{
    endSeries(i, score)
  }
};

//This code clears all the children of the btns div
function clearBTNS(){
  btns.innerHTML = "";
};

//This following function generates and appends each new question
function newQuestion (i){
  q.innerText = questions[i]["Q"];

  //I have to clear the old items off the div
  prompt.remove();
  start.remove();
  clearBTNS();

  //Each question is a 4-part multiple choice question
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
  
  //Return nothing back to main for the answer selection function
  return;
};

//https://www.w3schools.com/js/js_htmldom_eventlistener.asp
//When passing parameter values, use an "anonymous function" that calls the specified function with the parameters
//element.addEventListener("click", function(){ myFunction(p1, p2); });
//Like WTF JS - just pass a parameter!

//This function listens for each answer button click then points to a specific function to decide if the answer is correct or not
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

//This following 4 functions decide if a selected answer is correct or incorrect, iterates to the next question counter, and if an incorrect answer is selected reduces the amount of time remaining
//This probably could have been coded in a loop if I had more time
function checkA(i, currScore){
  if(questions[i]["A"][0]){
    currScore++;
    i++;
    return [i, currScore];
  }else{
    timeLeft = timeLeft - 20;
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
    timeLeft = timeLeft - 20;
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
    timeLeft = timeLeft - 20;
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
    timeLeft = timeLeft - 20;
    i++;
    return [i, currScore];
  }
};

//This function takes the scores at the end of the quiz (or at the end of time), and asks the user to log their initials in the leader board
function endSeries(i, finalScore){
  clearInterval(timeInterval);
  timeRemaining.innerText = "END";

  let br = document.createElement("br");

  q.innerText = "Your Final Score is: " + finalScore +" out of a possible " + i + ".";

  clearBTNS();

  //You can hear it - Excellent!
  if((finalScore/questions.length)*100 == 100){
    let excellent = document.createElement("img");
    excellent.setAttribute("id", "excellent");
    excellent.setAttribute("src", "./images/excellent.jpg");
    excellent.setAttribute("alt", "excellent");
    excellent.setAttribute("class", "img-fluid rounded mx-auto d-block"); 
    btns.appendChild(excellent);
    btns.appendChild(br);
  }

  let form = document.createElement("form");
  form.setAttribute("id", "form");
  let label = document.createElement("label");
  label.setAttribute("for", "int");
  label.innerText = "Enter your initials, and save your score:";

  let input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("id", "int");
  input.setAttribute("name", "init");
  input.setAttribute("placeholder", "INT");
  input.setAttribute("size", "3");
  input.setAttribute("class", "m-2");
  let submit = document.createElement("input");
  submit.setAttribute("id", "submit");
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

  //Event listener to submit the form, since I used a submit type, I had to prevent Default
  submit.addEventListener("click", function(){
    event.preventDefault();
    saveScore(initials.value.trim(), finalScore);
  });
}

//This function takes the score and initials, then pushes and sorts the high score object
function saveScore(int, score){

  if(highScore[0]["int"] === "New Player"){
    highScore.pop();
  };

  let newScore = [];
  newScore = {"int": int, "score": score};

  //push to new object to the array
  highScore.push(newScore);

  //Sort the array 
  highScore.sort((a, b) => b.score - a.score);

  //Store the new array into local storage
  localStorage.setItem('highScore', JSON.stringify(highScore));

  //calls the end function to see the leader board and retake the quiz
  scoreScreen();
};

//Final leader board screen
function scoreScreen(){

  q.innerText = "High Scores";

  //Clears the card div
  prompt.remove();
  start.remove();

  //depending on how you ended the quiz different items my still be left
  let form = document.querySelector("#form");
  if(form){
    form.remove();
  };

  let submit= document.querySelector("#submit");
  if(submit){
    submit.remove();
  };

  let img = document.querySelector("#excellent");
  if(img){
    img.remove();
  };

  clearBTNS();

  //Create and append the leader board list  
  let rankList = document.createElement("ul");
  btns.appendChild(rankList);

  highScore.forEach((e) => {
    let ranking = document.createElement("li");
    ranking.innerText = "Initials: " + e["int"] + " Score: " + e["score"];
    rankList.appendChild(ranking);
  });

  let retake = document.createElement("button");
  retake.setAttribute("type", "button");
  retake.setAttribute("class", "btn bg-dark rounded btn-outline-secondary text-white w-100 m-1");
  retake.innerText = "Retake Quiz";
  btns.appendChild(retake);

  //Retake the quiz button simply refreshes the page to the start screen again
  retake.addEventListener("click", function(){
    window.location.reload();
  });
};
