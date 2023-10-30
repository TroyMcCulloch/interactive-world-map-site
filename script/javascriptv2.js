const flagImage = document.getElementById('flagImage');
const answers = document.querySelectorAll('.answer');
const nextButton = document.getElementById('next');
const restartButton = document.getElementById('restart');
const scoreDisplay = document.getElementById('score');
const totalQuestionsDisplay = document.getElementById('totalQuestions');

let currentQuestion = 0;
let score = 0;
let hasRestarted = false; // Flag to track if the quiz has been restarted

let currentQuestion = 0;
const questions = [
     {
        flagImage: 'images/united.jpg',
        options: ['United Kingdom', 'New Zealand', 'Australia', 'Canada'],
        correctAnswer: 'United Kingdom',
    },
  
  {
        flagImage: 'images/new-zealand.jpg',
        options: ['Australia', 'New Zealand', 'Belarus', 'Mexico'],
        correctAnswer: 'New Zealand',
    },
  
  {
        flagImage: 'images/australia.jpg',
        options: ['Togo', 'Fiji', 'Australia', 'Moldova'],
        correctAnswer: 'Australia',
    },
  
 /*  {
        flagImage: 'images/canada.jpg',
        options: ['Cuba', 'Jamaica', 'Haiti', 'Canada'],
        correctAnswer: 'Canada',
    },
	
  {
        flagImage: 'images/tonga.jpg',
        options: ['Tonga', 'Jamaica', 'Cuba', 'Haiti'],
        correctAnswer: 'Tonga',
    },	
	
  {
        flagImage: 'images/finland.jpg',
        options: ['Honduras', 'USA', 'Finland', 'Algeria'],
        correctAnswer: 'Finland',
    },
	
  {
        flagImage: 'images/libya.jpg',
        options: ['Sweden', 'Germany', 'Zambia', 'Libya'],
        correctAnswer: 'Libya',
    },


  {
        flagImage: 'images/sweden.jpg',
        options: ['Togo', 'Fiji', 'Sweden', 'Moldova'],
        correctAnswer: 'Sweden',
    },

  {
        flagImage: 'images/germany.jpg',
        options: ['Belgium', 'Romania', 'Moldova', 'Germany'],
        correctAnswer: 'Germany',
    },	
	
  {
        flagImage: 'images/pakistan.jpg',
        options: ['Pakistan', 'Palestine', 'Nepal', 'Laos'],
        correctAnswer: 'Pakistan',
    },	

  {
        flagImage: 'images/egypt.jpg',
        options: ['Egypt', 'Mali', 'Tuvalu', 'China'],
        correctAnswer: 'Egypt',
    },	

  {
        flagImage: 'images/china.jpg',
        options: ['China', 'United States', 'Jamaica', 'Cuba'],
        correctAnswer: 'China',
    },	

  {
        flagImage: 'images/cuba.jpg',
        options: ['Chile', 'Bolivia', 'Cuba', 'Peru'],
        correctAnswer: 'Cuba',
    },	

  {
        flagImage: 'images/chile.jpg',
        options: ['Peru', 'Chile', 'Luxembourg', 'Latvia'],
        correctAnswer: 'Chile',
    },	

  {
        flagImage: 'images/luxembourg.jpg',
        options: ['Romania', 'Netherlands', 'Belgium', 'Luxembourg'],
        correctAnswer: 'Luxembourg',
    },	

  {
        flagImage: 'images/france.jpg',
        options: ['Netherlands', 'France', 'Italy', 'Slovakia'],
        correctAnswer: 'France',
    },	

  {
        flagImage: 'images/italy.jpg',
        options: ['Italy', 'Switzerland', 'Bolivia', 'Hungary'],
        correctAnswer: 'Italy',
    },	

  {
        flagImage: 'images/hungary.jpg',
        options: ['Romania', 'Hungary', 'Guinea', 'Nigeria'],
        correctAnswer: 'Hungary',
    },	

  {
        flagImage: 'images/mozambique.jpg',
        options: ['Mozambique', 'Zimbabwe', 'Kenya', 'South Africa'],
        correctAnswer: 'Mozambique',
    },	

  {
        flagImage: 'images/ghana.jpg',
        options: ['Botswana', 'Ehtiopia', 'Ghana', 'Zambia'],
        correctAnswer: 'Ghana',
    },	 */	
    // Add more questions here...
];
function checkAnswer(answer, questionIndex) {
    const selectedAnswer = answer.textContent;
    const correctAnswer = questions[questionIndex].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        answer.classList.add('correct-answer');
        answer.style.backgroundColor = 'green'; // Change background color to green for the correct answer

        if (!hasRestarted) {
            score++; // Increase the score by 1 if the answer is correct and not after a restart
            scoreDisplay.textContent = score;
        }
    } else {
        answer.classList.add('incorrect-answer');
        answer.style.backgroundColor = 'red'; // Change background color to red for incorrect answers
    }

    answers.forEach((ans) => ans.removeEventListener('click', checkAnswer));

    if (currentQuestion < questions.length - 1) {
        // If there are more questions, show the "Next" button for the next question
        nextButton.classList.remove('hide');
        nextButton.removeEventListener('click', () => loadQuestion(currentQuestion + 1));
    } else {
        // If all questions have been answered, show the "Restart" button
        nextButton.classList.add('hide');
        restartButton.classList.remove('hide');
    }
}

function restartQuiz() {
    hasRestarted = true; // Set the restart flag
    score = 0; // Reset the score to 0
    scoreDisplay.textContent = score; // Update the displayed score
    currentQuestion = 0;
    nextButton.textContent = 'Next';
    loadQuestion(currentQuestion);
    nextButton.classList.remove('hide');
    restartButton.classList.add('hide');
    answers.forEach((ans) => ans.addEventListener('click', () => checkAnswer(ans, currentQuestion)));
}

function loadQuestion(questionIndex) {
    const question = questions[questionIndex];
    flagImage.src = question.flagImage;
    answers.forEach((answer, index) => {
        answer.textContent = question.options[index];
        answer.classList.remove('correct-answer', 'incorrect-answer');
        answer.style.backgroundColor = ''; // Clear the background color
        answer.addEventListener('click', () => checkAnswer(answer, questionIndex));
    });
}

// Initialize the total number of questions
totalQuestionsDisplay.textContent = questions.length;

nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
        nextButton.classList.add('hide');
    } else {
        restartQuiz();
    }
});

restartButton.addEventListener('click', restartQuiz); // Handle restart button

loadQuestion(currentQuestion);
