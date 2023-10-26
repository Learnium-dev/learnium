export const grade = (score) => {
  if (score >= 0.95) {
    return "A+";
  } else if (score >= 0.9) {
    return "A";
  } else if (score >= 0.85) {
    return "A-";
  } else if (score >= 0.8) {
    return "B+";
  } else if (score >= 0.75) {
    return "B";
  } else if (score >= 0.7) {
    return "B-";
  } else if (score >= 0.65) {
    return "C+";
  } else if (score >= 0.6) {
    return "C";
  } else {
    return "F";
  }
};

export const encourageMessage = (score) => {
  if (!score) return;
  if (score >= 0.95) {
    return "Keep Excelling!";
  } else if (score >= 0.9) {
    return "Maintain Your Momentum!";
  } else if (score >= 0.85) {
    return "Stay on the Path to Success!";
  } else if (score >= 0.8) {
    return "Solidify Your Knowledge!";
  } else if (score >= 0.75) {
    return "Push Harder, Keep Going!";
  } else if (score >= 0.7) {
    return "Make Progress!";
  } else if (score >= 0.65) {
    return "Review and Improvement";
  } else if (score >= 0.6) {
    return "Seek Improvement";
  } else {
    return "Take Time to Strengthen";
  }
};

export const todayProgress = (keyTopics) => {
  let progress = 0;
  let averageProgress = 0;
  keyTopics.forEach((keyTopic) => {
    if (keyTopic.progress >= 0.8 && keyTopic.numQuizzes >= 3) {
      progress++;
    }
    averageProgress += keyTopic.progress;
  });
  const progressPercentage = (progress * 100) / keyTopics.length;
  averageProgress = averageProgress / keyTopics.length;
  return { progressPercentage, averageProgress };
};

export const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
}

export const isToday = (date) => {
    const givenDate = new Date(date);
    const today = new Date();
    return givenDate.toLocaleDateString("en-US", dateOptions) === today.toLocaleDateString("en-US", dateOptions);
}

export const isBeforeToday = (date) => {
    const givenDate = new Date(date);
    const today = new Date();
    givenDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return givenDate < today;
}
