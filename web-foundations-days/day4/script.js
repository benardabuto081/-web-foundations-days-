const textarea = document.getElementById('note-text');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const clearBtn = document.getElementById('clear-btn');
const themeToggleBtn = document.getElementById('theme-toggle');

const MAX_CHARS = 200;

// Function to update character and word counts + apply threshold classes
function updateCounts() {
    const text = textarea.value;
    const currentLength = text.length;
    
    // Calculate word count (splitting by whitespace, filtering out empty strings)
    const words = text.trim() === '' ? [] : text.trim().split(/\s+/);
    const currentWords = words.length;

    // Update text content
    charCount.textContent = `${currentLength} / ${MAX_CHARS} characters`;
    wordCount.textContent = `${currentWords} ${currentWords === 1 ? 'word' : 'words'}`;

    // Reset classes
    charCount.className = '';

    // Apply warning (> 180) or over (> 200) styling
    if (currentLength > MAX_CHARS) {
        charCount.classList.add('over');
    } else if (currentLength > 180) {
        charCount.classList.add('warning');
    }
}

// Save draft and update counts on input
textarea.addEventListener('input', () => {
    updateCounts();
    localStorage.setItem('draft', textarea.value);
});

// Clear button logic
function clearAll() {
    textarea.value = '';
    localStorage.removeItem('draft');
    updateCounts();
    textarea.focus();
}

clearBtn.addEventListener('click', clearAll);

// Escape key shortcut inside textarea
textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        clearAll();
    }
});

// Theme Toggle logic
function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark');
        themeToggleBtn.textContent = 'Light mode';
    } else {
        document.body.classList.remove('dark');
        themeToggleBtn.textContent = 'Dark mode';
    }
}

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    themeToggleBtn.textContent = isDark ? 'Light mode' : 'Dark mode';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Initial load: Restore state from localStorage
window.addEventListener('DOMContentLoaded', () => {
    // Restore text draft
    const savedDraft = localStorage.getItem('draft');
    if (savedDraft !== null) {
        textarea.value = savedDraft;
    }

    // Restore theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    // Run initial count calculation
    updateCounts();
});
