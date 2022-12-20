const url = "http://localhost:3000/movies"
let movieArr
let currentMovie

fetch(url)
.then(resp => resp.json())
.then(data => {
    movieArr = data
    currentMovie = movieArr[0]
   // console.log(movieArr) //Array
    movieArr.map((movie) => {
        addImgToNav(movie)
    })
    movieDetail(currentMovie)
})

// ## Challenge 1
// For each movie returned from `http://localhost:3000/movies` create an image and add it to the `movie-list` nav element.
const movieList = document.querySelector("#movie-list")

const addImgToNav = (movie) => {
    const movieImg = document.createElement("img")
    movieImg.src = movie.image
    movieImg.alt = movie.title 
    
    movieList.append(movieImg)

    //challenge 3
    movieImg.addEventListener("click", () => {
        currentMovie = movie
        movieDetail(currentMovie)
    })
}

// ## Challenge 2
// As soon as the page loads, we should see the details of the **first** movie in the dataset.
const image = document.querySelector("#detail-image")
const title = document.querySelector("#title")
const year = document.querySelector("#year-released")
const description = document.querySelector("#description")
const watched = document.querySelector("#watched")
const blood = document.querySelector("#amount")

const movieDetail = (movie) => {
    //console.log(movie)
    image.src = movie.image
    title.innerText = movie.title
    year.textContent = movie.release_year
    description.textContent = movie.description
    watched.textContent = movie.watched? "Watched":"Unwatched"
    // if (movie.watched === "true"){
    //     watched.textContent = "Watched"
    // } else {
    //     watched.textContent =  "Unwatched"
    // }
    blood.textContent = movie.blood_amount
}

// ## Challenge 3
// When you click on each movie image in the top nav, you should populate the detail area with the `image`, `title`, `release_year`, `description`, `watched`, and `blood_amount` for the movie that was clicked.

// If the value of 'watched' is false, the button should say 'Unwatched'. If the value is true, then the button should say 'Watched'.

// ## Challenge 4
// When you click on the button in the details it should toggle between `Watched` or `Unwatched` depending on the value of `watched` for the movie currently being displayed.

// _The watched value should stay the same when you click between the different movies._
watched.addEventListener("click", () => {
    currentMovie.watched = !currentMovie.watched
    const data = { watched : currentMovie.watched };

    fetch(`${url}/${currentMovie.id}`,  {
        method: 'PATCH', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        watched.textContent = currentMovie.watched? "Watched":"Unwatched"
})

// ## Challenge 5
// On the right side there's a form that allows the user to enter a number of blood drops to add to each movie (don't ask why). For each movie, I should be able to add more drops. 

// Example: 
// - If the value is 0 and I enter 10, then number of drops for the movie should be 10.
// - If the value is 20 and I enter 5, then the number of drops for the movie should be 25.

// _The blood amount value should stay the same when you click between the different movies._

const form = document.querySelector("form#blood-form")

const bloodForm = () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        currentMovie.blood_amount += parseInt(e.target["blood-amount"].value)

        const data = { blood_amount : currentMovie.blood_amount };

        fetch(`${url}/${currentMovie.id}`,  {
            method: 'PATCH', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        blood.innerText = currentMovie.blood_amount
        e.target["blood-amount"].value = ""
    })
}


bloodForm()