// Function to evaluate the expression
function evaluateExpression() {
  try {
    const display = document.querySelector('input[name="display"]');
    const equation = display.value;
    const result = eval(equation);
    if (isNaN(result) || !isFinite(result)) throw new Error("Invalid Calculation");
    const fullEquation = `${equation} = ${result}`;
    display.value = result;
    addToHistory(fullEquation);
    // playSound('click-sound'); // Uncomment when audio is fixed
  } catch (e) {
    triggerShake();
    display.value = "Error";
    setTimeout(() => display.value = '', 1000); // Clear after 1 second
    // playSound('error-sound'); // Uncomment when audio is fixed
  }
}

// Add successful calculation to history
function addToHistory(value) {
  const historyDiv = document.getElementById('history');

  // Check if the value already exists in history
  const existingItems = Array.from(historyDiv.children).map(item => item.textContent);
  if (!existingItems.includes(value)) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.textContent = value;
    historyDiv.prepend(historyItem); // Add new items to the top
  }
}

// Function to trigger a shake effect
function triggerShake() {
  const calculator = document.querySelector('.calculator');
  calculator.classList.add('shake');
  setTimeout(() => calculator.classList.remove('shake'), 500);
}

// Function to toggle the theme
function toggleTheme() {
  const body = document.body;
  body.classList.toggle('sith-theme');
  body.classList.toggle('jedi-theme');
}

// Uncomment and configure these functions when audio is available
// function playSound(soundName) {
//   const audio = new Audio(`sounds/${soundName}.mp3`);
//   audio.play().catch(e => console.error('Audio playback error:', e));
// }
