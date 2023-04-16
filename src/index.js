addEventListener('DOMContentLoaded', () => {
  /**********DELIVERABLES START*****************/
  //   Challenge 1 - DONE
  //   For each movie returned from http://localhost:3000/movies create an image and add it to the movie-list nav element.

  //   Challenge 2 - DONE
  //   As soon as the page loads, we should see the details of the first movie in the dataset.

  //   Challenge 3 - DONE
  //   When you click on each movie image in the top nav, you should populate the detail area with the image, title, release_year, description, watched, and blood_amount for the movie that was clicked.

  //   If the value of 'watched' is false, the button should say 'Unwatched'. If the value is true, then the button should say 'Watched'.

  //   Challenge 4
  //   When you click on the button in the details it should toggle between Watched or Unwatched depending on the value of watched for the movie currently being displayed.

  //   The watched value should stay the same when you click between the different movies.

  //   Challenge 5
  //   On the right side there's a form that allows the user to enter a number of blood drops to add to each movie (don't ask why). For each movie, I should be able to add more drops.

  //   Example:

  //   If the value is 0 and I enter 10, then number of drops for the movie should be 10.
  //   If the value is 20 and I enter 5, then the number of drops for the movie should be 25.
  //   The blood amount value should stay the same when you click between the different movies
  /**********DELIVERABLES END*******************/

  /**********VARIABLE DECLARATION START*********/
  const baseUrl = 'http://localhost:3000/movies';
  const movieList = document.querySelector('#movie-list');
  const movieDetails = document.querySelector('#movie-info');
  const movieTitle = document.querySelector('#title');
  const yearRelease = document.querySelector('#year-released');
  const movieDescription = document.querySelector('#description');
  const watchedBtn = document.querySelector('#watched');
  const bloodDropIcon = document.querySelector('.icon');
  const numberOfBloodDrops = document.querySelector('#amount');
  const bloodForm = document.querySelector('#blood-form');
  /**********VARIABLE DECLARATION END***********/

  /**********FETCH REQUESTS START***************/
  function getJSON(url) {
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          //   console.log(response);
          return response.json();
        } else {
          throw response.statusText;
        }
      })
      .catch((error) => console.log(error.message));
  }

  function postJSON(url, data) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.statusText;
        }
      })
      .catch((error) => console.log(error.message));
  }
  //PATCH URL
  function patchJSON(url, data) {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response.statusText;
        }
      })
      .catch((error) => console.log(error.message));
  }
  /**********FETCH REQUESTS END*****************/

  /**********EVENT LISTENERS START**************/
  movieList.addEventListener('click', (event) => handleClick(event));
  bloodForm.addEventListener('submit', (event) => handleForm(event));
  watchedBtn.addEventListener('click', (event) => handleBtn(event));

  /**********EVENT LISTENERS END****************/

  /**********FORM PROCESSING START**************/
  //handle input from search form
  function handleForm(event) {
    event.preventDefault();
    console.log(event);
    let eventID = watchedBtn.getAttribute('data-id');
    let data = {
      blood_amount:
        parseInt(numberOfBloodDrops.textContent) +
        parseInt(event.target['blood-amount'].value, 10),
    };
    patchJSON(baseUrl + `/${eventID}`, data).then((movie) =>
      renderDetails(movie)
    );
  }

  function handleClick(event) {
    console.log(event);
    //send event to a function that can get the movie data
    let eventID = event.target.dataset.id;
    getJSON(baseUrl + `/${eventID}`).then((movie) => renderDetails(movie));
  }

  function handleBtn(event) {
    console.log(event);
    //send event to a function that can get the movie data
    let eventID = event.target.dataset.id;
    let data;
    event.target.textContent === 'WATCHED'
      ? (data = { watched: false })
      : (data = { watched: true });

    patchJSON(baseUrl + `/${eventID}`, data).then((movie) =>
      renderDetails(movie)
    );
  }
  /**********FORM PROCESSING END****************/

  /**********DOM RENDER FUNCTIONS START*********/
  //   function renderAllImages(movies) {
  //     movies.forEach((movie) => renderSingleImage(movie));
  //     renderDetails(movies, 0);
  //   }

  //   function renderDetails(movie, index) {
  //     movieTitle.textContent = movie[index].title;
  //     movieDescription.textContent = movie[index].description;
  //     yearRelease.textContent = movie[index].release_year;
  //   }
  function renderAllImages(movies) {
    movies.forEach((movie) => renderSingleImage(movie));
    renderDetails(movies[0]);
  }

  function renderDetails(movie) {
    movieTitle.textContent = movie.title;
    watchedBtn.setAttribute('data-id', movie.id);
    movieDescription.textContent = movie.description;
    yearRelease.textContent = movie.release_year;
    numberOfBloodDrops.textContent = movie.blood_amount;
    movie.watched
      ? (watchedBtn.textContent = 'WATCHED')
      : (watchedBtn.textContent = 'UNWATCHED');
  }

  function renderSingleImage(movie) {
    //create
    let movieImg = document.createElement('img');
    //populate
    movieImg.src = movie.image;
    movieImg.setAttribute('data-id', movie.id);
    //append
    movieList.append(movieImg);
  }

  /**********DOM RENDER FUNCTIONS END***********/

  /***********GENERAL FUNCTIONS START***********/

  function initialize() {
    getJSON(baseUrl).then((movies) => renderAllImages(movies));
  }

  initialize();
  /***********GENERAL FUNCTIONS END*************/
});
