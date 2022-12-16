fetch("http://localhost:3000/movies")
    .then(resp => resp.json())
    .then(movies => {
        movieList(movies)
        movieDetail(movies)
    })

//Challenge 1
const movieListNav = document.querySelector("#movie-list")
    
const movieList = (movies) => {
    movies.map(eachMovie => {
        //console.log(eachMovie)
        const movieImg = document.createElement("img")
        movieImg.src = eachMovie.image
        movieImg.alt = eachMovie.title
        movieImg.id = eachMovie.title
        movieListNav.append(movieImg)
    })
}

// Challenge 2
const detailImage = document.querySelector("#detail-image")
const title = document.querySelector("#title")
const year = document.querySelector("#year-released")
const description = document.querySelector("#description")

const movieDetail = (movies) => {
    movies.map(eachMovie => {
        detailImage.src = eachMovie.image
        title.innerText = eachMovie.title
        year.innerHTML = eachMovie.release_year
        description.innerText = eachMovie.description
    })
}

//challenge 3
const navImg = document.getElementById("movie-list")

navImg.addEventListener("click", (e) => {
    console.log(e.target.alt)
    
})