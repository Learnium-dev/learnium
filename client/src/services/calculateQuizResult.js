export function calculateQuizPercentage(quizData) {
  let correctCount = 0;
  const totalQuestions = quizData.length;

  for (const question of quizData) {
    if (question.correct === true) {
      correctCount++;
    }
  }
  const percentageCorrect = (correctCount / totalQuestions) * 100;
  return percentageCorrect;
}

export function calculateQuizScore(quizData) {
  let correctCount = 0;
  const totalQuestions = quizData.length;

  for (const question of quizData) {
    if (question.correct === true) {
      correctCount++;
    }
  }

  let incorrectCount = totalQuestions - correctCount;
  const response = {
    correctCount,
    incorrectCount,
  
  }
  return response;
}
