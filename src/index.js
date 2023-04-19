// ## Challenge 1
// For each movie returned from `http://localhost:3000/movies` create an image and add it to the `movie-list` nav element.
addEventListener('DOMContentLoaded', () => {
  let movieArr;
  let currentMovie;

  //FETCH

  //GET
  function getMovies() {
    return fetch('http://localhost:3000/movies')
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

  //0. select the nav element
  const movieList = document.querySelector('nav#movie-list');

  function addImgToNav(movie) {
    //1. create an img element
    const movieImg = document.createElement('img');

    //2. assign the movie img src
    // console.log(movie)
    movieImg.src = movie.image;
    movieImg.alt = movie.title;

    //3. append the img to the nav element
    movieList.append(movieImg);

    movieImg.addEventListener('click', () => {
      movieDetail(movie);
      currentMovie = movie;
    });
  }

  // ## Challenge 2
  // As soon as the page loads, we should see the details of the **first** movie in the dataset.
  //1. select the elements
  const imgDetail = document.querySelector('#movie-info #detail-image');
  const title = document.querySelector('#title');
  const year = document.querySelector('#movie-info #year-released');
  const description = document.querySelector('#movie-info #description');
  const watched = document.querySelector('#movie-info #watched');
  const blood = document.querySelector('#movie-info #amount');

  const movieDetail = (m) => {
    // console.log(m)
    //2. add the value using the data
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
  // ## Challenge 3
  // When you click on each movie image in the top nav, you should populate the detail area with the `image`, `title`, `release_year`, `description`, `watched`, and `blood_amount` for the movie that was clicked.

  // If the value of 'watched' is false, the button should say 'Unwatched'. If the value is true, then the button should say 'Watched'.

  // ## Challenge 4
  // When you click on the button in the details it should toggle between `Watched` or `Unwatched` depending on the value of `watched` for the movie currently being displayed.

  // _The watched value should stay the same when you click between the different movies._

  // ## Challenge 5
  // On the right side there's a form that allows the user to enter a number of blood drops to add to each movie (don't ask why). For each movie, I should be able to add more drops.

  // Example:
  // - If the value is 0 and I enter 10, then number of drops for the movie should be 10.
  // - If the value is 20 and I enter 5, then the number of drops for the movie should be 25.

  // _The blood amount value should stay the same when you click between the different movies._

  //1. select the element
  //2. grab the blood amount from the form
  //3. add the blood amount

  const bloodForm = document.querySelector('#blood-form');
  const bloodAmount = document.querySelector('#blood-amount');

  function getBloodAmount() {
    bloodAmount.addEventListener('change', (e) => {
      submitForm(e.target.value);
    });
  }

  // function submitForm(bloodAmount){
  //     bloodForm.addEventListener("submit", (e) => {
  //         e.preventDefault()
  //         console.log(bloodAmount)
  //         currentMovie.blood_amount += Number(bloodAmount)
  //         blood.textContent = currentMovie.blood_amount
  //         e.target["blood-amount"].value = ""
  //     })
  // }

  function submitForm(bloodAmount) {
    bloodForm.addEventListener('submit', (e) => {
      e.preventDefault();
      currentMovie.blood_amount += parseInt(bloodAmount);

      const data = { blood_amount: currentMovie.blood_amount };

      fetch(`http://localhost:3000/movies/${currentMovie.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((data) => console.log(data))
        .catch(console.error);

      blood.textContent = currentMovie.blood_amount;
      e.target['blood-amount'].value = '';
    });
  }

  getMovies();
  getBloodAmount();
});
