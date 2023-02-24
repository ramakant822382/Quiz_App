//this would be the object shape for storing the questions
//you can change the questions to your own taste or even add more questions..
const questions = [
  {
    question:
      "In an election between two candidates, one got 55% of the total valid votes, 20% of the votes were invalid. If the total number of votes was 7500, the number of valid votes that the other candidate got, was :",
    optionA: " 2500",
    optionB: "2700",
    optionC: "3000",
    optionD: "3100",
    correctOption: "optionB",
  },

  {
    question: "Fresh fruit contains 68% water and dry fruit contains 20% water. How much dry fruit can be obtained from 100 kg of fresh fruits ?",
    optionA: "20",
    optionB: "30 ",
    optionC: "40",
    optionD: "50 ",
    correctOption: "optionC",
  },

  {
    question: "The value of a machine depreciates at the rate of 10% every year. It was purchased 3 years ago. If its present value is Rs. 8748, its purchase price was :",
    optionA: "10000",
    optionB: "12000",
    optionC: "14000",
    optionD: "16000",
    correctOption: "optionB",
  },

  {
    question: "A student multiplied a number by 3/5 instead of 5/3, What is the percentage error in the calculation ?",
    optionA: "54%",
    optionB: "64%",
    optionC: "74%",
    optionD: "84%",
    correctOption: "optionB",
  },

  {
    question: "A student has to obtain 33% of the total marks to pass. He got 125 marks and failed by 40 marks. The maximum marks are",
    optionA: "500",
    optionB: "600",
    optionC: "800",
    optionD: "1000",
    correctOption: "optionA",
  },

  {
    question: "A man spends 35% of his income on food, 25% on children's education and 80% of the remaining on house rent. What percent of his income he is left with ?",
    optionA: "6%",
    optionB: "8%",
    optionC: "10%",
    optionD: "12%",
    correctOption: "optionB",
  },

  {
    question: "Gaurav spends 30% of his monthly income on food articles, 40% of the remaining on conveyance and clothes and saves 50% of the remaining. If his monthly salary is Rs. 18,400, how much money does he save every month ?",
    optionA: "3864",
    optionB: "4903",
    optionC: "5849",
    optionD: "6789",
    correctOption: "optionA",
  },

  {
    question: "405 sweets were distributed equally among children in such a way that the number of sweets received by each child is 20% of the total number of children. How many sweets did each child recieve ?",
    optionA: "9",
    optionB: "10",
    optionC: "11",
    optionD: "12",
    correctOption: "optionA",
  },

  {
    question: "If 75% of a number is added to 75, then the result is the number itself. The number is :",
    optionA: "100",
    optionB: "200",
    optionC: "300",
    optionD: "400",
    correctOption: "optionC",
  },

  {
    question: "If A's height is 40% less than that of B, how much percent B's height is more than that of A?",
    optionA: "66.66%",
    optionB: "76.66%",
    optionC: "96.66%",
    optionD: "86.66%",
    correctOption: "optionA",
  },

  


];

let shuffledQuestions = []; //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() {
  //function to shuffle and push 10 questions to shuffledQuestions array
  //app would be dealing with 10questions per session
  while (shuffledQuestions.length <= 9) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random);
    }
  }
}

let questionNumber = 1; //holds the current question number
let playerScore = 0; //holds the player score
let wrongAttempt = 0; //amount of wrong answers picked by player
let indexNumber = 0; //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
  handleQuestions();
  const currentQuestion = shuffledQuestions[index];
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("player-score").innerHTML = playerScore;
  document.getElementById("display-question").innerHTML =
    currentQuestion.question;
  document.getElementById("option-one-label").innerHTML =
    currentQuestion.optionA;
  document.getElementById("option-two-label").innerHTML =
    currentQuestion.optionB;
  document.getElementById("option-three-label").innerHTML =
    currentQuestion.optionC;
  document.getElementById("option-four-label").innerHTML =
    currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber]; //gets current Question
  const currentQuestionAnswer = currentQuestion.correctOption; //gets current Question's answer
  const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
  let correctOption = null;

  options.forEach((option) => {
    if (option.value === currentQuestionAnswer) {
      //get's correct's radio input with correct answer
      correctOption = option.labels[0].id;
    }
  });

  //checking to make sure a radio input has been checked or an option being chosen
  if (
    options[0].checked === false &&
    options[1].checked === false &&
    options[2].checked === false &&
    options[3].checked == false
  ) {
    document.getElementById("option-modal").style.display = "flex";
  }

  //checking if checked radio button is same as answer
  options.forEach((option) => {
    if (option.checked === true && option.value === currentQuestionAnswer) {
      document.getElementById(correctOption).style.backgroundColor = "green";
      playerScore++; //adding to player's score
      indexNumber++; //adding 1 to index so has to display next question..
      //set to delay question number till when next question loads
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      document.getElementById(wrongLabelId).style.backgroundColor = "red";
      document.getElementById(correctOption).style.backgroundColor = "green";
      wrongAttempt++; //adds 1 to wrong attempts
      indexNumber++;
      //set to delay question number till when next question loads
      setTimeout(() => {
        questionNumber++;
      }, 1000);
    }
  });
}

//called when the next button is called
function handleNextQuestion() {
  checkForAnswer(); //check if player picked right or wrong option
  unCheckRadioButtons();
  //delays next question displaying for a second just for some effects so questions don't rush in on player
  setTimeout(() => {
    if (indexNumber <= 9) {
      //displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
      NextQuestion(indexNumber);
    } else {
      handleEndGame(); //ends game if index number greater than 9 meaning we're already at the 10th question
    }
    resetOptionBackground();
  }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
    document.getElementById(option.labels[0].id).style.backgroundColor = "";
  });
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

// function for when all questions being answered
function handleEndGame() {
  let remark = null;
  let remarkColor = null;

  // condition check for player remark and remark color
  if (playerScore <= 3) {
    remark = "Bad Grades, Keep Practicing.";
    remarkColor = "red";
  } else if (playerScore >= 4 && playerScore < 7) {
    remark = "Average Grades, You can do better.";
    remarkColor = "orange";
  } else if (playerScore >= 7) {
    remark = "Excellent, Keep the good work going.";
    remarkColor = "green";
  }
  const playerGrade = (playerScore / 10) * 100;

  //data to display to score board
  document.getElementById("remarks").innerHTML = remark;
  document.getElementById("remarks").style.color = remarkColor;
  document.getElementById("grade-percentage").innerHTML = playerGrade;
  document.getElementById("wrong-answers").innerHTML = wrongAttempt;
  document.getElementById("right-answers").innerHTML = playerScore;
  document.getElementById("score-modal").style.display = "flex";
}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
  questionNumber = 1;
  playerScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);
  document.getElementById("score-modal").style.display = "none";
}

//function to close warning modal
function closeOptionModal() {
  document.getElementById("option-modal").style.display = "none";
}
