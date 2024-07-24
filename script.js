document.addEventListener("DOMContentLoaded", () => {
  const textDisplay = document.getElementById("text-display");
  const textInput = document.getElementById("text-input");
  const wpmDisplay = document.getElementById("wpm");
  const accuracyDisplay = document.getElementById("accuracy");
  const restartBtn = document.getElementById("restart-btn");

  const testText = "The quick brown fox jumps over the lazy dog.";
  let startTime;
  let timer;

  textInput.addEventListener("input", () => {
    if (!startTime) {
      startTime = new Date();
      timer = setInterval(updateStats, 1000);
    }

    const typedText = textInput.value;
    const correctChars = countCorrectChars(typedText, testText);
    const accuracy = (correctChars / typedText.length) * 100;
    const timeElapsed = (new Date() - startTime) / 1000 / 60; // in minutes
    const wpm = typedText.length / 5 / timeElapsed;

    accuracyDisplay.textContent = `Accuracy: ${accuracy.toFixed(2)}%`;
    wpmDisplay.textContent = `WPM: ${wpm.toFixed(2)}`;
  });

  restartBtn.addEventListener("click", () => {
    clearInterval(timer);
    startTime = null;
    textInput.value = "";
    accuracyDisplay.textContent = "Accuracy: 100%";
    wpmDisplay.textContent = "WPM: 0";
  });

  function countCorrectChars(input, reference) {
    let correct = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] === reference[i]) {
        correct++;
      }
    }
    return correct;
  }

  function updateStats() {
    const typedText = textInput.value;
    const correctChars = countCorrectChars(typedText, testText);
    const accuracy = (correctChars / typedText.length) * 100;
    const timeElapsed = (new Date() - startTime) / 1000 / 60; // in minutes
    const wpm = typedText.length / 5 / timeElapsed;

    accuracyDisplay.textContent = `Accuracy: ${accuracy.toFixed(2)}%`;
    wpmDisplay.textContent = `WPM: ${wpm.toFixed(2)}`;
  }
});
