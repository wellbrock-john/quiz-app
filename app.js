'use strict';
const STORE = {
  questions: [
    {
      question: 'What is 5 to the 3rd power?',
      answers: ['25', '100', '125', '175'],
      correctAnswer: 2
    },
    {
      question: 'What is square root of 25?',
      answers: ['10', '5', '3', '2.5'],
      correctAnswer: 1
    },
    {
      question: 'What is 2 x 3 + 10 x 5 + 14?',
      answers: ['70', '94', '144', '76'],
      correctAnswer: 0
    },
    {
      question: 'What is 1/10 of 5/6?',
      answers: ['0.08', '0.7', '0.9', '0.0833'],
      correctAnswer: 3
    },
    {
      question: 'An integer from 100 through 999, inclusive, is to be chosen at random. What is the probability that the number chosen will have a 0 in at least 1 digit?',
      answers: ['19/900', '81/900', '90/900', '171/900'], correctAnswer: 3
    }],
  score: 0,
  currentQuestion: 0,
  guess: 0,
  started: false,
  hasFeedback: false
};

function generateQuestionElements(answers) {
  let answerChoices = '';
  answers.forEach((answer, i) => {
  answerChoices += `<input type="radio" name="choice" value="${i}" id="${i}"/>
  <label for="${i}">${answer}</label><br/>`;
});
return answerChoices;
}

function generateQuizElementsString(question, answers, score, totalQuestions, questionNumber) {
  let options = generateQuestionElements(answers);
  
  return `<p class="score">Score: ${score}/${totalQuestions}</p>
  <p class="progress">${questionNumber + 1}/${totalQuestions}</p>
  <section id="quiz">
  <form>  
    <h2>${question}</h2>
    <fieldset id="choices" tabindex=0>${options}</fieldset>
    <input type="submit" value="Submit Answer" aria-label="Submit Answer" />
  </form>
</section>`;
}

function generateStartElementString() {
  return `<section id="start">
  <h2>Welcome to Math Quiz</h2>
  <button id="start-quiz">Start</button>
</section>`;
}

function generateFeedbackElementString(feedback, guess, answer, score, totalQuestions, questionNumber) {
  let incorrectStyle = '';
  let guessString = `Your answer: ${guess}`;
  let answerString = `The correct answer was option: ${answer + 1}`;
  let output = `<p class="user-answer">${guessString}</p>
  <p class="correct-answer">${answerString}</p>`;

  if (feedback === 'Incorrect') {
      incorrectStyle = 'class="incorrect"';
  } else {
      output = `<p class="correct-answer">${answerString}</p>`;
  }

  return `
  <p class="score">Score: ${score}/${totalQuestions}</p>
  <p class="progress">${questionNumber + 1}/${totalQuestions}</p>
  <section id="feedback">
  <h2 ${incorrectStyle}>${feedback}</h2>
  ${output}
  <button id="next">Next Question</button>
</section>`;
}

function generateSummaryElementString(score, totalQuestions) {
  return `<section id="summary">
  <h2>Summary</h2>
  <p>Your score is ${score}/${totalQuestions}</p>
  <button id="restart">Restart Quiz</button>
</section>`;
}

function render() {
  let score = STORE.score;
  let totalQuestions = STORE.questions.length;
  let questionNumber = STORE.currentQuestion;
  let page = '';
  console.log(STORE.currentQuestion);
  console.log(STORE.questions.length);
  if (!STORE.started) {
    console.log(STORE.started);
      page = generateStartElementString();
    } else if (STORE.hasFeedback) {
      console.log('aa');
        let feedback = STORE.hasFeedback;
        let guess = STORE.guess;
        let answer = STORE.questions[STORE.currentQuestion].correctAnswer;
      page = generateFeedbackElementString(feedback, guess, answer, score, totalQuestions, questionNumber);
    } else if (STORE.currentQuestion < STORE.questions.length) {
      console.log('aaa');
        let question = STORE.questions[STORE.currentQuestion].question;
        let answers = STORE.questions[STORE.currentQuestion].answers;
        page = generateQuizElementsString(question, answers, score, totalQuestions, questionNumber);
    } else {
      console.log('aaaa');
      page = generateSummaryElementString(score, totalQuestions);
    }
    $("main").html(page);
}

/* listening to events */
function startQuiz() {
  
  $('main').on('click', '#start-quiz', ()  => {
    console.log('aaab');
    STORE.started = true;
    render();
  });
}

function submitChoice() {
  $('main').on ('submit', '#quiz form', e => {
    e.preventDefault();
    if (!$('input[type="radio"]:checked').val()) {
      alert('No answer selected');
      return;
    }
    const answer = $('input[type="radio"]:checked').val();
    const question = STORE.questions[STORE.currentQuestion];
    if (Number(answer) === question.correctAnswer) {
      STORE.score = STORE.score + 1;
      STORE.hasFeedback = 'Correct';
    } else {
      STORE.guess = STORE.questions[STORE.currentQuestion].answers[answer];
      STORE.hasFeedback = 'Incorrect';
    }
    render();
  });
}

function nextQuestion() {
  $('main').on ('click', '#next', () => {
    STORE.hasFeedback = false;
    STORE.currentQuestion = STORE.currentQuestion + 1;
    render();
  });
}

function restartQuiz() {
  $('main').on ('click', '#restart', () => {
    STORE.started = false;
    STORE.score = 0;
    STORE.currentQuestion = 0;
    render();
  });
}

function main() {
  startQuiz();
  submitChoice();
  nextQuestion();
  restartQuiz();
  render();
}

$(main);