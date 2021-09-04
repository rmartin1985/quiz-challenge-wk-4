// Variables to select elements using the DOM
var currentTimeEl = document.querySelector("timer");
var timerEl = document.querySelector("#start");
var questionsEl = document.querySelector("welcome");
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

// Need a timer using setInterval 

// Function to load specific questions

// Function to check for correct answer 

// Function to end the quiz