/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)





const STORE = {
  questions: [
    { question: 'What is 5 to the 3rd power?', 
    answers: ['25', '100', '125', '175'], 
    correctAnswer: 2 }, 
    { question: 'What is square root of 25?', 
    answers: ['10', '5', '3', '2.5'], 
    correctAnswer: 1 }, 
    { question: 'How many bytes are there in 1 MB?',
     answers: ['1000', '1024', '100', '10'],
      correctAnswer: 1 }, 
    { question: 'What is 1/10 of 5/6?',
     answers: ['0.08', '0.7', '0.9', '0.0833'],
      correctAnswer: 3 }, 
    { question: 'An integer from 100 through 999, inclusive, is to be chosen at random. What is the probability that the number chosen will have at 0 as least 1 digit?',
     answers: ['19/900', '81/900', '90/900', '171/900'], correctAnswer: 3 }],

  score: 0,
  currentQuestion: 0,
  guess: 0,
  started: false,
  hasFeedback: false
}

/* rendering html */

function render() {
  $('#start').hide();
  $('#quiz').hide();
  $('#feedback').hide();
  $('#summary').hide();
  $('header').hide();


  if (!STORE.started) {
    $('#start').show();
  } else if (STORE.hasFeedback) {
    renderHeader();
    renderFeedback();
  } else if (STORE.currentQuestion < STORE.questions.length) {
    renderHeader();
    renderQuestion();
  } else {
    renderSummary();
  }
}

function renderHeader() {
  $('header').show();
  $('header .score').text(`Score: ${STORE.score}`);
  $('header .progress').text(`Question ${STORE.currentQuestion + 1}/${STORE.questions.length}`);
}

function renderQuestion() {
  $("#quiz").show();
  const question = STORE.questions[STORE.currentQuestion];
  $('#quiz h2').text(question.question);
  $('#choices').html('');
  question.answers.forEach((answer, i) => {
    $('#choices').append(`
        <input type="radio" name="choice" value="${i}" id="${i}"/>
        <label for="${i}">${answer}</label>
      `);
  });
}

function renderFeedback() {
  $('#feedback').show();
  $("#feedback h2").text(STORE.hasFeedback);
  $('.user-answer').text('');
  const question = STORE.questions[STORE.currentQuestion];
  if (STORE.hasFeedback === "Incorrect") {
    $('.user-answer').text(`Your answer ${STORE.guess}`);
  }
  $('.correct-answer').text(`The correct answer was ${question.answers[question.correctAnswer]}`);
}

function renderSummary() {
  $('#summary').show();
  $('#summary p').text(`Your score ${STORE.score} out of ${STORE.questions.length}`);
}


/* listening to events */
function startQuiz() {
  $('#start-quiz').click(e => {
    STORE.started = true;
    render();
  })
}

function submitChoice() {
  $('#quiz form').submit(e => {
    e.preventDefault();
    const answer = $('input[type="radio"]:checked').val();
    const question = STORE.questions[STORE.currentQuestion];
    if (Number(answer) === question.correctAnswer) {
      STORE.score++;
      STORE.hasFeedback = "Correct";
    } else {
      STORE.guess = STORE.questions[STORE.currentQuestion].answers[answer];
      STORE.hasFeedback = "Incorrect";
    }
    render();
  })
}

function nextQuestion() {
  $('#next').click(e => {
    STORE.hasFeedback = false;
    STORE.currentQuestion = STORE.currentQuestion + 1;
    render();
  });
}

function restartQuiz() {
  $('#restart').click(e => {
    STORE.started = false;
    STORE.score = 0;
    STORE.currentQuestion = 0;
    render();
  })
}

function main() {
  startQuiz();
  submitChoice();
  nextQuestion();
  restartQuiz();
  render();
}

$(main);