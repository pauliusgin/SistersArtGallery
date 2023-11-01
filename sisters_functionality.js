//* Language change section

// changing language with a button 
const languageButtonLT = document.getElementById('LT-flag');
const languageButtonEN = document.getElementById('EN-flag');

function switchLanguage(lang) {
    const language = document.querySelectorAll("[data-language]");
    language.forEach(element => {
        if (element.getAttribute("data-language") === lang) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
    inputFieldEN.value = "";
    inputFieldLT.value = "";
}

languageButtonLT.addEventListener("click", () => switchLanguage("lt"));
languageButtonEN.addEventListener("click", () => switchLanguage("en"));

// determining language when loading gallery images
const theGallery = document.getElementById("div-gallery-items");

const mutationObserver = new MutationObserver( () => {
    const lithuanianLanguageSelected = window.getComputedStyle(languageButtonEN).display;
        if (lithuanianLanguageSelected === "block") {
            switchLanguage("lt");
    }
})

mutationObserver.observe(theGallery, {childList: true})


//* fetching .json and creating a gallery of pictures from it 

// function to create a gallery item in DOM from a .json object
function createGalleryItem(picture) {
    const figure = document.createElement("figure");
    const galleryImage = document.createElement("img");
    const figcaptionEN = document.createElement("figcaption");
    const figcaptionLT = document.createElement("figcaption");
    
    // add classes and attributes to the elements
    figure.classList.add("gallery-item");
    galleryImage.classList.add("gallery-image");
    figcaptionEN.setAttribute("data-language", "en");
    figcaptionLT.setAttribute("data-language", "lt");

    // add attributes to the pictures
    galleryImage.src = `${picture.url}`;
    galleryImage.alt = `${picture.titleEN}`;
    galleryImage.loading = "lazy";
    
    // check if author has a valid value
    const authorEN = picture.authorEN ? `${picture.authorEN}, ${picture.age} y/o, ` : "";
    const authorLT = picture.authorLT ? `${picture.authorLT}, ${picture.age} m., ` : "";
    

    // check if title has a valid value
    const titleEN = picture.titleEN ? `${picture.titleEN}` : "";
    const titleLT = picture.titleLT ? `${picture.titleLT}` : "";

    // write the text into the figcaption
    figcaptionEN.textContent = `${authorEN} ${titleEN}`;
    figcaptionLT.textContent = `${authorLT} ${titleLT}`;
    
    // adding the elements to DOM
    const theGallery = document.getElementById("div-gallery-items");
    
    theGallery.appendChild(figure);
    figure.appendChild(galleryImage);
    figure.appendChild(figcaptionEN);
    figure.appendChild(figcaptionLT);
} 

//* global variables below
//* ----------------------
// keep the fetched json object
let allGalleryPictures;

// keep track of items being displayed in the gallery
let picturesCurrentlyBeingDisplayed;

//keep track of the sorting order
let sortingOrder;
//* ----------------------
//* global variables above

// function to fetch the .json file and create gallery items from an array of pictures in it
async function fetchAndCreate() {
    const response = await fetch("sisters_gallery.json");
    const pictureArray = await response.json();
    allGalleryPictures = pictureArray;
    picturesCurrentlyBeingDisplayed = allGalleryPictures;
    pictureArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    sortingOrder = "newest first";
    pictureArray.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures are being shown, " + sortingOrder);
}

// adding gallery items to DOM from a .json file once the page has loaded
document.addEventListener("DOMContentLoaded", fetchAndCreate);


//* filtering 

// function to remove currently displayed gallery items
function removeCurrentGalleryItems() {
    const galleryItems = document.querySelectorAll(".gallery-item")
    galleryItems.forEach(item => item.remove());
}

// function to show all gallery items
function showAllGallery() {
    removeCurrentGalleryItems();
    picturesCurrentlyBeingDisplayed = allGalleryPictures;
    if (sortingOrder === "oldest first") {
        allGalleryPictures.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
        allGalleryPictures.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    allGalleryPictures.forEach(picture => createGalleryItem(picture))
    console.log("All " + document.querySelectorAll(".gallery-item").length + " pictures are being shown, " + sortingOrder);
} 

// function to show gallery items only by Viltaute
function filterByViltaute() {
    removeCurrentGalleryItems();
    let picturesByViltaute = allGalleryPictures.filter(picture => picture.authorEN === "Viltaute");
    picturesCurrentlyBeingDisplayed = picturesByViltaute;
    if (sortingOrder === "oldest first") {
        picturesByViltaute.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
        picturesByViltaute.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    picturesByViltaute.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures by Viltaute are being shown, " + sortingOrder);
}

// function to show gallery items only by Jogaile
function filterByJogaile() {
    removeCurrentGalleryItems();
    let picturesByJogaile = allGalleryPictures.filter(picture => picture.authorEN === "Jogaile");
    picturesCurrentlyBeingDisplayed = picturesByJogaile;
    if (sortingOrder === "oldest first") {
        picturesByJogaile.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
        picturesByJogaile.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    picturesByJogaile.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures by Jogaile are being shown, " + sortingOrder);
}

// function to show only cardboard gallery items
function filterByCardboard() {
    removeCurrentGalleryItems();
    let cardboardPictures = allGalleryPictures.filter(picture => picture.typeEN === "cardboard");
    picturesCurrentlyBeingDisplayed = cardboardPictures;
    if (sortingOrder === "oldest first") {
        cardboardPictures.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
        cardboardPictures.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    cardboardPictures.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " cardboard pictures are being shown, " + sortingOrder);
}

// the filter select elements for both languages
const filterOptionsEN = document.getElementById("filter-options-EN");
const filterOptionsLT = document.getElementById("filter-options-LT");

// function to run a filter function based on which option is selected
function filterResultEN() {
    if (filterOptionsEN.value === "viltaute") {
    filterByViltaute();
    filterOptionsLT.selectedIndex = 1;
    } else if (filterOptionsEN.value === "jogaile") {
        filterByJogaile();
        filterOptionsLT.selectedIndex = 2;
    } else if (filterOptionsEN.value === "cardboard") {
        filterByCardboard();
        filterOptionsLT.selectedIndex = 3;
    } else if (filterOptionsEN.value === "everything") {
        showAllGallery();
        filterOptionsLT.selectedIndex = 0;
    }
}

function filterResultLT() {
    if (filterOptionsLT.value === "viltaute") {
    filterByViltaute();
    filterOptionsEN.selectedIndex = 1;
    } else if (filterOptionsLT.value === "jogaile") {
        filterByJogaile();
        filterOptionsEN.selectedIndex = 2;
    } else if (filterOptionsLT.value === "cardboard") {
        filterByCardboard();
        filterOptionsEN.selectedIndex = 3;
    } else if (filterOptionsLT.value === "everything") {
        showAllGallery();
        filterOptionsEN.selectedIndex = 0;
    }
}

// event listeners
filterOptionsEN.addEventListener("change", filterResultEN);
filterOptionsLT.addEventListener("change", filterResultLT);


//* sorting

// function to sort current gallery items by date, newest to oldest
const sortByDateNewestFirst = () => {
    removeCurrentGalleryItems();
    picturesCurrentlyBeingDisplayed.sort((a, b) => new Date(b.date) - new Date(a.date));
    sortingOrder = "newest first";
    picturesCurrentlyBeingDisplayed.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures are being shown, " + sortingOrder)
}

// function to sort current gallery items by date, oldest to newest
const sortByDateOldestFirst = () => {
    removeCurrentGalleryItems();
    picturesCurrentlyBeingDisplayed.sort((a, b) => new Date(a.date) - new Date(b.date));
    sortingOrder = "oldest first";
    picturesCurrentlyBeingDisplayed.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures are being shown, " + sortingOrder)
}

// the sorting select elements for both languages
const sortOptionsEN = document.getElementById("sort-options-EN");
const sortOptionsLT = document.getElementById("sort-options-LT");
const englishLanguageSelected = window.getComputedStyle(languageButtonLT).display;

// function to sort gallery pictures by date
function sortingResultEN() {
    if (sortOptionsEN.value === "oldest") {
        sortByDateOldestFirst();
        sortOptionsLT.selectedIndex = 1;
    } else if (sortOptionsEN.value === "newest") {
        sortByDateNewestFirst();
        sortOptionsLT.selectedIndex = 0;
    }
}

function sortingResultLT() {
    if (sortOptionsLT.value === "oldest") {
        sortByDateOldestFirst();
    sortOptionsEN.selectedIndex = 1;
    } else if (sortOptionsLT.value === "newest") {
        sortByDateNewestFirst();
    sortOptionsEN.selectedIndex = 0;
    }
}

// event listeners
sortOptionsEN.addEventListener("change", sortingResultEN);
sortOptionsLT.addEventListener("change", sortingResultLT);


//* search

// input fields
const inputFieldEN = document.getElementById("input-field-EN");
const inputFieldLT = document.getElementById("input-field-LT");

// search queries

// function to search 
function searchResultEN() {
    removeCurrentGalleryItems();
    const searchQueryEN = inputFieldEN.value;
    let searchMatchesEN = picturesCurrentlyBeingDisplayed.filter(picture =>
            (picture.authorEN && picture.authorEN.toLowerCase().includes(searchQueryEN.toLowerCase())) ||
            (picture.titleEN && picture.titleEN.toLowerCase().includes(searchQueryEN.toLowerCase())) || 
            (picture.methodEN && picture.methodEN.toLowerCase().includes(searchQueryEN.toLowerCase()))
    )
    searchMatchesEN.forEach(picture => createGalleryItem(picture));
    console.log("Search for " + '"' + searchQueryEN + '"' + " returned " + document.querySelectorAll(".gallery-item").length + " pictures.")
}

function searchResultLT() {
    removeCurrentGalleryItems();
    const searchQueryLT = inputFieldLT.value;
    let searchMatchesLT = picturesCurrentlyBeingDisplayed.filter(picture =>
            (picture.authorLT && picture.authorLT.toLowerCase().includes(searchQueryLT.toLowerCase())) ||
            (picture.titleLT && picture.titleLT.toLowerCase().includes(searchQueryLT.toLowerCase())) || 
            (picture.methodLT && picture.methodLT.toLowerCase().includes(searchQueryLT.toLowerCase()))
    )
    searchMatchesLT.forEach(picture => createGalleryItem(picture));
    console.log("Search for " + '"' + searchQueryLT + '"' + " returned " + document.querySelectorAll(".gallery-item").length + " pictures.")
}

inputFieldEN.addEventListener("input", searchResultEN)
inputFieldLT.addEventListener("input", searchResultLT)



// function searchResultEN() {
//     const galleryItemsArray = Array.from(document.querySelectorAll(".gallery-item"));
//     galleryItemsArray.forEach(item => {
//         const englishCaption = item.querySelector("[data-language='en']").innerText.toLowerCase();
//         const textInputEN = inputFieldEN.value.toLowerCase();
//         if (englishCaption.includes(textInputEN)) {
//             item.style.display = "block"
//         } else {
//             item.style.display = "none"
//     }   
//     })
// }

// function searchResultLT() {
//     const galleryItemsArray = Array.from(document.querySelectorAll(".gallery-item"));
//     galleryItemsArray.forEach(item => {
//         const lithuanianCaption = item.querySelector("[data-language='lt']").innerText.toLowerCase();
//         const textInputLT = inputFieldLT.value.toLowerCase();
//         if (lithuanianCaption.includes(textInputLT)) {
//             item.style.display = "block"
//         } else {
//             item.style.display = "none"
//     }   
//     })
// }