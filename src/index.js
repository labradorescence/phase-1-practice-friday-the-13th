let movieArr 
let currentMovie

const initialFetch = () => {
    fetch("http://localhost:3000/movies")
            .then(resp => resp.json())
            .then(data => {
                movieArr = data
                currentMovie = movieArr[0]
                
                movieArr.map((movie) => {
                    movieImageNav(movie)

                    
                })
    
                movieDetail(currentMovie)

                

                    
            })
}

// ## Challenge 1
// For each movie returned from `http://localhost:3000/movies` create an image and add it to the `movie-list` nav element.
const movieList = document.querySelector("nav#movie-list")

const movieImageNav = (movie) => {
   // console.log(movie)
    const movieImg = document.createElement("img")
    movieImg.src = movie.image
    movieList.append(movieImg)


    //challenge 3
    movieImg.addEventListener("click", () =>{
        currentMovie = movie
        movieDetail(currentMovie)
    })
}


// ## Challenge 2
// As soon as the page loads, we should see the details of the **first** movie in the dataset.
const image = document.querySelector("#movie-info #detail-image")
const title = document.querySelector("#movie-info #title")
const year = document.querySelector("#movie-info #year-released")
const description = document.querySelector("#movie-info #description")
const watched = document.querySelector("#movie-info #watched")
const blood = document.querySelector("#movie-info #amount")

const movieDetail = (currentMovie) => {
    title.textContent = currentMovie.title
    image.src = currentMovie.image;
    year.textContent = currentMovie.release_year
    description.textContent = currentMovie.description;
    watched.textContent = currentMovie.watched? "Watched":"Unwatched";
    blood.textContent = currentMovie.blood_amount
}


// ## Challenge 3
// When you click on each movie image in the top nav, you should populate the detail area with the `image`, `title`, `release_year`, `description`, `watched`, and `blood_amount` for the movie that was clicked.

// If the value of 'watched' is false, the button should say 'Unwatched'. If the value is true, then the button should say 'Watched'.

// ## Challenge 4
// When you click on the button in the details it should toggle between `Watched` or `Unwatched` depending on the value of `watched` for the movie currently being displayed.
const watchedClick = () => {
watched.addEventListener("click", () => {
    currentMovie.watched = !currentMovie.watched
    watched.textContent = currentMovie.watched? "Watched":"Unwatched";
})
}


// _The watched value should stay the same when you click between the different movies._

// ## Challenge 5
// On the right side there's a form that allows the user to enter a number of blood drops to add to each movie (don't ask why). For each movie, I should be able to add more drops. 

const form = document.querySelector("form#blood-form")




initialFetch()
watchedClick()