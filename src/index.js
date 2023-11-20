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
const bloodForm = document.querySelector("form#blood-form")
const bloodInput = document.querySelector("input#blood-amount")

//url
const url = "http://localhost:3000/movies"

//FETCH //GET
function getMovies (){

    return fetch(url)
        .then(response => response.json()) //1st .then return a promise, then with the JSON obj response, we turn it into JS ob.
        .then(movieData => { //2nd .then receive js obj

            movieData.map(eachMovie => {
                createMovieImageInBar(eachMovie)
            })

            renderMovieDetail(movieData[0])

            toggleWatchedButton()

            retrieveBloodAmount()
        })
}


//RENDER FUNCTIONS
function createMovieImageInBar(movie){

    const image = document.createElement("img")
    image.src = movie.image
    movieList.appendChild(image)

    image.addEventListener("click", ()=> {
        renderMovieDetail(movie)
    })
}



function renderMovieDetail(movie){
    currentMovie = movie //later deliverable

    movieDetailImage.src = movie.image
    movieDetailTitle.textContent = movie.title
    movieDetailYear.textContent = movie.release_year
    movieDetailDescription.textContent = movie.description
    movieDetailWatched.textContent = movie.watched? "Watched":"Unwatched"
    movieDetailBlood.textContent = movie.blood_amount

}



function toggleWatchedButton(){
    movieDetailWatched.addEventListener("click", () => {
        currentMovie.watched = !currentMovie.watched
        movieDetailWatched.textContent = currentMovie.watched? "Watched":"Unwatched"
    })
}


//FETCH PATCH
function patchBlood(urlId, patchData){
    return fetch(`http://localhost:3000/movies/${urlId}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(patchData)
    })
    .then(response => response.json())

}


//SUBMIT FORM
function retrieveBloodAmount(){

    bloodForm.addEventListener("submit", (e) => {
        e.preventDefault()

        currentMovie.blood_amount += parseInt(e.target["blood-amount"].value)

        let patchData = { blood_amount:currentMovie.blood_amount}
        patchBlood(currentMovie.id, patchData)
            .then(patchedMovie => {
                                movieDetailBlood.textContent = patchedMovie.blood_amount
                                })
        
        e.target["blood-amount"].value = ""
    })
}

//FUNCTION INVOCATION
getMovies()