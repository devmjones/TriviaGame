
window.onload = function () {
    $("#start").click(function() {
        $("#gameScreen").show();
        $('#timer').show();
        displayNextQuestion();
        timer.start();
    });
};

var intervalId;
var clockRunning = false;
var numRight = 0;
var numWrong = 0;
var questionIndex = 0;

var starting_time = 15;
var timer = {
    time: starting_time,
    reset: function () {
        timer.time = starting_time;
        $("#display").text(starting_time);
        if (!clockRunning) {
            timer.start()
        }
    },
    start: function () {
        if (!clockRunning) {
            intervalId = setInterval(timer.count, 1000);
            clockRunning = true;
        }
    },
    stop: function () {
        clearInterval(intervalId);
        clockRunning = false;
    },

    count: function () {
        var currentTime = timer.time--;
        $("#display").text(currentTime);
        if(currentTime === 0) {
            timeExpired()
        }
    }
};

var questions=[
    {
        question: "How fast can greyhounds run?",
        options: ["25mph", "15mph", "75mph", "45mph"],
        correct_answer: 3,
        answer: "Greyhounds are the second fastest animal in the word, reaching speeds up to 45mph"
    },
    {
        question: "Where did the breed originate?",
        options: ["Egypt", "Africa", "England", "Florida"],
        correct_answer: 0,
        answer: "Greyhounds were an integral part of ancient Egyptian life, as depicted in art dating back to 3,000 B.C."
    },
    {
        question: "What do greyhounds have trouble doing, due to their build?",
        options: ["sleeping", "swimming", "sitting", "fetching"],
        correct_answer: 2,
        answer: "Greyhounds can sit, but their muscle structure makes it difficult for them to appear comfortable."
    },
    {
        question: "Greyhounds are the only breed of dog mentioned by name in the ......?",
        options: ["bible", "Constitution", "phone book", "Magna Carta"],
        correct_answer: 0,
        answer: "Proverbs 30:29-31, King James Version"
    },
    {
        question: "How many hours a day does a greyhound sleep?",
        options: ["Less than 4", "18 or more", "6-8", "Short naps throughout the day"],
        correct_answer: 1,
        answer: "While many people believe Greyhounds to be extremely active dogs they are actually quite inactive with " +
        "many sleeping 18 or more hours a day."
    },
    {
        question: "Greyhounds don't usually bark, they....",
        options: ["Bay", "Yip", "Cough", "Roo"],
        correct_answer: 3,
        answer: "While Greyhounds don’t bark as much as many breeds, they do something called “rooing, which is where " +
        "the dog howls/yodels when it is excited, sad, or at the beginning or end of the day"
    }

];

var gameOver = function(){
    return questionIndex === questions.length;
};

var timeExpired = function() {
    $('#qOrA').text("Time's up!  The correct answer was " + questions[questionIndex].answer);
    timer.stop();
    numWrong++;
    questionIndex++;
    setTimeout(displayNextQuestion, 5000);
};

var clickedRight = function() {
    $('#options').hide();
    $('#qOrA').text("You're right! The correct answer was " + questions[questionIndex].answer);
    timer.stop();
    numRight++;
    questionIndex++;
    setTimeout(displayNextQuestion, 5000);
};

var clickedWrong = function() {
    $('#options').hide();
    $('#qOrA').text("WRONG! The correct answer is: " + questions[questionIndex].answer);
    timer.stop();
    numWrong++;
    questionIndex++;
    setTimeout(displayNextQuestion, 5000);
};

var makeAnswerOption = function(index, question) {
    var resultClass = (index === question.correct_answer) ? 'right' : 'wrong';
    var option = $('<div/>');
    var optId = 'option' + index;
    var answer = question.options[index];
    option = option.append($('<input type="radio" name="answer" id="'+optId+'" class="'+resultClass+'"/>'));
    option = option.append($('<label for="'+optId+'" class="' + resultClass + '">' + answer + '</label>'));
    return option;
};

var constructQuestionCard = function(question) {
    $("#qOrA").text(question.question);
    $("#options").empty();
    $.each(question.options, function (index) {
        $("#options").append(makeAnswerOption(index, question));
    });
    $('.right').on('click', clickedRight);
    $('.wrong').on('click', clickedWrong);
};

var displayNextQuestion=function(){
    if(!gameOver()){
        var nextQuestion = questions[questionIndex];
        constructQuestionCard(nextQuestion);
        $('#options').show();
        timer.reset();
    } else {
        $('#options').hide();
        $('#timer').hide();
        $('#qOrA').text('Game Over!  You got ' + numRight + ' correct and ' + numWrong + ' wrong.');
        timer.stop();
    }
};


