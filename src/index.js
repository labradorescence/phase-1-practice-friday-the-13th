
fetch("http://localhost:3000/movies")
    .then(response => response.json()) //1st .then return a promise, then with the JSON obj response, we turn it into JS ob.
    .then(movieData => { //2nd .then receive js obj

        movieData.map(eachMovie => {
            createMovieImageInBar(eachMovie)
        })

        renderMovieDetail(movieData[0])

    })


function createMovieImageInBar(movie){
    const movieList = document.querySelector("#movie-list")

    const image = document.createElement("img")
    image.src = movie.image
    movieList.appendChild(image)
    
}


function renderMovieDetail(movie){

    currentMovie = movie //later deliverable

    const movieDetailImage = document.querySelector("div#movie-info img#detail-image")
    const movieDetailTitle = document.querySelector("div#movie-info h1#title")
    const movieDetailYear = document.querySelector("div#movie-info h3#year-released")
    const movieDetailDescription = document.querySelector("div#movie-info p#description")
    const movieDetailWatched = document.querySelector("div#movie-info button#watched")
    const movieDetailBlood = document.querySelector("div#movie-info #amount")
    console.log(movie)

    movieDetailImage.src = movie.image
    movieDetailTitle.innerText = movie.title
    movieDetailYear.innerText = movie.release_year
    movieDetailDescription.innerText = movie.description
    movieDetailWatched.innerText = movie.watched
    movieDetailBlood.innerText = movie.blood_amount

}

