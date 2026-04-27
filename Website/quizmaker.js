const urlParams = new URLSearchParams(window.location.search);
const quizId = urlParams.get('id');

const currentQuiz = quizData[quizId];