let movieArr;
let currentMovie;

fetch("http://localhost:3000/movies")
    .then(resp => resp.json())
    .then(movies => {
        movieArr = movies

        movieImgListNav(movieArr)
        movieDetail(movieArr[0])
        watchedBtnFunc()
    })

//Challenge 1
const movieListNav = document.querySelector("#movie-list")
    
const movieImgListNav = (movieArr) => {
    movieArr.map(eachMovie => {
        //console.log(eachMovie)
        const movieImg = document.createElement("img")
        movieImg.src = eachMovie.image
        movieImg.alt = eachMovie.title
        movieImg.id = eachMovie.title
        movieListNav.append(movieImg)


        //challenge 3
        movieImg.addEventListener("click", () => {
            movieDetail(eachMovie) //we have current movie info so we use that "here" 
        })
    })
}

// Challenge 2
const detailImage = document.querySelector("#detail-image")
const title = document.querySelector("#title")
const year = document.querySelector("#year-released")
const description = document.querySelector("#description")
const watched = document.querySelector("#watched")
const blood = document.querySelector("#amount")
const navImg = document.querySelector("#movie-list")

const movieDetail = (movie) => {  
    currentMovie = movie

    detailImage.src = movie.image
    title.innerText = movie.title
    year.innerHTML = movie.release_year
    description.innerText = movie.description
    movie.watched === false? watched.innerText = "Unwatched":watched.innerText = "Watched"
    blood.innerText = movie.blood_amount
}

//challenge 4 
const watchedBtnFunc = () => {
    watched.addEventListener("click", () => {
        currentMovie.watched = !currentMovie.watched
        watched.innerHTML = currentMovie.watched? "Watched":"Unwatched"
    })
}


//challenge 5
const form = document.querySelector("#blood-form")
const input = document.querySelector("#blood-amount")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    currentMovie.blood_amount += parseInt(input.value)
    console.log(currentMovie.blood_amount)
    blood.textContent = currentMovie.blood_amount
    e.target.reset();
})