document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById("text-to-type");
  const userInput = document.getElementById("user-input");
  const startButton = document.getElementById("start-btn");
  const timerElement = document.getElementById("timer");
  const wpmElement = document.getElementById("wpm");
  const accuracyElement = document.getElementById("accuracy");

  let startTime;
  let timerInterval;
  let totalWords = 0;
  let correctWords = 0;

  // Fetch text from an API
  fetch("https://api.quotable.io/random") // Placeholder API
    .then((response) => response.json())
    .then((data) => {
      textElement.textContent = data.content;
    });

  // Start button event listener
  startButton.addEventListener("click", () => {
    userInput.disabled = false;
    userInput.focus();
    userInput.value = "";
    startButton.disabled = true;

    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    totalWords = 0;
    correctWords = 0;
  });

  function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (elapsedTime % 60).toString().padStart(2, "0");
    timerElement.textContent = `${minutes}:${seconds}`;

    if (elapsedTime > 0) {
      const wpm = Math.round(correctWords / (elapsedTime / 60));
      wpmElement.textContent = `WPM: ${wpm}`;
    }
  }

  function calculateAccuracy() {
    const text = textElement.textContent.split(" ");
    const typedWords = userInput.value.trim().split(" ");
    const correctWordsCount = typedWords.filter(
      (word, index) => word === text[index]
    ).length;
    return ((correctWordsCount / text.length) * 100).toFixed(2);
  }

  // Check user input
  userInput.addEventListener("input", () => {
    const typedText = userInput.value;
    const originalText = textElement.textContent;

    if (typedText === originalText) {
      clearInterval(timerInterval);
      alert("Congratulations! You completed the test.");
      userInput.disabled = true;
      startButton.disabled = false;
      accuracyElement.textContent = `Accuracy: ${calculateAccuracy()}%`;
    } else {
      const typedWords = typedText.split(" ");
      const originalWords = originalText.split(" ");
      correctWords = typedWords.filter(
        (word, index) => word === originalWords[index]
      ).length;
      accuracyElement.textContent = `Accuracy: ${calculateAccuracy()}%`;
    }
  });
});
