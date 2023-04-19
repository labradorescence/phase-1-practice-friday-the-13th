//STATE
let movieArr;
let currentMovie;

//HTML DOM Node elements
const imgDetail = document.querySelector('#movie-info #detail-image');
const title = document.querySelector('#title');
const year = document.querySelector('#movie-info #year-released');
const description = document.querySelector('#movie-info #description');
const watched = document.querySelector('#movie-info #watched');
const blood = document.querySelector('#movie-info #amount');
const movieList = document.querySelector('nav#movie-list');
const bloodForm = document.querySelector('#blood-form');
const bloodAmount = document.querySelector('#blood-amount');

//url
const url = 'http://localhost:3000/movies';

//FETCH
//GET
function getMovies() {
  return fetch(url)
    .then((resp) => resp.json())
    .then((movies) => {
      movieArr = movies;
      currentMovie = movieArr[0];

      movieArr.map((movie) => {
        addImgToNav(movie);
      });
      movieDetail(currentMovie); //invoking the movie detail
    });
}

//PATCH
function patchMovie(endpoint, data) {
  return fetch(`${url}/${endpoint}`, {
    //was missing return statement
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((resp) => resp.json());
}

//RENDER FUNCTIONS
function addImgToNav(movie) {
  const movieImg = document.createElement('img');
  movieImg.src = movie.image;
  movieImg.alt = movie.title;
  movieList.append(movieImg);

  movieImg.addEventListener('click', () => {
    movieDetail(movie);
    currentMovie = movie;
  });
}

const movieDetail = (m) => {
  imgDetail.src = m.image;
  title.textContent = m.title;
  year.textContent = m.release_year;
  description.textContent = m.description;
  watched.textContent = m.watched ? 'Watched' : 'Unwatched'; //truthy:falsy
  blood.textContent = m.blood_amount;

  watched.addEventListener('click', () => {
    m.watched = !m.watched;
    watched.textContent = m.watched ? 'Watched' : 'Unwatched';
  });
};

//DERIVE USER INPUT
function getBloodAmount() {
  bloodAmount.addEventListener('change', (e) => {
    submitForm(e.target.value);
  });
}

function submitForm(bloodAmount) {
  bloodForm.addEventListener(
    'submit',
    (e) => {
      e.preventDefault();
      currentMovie.blood_amount += parseInt(bloodAmount);

      const data = { blood_amount: currentMovie.blood_amount };

      patchMovie(currentMovie.id, data) //INVOKE PATCH Request with Fetch API
        .then((data) => data)
        .catch(console.error);

      blood.textContent = currentMovie.blood_amount; //update the UI
      e.target['blood-amount'].value = '';
    },
    { once: true }
  );
}

//FUNCTION INVOCATION
getMovies();
getBloodAmount();
