const Questions = [
  {
    q: "Kokia pagrindinė priežastis įdiegti DI automobilių gamykloje?",
    a: [
      {
        text: "Automatinės rezervacijos sistemos",
        isCorrect: false,
        explanation:
          "Automobilių gamykloje svarbiau optimizuoti gamybos procesus nei rezervacijas",
      },
      {
        text: "Gamybos linijos optimizacija",
        isCorrect: true,
        explanation: "-",
      },
      {
        text: "Elektroninės prekybos analizė",
        isCorrect: false,
        explanation:
          "Tai labiau tinka elektroninės prekybos įmonėms, o ne gamykloms",
      },
      {
        text: "Pacientų duomenų analizė",
        isCorrect: false,
        explanation:
          "Tai yra susiję su sveikatos priežiūra, o ne automobilių gamyb",
      },
    ],
  },
  {
    q: "Kokiai funkcijai gamykloje labiausiai tiktų DI?",
    a: [
      {
        text: "Klientų aptarnavimas",
        isCorrect: false,
        explanation:
          "Nors AI gali padėti aptarnavime, pagrindinis privalumas gamykloje yra gamybos optimizavimas.",
      },
      {
        text: "Internetinės reklamos",
        isCorrect: false,
        explanation: "Tai nėra pagrindinė gamyklos funkcija",
      },
      {
        text: "Gydomųjų procedūrų rekomendacijos",
        isCorrect: false,
        explanation: "Tai nesusiję su automobilių gamyba.",
      },
      {
        text: "Detalių tikslumo patikra",
        isCorrect: true,
        explanation: "-",
      },
    ],
  },
  {
    q: "Kaip DI galėtų padėti pagerinti gamybos efektyvumą?",
    a: [
      {
        text: "Pateikiant asmenines nuolaidas klientams",
        isCorrect: false,
        explanation:
          " tai gali padėti gauti daugiau pardavimų, tačiau šiuo atveju investuoti į tiekimo grandinės optimizavimą su DI būtų tikslingiausia.",
      },
      {
        text: "Analizuojant klientų atsiliepimus",
        isCorrect: false,
        explanation: "Tai nėra pagrindinė gamyklos funkcija.",
      },
      {
        text: "Optimizuojant tiekimo grandinę",
        isCorrect: true,
        explanation: "-",
      },
      {
        text: "Padedant gydytojams diagnozuoti ligas",
        isCorrect: false,
        explanation: "Tai nesusiję su automobilių gamyba.",
      },
    ],
  },
  {
    q: "Kokiai problemai išspręsti gamykloje labiausiai reikėtų DI?",
    a: [
      {
        text: "Klaidingoms interneto svetainės funkcijoms ištaisyti",
        isCorrect: false,
        explanation:
          "Galbūt įmonė turi savo svetainę, tačiau šiuo atveju prioritetas yra defektų nustatymas.",
      },
      {
        text: "Gamybos defektų nustatymui",
        isCorrect: true,
        explanation: "-",
      },
      {
        text: "Klientų elgsenos analizei",
        isCorrect: false,
        explanation: "Tai nėra pagrindinė gamyklos funkcija.",
      },
      {
        text: "Gydomųjų procedūrų planavimui",
        isCorrect: false,
        explanation: "Tai nesusiję su automobilių gamyba.",
      },
    ],
  },
  {
    q: "Kokį DI taikymą matote ateityje automobilių gamyklose?",
    a: [
      {
        text: "Automobilių pardavimų prognozavimas",
        isCorrect: false,
        explanation:
          "Tai galėtų būti aktualu bei naudinga įmonei, bet gamyklose svarbiausia yra gerinti patį gamybos procesą.",
      },
      {
        text: "Automatizuotas gamybos procesas",
        isCorrect: true,
        explanation: "-",
      },
      {
        text: "Klientų aptarnavimo chatbotai",
        isCorrect: false,
        explanation: "Tai nėra pagrindinė gamyklos funkcija.",
      },
      {
        text: "Pacientų gydymo planavimas",
        isCorrect: false,
        explanation: "Tai nesusiję su automobilių gamyba.",
      },
    ],
  },
  {
    q: "Kokios didžiausios išlaidos, su kuriomis susidurs 'Automanija' diegdama DI į savo veiklą?",
    a: [
      {
        text: "Programinės įrangos licencijavimas ir atnaujinimai",
        isCorrect: false,
        explanation:
          "Nors tai gali būti brangu, techninė infrastruktūra yra esminė ir gali kainuoti daugiau.",
      },
      {
        text: "Aukšto lygio specialistų mokymas ir samdymas",
        isCorrect: false,
        explanation:
          "Nors svarbu, gamyklos modernizacija gali būti didžiausia išlaida.",
      },
      {
        text: "Gamyklos techninė modernizacija",
        isCorrect: true,
        explanation: "-",
      },
      {
        text: "Komunikacija ir darbuotojų mokymas apie AI",
        isCorrect: false,
        explanation: "Tai nėra brangiausia dalis AI integracijos.",
      },
    ],
  },
];

const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("selected");
alert(selectedCategory);

let questionIndex = 0;
let score = 0;

const header = document.querySelector(".questionHeader");
const question = document.querySelector(".question");
const options = document.querySelector(".answers");

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

function displayAnswers(correctAnswer) {
  const answerButtons = options.querySelectorAll(".answer");
  answerButtons.forEach((answerButton) => {
    if (answerButton.innerText === correctAnswer.text) {
      answerButton.style.backgroundColor = greenColor;
    } else {
      answerButton.style.backgroundColor = redColor;
    }
  });
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

  restartLink.href = "quizPage.html";
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
