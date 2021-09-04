// Variables to select elements using the DOM
var currentTimeEl = document.querySelector("#timer");
var timerEl = document.querySelector("#start");
var questionsEl = document.querySelector("#welcome");
var containerEl = document.querySelector(".container");

// variables will go here 
var score = 0
var questionIndex = 0;

// make an object to hold the questions, choices, and correct answers
var questions = [
    {
        question: "Sample question 1",
        choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
        answer: "choice 1"
    },
    {
        question: "Sample question 2",
        choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
        answer: "choice 2"
    },
    {
        question: "Sample question 3",
        choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
        answer: "choice 3"
    },
    {
        question: "Sample question 4",
        choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
        answer: "choice 4"
    },
    {
        question: "Sample question 5",
        choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
        answer: "choice 1"
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
        option.textContent = newChoice;
        questionsEl.appendChild(choice);
        choice.appendChild(option);
        option.addEventListener("click", (check));
    })
}
// Function to check for correct answer 
function check(event) {
    var element = event.target;

    if (element.matches("li")) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            newDiv.textContent = "Correct!"
        } else {
            timeLeft = timeLeft - penalty;
            newDiv.textContent = "Incorrect!"
        }
    }
    questionIndex++;

    if (questionIndex >= questions.length) {
        endGame();
        newDiv.textContent = "Quiz Over! " + "You got " + score + "/" + questions.length + " correct.";
    } else {
        load(questionIndex);
    }
    questionsEl.appendChild(newDiv);
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

    questionsEl.appendChild(label);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "initials");
    input.textContent = "";

    questionsEl.appendChild(input);

    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "Submit");
    submit.textContent = "Submit";

    questionsEl.appendChild(submit);

    submit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            alert("Please enter your initials");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            var setScores = localStorage.getItem("setScores")
            if (setScores === null) {
                setScores = [];
            } else {
                setScores = JSON.parse(setScores);
            }
            setScores.push(finalScore);
            var newScore = JSON.stringify(setScores);
            localStorage.setItem("All scores", newScore);
        }
    });
}