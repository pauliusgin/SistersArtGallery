//* hamburger menu section  

const openMenuButton = document.querySelector(".open-menu-button");
const closeMenuButton = document.querySelector(".close-menu-button");
const theMenu = document.querySelector(".ul-menu");
let timeoutId;
let isTouchDevice = false; // we assume the initial device is not a touch device


// function to show the menu
function showMenu() {
    theMenu.style.display = "block"; // opens menu
    openMenuButton.style.display = "none"; // hides hamburger
    closeMenuButton.style.display = "block"; // shows X
}

// function to hide the menu
function hideMenu() {
    theMenu.style.display = "none"; // closes menu
    openMenuButton.style.display = "block"; // shows hamburger
    closeMenuButton.style.display = "none"; // hides X
}

// function to show the menu with a touch
function showMenuWithTouch(touch) {
    touch.preventDefault();
    showMenu();
}

// function to hide the menu with a touch
function hideMenuWithTouch(touch) {
    touch.preventDefault();
    hideMenu();
}

// function to hide the menu once the mouse pointer leaves the menu area
 function hideMenuOnLeave() {
    let closeMenuButtonDisplay = window.getComputedStyle(closeMenuButton).display;
    if (closeMenuButtonDisplay === "block") {
        timeoutId = setTimeout(hideMenu, 500);
    }
 }
 
 // function to detect if any element outside of the menu is clicked
 function detectClickOutsideMenu(event) {
     const closeMenuButtonDisplay = window.getComputedStyle(closeMenuButton).display;
     return (closeMenuButtonDisplay === "block" &&
     event.target !== theMenu && 
     event.target !== openMenuButton && 
     event.target !== closeMenuButton
     );
 }
 
 // function to hide the menu when any other element on the screen is clicked
 function hideMenuOnClickOutside(event) {
     if (detectClickOutsideMenu(event)) {
         hideMenu();
     }
 }
 
 // function to return the menu to initial parameters on larger screens
 function menuToNormal() {
     let screenWidth = window.innerWidth;
     theMenu.style.display = "flex"; 
     openMenuButton.style.display = "none";
     closeMenuButton.style.display = "none";
     if (screenWidth < 850) {
         theMenu.style.display = "none";
         openMenuButton.style.display = "block";
         closeMenuButton.style.display = "none";
     }
 }
 
// shows the menu when hamburger is touched
openMenuButton.addEventListener("touchstart", showMenuWithTouch);

// shows the menu when hamburger is clicked
openMenuButton.addEventListener("click", showMenu);

// hides the menu when X is touched
closeMenuButton.addEventListener("touchstart", hideMenuWithTouch);

// hides the menu when X is clicked
closeMenuButton.addEventListener("click", hideMenu);

// hides menu when mouse pointer leaves the menu area
theMenu.addEventListener("mouseleave", hideMenuOnLeave);
    
// hides the menu when any other element on the screen is clicked
document.addEventListener("click", hideMenuOnClickOutside);

// tracks screen size and returns the menu to initial parameters
window.addEventListener("resize", menuToNormal);
menuToNormal();
  

// --------------------------------------------------------------------------


//* gallery control menu section (sort, filter, search)

const galleryControls = document.querySelector(".nav-controls");
const gallerySection = document.querySelector("#gallery-section");

// function to show gallery controls only when in gallery section of the page
function showGalleryControls() {
    let currentYPosition = window.scrollY;
    const galleryTop = gallerySection.offsetTop;
    const galleryBottom = galleryTop + gallerySection.offsetHeight;
    galleryControls.style.display = "none";
    if (currentYPosition + 300 >= galleryTop && currentYPosition <= galleryBottom) {
        galleryControls.style.display = "flex";
    }
}


// show gallery controls when in gallery section
window.addEventListener("scroll", showGalleryControls);




//* filter section 

const openFilterButton = document.querySelector(".open-filter-button");
const closeFilterButton = document.querySelector(".close-filter-button");
const theFilter = document.querySelector(".filter-options");
const theFilterOptionsEN = document.getElementById("filter-options-EN");
const theFilterOptionsLT = document.getElementById("filter-options-LT");

// function to show the filter
function showFilter() {
    theFilter.style.display = "block";
    openFilterButton.style.display = "none";
    closeFilterButton.style.display = "block";
}

// function to hide the filter
function hideFilter() {
    theFilter.style.display = "none";
    openFilterButton.style.display = "block";
    closeFilterButton.style.display = "none";
}

// function to show the filter when triangle is touched 
function showFilterWithTouch(touch) {
    touch.preventDefault();
    showFilter();
}

// function to hide the filter when X is touched
function hideFilterWithTouch(touch) {
    touch.preventDefault();
    hideFilter();
}

// function to detect if any element outside of the filter is clicked
function detectClickOutsideFilter(event) {
    const closeFilterButtonDisplay = window.getComputedStyle(closeFilterButton).display;
    return (closeFilterButtonDisplay === "block" &&
    event.target !== theFilter && 
    event.target !== theFilterOptionsEN &&
    event.target !== theFilterOptionsLT &&
    event.target !== openFilterButton && 
    event.target !== closeFilterButton
    );
}

// function to hide the filter when any other element on the screen is clicked
function hideFilterOnClickOutside(event) {
    if (detectClickOutsideFilter(event)) {
        hideFilter();
    }
}

// shows filter when triangle is touched
openFilterButton.addEventListener("touchstart", showFilterWithTouch);

// shows filter when triangle is clicked
openFilterButton.addEventListener("click", showFilter);

// hides the filter when X is touched 
closeFilterButton.addEventListener("touchstart", hideFilterWithTouch);

// hides the filter when X is clicked
closeFilterButton.addEventListener("click", hideFilter);

// hides the menu when any other element on the screen is clicked
document.addEventListener("click", hideFilterOnClickOutside);


//* sorting section

const openSortingButton = document.querySelector(".open-sort-button");
const closeSortingButton = document.querySelector(".close-sort-button");
const theSorting = document.querySelector(".sort-options");
const theSortingOptionsEN = document.getElementById("sort-options-EN");
const theSortingOptionsLT = document.getElementById("sort-options-LT");

// function to show sorting
function showSorting() {
    theSorting.style.display = "block";
    openSortingButton.style.display = "none";
    closeSortingButton.style.display = "block";
}

// function so hide sorting
function hideSorting() {
    theSorting.style.display = "none";
    openSortingButton.style.display = "block";
    closeSortingButton.style.display = "none";
}

// function to show sorting when arrow icon is touched
function showSortingWithTouch(touch) {
    touch.preventDefault();
    showSorting();
}

// function to hide sorting when X is touched
function hideSortingWithTouch(touch) {
    touch.preventDefault();
    hideSorting();
} 

// function to detect if any element outside of sorting is clicked
function detectClickOutsideSorting(event) {
    const closeSortingButtonDisplay = window.getComputedStyle(closeSortingButton).display;
    return (closeSortingButtonDisplay === "block" &&
    event.target !== theSorting && 
    event.target !== theSortingOptionsEN &&
    event.target !== theSortingOptionsLT &&
    event.target !== openSortingButton && 
    event.target !== closeSortingButton
    );
}

// function to hide the sorting when any other element on the screen is clicked
function hideSortingOnClickOutside(event) {
    if (detectClickOutsideSorting(event)) {
        hideSorting();
    }
}

// shows sorting when arrow icon is touched
openSortingButton.addEventListener("touchstart", showSortingWithTouch);

// shows sorting when arrow icon is clicked
openSortingButton.addEventListener("click", showSorting);

// hides sorting when X is touched
closeSortingButton.addEventListener("touchstart", hideSortingWithTouch);

// closes the sorting selection when X button is pressed
closeSortingButton.addEventListener("click", hideSorting);

// hides the sorting when any other element on the screen is clicked
document.addEventListener("click", hideSortingOnClickOutside);


//* search field section

const openSearchButton = document.querySelector(".open-search-button");
const closeSearchButton = document.querySelector(".close-search-button");
const theSearch = document.querySelector(".search-field");
const theSearchInputEN = document.getElementById("input-field-EN");
const theSearchInputLT = document.getElementById("input-field-LT");
const theSearchInputButton = document.getElementById("input-field-button")

// function to show the search field
function showSearch() {
    theSearch.style.display = "flex";
    openSearchButton.style.display = "none";
    closeSearchButton.style.display = "block";
}

// function to hide the search field
function hideSearch() {
    theSearch.style.display = "none";
    openSearchButton.style.display = "block";
    closeSearchButton.style.display = "none";
}

// function to show the search once the magnifying glass is touched 
function showSearchWithTouch(touch) {
    touch.preventDefault();
    showSearch();
}

// function to hide the search once X is touched
function hideSearchWithTouch(touch) {
    touch.preventDefault();
    hideSearch();
}

// function to detect if any element outside of the search is clicked
function detectClickOutsideSearch(event) {
    const closeSearchButtonDisplay = window.getComputedStyle(closeSearchButton).display;
    return (closeSearchButtonDisplay === "block" &&
    event.target !== theSearch && 
    event.target !== theSearchInputEN &&
    event.target !== theSearchInputLT &&
    event.target !== theSearchInputButton &&
    event.target !== openSearchButton && 
    event.target !== closeSearchButton
    );
}

// function to hide the search when any other element on the screen is clicked
function hideSearchOnClickOutside(event) {
    if (detectClickOutsideSearch(event)) {
        hideSearch();
    }
}

// shows the search once the magnifying glass is touched
openSearchButton.addEventListener("touchstart", showSearchWithTouch);

// shows the search once the magnifying glass is clicked
openSearchButton.addEventListener("click", showSearch);

// closes the search field once the X button is touched
closeSearchButton.addEventListener("touchstart", hideSearchWithTouch);

// closes the search filed once the X button is pressed
closeSearchButton.addEventListener("click", hideSearch);

// hides the menu when any other element on the screen is clicked
document.addEventListener("click", hideSearchOnClickOutside);


//* gallery controls on window resize

// function for filter to react to screen resize
function filterOnScreenResize() {
    let screenWidth = window.innerWidth;
    theFilter.style.display = "flex"; 
    openFilterButton.style.display = "none"; // hides open button
    closeFilterButton.style.display = "none"; // hides X
    if (screenWidth < 1300) {
        theFilter.style.display = "none";
        openFilterButton.style.display = "block";
        closeFilterButton.style.display = "none";
    }
}

// function for sorting to react to screen resize
function sortingOnScreenResize() {
    let screenWidth = window.innerWidth;
    theSorting.style.display = "flex";
    openSortingButton.style.display = "none";
    closeSortingButton.style.display = "none";
    if (screenWidth < 1300) {
        theSorting.style.display = "none";
        openSortingButton.style.display = "block";
        closeSortingButton.style.display = "none";
    }
}

// function for search to react to screen resize
function searchOnScreenResize() {
    let screenWidth = window.innerWidth;
    theSearch.style.display = "flex";
    openSearchButton.style.display = "none";
    closeSearchButton.style.display = "none";
    if (screenWidth < 1300 && !document.activeElement.classList.contains("input-field")) {
        theSearch.style.display = "none";
        openSearchButton.style.display = "block";
        closeSearchButton.style.display = "none";
    } else if (screenWidth < 1300 && document.activeElement.classList.contains("input-field")) {
        theSearch.style.display = "flex";
        openSearchButton.style.display = "none";
        closeSearchButton.style.display = "block";
    }
}

// function to combine filter, sorting and search reactions into one
function galleryControlsOnScreenResize() {
    filterOnScreenResize();
    sortingOnScreenResize();
    searchOnScreenResize();
}

// tracks window size in real time and adjusts 
window.addEventListener("resize", galleryControlsOnScreenResize);
galleryControlsOnScreenResize();