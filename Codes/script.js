// Function to evaluate the expression 
function evaluateExpression() {
    const display = document.querySelector('input[name="display"]');
    try {
        const result = eval(display.value); 
        display.value = result;
        addHistory(`${result}`); // Update history with the result
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1000); // Clear error after 1 second
    }
}

// Function to add history with timestamps
function addHistory(entry) {
    const historyPanel = document.getElementById('history');
    const timestamp = new Date().toLocaleTimeString();
    const newHistoryItem = document.createElement('div');
    newHistoryItem.className = 'history-item';
    newHistoryItem.textContent = `${timestamp}: ${entry}`;
    historyPanel.insertBefore(newHistoryItem, historyPanel.firstChild);
}

// Function to copy to clipboard
function copyToClipboard() {
    const display = document.querySelector('input[name="display"]');
    if (display.value.trim() === '') {
        alert('Nothing to copy!');
        return;
    }

    // Use clipboard API for modern browsers and fallback for older ones
    if (navigator.clipboard) {
        navigator.clipboard.writeText(display.value).then(
            () => alert('Copied to clipboard!'),
            () => alert('Failed to copy!')
        );
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = display.value;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            alert('Copied to clipboard!');
        } catch (err) {
            alert('Failed to copy!');
        }
        document.body.removeChild(textarea);
    }
}

// Function to toggle theme
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('jedi-theme');
    body.classList.toggle('sith-theme');
    updateMenuButtonColor(); // Update the menu button color when theme changes
}

// Function to handle keypress events
function handleKeyPress(event) {
    if (window.innerWidth >= 769 && !document.querySelector('.mobile-menu').classList.contains('mobile-menu-show')) { // PC and menu not open
        const display = document.querySelector('input[name="display"]');
        const key = event.key;

        if (/^[0-9]$/.test(key)) {
            display.value += key;
        } else if (['+', '-', '*', '/'].includes(key)) {
            display.value += ` ${key} `;
        } else if (key === 'Enter') {
            event.preventDefault(); // Prevent the default action to ensure our function runs
            evaluateExpression();
        } else if (key === 'Backspace') {
            display.value = display.value.slice(0, -1);
        }
    }
}

// Function to prevent typing directly into display on mobile
function handleMobileKeyPress(event) {
    if (window.innerWidth < 769) { // Mobile
        event.preventDefault(); // Prevent typing directly into display
    }
}

// Function to update menu button color based on theme
function updateMenuButtonColor() {
    const menuButton = document.querySelector('.mobile-menu-toggle');
    const body = document.body;

    if (menuButton) {
        menuButton.style.color = body.classList.contains('jedi-theme') ? '#fff' : '#f00'; // Update color based on theme
    }
}

// Function to toggle mobile menu visibility
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('.mobile-menu-toggle');
    if (window.innerWidth < 769 && menu) { // Ensure only on mobile
        menu.classList.toggle('mobile-menu-show');
        menuButton.style.display = menu.classList.contains('mobile-menu-show') ? 'none' : 'block';
        updateMenuButtonColor(); // Update the menu button color when menu is toggled
    }
}

// Function to close menu if clicking outside
function handleClickOutside(event) {
    const menu = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('.mobile-menu-toggle');
    if (menu && menu.classList.contains('mobile-menu-show') && !menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.classList.remove('mobile-menu-show');
        menuButton.style.display = 'block'; // Show menu button again
    }
}

// Function to toggle visibility of the history panel
function toggleHistoryVisibility() {
    const historyPanel = document.querySelector('.history-panel');
    const toggleHistoryButton = document.querySelector('.toggle-history');
    
    if (window.innerWidth < 769 && historyPanel && toggleHistoryButton) { // Ensure only on mobile
        const isVisible = historyPanel.style.display === 'block';
        historyPanel.style.display = isVisible ? 'none' : 'block';
        toggleHistoryButton.textContent = isVisible ? 'Show History' : 'Hide History';
    }
}

// Add event listeners for buttons and menu
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keypress', handleMobileKeyPress);
document.addEventListener('click', handleClickOutside);

// Ensure the Copy button works
const copyButton = document.querySelector('#copy-button');
if (copyButton) {
    copyButton.addEventListener('click', copyToClipboard);
}

// Mobile Menu
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

// History Button
const toggleHistoryButton = document.querySelector('.toggle-history');
if (toggleHistoryButton) {
    toggleHistoryButton.addEventListener('click', toggleHistoryVisibility);
}

// Theme Button
const themeButton = document.querySelector('.toggle-theme');
if (themeButton) {
    themeButton.addEventListener('click', toggleTheme);
}

// Clear History Button
const clearHistoryButton = document.querySelector('.clear-history-button');
if (clearHistoryButton) { 
    clearHistoryButton.addEventListener('click', function() {
        const historyPanel = document.getElementById('history');
        if (historyPanel) {
            historyPanel.innerHTML = ''; // Clear the history panel
            console.log("History cleared!");
        } else {
            console.log("History panel not found.");
        }
    });
} else {
    console.log("Clear history button not found.");
}

// Initial setup of menu button listeners and color update
updateMenuButtonColor();
