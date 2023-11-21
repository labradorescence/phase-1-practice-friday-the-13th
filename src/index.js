//global scope
let currentMovie

//HTML DOM Node elements
const movieList = document.querySelector("#movie-list")
const movieDetailImage = document.querySelector("div#movie-info img#detail-image")
const movieDetailTitle = document.querySelector("div#movie-info h1#title")
const movieDetailYear = document.querySelector("div#movie-info h3#year-released")
const movieDetailDescription = document.querySelector("div#movie-info p#description")
const movieDetailWatched = document.querySelector("div#movie-info button#watched")
const movieDetailBlood = document.querySelector("div#movie-info #amount")
const bloodForm = document.querySelector("#blood-form")
const bloodInput = document.querySelector("#blood-amount")

//FETCH //GET 
function getMovies() {
    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then( movieArr => {
        
            movieArr.map( eachMovie => {
                createImageMenu(eachMovie)
            })

            renderMovieDetail(movieArr[0])

            toggleWatchedButton()

            retrieveBloodAmount()
        })
}

//PATCH
function patchBlood( urlId, patchData ){
    return fetch(`http://localhost:3000/movies/${urlId}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(patchData)
    })
    .then(response => response.json())
}

//rendering functions
function createImageMenu(movie){
    const image = document.createElement("img")
    image.src = movie.image
    movieList.appendChild(image)

    image.addEventListener("click", () => {
       renderMovieDetail(movie)
    })
}

const renderMovieDetail = (movie) => {
    currentMovie = movie

    movieDetailImage.src = movie.image 
    movieDetailTitle.innerText = movie.title
    movieDetailYear.innerText = movie.release_year
    movieDetailDescription.innerText = movie.description
    movieDetailWatched.innerText = movie.watched ? "Watched" : "Unwatched"
    movieDetailBlood.innerText = movie.blood_amount
}

const toggleWatchedButton = () => {
    movieDetailWatched.addEventListener("click", () => {
        currentMovie.watched = !currentMovie.watched
        movieDetailWatched.textContent = currentMovie.watched? "Watched": "Unwatched"
    })
}

const retrieveBloodAmount = () => {
    bloodForm.addEventListener("submit", (e) => {
        e.preventDefault()
        //console.log(e.target["blood-amount"].value)
        currentMovie.blood_amount += parseInt(e.target["blood-amount"].value)

        let patchData = { blood_amount: currentMovie.blood_amount }

        patchBlood(currentMovie.id, patchData)
            .then(patchedMovie => { //2nd .then gives us the data from the db
                movieDetailBlood.textContent = patchedMovie.blood_amount
            })
        e.target["blood-amount"].value = ""

    })
}


//function invocation
getMovies()