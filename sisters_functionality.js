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
    pictureArray.forEach((picture) => {
        createGalleryItem(picture);
    })
}

// adding gallery items to DOM from a .json file once the page has loaded
document.addEventListener("DOMContentLoaded", fetchAndCreate);


//* filtering 

// initial state of the gallery
let showingAllGalleryItems = true;
let showingOnlyViltaute = false;
let showingOnlyJogaile = false;
let showingOnlyCardboard = false;

// function to remove currently displayed gallery items
function removeCurrent() {
    let galleryItems = document.querySelectorAll(".gallery-item")
    galleryItems.forEach((item) => {item.remove()});
}

// function to show all gallery items
function showAllGallery() {
    sistersGalleryArray.forEach((picture) => {
        createGalleryItem(picture);
    })
} 

// function to toggle gallery items only by Viltaute
function filterByViltaute() {
    if (showingAllGalleryItems || showingOnlyJogaile || showingOnlyCardboard) {
        removeCurrent();
        let filteredByViltaute = sistersGalleryArray.filter((picture) => picture.authorEN === "Viltaute");
        filteredByViltaute.forEach((picture) => {
            createGalleryItem(picture);
        })
        showingAllGalleryItems = false;
        showingOnlyViltaute = true;
    } else {
        removeCurrent();
        showAllGallery();
        showingAllGalleryItems = true;
        showingOnlyViltaute = false;
    }
    console.log(document.querySelectorAll(".gallery-item").length);
}

// function to show gallery items only by Jogaile
function filterByJogaile() {
    if (showingAllGalleryItems || showingOnlyViltaute || showingOnlyCardboard) {
        removeCurrent();
        let filteredByJogaile = sistersGalleryArray.filter((picture) => picture.authorEN === "Jogaile");
        filteredByJogaile.forEach((picture) => {
        createGalleryItem(picture);
        })
        showingAllGalleryItems = false;
        showingOnlyJogaile = true;
    } else {
        removeCurrent();
        showAllGallery();
        showingAllGalleryItems = true;
        showingOnlyJogaile = false;
    }
    console.log(document.querySelectorAll(".gallery-item").length); 
}

// function to show only cardboard gallery items
function filterByCardboard() {
    if (showingAllGalleryItems || showingOnlyViltaute || showingOnlyJogaile) {
        removeCurrent();
        let filteredByCardboard = sistersGalleryArray.filter((picture) => picture.typeEN === "cardboard");
        filteredByCardboard.forEach((picture) => {
            createGalleryItem(picture);
        })
        showingAllGalleryItems = false;
        showingOnlyCardboard = true;
    } else {
        removeCurrent();
        showAllGallery();
        showingAllGalleryItems = true;
        showingOnlyCardboard = false;
    }
    console.log(document.querySelectorAll(".gallery-item").length);
}

// event handlers for filter buttons
const filterByViltauteButtons = document.querySelectorAll("[data-filter=\"Viltaute\"]");
filterByViltauteButtons.forEach((button) => {
    button.addEventListener("click", filterByViltaute);
})

const filterByJogaileButtons = document.querySelectorAll("[data-filter=\"Jogaile\"]");
filterByJogaileButtons.forEach((button) => {
    button.addEventListener("click", filterByJogaile);
})

const filterByCardboardButtons = document.querySelectorAll("[data-filter=\"cardboard\"]");
filterByCardboardButtons.forEach((button) => {
    button.addEventListener("click", filterByCardboard);
})


//* sorting