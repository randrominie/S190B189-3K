import * as QuestionSets from "./questions.js";

const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("selected");

let Questions;

switch (selectedCategory) {
  case "Cars":
    Questions = QuestionSets.CarQuestions;
    break;
  case "Hotel":
    Questions = QuestionSets.HotelQuestions;
    break;
  case "Eshop":
    Questions = QuestionSets.EshopQuestions;
    break;
  case "Hospital":
    Questions = QuestionSets.HospitalQuestions;
    break;
  default:
    console.error("Unknown category:", selectedCategory);
}

let questionIndex = 0;
let score = 0;

const header = document.querySelector(".questionHeader");
const question = document.querySelector(".question");
const options = document.querySelector(".answers");

const image = document.querySelector("img");
image.src = `../assets/illustrations/${selectedCategory}2.svg`;

const button = document.querySelector(".nextQuestion");

const greenColor = "#1BB655";
const redColor = "#FF3131";
const pinkColor = "#f13ea7";

function loadQues() {
  header.innerText = `Klausimas nr. ${questionIndex + 1}`;
  question.textContent = Questions[questionIndex].q;
  options.innerHTML = "";

  for (let i = 0; i < Questions[questionIndex].a.length; i++) {
    const answer = document.createElement("button");
    answer.classList.add("answer");
    answer.innerText = Questions[questionIndex].a[i].text;
    answer.addEventListener("click", evaluateAnswer);
    options.appendChild(answer);
  }
}

function evaluateAnswer(userSelection) {
  const selectedAnswer = userSelection.target;
  const correctAnswer = Questions[questionIndex].a.find(
    (answer) => answer.isCorrect
  );

  displayAnswers(correctAnswer);
  if (selectedAnswer.innerText === correctAnswer.text) {
    score++;
  }

  revealNextButton();
}

function revealNextButton() {
  button.style.opacity = 100;
}

function hideNextButton() {
  button.style.opacity = 0;
}

function nextQuestion() {
  button.disabled = true;
  hideNextButton();
  if (questionIndex < Questions.length - 1) {
    questionIndex++;
    loadQues();
  } else {
    header.remove();
    question.remove();
    options.remove();
    loadResults();
  }
}

window.nextQuestion = nextQuestion;

function displayAnswers(correctAnswer) {
  const answerButtons = options.querySelectorAll(".answer");
  answerButtons.forEach((answerButton) => {
    if (answerButton.innerText === correctAnswer.text) {
      answerButton.style.backgroundColor = greenColor;
    } else {
      answerButton.style.backgroundColor = redColor;
    }
  });

  button.disabled = false;
}

function loadResults() {
  const htmlBlock = document.querySelector(".questionBlock");
  const resultHeader = document.createElement("h1");
  resultHeader.classList.add("mainText");

  const message = document.createElement("p");
  message.classList.add("message");

  const results = document.createElement("h1");
  results.classList.add("mainText");
  results.innerText = `${score} / ${Questions.length}`;

  if (score < Questions.length / 2) {
    resultHeader.innerText = "Gaila, bet jums nepavyko";
    resultHeader.style.color = redColor;

    message.innerText =
      "Jums dar trūksta žinių dirbtinio intelekto sferoje. Galbūt norėtum išbandyti savo žinias iš naujo?";
    results.style.color = redColor;
  } else {
    resultHeader.innerText = "Sveikiname!";
    resultHeader.style.color = greenColor;
    message.innerText =
      "Jūs įrodėte, jog turite geras žinias apie dirbtinio intelekto taikymą verslo procesuose. Jeigu norite, galite žaidimą sužaisti dar kartą";
    results.style.color = greenColor;
  }

  const exitButtons = document.createElement("div");
  exitButtons.classList.add("exitButtons");

  const restartLink = document.createElement("a");
  const restartButton = document.createElement("button");
  const homeLink = document.createElement("a");
  const homeButton = document.createElement("button");

  restartLink.href = `../quizPage.html?selected=${selectedCategory}`;
  homeLink.href = "index.html";

  restartButton.classList.add("basicButton", "smallerButtons");
  homeButton.classList.add("basicButton", "smallerButtons");

  restartButton.style.backgroundColor = redColor;
  homeButton.style.backgroundColor = pinkColor;

  restartButton.innerText = "Žaisti dar kartą";
  homeButton.innerText = "Grįžti atgal";

  restartLink.appendChild(restartButton);
  exitButtons.appendChild(restartLink);

  homeLink.appendChild(homeButton);
  exitButtons.appendChild(homeLink);

  htmlBlock.appendChild(resultHeader);
  htmlBlock.appendChild(message);
  htmlBlock.appendChild(results);
  htmlBlock.appendChild(exitButtons);
}

loadQues();
