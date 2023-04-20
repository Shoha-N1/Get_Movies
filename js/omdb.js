const API_KEY = "3e3a05ae";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
const IMG_URL = `https://img.omdbapi.com/?apikey=${API_KEY}`;
const elForm = document.querySelector("[data-form]");
const elUl = document.querySelector("[data-ul]");
const elDivInfo = document.querySelector("[data-infos]");
const elPagination = document.querySelector("[data-movie-pagination]");
const elInputMovie = document.querySelector("[data-movie]");
const formData = new FormData(elForm);

elInputMovie.addEventListener(
  "keyup",
  debounce((evt) => onInputKeyUp(evt), 300)
);

elForm.addEventListener("change", (evt) => {
  evt.preventDefault();

  if (elInputMovie.value.length < 3) return;

  searchMovies();
});

document.addEventListener("click", (evt) => {
  OnBtnInfoClick(evt);
  OnModalCloseClick(evt);
  onModalOutsideClick(evt);
  onPageClick(evt);
});

function debounce(func, timeout = 300) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function onInputKeyUp(evt) {
  if (elInputMovie.value.length < 3) return;
  searchMovies();
}

async function searchMovies(page = 1) {
  const { s, y, type } = getFormData();
  elUl.innerHTML = `<div class="spinner-border text-primary spinner__loading" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
  let res = await fetch(`${API_URL}&s=${s}&page=${page}&y=${y}&type=${type}`);
  let searchResult = await res.json();

  if (searchResult.Error) {
    console.log(searchResult.Error);
    return;
  }

  renderMovies(searchResult.Search);

  renderPagination(Math.ceil(+searchResult.totalResults / 10), page);
}

async function getMovie(movieId) {
  let res = await fetch(`${API_URL}&i=${movieId}`);

  return await res.json();
}

function renderMovies(movies) {
  elUl.innerHTML = "";
  let html = "";
  movies.forEach((movie) => {
    let moviePosterUrl =
      movie.Poster === "N/A"
        ? "https://via.placeholder.com/300x445"
        : movie.Poster;
    html += `
      <div class="card-box shadow-lg mb-5 bg-body-tertiary rounded">
        <img class="img-card" src=${moviePosterUrl} alt=${movie.Title} />
        <h3 class="mb-1 h3-title">${movie.Title}</h3>
        <button class="btn btn-danger w-100 mb-2" data-info-btn="#test-modal" data-movie-id=${movie.imdbID}>Info</button>
      </div>
    `;
  });
  elUl.innerHTML = html;
}

function renderPagination(totalPages, page) {
  elPagination.innerHTML = "";
  let html = "";

  html += ` <li class="page-item${+page === 1 ? " disabled" : ""} ">
  <a class="page-link" data-movie-page=${+page - 1} href="?page=${
    +page - 1
  }" tabindex="-1" aria-disabled="true">Previous</a>
</li>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item${
      +page === i ? " active" : ""
    } "><a class="page-link" data-movie-page=${i} href="?page=${i}">${i}</a></li>`;
  }

  html += ` <li class="page-item${+page === totalPages ? " disabled" : ""}">
  <a class="page-link" data-movie-page=${+page + 1} href="?page=${
    +page + 1
  }"  tabindex="-1" aria-disabled="true">Next</a>
</li>`;

  elPagination.innerHTML = html;
}

function getFormData() {
  const formData = new FormData(elForm);

  return {
    s: formData.get("name"),
    y: formData.get("year-movie"),
    type: formData.get("type-movie"),
  };
}

async function OnBtnInfoClick(evt) {
  let el = evt.target.closest("[data-info-btn]");

  if (!el) return;

  let movieId = el.dataset.movieId;

  await fillModal(movieId);

  let modalSelector = el.dataset.infoBtn;
  document.querySelector(modalSelector).classList.add("show");
}

function OnModalCloseClick(evt) {
  let el = evt.target.closest("[data-modal-close]");

  if (!el) return;

  //   el.parentElement.parentElement.classList.remove("show");
  el.closest("[data-modal]").classList.remove("show");
}

function onModalOutsideClick(evt) {
  let el = evt.target;

  if (!el.matches("[data-modal]")) return;

  el.classList.remove("show");
}

function onPageClick(evt) {
  let el = evt.target.closest("[data-movie-page]");

  if (!el) return;

  evt.preventDefault();

  searchMovies(el.dataset.moviePage);
}

async function fillModal(movieId) {
  let movie = await getMovie(movieId);
  elDivInfo.querySelector("[data-title]").textContent = `Name: ${movie.Title}`;
  elDivInfo.querySelector("[data-year]").textContent = `Year: ${movie.Year}`;
  elDivInfo.querySelector("[data-rated]").textContent = `Rated: ${movie.Rated}`;
  elDivInfo.querySelector(
    "[data-released]"
  ).textContent = `Released: ${movie.Released}`;
  elDivInfo.querySelector(
    "[data-runtime]"
  ).textContent = `Time: ${movie.Runtime}`;
  elDivInfo.querySelector("[data-genre]").textContent = `Genre: ${movie.Genre}`;
  elDivInfo.querySelector(
    "[data-director]"
  ).textContent = `Director: ${movie.Director}`;
  elDivInfo.querySelector(
    "[data-writer]"
  ).textContent = `Writer: ${movie.Writer}`;
  elDivInfo.querySelector(
    "[data-actors]"
  ).textContent = `Actors: ${movie.Actors}`;
  elDivInfo.querySelector("[data-plot]").textContent = `Plot: ${movie.Plot}`;
  elDivInfo.querySelector(
    "[data-language]"
  ).textContent = `Language: ${movie.Language}`;
  elDivInfo.querySelector(
    "[data-awards]"
  ).textContent = `Awards: ${movie.Awards}`;
  elDivInfo.querySelector(
    "[data-ImdbRatings]"
  ).textContent = `IMDb Rating: ${movie.imdbRating}`;
  elDivInfo.querySelector("[data-id]").textContent = `IMDb Id: ${movie.imdbID}`;
  elDivInfo.querySelector("[data-type]").textContent = `Type: ${movie.Type}`;
}
