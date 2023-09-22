// ------------------------------------------------------------------------------

//* Language change

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

//* hamburger menu for smaller screens  

const openButton = document.querySelector(".open-button");
const closeButton = document.querySelector(".close-button");
const theMenu = document.querySelector(".ul-top");
let timeoutId;

// function to show the menu
function showMenu() {
    theMenu.classList.add("ul-top-visible"); // opens menu
    openButton.classList.remove("open-button-visible"); // hides hamburger
    closeButton.classList.add("close-button-visible"); // shows X
}

// function to hide the menu
function hideMenu() {
    theMenu.classList.remove("ul-top-visible");
    openButton.classList.add("open-button-visible"); // shows hamburger
    closeButton.classList.remove("close-button-visible"); // hides X
}

// shows the menu when hamburger is clicked 
openButton.addEventListener("click", showMenu);
openButton.addEventListener("touchstart", showMenu);

// closes the menu when X is clicked
closeButton.addEventListener("click", hideMenu);
closeButton.addEventListener("touchstart", hideMenu);

// close the menu when mouse pointer leaves the menu area
theMenu.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(hideMenu, 500);
});

// close the menu when mouse is clicked outside of button or menu area
document.addEventListener("click", (event) => {
    if (event.target !== openButton && event.target !== theMenu && event.target !== closeButton) { // TODO wondering about this line
        hideMenu();
    }
});

document.addEventListener("touchstart", (event) => {
    if (event.target !== openButton && event.target !== theMenu && event.target !== closeButton) {
        hideMenu();
    }
});

// --------------------------------------------------------------------------
