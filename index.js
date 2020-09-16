'use strict';
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is 5 to the 3rd power?',
      answers: [
        '25',
        '100',
        '125',
        '175'
      ],
      correctAnswer: 2
    },
    {
      question: 'What is square root of 25?',
      answers: [
        '10',
        '5',
        '3',
        '2.5'
      ],
      correctAnswer: 1
    },
    {
      question: 'How many bytes are there in 1 MB?',
      answers: [
        '1000',
        '1024',
        '100',
        '10'
      ],
      correctAnswer: 1
    },
    {
      question: 'What is 1/10 of 5/6?',
      answers: [
        '0.08',
        '0.7',
        '0.9',
        '0.0833'
      ],
      correctAnswer: 3
    },
    {
      question: 'What is 1/10 of 5/6?',
      answers: [
        '0.08',
        '0.7',
        '0.9',
        '0.0833'
      ],
      correctAnswer: 3
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

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

$('#start')