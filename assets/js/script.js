// Variables to select elements using the DOM
var currentTimeEl = document.querySelector("#timer");
var timerEl = document.querySelector("#start");
var goToEl = document.querySelector("#go-to");
var questionsEl = document.querySelector("#welcome");
var containerEl = document.querySelector(".container");
var enterEl = document.querySelector(".enter");
var testEl = document.querySelector("#test");
var newDiv = document.querySelector("#newDiv");
var submitEl = document.querySelector("#btn-sub");

goToEl.addEventListener("click", function () {
    window.location.replace("highscores.html");
}) 

// variables will go here 
var score = 0
var questionIndex = 0;

// make an object to hold the questions, choices, and correct answers
var questions = [
    {
        question: "Which of the following is NOT a JavaScript basic data type?",
        choices: ["Number", "Character", "String", "Boolean"],
        answer: "Character"
    },
    {
        question: "What symbol is used for comments in JavaScript?",
        choices: ["//", "<!--", "**", "$"],
        answer: "//"
    },
    {
        question: "What are the looping structures in JavaScript?",
        choices: ["For, If, Else", "While, Meanwhile, Do-while", "For, While, Do-while", "Snap, Crackle, Pop"],
        answer: "For, While, Do-while"
    },
    {
        question: "How can you convert the string of any base to an integer in JavaScript?",
        choices: ["JSON", "parseInt", "innerHTML", "toString"],
        answer: "parseInt"
    },
    {
        question: "What would be the result of 3+2+'7' in JavaScript?",
        choices: ["12", "327", "NaN", "57"],
        answer: "57"
    },

];

var timeLeft = 100;
var initialTime = 0;
var penalty = 10;

var choice = document.createElement("ul");


// Need a timer using setInterval 
timerEl.addEventListener("click", function () {
    if (initialTime === 0) {
        initialTime = setInterval(function () {
            timeLeft--;
            currentTimeEl.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(initialTime);
                endGame();
                currentTimeEl.textContent = "You are out of time!";
                newDiv.setAttribute("class", "hide");
                

            }
        }, 1000);
    }
    load(questionIndex);
});

// Function to load specific questions
function load(questionIndex) {
    // clear the previous question
    questionsEl.innerHTML = "";
    choice.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var nextQuestion = questions[questionIndex].question;
        var nextChoice = questions[questionIndex].choices;
        questionsEl.textContent = nextQuestion;
    }

    nextChoice.forEach(function (newChoice) {
        var option = document.createElement("li");
        option.setAttribute("id", "choice");
        option.textContent = newChoice;
        questionsEl.setAttribute("id", "q-p");
        questionsEl.appendChild(choice);
        choice.appendChild(option);
        option.addEventListener("click", (check));
    })
}
// Function to check for correct answer 
function check(event) {
    var element = event.target;

    if (element.matches("li")) {
        newDiv.removeAttribute("class", "hide");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            newDiv.textContent = "Correct!"
            newDiv.setAttribute("id", "correct");
        } else {
            timeLeft = timeLeft - penalty;
            newDiv.textContent = "Incorrect!"
            newDiv.setAttribute("id", "incorrect");
        }
    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        newDiv.setAttribute("id", "result");
        endGame();
        newDiv.textContent = "Quiz Over! " + "You got " + score + "/" + questions.length + " correct.";
    } else {
        load(questionIndex);
    }
    enterEl.appendChild(newDiv);
}

// Function to end the quiz
function endGame() {
    questionsEl.innerHTML = "";
    currentTimeEl.innerHTML = "";


    var newHeading = document.createElement("h1");
    newHeading.setAttribute("id", "newHeading");
    newHeading.textContent = "All Done!";

    questionsEl.appendChild(newHeading);

    var newP = document.createElement("p");
    newP.setAttribute("id", "newP");

    questionsEl.appendChild(newP);

    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var scoreDisplay = document.createElement("p");
        clearInterval(initialTime);
        newP.textContent = "Your final score is: " + timeRemaining;

        questionsEl.appendChild(scoreDisplay);

    }

    var label = document.createElement("label");
    label.setAttribute("id", "label");
    label.textContent = "Enter your initials: ";

    testEl.appendChild(label);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "initials");
    input.setAttribute("maxlength", "2");
    input.textContent = "";

    testEl.appendChild(input);

    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "Submit");
    submit.textContent = "Submit";

    submitEl.appendChild(submit);

    submit.addEventListener("click", function () {
        var initials = input.value.toUpperCase();

        if (initials === null || initials === "") {
            alert("Please enter your initials");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            var allScores = localStorage.getItem("allScores")
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            // sort them by highest to lowest 
            allScores.sort((a, b) => b.score - a.score);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);

            window.location.replace("highscores.html");
        }
    });
}