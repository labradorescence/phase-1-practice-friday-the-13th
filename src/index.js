// ## Challenge 1
// For each movie returned from `http://localhost:3000/movies` create an image and add it to the `movie-list` nav element.

//1. create an image element 
//2. select the movie-list element
//3. append img element to the movie-list element
let currentMovie 
const movieList = document.querySelector("#movie-list")

//FETCH 
    //GET request
    function getMovieList(){
        return fetch(`http://localhost:3000/movies`)
            .then(resp=> resp.json())
            .then((movies) => {
                iterateMovieImage(movies)
                displayMovieDetails(movies[0])
            })
    }

    function iterateMovieImage(movies){
        movies.forEach((movie) => {
            const img = document.createElement("img")
            img.src = movie.image
            movieList.append(img)

            //add event handler
            img.addEventListener("click", () => displayMovieDetails(movie))
        })
    }


// ## Challenge 2
// As soon as the page loads, we should see the details of the **first** movie in the dataset.
const detailImage = document.querySelector("#detail-image")
const title = document.querySelector("#title")
const year = document.querySelector("#year-released")
const description = document.querySelector("#description")
const watched = document.querySelector("#watched")
const amount = document.querySelector("#amount")


function displayMovieDetails(movie){
    
    currentMovie = movie

    detailImage.src = movie.image
    title.textContent = movie.title
    year.textContent = movie.release_year
    description.textContent = movie.description

// ## Challenge 4
// When you click on the button in the details it should toggle between `Watched` or `Unwatched` depending on the value of `watched` for the movie currently being displayed.

// If the value of 'watched' is false, the button should say 'Unwatched'. If the value is true, then the button should say 'Watched'.

// _The watched value should stay the same when you click between the different movies._
    movie.watched? watched.textContent="WATCHED" : watched.textContent="UNWATCHED"

    amount.textContent = movie.blood_amount

    //event handlers
    watched.addEventListener("click", () => {
        movie.watched = !movie.watched
        movie.watched? watched.textContent="WATCHED" : watched.textContent="UNWATCHED"
    })

}


// ## Challenge 3
// When you click on each movie image in the top nav, you should populate the detail area with the `image`, `title`, `release_year`, `description`, `watched`, and `blood_amount` for the movie that was clicked.

//see line 29









// ## Challenge 5
// On the right side there's a form that allows the user to enter a number of blood drops to add to each movie (don't ask why). For each movie, I should be able to add more drops. 

// Example: 
// - If the value is 0 and I enter 10, then number of drops for the movie should be 10.
// - If the value is 20 and I enter 5, then the number of drops for the movie should be 25.

// _The blood amount value should stay the same when you click between the different movies._

const bloodAmount = document.querySelector("#blood-amount")
const bloodForm = document.querySelector("#blood-form")

function getBloodAmount(){
    bloodAmount.addEventListener("change", (e) => {
        submitForm(e.target.value)})
}

function submitForm(bloodAmount){
    bloodForm.addEventListener("submit", (e) => {
        e.preventDefault()
        currentMovie.blood_amount += Number(bloodAmount)

        amount.textContent = currentMovie.blood_amount

        e.target["blood-amount"].value = ""
    })
}



//function invocation
getMovieList()
getBloodAmount()
