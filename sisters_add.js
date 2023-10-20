// function to create a gallery item
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

// function to fetch the .json file and create gallery items from it
async function fetchAndCreate() {
    const response = await fetch("sisters_gallery.json");
    const pictureArray = await response.json();
    pictureArray.forEach((picture) => {
        createGalleryItem(picture);
    })
}

// adding gallery items from a .json file once the page has loaded
document.addEventListener("DOMContentLoaded", fetchAndCreate);