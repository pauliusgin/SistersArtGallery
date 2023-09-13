// ------------------------------------------------------------------------------

// Language change

const languageEnglish = document.querySelectorAll('.language-english');
const languageLithuanian = document.querySelectorAll('.language-lithuanian');
const languageToggle = document.getElementById('div-language-change');

let isLanguageEnglishVisible = true; // Initial state - English

languageToggle.addEventListener('click', () => {
    if (isLanguageEnglishVisible) {
        // Switch to Lithuanian
        languageEnglish.forEach(element => {
            element.style.display = 'none';
        });
        languageLithuanian.forEach(element => {
            element.style.display = 'block';
        });
    } else {
        // Switch to English
        languageLithuanian.forEach(element => {
            element.style.display = 'none';
        });
        languageEnglish.forEach(element => {
            element.style.display = 'block';
        });
    }

    // Toggle the state
    isLanguageEnglishVisible = !isLanguageEnglishVisible;
});

// ------------------------------------------------------------------------------