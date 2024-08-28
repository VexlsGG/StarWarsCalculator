// Evaluate the expression in the display input and handle errors
function evaluateExpression() {
    try {
        const display = document.querySelector('input[name="display"]');
        const result = eval(display.value); // Be cautious with eval; consider a safer method
        display.value = result;
        addHistory(display.value);
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1000); // Clear error after 1 second
    }
}

// Add the calculation result to the history panel
function addHistory(entry) {
    const historyPanel = document.getElementById('history');
    const newHistoryItem = document.createElement('div');
    newHistoryItem.className = 'history-item';
    newHistoryItem.textContent = entry;
    historyPanel.insertBefore(newHistoryItem, historyPanel.firstChild);
}

// Copy the current display value to the clipboard
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
        // Fallback for browsers that do not support clipboard API
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

// Toggle between Jedi and Sith themes
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('jedi-theme')) {
        body.classList.remove('jedi-theme');
        body.classList.add('sith-theme');
    } else {
        body.classList.remove('sith-theme');
        body.classList.add('jedi-theme');
    }
    updateMenuButtonColor(); // Update the menu button color when theme changes
}

// Handle keypress events on PC
function handleKeyPress(event) {
    if (window.innerWidth >= 769 && !document.querySelector('.mobile-menu').classList.contains('mobile-menu-show')) { // PC and menu not open
        const display = document.querySelector('input[name="display"]');
        const key = event.key;

        if (/^[0-9]$/.test(key)) {
            display.value += key;
        } else if (['+', '-', '*', '/'].includes(key)) {
            display.value += ` ${key} `;
        } else if (key === 'Enter') {
            evaluateExpression();
        } else if (key === 'Backspace') {
            display.value = display.value.slice(0, -1);
        }
    }
}

// Prevent typing directly into display on mobile devices
function handleMobileKeyPress(event) {
    if (window.innerWidth < 769) { // Mobile
        event.preventDefault(); // Prevent typing directly into display
    }
}

// Update color of the hamburger menu icon based on the current theme
function updateMenuButtonColor() {
    const menuButton = document.querySelector('.mobile-menu-toggle');
    const body = document.body;

    if (menuButton) {
        if (body.classList.contains('jedi-theme')) {
            menuButton.style.color = '#fff'; // Light color for Jedi theme
        } else if (body.classList.contains('sith-theme')) {
            menuButton.style.color = '#f00'; // Dark color for Sith theme
        }
    }
}

// Toggle mobile menu visibility
function toggleMobileMenu() {
    const menu = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('.mobile-menu-toggle');
    if (window.innerWidth < 769 && menu) { // Ensure only on mobile
        menu.classList.toggle('mobile-menu-show');
        menuButton.style.display = menu.classList.contains('mobile-menu-show') ? 'none' : 'block';
        updateMenuButtonColor(); // Update the menu button color when menu is toggled
    }
}

// Close menu if clicking outside
function handleClickOutside(event) {
    const menu = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('.mobile-menu-toggle');
    if (menu.classList.contains('mobile-menu-show') && !menu.contains(event.target) && !menuButton.contains(event.target)) {
        menu.classList.remove('mobile-menu-show');
        menuButton.style.display = 'block'; // Show menu button again
    }
}

// Toggle visibility of the history panel
function toggleHistoryVisibility() {
    const historyPanel = document.querySelector('.history-panel');
    const toggleHistoryButton = document.querySelector('.toggle-history');
    
    if (window.innerWidth < 769 && historyPanel && toggleHistoryButton) { // Ensure only on mobile
        if (historyPanel.style.display === 'none' || historyPanel.style.display === '') {
            historyPanel.style.display = 'block';
            toggleHistoryButton.textContent = 'Hide History';
        } else {
            historyPanel.style.display = 'none';
            toggleHistoryButton.textContent = 'Show History';
        }
    }
}

// Add event listeners for buttons and menu
document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keypress', handleMobileKeyPress);
document.addEventListener('click', handleClickOutside);

// Ensure the Copy button works on mobile
const copyButton = document.querySelector('.copy-button');
if (copyButton) {
    copyButton.addEventListener('click', copyToClipboard);
}

// Mobile Menu
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
if (mobileMenuToggle) { // Ensure the toggle button exists
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

// History Button
const toggleHistoryButton = document.querySelector('.toggle-history');
if (toggleHistoryButton) { // Ensure the toggle button exists
    toggleHistoryButton.addEventListener('click', toggleHistoryVisibility);
}

// Theme Button
const themeButton = document.querySelector('.toggle-theme');
if (themeButton) { // Ensure the theme toggle button exists
    themeButton.addEventListener('click', toggleTheme);
}

// Initial setup of menu button listeners and color update
updateMenuButtonColor();
