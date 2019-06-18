$(document).ready(); {
//trivia questions
var questions = [
    new Question("Who was the first baseball player to have his number retired?", ["Babe Ruth", "Yogi Bera", "Lou Gehrig", "Jackie Robinson"], "Lou Gehrig"),
    new Question("Which is the most populous U.S. state?", ["California", "Texas", "New York", "Florida"], "California"),
    new Question("In what year did the First World War begin?", ["1912", "1914", "1916", "1918"], "1914"),
    new Question("Who lived at 221B, Baker Street, London", ["Alan Turing", "Charles Darwin", "John Lennon", "Sherlock Holmes"], "Sherlock Holmes"),
    new Question("How many dots are there on two dice?", ["34", "38", "42", "46"], "42"),
    new Question("What country gave Florida to the U.S. in 1891", ["Portugal", "Spain", "England", "France"], "Spain"),
    new Question("In what year did the American Civil War end?", ["1862", "1863", "1864", "1865"], "1865"),
    new Question("Which language has the most words?", ["English", "Spanish", "French", "Italian"], "English"),
    new Question("In what year was President John F. Kennedy assasinated?", ["1962", "1963", "1964", "1965"], "1963"),
    new Question("Which U.S. city is known as the City of Brotherly Love?", ["Dallas", "Boston", "Atlanta", "Philadelphia"], "Philadelphia")
];
var quiz = new Quiz(questions);
var timer = 61;

//Countdown function
function timerRun() {
    timer = timer - 1;
    if (timer < 61) {
    document.getElementById("countdown").innerHTML = timer;
    }
    if (timer <= 0){
        clearInterval(intervalId);
        showScores();
    }
}
intervalId = setInterval("timerRun()", 1000);
timerRun();

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.correctAnswer = function (choice) {
    return choice === this.answer;
}

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function () {
    return this.questions.length === this.questionIndex
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
}

    this.questionIndex++;
}


function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        //show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
}

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
}

function showProgress() {
    var currentQuestion = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestion + " of " + quiz.questions.length;
}

function showScores() {
    var gameOverHTML = "<h1>Quiz Complete!</h1><h2>Results:</h2>";
    gameOverHTML += "<h3 id='score'> You answered " + quiz.score + " of " + quiz.questions.length + " correctly"; "</h3>";
    var element = document.getElementById("result");
    element.innerHTML = gameOverHTML;
    document.getElementById("title").style.visibility = "hidden";
    document.getElementById("timer").style.visibility = "hidden";
    document.getElementById("buttons").style.visibility = "hidden";
    document.getElementById("progress").style.visibility = "hidden";
    document.getElementById("question").style.visibility = "hidden";
    clearInterval(intervalID);
}

populate();
}






