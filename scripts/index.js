
// Position pop-up windows in center of the screen counting width of scrollbar
function positionInCenter () {
    let backdrops = document.getElementsByClassName('backdrop');
    for (item of backdrops) {
        let newWidth = document.documentElement.clientWidth + "px";
        item.style.width = newWidth;
    };
};
positionInCenter();
window.addEventListener("resize", positionInCenter);


// Form Containers
var addFormContainer = document.getElementById("add-form-container");
var deleteFormContainer = document.getElementById("delete-form-container");
var containers = document.getElementsByClassName('backdrop');

// Movie list elements
var movieList = document.getElementById("movie-list");
var movies = movieList.getElementsByTagName('li');
var deleteIconBoxes = document.getElementsByClassName('delete-icon-box');
var deleteIcons = document.getElementsByClassName('delete-icon');

// Buttons
var startAdding = document.getElementById("start-adding");

var newMovieBtn = document.getElementById("new-movie-btn");
var formAddBtn = document.getElementById("form-add-btn");
var cancelBtn = document.getElementById("form-cancel-btn");

var dontDeleteBtn = document.getElementById("dont-delete-btn");
var deleteBtn = document.getElementById("delete-btn");

// Radio button stars
let star1 = document.getElementById('star-1');
let star2 = document.getElementById('star-2');
let star3 = document.getElementById('star-3');
let star4 = document.getElementById('star-4');
let star5 = document.getElementById('star-5');

// Empty movie list info elements
var emptyListInfo =  document.getElementById("empty-list-info");

// Inputs
var inputs = document.getElementsByTagName('input');

var movies = [
    {
        title: 'Greenland',
        imageUrl: 'img/poster/poster1.jpg',
        rating: 4,
    },
    {
        title: 'Tesla',
        imageUrl: 'img/poster/poster2.jpg',
        rating: 5,
    },
    {
        title: 'Inception',
        imageUrl: 'img/poster/poster3.jpg',
        rating: 3,
    },
    {
        title: 'Sputnik',
        imageUrl: 'img/poster/poster4.jpg',
        rating: 2,
    },
    
];


// Rendering movies to movie list in html
function renderMovies(i) {
    let listItem = `<li class="movie-cell">`;
    listItem += `<div class="delete-icon-box"><span class="delete-icon" title="Delete this movie">&times;</span></div>`;
    listItem += `<h2>${movies[i].title}</h2><div class="poster-box">`;
    listItem += `<img src=${movies[i].imageUrl} alt=${movies[i].title}></div>`;    
    listItem += `<div class="rating-mini">`
    let ratingStarsHTML;
    function drawRatingStars (i) {
        for (let j = 1; j <= 5; j++) {
            if (j <= movies[i].rating) {
                ratingStarsHTML += `<span class="active"></span>`;
            } else {
                ratingStarsHTML += `<span></span>`;
            }
        }
    };
    drawRatingStars(i);
    listItem += ratingStarsHTML;
    listItem += '</div></li>';
    movieList.innerHTML += listItem;
};


// Input fields clearing function
function clearInputs() {
    for (let item of inputs) {
        item.value = "";
        item.checked = false;
    };    
    star1.checked = true;
}


// Hide containers when clicking on backdrops
function hideCurrentBackdrop(event) {
    if (event.target.classList.contains('backdrop')) {
        event.target.style.display = "none";
        clearInputs();
    }
}
for (let i = 0; i < containers.length; i++) {
    containers[i].addEventListener("click", hideCurrentBackdrop)
}


// Form Containers show and hide functions
function showFormContainer(container) {
    container.style.display = "flex";
}
function hideFormContainer(container) {
    container.style.display = "none";
    clearInputs();
};


// New movie form showing and hiding events
newMovieBtn.addEventListener("click", showFormContainer.bind(null,addFormContainer));
cancelBtn.addEventListener("click", hideFormContainer.bind(null,addFormContainer));
startAdding.addEventListener("click", showFormContainer.bind(null,addFormContainer));

// Movie deleting pop-up window events
dontDeleteBtn.addEventListener("click", hideFormContainer.bind(null,deleteFormContainer));
deleteBtn.addEventListener("click", hideFormContainer.bind(null,deleteFormContainer));



// Adding X icons on movies
function callDeleteIconBoxes(i) {
    deleteIconBoxes[i].style.opacity = 1;
}
function closeDeleteIconBoxes(i) {
    deleteIconBoxes[i].style.opacity = 0;
}




// Empty movie list info block showing and hiding functions
function callEmptyListInfo() {
    emptyListInfo.style.display = "flex";
}
function closeEmptyListInfo() {
    emptyListInfo.style.display = "none";
}
function isMovieListEmpty() {    
    if (movies.length === 0) {
        callEmptyListInfo();
    } else {
        closeEmptyListInfo();
    }
};


// Movie deleting function
var currentMovieNumber;
function setCurrentMovieNumber (i) {
    currentMovieNumber = i;
    // console.log(currentMovieNumber);
}
function deleteMovie() {
    movies.splice(currentMovieNumber,1);
    movieList.innerHTML = "";
    engine();
}
deleteBtn.addEventListener('click', deleteMovie);


// Movie adding function

function addMovie() {
    let newMovie = {};
    newMovie.title = document.getElementById('movie-title').value;
    newMovie.imageUrl = document.getElementById('poster-url').value;
    newMovie.rating = 1;
    switch (true) {
        case star5.checked:
            newMovie.rating = 5;
            break;
        case star4.checked:
            newMovie.rating = 4;
            break;
        case star3.checked:
            newMovie.rating = 3;
            break;
        case star2.checked:
            newMovie.rating = 2;
            break;
        default: newMovie.rating = 1;
            break;
    }
    movies.push(newMovie);
    movieList.innerHTML = "";
    engine();
    hideFormContainer(addFormContainer);
}
formAddBtn.addEventListener('click', addMovie);


function engine () {    
    // Creating list items and adding to HTML
    for (let i = 0; i < movies.length; i++) {
        renderMovies(i);
    }
    // Adding Delete icons to movie list items
    for (let i = 0; i < movies.length; i++) {
        movieList.children[i].firstChild.firstChild.addEventListener('click', setCurrentMovieNumber.bind(null,i));
        movieList.children[i].firstChild.firstChild.addEventListener('click', showFormContainer.bind(null,deleteFormContainer));
        movieList.children[i].addEventListener('mouseenter', callDeleteIconBoxes.bind(null,i));
        movieList.children[i].addEventListener('mouseleave', closeDeleteIconBoxes.bind(null,i));
    }
    isMovieListEmpty();
}

engine();