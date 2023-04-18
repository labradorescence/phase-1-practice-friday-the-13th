addEventListener('DOMContentLoaded', () => {
  /**********DELIVERABLES START*****************/
  //   Challenge 1
  //   For each movie returned from http://localhost:3000/movies create an image and add it to the movie-list nav element.

  //   Challenge 2
  //   As soon as the page loads, we should see the details of the first movie in the dataset.

  //   Challenge 3
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
  //   The blood amount value should stay the same when you click between the different movies.
  /**********DELIVERABLES END*******************/

  /**********VARIABLE DECLARATION START*********/
  const baseUrl = 'http://localhost:3000/movies/';
  const movieList = document.querySelector('#movie-list');
  let movieArray = [];
  const movieDetail = document.querySelector('#movie-info');
  const bloodForm = document.querySelector('blood-form');
  /**********VARIABLE DECLARATION END***********/

  /**********FETCH REQUESTS START***************/
  const rover = {
    fetch: function getJSON(url) {
      return fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw response.statusText;
          }
        })
        .catch((error) => console.log(error.message));
    },

    post: function postJSON(url, data) {
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
    },
    //DELETE URL
    delete: function deleteJSON(url) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw response.statusText;
          }
        })
        .catch((error) => console.log(error.message));
    },
  };
  /**********FETCH REQUESTS END*****************/

  /**********EVENT LISTENERS START**************/

  /**********EVENT LISTENERS END****************/

  /**********FORM PROCESSING START**************/
  //handle input from search form
  function handleForm(event) {
    event.preventDefault();
    console.log(event);
  }

  function handleClick(event) {
    console.log(event);
  }
  /**********FORM PROCESSING END****************/

  /**********DOM RENDER FUNCTIONS START*********/
  function renderImages(movie) {
    //create elements
    let movieImg = document.createElement('img');
    //populate data, text, classes, attributes
    movieImg.src = movie.image;
    movieImg.alt = movie.title;
    //append elements to the DOM
    movieList.append(movieImg);

    movieImg.addEventListener('click', () => {
      renderMovie(movie);
    });
  }

  const renderMovie = (movie) => {
    // <div id="movie-info">
    //   <img id="detail-image" src="" />
    //   <div>
    //     <h1 id="title">Title</h1>
    //     <h3 id="year-released">Year Released</h3>
    //     <p id="description">Description</p>
    //     <button id="watched">Watched</button>
    //     <p>
    //       <img class="icon" src="./assets/blood-drop.png" />x
    //       <span id="amount">0</span>
    //create elements
    const movieImage = document.querySelector('#movie-info #detail-image');
    const movieTitle = document.querySelector('#movie-info #title');
    const movieYear = document.querySelector('#movie-info #year-released');
    const movieDescription = document.querySelector('#movie-info #description');
    const movieWatched = document.querySelector('#movie-info #watched');
    const bloodAmount = document.querySelector('#movie-info #amount');
    //populate data, text, classes, attributes
    movieImage.src = movie.image;
    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.released_year;
    movieDescription.textContent = movie.description;
    movieWatched.textContent = movie.watched ? 'Watched' : 'Not Watched';
    bloodAmount.textContent = movie.blood_amount;
    //append elements to the DOM
    watched.addEventListener('click', () => {
      movie.watched = !movie.watched;
      movieWatched.textContent = movie.watched ? 'Watched' : 'Not Watched';
      console.log('clicked');
    });
  };
  /**********DOM RENDER FUNCTIONS END***********/

  /***********GENERAL FUNCTIONS START***********/

  function getMovies() {
    rover.fetch(baseUrl).then((movies) => {
      movieArray = movies;
      movies.forEach((movie) => renderImages(movie));
      //   movies.map((movie) => {
      //     renderImages(movie);
      //   });
      currentMovie = movieArray[0];
      renderMovie(currentMovie);
    });
  }

  //greem's code
  //   function getMovies() {
  //     return fetch(baseUrl)
  //       .then((resp) => resp.json())
  //       .then((movies) => {
  //         movieArray = movies;
  //         movieArray.map((movie) => {
  //           renderImages(movie);
  //         });
  //       });
  //   }
  getMovies();
  function deleteMovie(id) {
    rover.delete(`${baseUrl}/${id}`).then((movie) => console.log(movie));
  }
  /***********GENERAL FUNCTIONS END*************/
});
