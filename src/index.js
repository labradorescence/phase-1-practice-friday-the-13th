const url = "http://localhost:3000/movies"
let movieArr
let currentMovie

const initialFetch = () => {
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            movieArr = data
            currentMovie = movieArr[0]

            movieArr.map((movie) => {
                imgToNav(movie)
            })
            movieDetail(currentMovie)  
        })
}


//1
const movieList = document.querySelector("#movie-list")

const imgToNav = (movie) => {
    const movieImg = document.createElement("img")
    movieImg.src = movie.image
    movieImg.alt = movie.title
    movieList.appendChild(movieImg)  
    

    //3
    movieImg.addEventListener("click", () => {
        currentMovie = movie
        movieDetail(currentMovie)
    })
}


//2
const img = document.querySelector("#detail-image")
const title = document.querySelector("#title")
const year = document.querySelector("#year-released")
const description = document.querySelector("#description")
const watched = document.querySelector("#watched")
const blood = document.querySelector("#amount")

const movieDetail = (currentMovie) => {
    title.textContent = currentMovie.title;
    img.src = currentMovie.image;
    year.textContent = currentMovie.release_year;
    description.textContent = currentMovie.description;
    watched.textContent = currentMovie.watched? "Watched":"Unwatched"
    blood.textContent = currentMovie.blood_amount
}

const toggleWatchedBtn = () => {
    watched.addEventListener("click", () => {
        currentMovie.watched = !currentMovie.watched
            
            const data = { watched: currentMovie.watched };

            fetch(`${url}/${currentMovie.id}`, {
            method: 'PATCH', 
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
}


//4
const form = document.querySelector("#blood-form")
const input = document.querySelector("#blood-amount")

const submitBlood = () => {
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        currentMovie.blood_amount += parseInt(input.value)

        const data = { blood_amount: currentMovie.blood_amount };

                fetch(`${url}/${currentMovie.id}`, {
                method: 'PATCH', 
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

        //ui
        blood.textContent = currentMovie.blood_amount
    })
}

initialFetch()
toggleWatchedBtn()
submitBlood()