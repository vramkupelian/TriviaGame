
var rightAnswer;
var wrongAnswer;
var noAnswer;

var trivia = [{
    question: "Fry gets cryogenically frozen. What year does he thawed?",
    possibleAnswers: ["2500","3000","3500","4000"],
    answer:1,
    explanation: "Fry was frozen on December 31, 1999 and stayed that way for just over a thousand years before being thawed out in the year 3000."
    },
    {
    question: "Fry lives in New New York where rats have been replaced by a new generation of vermin. Which animal is the new pest?",
    possibleAnswers: ["Cat","Poisonous Froad","Owl","Vampire Slug"],
    answer:2,
    explanation: "The owls were brought in to take care of the rats before they became a problem themselves."
    },
    {
    question:"Hermes Conrad is the Jamaican accountant and bureaucrat for Planet Express. What is his bureaucrat grade (i.e. rank)?",
    possibleAnswers:["25","34","43","52"],
    answer: 1,
    explanation: "Though he has an episode where he gets demoted, Hermes eventually regains his rank as a Grade 34 bureaucrat."
    },
    {
    question: "Who is the only intelligent organism on Earth deemed 'nice' by Robot Santa Claus?",
    possibleAnswers: ["Nibbler", "Fry", "Leela", "Zoidberg"],
    answer: 3,
    explanation: "Robot Santa's homicidal programming has made him try to kill everyone, except for Zoidberg whom got gifted a pogo-stick."
    },
    {
    question: "In the show, which character has never said a word but has its own tv show?",
    possibleAnswers: ["Wash bucket", "El Chupanibre", "Hypnotoad", "Pamela Anderson's head in a jar"],
    answer: 2,
    explanation: "This reoccuring cameo was frequently on the television hypnotizing its audience."
    },
    {
    question: "How many times did Futurama end?",
    possibleAnswers: ["0", " 1", "2", "3"],
    answer: 3  ,
    explanation: "They show was cancelled three times and even had a couple movies." 
    },
    {    
    question: "What was Fry's good luck charm?",
    possibleAnswers:["Lucky Rabbit Foot", "His Red Jacket", "Slurm", "A Seven Leaf Clover"],
    answer: 3,
    explanation: "He couldn't beat his brother at basketball without it."
    },
    {   
    question: "Which of these inventions was not made by the Professor?",
    possibleAnswers: ["The Mind-Switcher", "The What-If Machine", "The eyePhone","The Smell-O-Scope"],
    answer: 2,
    explanation: "Though the Professor has made plenty of inventions, the eyePhone is a MomCorp product."
    },
    {
    question:"How many people on the writing staff have either a PhD or a Master's degree?",
    possibleAnswers: ["5", "7", "10", "12"],
    answer: 2,
    explanation: "Three PhDs and seven Masters degrees in fields such as applied mathematics, physics, and computer science."
    },
    {
    question: "The creator of Futurama also created what other animated sitcom?",
    possibleAnswers: ["The Simpsons", "Family Guy", "South Park", "King of the Hill"],
    answer: 0,
    explanation: "Matt Groening was the creative drive behind 'The Simpsons' for over a decade before he came up with the show."
}];

var afterGuessMessage = {
    correctGuessMessage: "Correct. Bet you feel good about yourself.",
    incorrectGuessMessage: "Hahahahaha. Oh wait you’re serious. Let me laugh even harder.",
    ranOutOfTimeMessage: "You know what cheers me up? Other people's misfortune.",
    endOfGameMessage:"The game’s over. I have all the money. Compare your lives to mine and then kill yourselves!",
}

$(".start-button").on("click", function(){
    $(this).hide();
    newGame();
});

$(".replay-button").on("click", function(){
    $(this).hide();
    newGame();
});

function afterGuessPage(){
    //clears
    $(".question-div").empty();
    for(var i = 0; i < 4; i++){
        $(".multiple-answer" + i).empty();
        $(".multiple-answer" + i).addClass("hidden");
    }
    $(".choice").empty();
    clearInterval(timer);

    // show you explanation 
    $(".explanation-div").text(trivia[questionNumber].explanation);

    console.log("question number:" + questionNumber);
    
    //is answer correct?
    if(userPick===trivia[questionNumber].answer){
        console.log("correct answer");
        $(".after-guess-message").text(afterGuessMessage.correctGuessMessage);
        rightAnswer++;
        console.log("number of right answers: "+ rightAnswer);
    }
    else if(userPick !== trivia[questionNumber].answer){
        console.log("wrong answer");
        $(".after-guess-message").text(afterGuessMessage.incorrectGuessMessage);
        wrongAnswer++;
        console.log("number of wrong answers: " + wrongAnswer);
    }
    else{//needs to be reworked. possibly boolean?
        console.log("no answer");
        $(".after-guess-message").text(afterGuessMessage.ranOutOfTimeMessage);
        noAnswer++;
    }
    
    //remove data from previous answer
    $(userPick).removeAttr("data-index-number");
    console.log("user pick should be removed here: " + userPick);
    questionNumber++;

    //setTimeout(runningClock,1000);

    //show next page, unless last question, then show end page
    if(questionNumber < (trivia.length - 1) ){
        setTimeout(giveQuestion, 5000);
    }
    else{
        setTimeout(endGame,5000);
    }
}

var questionNumber = 0;
var userPick;

//post question, run timer, show answer and afterGuessMessage
function giveQuestion(){

    
    //get rid of previous answer page
    $(".explanation-div").empty();
    $(".after-guess-message").empty();
    $(".clock").empty();
    clearInterval(timer);
seconds =5;
    //post question
    $(".question-div").html(trivia[questionNumber].question);
    console.log(trivia[questionNumber].question);
    //post answers
    for(var i = 0; i < 4; i++){
        $(".multiple-answer"+i).text(trivia[questionNumber].possibleAnswers[i]);
        console.log(trivia[questionNumber].possibleAnswers[i]);
        $(".multiple-answer" + i).removeClass("hidden");
        $(".multiple-answer" + i).addClass("choice");
        $(".multiple-answer"+ i).attr("data-index-number", i);
        // $(".multiple-answer" + i).data(i);
    }

    //load answer page if clock runs out 
    // runningClock = setTimeout(afterGuessPage, 5000);
    
    //to show the countdown
    timer = setInterval(showClockRunning, 1000);

    //clicking a button
    // $(".choice").on("click", function(){
    //     //assign index number 
    //     userPick = $(this).attr("data-index-number");
    //     // userPick = $(this).data(i)
    //     userPick = parseInt(userPick);
    //     console.log("user pick:" + userPick);
    //     // clearTimeout(runningClock);
    //     clearInterval(timer);
    //     afterGuessPage();
    // });
   
}

$(document).on("click",".choice",function(){
    //assign index number 
    userPick = $(this).attr("data-index-number");
    // userPick = $(this).data(i)
    userPick = parseInt(userPick);
    console.log("user pick:" + userPick);
    // clearTimeout(runningClock);
    clearInterval(timer);
    afterGuessPage();
});

//try turning off the lcick at end of function, on at the beginning of function to come.

var seconds = 5;
var timer;

function showClockRunning(){
    seconds--;
     $(".clock").html("Time left: " + seconds);

     if(seconds ===0){
         clearInterval(timer);
         afterGuessPage();
         seconds=5;
     }
}


//this should start a new game
function newGame (){
    rightAnswer = 0;
    wrongAnswer = 0;
    noAnswer = 0;
    giveQuestion();
}


function endGame(){
    //clear answer page
    $(".explanation-div").empty();
    $(".after-guess-message").empty();
    
    //show replay button
    $("replay-button").removeClass("hidden");

}
