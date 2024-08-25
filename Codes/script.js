// JavaScript Code for Calculator and Copy Button

// Function to evaluate the expression and handle errors
function evaluateExpression() {
    const display = document.querySelector('.display input');
    try {
        display.value = eval(display.value) || "";
        addHistory(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

// Function to add calculation result to the history panel
function addHistory(result) {
    const historyPanel = document.getElementById('history');
    const newHistoryItem = document.createElement('div');
    newHistoryItem.classList.add('history-item');
    newHistoryItem.textContent = result;
    historyPanel.prepend(newHistoryItem); // Add new history item to the top
}

// Function to handle copy to clipboard
function copyToClipboard() {
    const display = document.querySelector('.display input');
    if (display.value) {
        navigator.clipboard.writeText(display.value)
            .then(() => {
                alert('Copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    } else {
        alert('Nothing to copy');
    }
}

// Function to toggle between Jedi and Sith themes
function toggleTheme() {
    document.body.classList.toggle('jedi-theme');
    document.body.classList.toggle('sith-theme');
}

// Function to handle keypresses on PC only
function handleKeyPress(event) {
    if (window.innerWidth >= 601) { // PC size
        const key = event.key;
        const display = document.querySelector('.display input');
        if (key >= '0' && key <= '9' || ['+', '-', '*', '/'].includes(key)) {
            display.value += key;
        } else if (key === 'Enter') {
            evaluateExpression();
        } else if (key === 'Backspace') {
            display.value = display.value.slice(0, -1);
        } else if (key === '.') {
            display.value += '.';
        }
    }
}

// Add event listener for keypresses
document.addEventListener('keypress', handleKeyPress);
