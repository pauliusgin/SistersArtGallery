//* Language change section

// changing language with a button 
const languageButtonLT = document.getElementById('LT-flag');
const languageButtonEN = document.getElementById('EN-flag');

function switchToLithuanian() {
    const language = document.querySelectorAll("[data-language]");
    language.forEach(element => {
        if (element.getAttribute("data-language") === "lt") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}

function switchToEnglish() {
    const language = document.querySelectorAll("[data-language]");
    language.forEach(element => {
        if (element.getAttribute("data-language") === "en") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
}

languageButtonLT.addEventListener("click", switchToLithuanian);
languageButtonEN.addEventListener("click", switchToEnglish);

// determining language when loading gallery images
const theGallery = document.getElementById("div-gallery-items");

const mutationObserver = new MutationObserver( () => {
    const lithuanianLanguageSelected = window.getComputedStyle(languageButtonEN).display;
        if (lithuanianLanguageSelected === "block") {
            switchToLithuanian();
    }
})

mutationObserver.observe(theGallery, {childList: true})


// ------------------------------------------------------------------------------


//* globally declaring the sisters gallery picture array for further use
let sistersGalleryArray; 


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
async function fetchAndCreate() {
    const response = await fetch("sisters_gallery.json");
    const pictureArray = await response.json();
    sistersGalleryArray = pictureArray;
    pictureArray.forEach(picture => {
        createGalleryItem(picture);
    })
}

// adding gallery items to DOM from a .json file once the page has loaded
document.addEventListener("DOMContentLoaded", fetchAndCreate);


//* filtering 

// function to remove currently displayed gallery items
function removeCurrent() {
    let galleryItems = document.querySelectorAll(".gallery-item")
    galleryItems.forEach(item => {item.remove()});
}

// function to show all gallery items
function showAllGallery() {
    removeCurrent();
    sistersGalleryArray.forEach(picture => {
        createGalleryItem(picture);
    })
    console.log(document.querySelectorAll(".gallery-item").length);
} 

// function to show gallery items only by Viltaute
function filterByViltaute() {
    removeCurrent();
    let filteredByViltaute = sistersGalleryArray.filter(picture => picture.authorEN === "Viltaute");
    filteredByViltaute.forEach(picture => {
        createGalleryItem(picture);
    })
    console.log(document.querySelectorAll(".gallery-item").length);
}

// function to show gallery items only by Jogaile
function filterByJogaile() {
    removeCurrent();
    let filteredByJogaile = sistersGalleryArray.filter(picture => picture.authorEN === "Jogaile");
    filteredByJogaile.forEach(picture => {
    createGalleryItem(picture);
    })
    console.log(document.querySelectorAll(".gallery-item").length); 
}

// function to show only cardboard gallery items
function filterByCardboard() {
    removeCurrent();
    let filteredByCardboard = sistersGalleryArray.filter(picture => picture.typeEN === "cardboard");
    filteredByCardboard.forEach(picture => {
        createGalleryItem(picture);
    })
    console.log(document.querySelectorAll(".gallery-item").length);
}

// the select elements for both languages
let filterSelectOptionEN = document.getElementById("filter-options-EN");
let filterSelectOptionLT = document.getElementById("filter-options-LT");

// match available options to their respective functions
let filterOptions = {
"everything": showAllGallery,
"viltaute": filterByViltaute,
"jogaile": filterByJogaile,
"cardboard": filterByCardboard
}

// function to run a filter function based on which option is selected
function filterResult(selectedElement) {
    let optionValue = selectedElement.value;
    let selectedFilter = filterOptions[optionValue];
    if (optionValue) {
        selectedFilter();
    }
}

// event listeners
filterSelectOptionEN.addEventListener("change", () => filterResult(filterSelectOptionEN));
filterSelectOptionLT.addEventListener("change", () => filterResult(filterSelectOptionLT));


//* sorting
