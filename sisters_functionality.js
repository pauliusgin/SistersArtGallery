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

// function to fetch the .json file and create gallery items from an array of pictures in it

let allGalleryPictures;
let picturesCurrentlyBeingDisplayed;
let sortingOrder;

async function fetchAndCreate() {
    const response = await fetch("sisters_gallery.json");
    const pictureArray = await response.json();
    allGalleryPictures = pictureArray;
    picturesCurrentlyBeingDisplayed = allGalleryPictures;
    pictureArray.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    sortingOrder = "newest first";
    pictureArray.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures are being shown, " + sortingOrder);
}

// adding gallery items to DOM from a .json file once the page has loaded
document.addEventListener("DOMContentLoaded", fetchAndCreate);


//* filtering 

// function to remove currently displayed gallery items
function removeCurrent() {
    let galleryItems = document.querySelectorAll(".gallery-item")
    galleryItems.forEach(item => item.remove());
}

// function to show all gallery items
function showAllGallery() {
    removeCurrent();
    picturesCurrentlyBeingDisplayed = allGalleryPictures;
    allGalleryPictures.forEach(picture => createGalleryItem(picture))
    console.log("All " + document.querySelectorAll(".gallery-item").length + " pictures are being shown.");
} 


// function to show gallery items only by Viltaute
function filterByViltaute() {
    removeCurrent();
    let picturesByViltaute = allGalleryPictures.filter(picture => picture.authorEN === "Viltaute");
    picturesCurrentlyBeingDisplayed = picturesByViltaute;
    picturesByViltaute.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures by Viltaute are being shown.");
}

// function to show gallery items only by Jogaile
function filterByJogaile() {
    removeCurrent();
    let picturesByJogaile = allGalleryPictures.filter(picture => picture.authorEN === "Jogaile");
    picturesCurrentlyBeingDisplayed = picturesByJogaile;
    picturesByJogaile.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " pictures by Jogaile are being shown.");
}

// function to show only cardboard gallery items
function filterByCardboard() {
    removeCurrent();
    let cardboardPictures = allGalleryPictures.filter(picture => picture.typeEN === "cardboard");
    picturesCurrentlyBeingDisplayed = cardboardPictures;
    cardboardPictures.forEach(picture => createGalleryItem(picture));
    console.log(document.querySelectorAll(".gallery-item").length + " cardboard pictures are being shown.");
}

// the filter select elements for both languages
const filterOptionsEN = document.getElementById("filter-options-EN");
const filterOptionsLT = document.getElementById("filter-options-LT");

// function to run a filter function based on which option is selected
function filterResult() {
    if (filterOptionsEN.value === "viltaute" || filterOptionsLT.value === "viltaute") {
    filterByViltaute();
    } else if (filterOptionsEN.value === "jogaile" || filterOptionsLT.value === "jogaile") {
        filterByJogaile();
    } else if (filterOptionsEN.value === "cardboard" || filterOptionsLT.value === "cardboard") {
        filterByCardboard();
    } else if (filterOptionsEN.value === "everything" || filterOptionsLT.value === "everything") {
        showAllGallery();
    }
}

// event listeners
filterOptionsEN.addEventListener("change", filterResult);
filterOptionsLT.addEventListener("change", filterResult);


//* sorting

// function to sort current gallery items by date, newest to oldest
const sortByDateNewestFirst = (picturesCurrentlyBeingDisplayed) => {
    removeCurrent();
    picturesCurrentlyBeingDisplayed.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    picturesCurrentlyBeingDisplayed.forEach(picture => createGalleryItem(picture));
    console.log("New pictures are being shown first")
}

// function to sort current gallery items by date, oldest to newest
const sortByDateOldestFirst = (picturesCurrentlyBeingDisplayed) => {
    removeCurrent();
    picturesCurrentlyBeingDisplayed.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
    picturesCurrentlyBeingDisplayed.forEach(picture => createGalleryItem(picture));
    console.log("Old pictures are being shown first")
}

// the sorting select elements for both languages
const sortOptionsEN = document.getElementById("sort-options-EN");
const sortOptionsLT = document.getElementById("sort-options-LT");

// function to sort gallery pictures by date
function sortingResult() {
    if (sortOptionsEN.value === "oldest" || sortOptionsLT.value === "oldest") {
        sortByDateOldestFirst(picturesCurrentlyBeingDisplayed);
    } else if (sortOptionsEN.value === "newest" || sortOptionsLT.value === "newest") {
        sortByDateNewestFirst(picturesCurrentlyBeingDisplayed);
    }
}

// event listeners
sortOptionsEN.addEventListener("change", sortingResult);
sortOptionsLT.addEventListener("change", sortingResult);