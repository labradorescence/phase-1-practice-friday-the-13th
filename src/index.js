let movieArr
let currentMovie

const url = "http://localhost:3000/movies"

fetch(url)
    .then(data => data.json())
    .then(movies => {
        movieArr = movies
        currentMovie = movieArr[0]
        
        movieArr.map((movie) => {
            addImgToNav(movie)
        })

        movieDetail(currentMovie)
        clickedMovieDetail()
    })

//challenge 1 add images into nav bar
const movieList = document.querySelector("nav#movie-list")

const addImgToNav = (movie) => {  
        const movieImg  = document.createElement("img")
        movieImg.src = movie.image
        movieImg.alt = movie.title
        movieList.append(movieImg)
}

//challenge 2 show first movie detail
const imgDetail = document.querySelector("#movie-info #detail-image")
const title = document.querySelector("#movie-info #title")
const year = document.querySelector("#movie-info #year-released")
const description = document.querySelector("#movie-info #description")
const watched = document.querySelector("#movie-info #watched")
const blood = document.querySelector("#amount")


const movieDetail = (movie) => {
    imgDetail.src = movie.image
    title.innerText = movie.title
    year.innerText = movie.release_year
    description.innerText = movie.description
    watched.innerText = movie.watched? "Watched": "Unwatched"
    blood.innerText = movie.blood_amount
}

//challenge 3 clicked movie detail
const clickedMovieDetail = () => {
    movieList.addEventListener("click", (e) => {
        //console.log(e.target.alt)
        movieArr.map((eachMovie) => {
            if(eachMovie.title === e.target.alt){
                currentMovie = eachMovie
                movieDetail(currentMovie)
            }
        }) 
    })
}

////challenge 4 watched click
// watched.addEventListener("click", () => {
//     // console.log(currentMovie)
//     currentMovie.watched = !currentMovie.watched
//     watched.innerText = currentMovie.watched? "Watched": "Unwatched"
// })

//challenge 4 watched click Patch request 
watched.addEventListener("click", () => {
    // console.log(currentMovie)
    currentMovie.watched = !currentMovie.watched
   
   // console.log(currentMovie)
    const data = { watched: currentMovie.watched };

    fetch(`${url}/${currentMovie.id}`, {
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

      //update the UI
      watched.innerText = currentMovie.watched? "Watched": "Unwatched"
})


//challenge 5
const form = document.querySelector("form#blood-form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    //add on to the current movie's blood amount
    currentMovie.blood_amount += parseInt(e.target["blood-amount"].value)
    //update the UI
    blood.innerText = currentMovie.blood_amount
    //empty the input area
    e.target["blood-amount"].value = ""
})


//challenge 5 with Patch request
// const form = document.querySelector("form#blood-form")

// form.addEventListener("submit", (e) => {
//     e.preventDefault()
//     currentMovie.blood_amount += parseInt(e.target["blood-amount"].value)

//     const data = { blood_amount: currentMovie.blood_amount };

//     fetch(`${url}/${currentMovie.id}`, {
//       method: 'PATCH', // or 'PUT'
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Success:', data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });

//       //update the UI
//       blood.innerText = currentMovie.blood_amount
//       //empty the input area
//       e.target["blood-amount"].value = ""
// })