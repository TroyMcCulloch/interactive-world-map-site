const flagImage = document.getElementById('flagImage');
const answers = document.querySelectorAll('.answer');
const nextButton = document.getElementById('next');

let currentQuestion = 0;
const questions = [
     {
        flagImage: 'images/united.jpg',
        options: ['United Kingdom', 'New Zealand', 'Australia', 'Canada'],
        correctAnswer: 'United Kingdom',
    },
  
  {
        flagImage: 'images/new-zealand.jpg',
        options: ['United Kingdom', 'New Zealand', 'Australia', 'Canada'],
        correctAnswer: 'New Zealand',
    },
  
  {
        flagImage: 'images/australia.jpg',
        options: ['United Kingdom', 'New Zealand', 'Australia', 'Canada'],
        correctAnswer: 'Australia',
    },
  
  {
        flagImage: 'images/canada.jpg',
        options: ['United Kingdom', 'New Zealand', 'Australia', 'Canada'],
        correctAnswer: 'Canada',
    },
    // Add more questions here...
];

function loadQuestion(questionIndex) {
    const question = questions[questionIndex];
    flagImage.src = question.flagImage;
    answers.forEach((answer, index) => {
        answer.textContent = question.options[index];
        answer.classList.remove('correct-answer', 'incorrect-answer');
        answer.addEventListener('click', () => checkAnswer(answer, questionIndex));
    });
}

nextButton.classList.add('hide');

const scoreDisplay = document.getElementById('score');
const totalQuestionsDisplay = document.getElementById('totalQuestions');
let score = 0;

function checkAnswer(answer, questionIndex) {
    const selectedAnswer = answer.textContent;
    const correctAnswer = questions[questionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
        answer.classList.add('correct-answer');
        score++; // Increase the score if the answer is correct
        scoreDisplay.textContent = score;
    } else {
        answer.classList.add('incorrect-answer');
    }
    answers.forEach((ans) => ans.removeEventListener('click', checkAnswer));

    if (currentQuestion < questions.length - 1) {
        // If there are more questions, show the "Next" button for the next question
        nextButton.classList.remove('hide');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => loadQuestion(currentQuestion + 1));
    } else {
        // If all questions have been answered, show the "Restart" button
        nextButton.classList.remove('hide');
        nextButton.textContent = 'Restart';
        nextButton.addEventListener('click', restartQuiz);
    }
}


// Initialize the total number of questions
totalQuestionsDisplay.textContent = questions.length;

function restartQuiz() {
    currentQuestion = 0;
    nextButton.textContent = 'Next';
    loadQuestion(currentQuestion);
    nextButton.classList.add('hide');
}

nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion);
        nextButton.classList.add('hide');
    }
});

loadQuestion(currentQuestion);
