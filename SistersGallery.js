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
let isTouchDevice = false; // we assume the initial device is not a touch device


// function to show the menu
function showMenu() {
    theMenu.style.display = "block"; // opens menu
    openButton.style.display = "none"; // hides hamburger
    closeButton.style.display = "block"; // shows X
}

// function to hide the menu
function hideMenu() {
    theMenu.style.display = "none"; // closes menu
    openButton.style.display = "block"; // shows hamburger
    closeButton.style.display = "none"; // hides X
}


// shows the menu when hamburger is pressed 
// when touch event is detected, prevents "click" from happening
openButton.addEventListener("touchstart", function (event) {
    isTouchDevice = true;
    event.preventDefault();
    isTouchDevice = false; // reset the flag
    showMenu();
});

// if a click is detected, it opens a menu
openButton.addEventListener("click", showMenu);


// closes the menu when X is touched
// when touch event is detected, prevents "click" from happening
closeButton.addEventListener("touchstart", function (event) {
    isTouchDevice = true;
    event.preventDefault();
    isTouchDevice = false; // reset the flag
    hideMenu();
});

// closes the menu when X is clicked
closeButton.addEventListener("click", hideMenu);


// close the menu when mouse pointer leaves the menu area
theMenu.addEventListener("mouseleave", () => {
    timeoutId = setTimeout(hideMenu, 500);
});

//close the menu when mouse is clicked outside of button or menu area
document.addEventListener("click", (event) => {
    if (event.target !== theMenu && event.target !== closeButton) {
        hideMenu();
    }
});


// todo Wondering about this section below
// close the menu when screen is touched outside of button or menu area
// document.addEventListener("touchstart", (event) => {
//     isTouchDevice = true;
//     event.preventDefault();
//     isTouchDevice = false;
//     if (event.target !== theMenu && event.target !== closeButton) {
//         hideMenu();
//     }
// });
// todo Wondering about this section above

// --------------------------------------------------------------------------


