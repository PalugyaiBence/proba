const quizData = [
  {
    question: "<img id='kicsi' src='1.png' >",
    options: ['Fehér-tenger', 'Barents-tenger', 'Norvég-tenger', 'Északi-Jeges-tenger'],
    answer: 'Fehér-tenger',
  },
  {
    question: "<img id='kicsi' src='2.png' >",
    options: ['Norvég-tenger', 'Fehér-tenger', 'Balti-tenger', 'Botteni-tenger'],
    answer: 'Norvég-tenger',
  },
  {
    question: "<img id='kicsi' src='3.png' >",
    options: ['Északi-tenger', 'Balti-tenger', 'Ír-tenger', 'Trák-tenger'],
    answer: 'Északi-tenger',
  },
  {
    question: "<img id='kicsi' src='4.png' >",
    options: ['Skagerrak', 'Kattegat', 'Otrantói-szoros', 'Messinai-szoros'],
    answer: 'Skagerrak',
  },
  {
    question: "<img id='kicsi' src='5.png' >",
    options: ['Finn-öböl', 'Tarantói-öböl', 'Rigai-öböl', 'Szaloniki-öböl'],
    answer: 'Finn-öböl',
  },


  {
    question: "<img id='kicsi' src='6.png' >",
    options: ['Botteni-öböl', 'Tarantói-öböl', 'Genovai-öböl', 'Finn-öböl'],
    answer: 'Botteni-öböl',
  },
  {
    question: "<img id='kicsi' src='7.png' >",
    options: ['Doveri(calais-i)-szoros', 'Kattegat', 'Otrantói-szoros', 'Gibraltári-szoros'],
    answer: 'Doveri(calais-i)-szoros',
  },
  {
    question: "<img id='kicsi' src='8.png' >",
    options: ['Kelta-tenger', 'Tirrén-tenger', 'Jón-tenger', 'Ír-tenger'],
    answer: 'Kelta-tenger',
  },
  {
    question: "<img id='kicsi' src='9.png' >",
    options: ['Valenciai-öböl', 'Lion(Oroszlán)-öböl', 'Szajna-öböl', 'Vizcayai-öböl'],
    answer: 'Valenciai-öböl',
  },
  {
    question: "<img id='kicsi' src='10.png' >",
    options: ['Genovai-öböl', 'Lion(Oroszlán)-öböl', 'Tirrén-öböl', 'Tarantói-öböl'],
    answer: 'Genovai-öböl',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  // Create submit buttons for each option
  shuffledOptions.forEach(option => {
    const button = document.createElement('input');
    button.type = 'submit';
    button.value = option;
    button.className = 'option';
    button.addEventListener('click', () => checkAnswer(option));
    optionsElement.appendChild(button);
  });

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer(selectedOption) {
  const correctAnswer = quizData[currentQuestion].answer;

  if (selectedOption === correctAnswer) {
    score++;
  } else {
    incorrectAnswers.push({
      question: quizData[currentQuestion].question,
      incorrectAnswer: selectedOption,
      correctAnswer: correctAnswer,
    });
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    displayQuestion();
  } else {
    displayResult();
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `Elérhető pontszámból: ${quizData.length} elértél: ${score}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'flex';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  retryButton.style.display = 'center';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  incorrectAnswers.forEach(answer => {
    incorrectAnswersHtml += `
      <p>
        <strong>Válaszod:</strong>  ${answer.incorrectAnswer}<br>
        <strong>Helyes válasz:</strong> ${answer.correctAnswer}
      </p>
    `;
  });

  resultContainer.innerHTML = `
    <p>Elérhető pontszámból:${quizData.length}  elértél: ${score}!</p>
    <p>Helytelen válaszok:</p>
    ${incorrectAnswersHtml}
  `;
}

retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
