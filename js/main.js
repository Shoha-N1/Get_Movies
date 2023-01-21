let API_KEY = "d51655be";
let API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
let IMG_URL = `https://img.omdbapi.com/?apikey=${API_KEY}`;

let elForm = document.querySelector("[data-form");
let elList = document.querySelector("[data-list]");
let elDIvInfo = document.querySelector("[data-div-info]")
let elInfo = document.querySelector("[data-info]")
let elLi = document.querySelector("[data-li]")
let elDivLi = document.querySelector("[data-div-li]")
let elTemplate = document.querySelector("[data-template]")
let elButton = document.querySelector('[data-modal-open]')
let elPagination = document.querySelector("[data-movie-pagination]")


elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let formData = new FormData(elForm);
  let name = formData.get("input-name");
  let year = formData.get("input-year");
  let type = formData.get("select-type");

  searchMovies(name,year,type);
});

async function searchMovies(query, year, type, page = 1) {
  elList.innerHTML = `<img class="loader" src="./img/Spinner-1s-200px.svg" >`;
  let res = await fetch(`${API_URL}&s=${query}&y=${year}&type=${type}&page=${page}`);
  let searchResult = await res.json();

  if (searchResult.Error){
    alert(searchResult.Error)
    return
  }

  renderMovies(searchResult.Search);

  renderPagination(Math.ceil(+searchResult.totalResults / 10), query, year,type, page)
}

async function getMovie(movieId){
  let res = await fetch(`${API_URL}&i=${movieId}`)
  return await res.json()
}

function renderMovies(movies) {
  elList.innerHTML = "";
  let html = ""
  movies.forEach(movie => {
    let moviePosterUrl = movie.Poster === "N/A" ? "https://dostavka.phali-hinkali.ru/api2/images/SlideBanners33/bc4a8cdb3a-1_1600x955.jpg" : movie.Poster
     html += ` <li data-li>
                <div data-div-li class="box-model">
                    <img src="${moviePosterUrl}">
                    <button type="button" data-modal-open="#test-modal" data-movie-id="${movie.imdbID}"  class="button-01">Info</button>
                </div>
                <h3>${movie.Title}</h3>
            </li> `

            elList.append(createDiv(movie))
          }) 
  elList.innerHTML = html;
}


function renderPagination(totalPages, query, page){

  elPagination.innerHTML = "";
  let html = "";

  html += ` <li class="page-item${+page === 1 ? " disabled" : ""} ">
  <a class="page-link" data-movie-page=${+page - 1} data-movie-query="${query}"   href="?page=${+page - 1}" tabindex="-1" aria-disabled="true">Previous</a>
</li>`

  for (let i = 1; i <= totalPages; i++) {
  
    html += `<li class="page-item${+page === i ? " active" : ""} "><a class="page-link" data-movie-page=${i} data-movie-query="${query}"   href="?page=${i}">${i}</a></li>`
  }

  html += ` <li class="page-item${+page === totalPages ? " disabled" : ""}">
  <a class="page-link" data-movie-page=${+page + 1} data-movie-query="${query}"   href="?page=${+page + 1}"  tabindex="-1" aria-disabled="true">Next</a>
</li>`

  elPagination.innerHTML = html
}


document.addEventListener("click", (evt) => {

  onModalButtonClick(evt)
  onModalOutsideClick(evt)
  onModalCLoseClick(evt)
  onPageClick(evt)
})

function onModalCLoseClick(evt) {  
  let el = evt.target.closest("[data-modal-close]")

  if(!el) return;


  el.parentElement.parentElement.classList.remove("show")
}

async function onModalButtonClick(evt) {

  let el = evt.target.closest("[data-modal-open]")

  if(!el) return;

  let modalSel = el.dataset.modalOpen;
  let movieId = el.dataset.movieId;

  await createDiv(movieId)

  let modalSelector = el.dataset.modalOpen;
  document.querySelector(modalSelector).classList.add("show")
}

function onModalOutsideClick(evt) {
  let el = evt.target;

  if(!el.matches("[data-modal]")) return;

  el.classList.remove("show")
}

function onPageClick(evt){
  
  let el = evt.target.closest("[data-movie-page]")

  if(!el) return;

  evt.preventDefault();

  searchMovies(el.dataset.movieQuery, el.dataset.moviePage)
}


 async function createDiv(movieId) {
 
  let movie = await getMovie(movieId)

  elInfo.querySelector("[data-title]").textContent = `Name: "${movie.Title}"`;
  elInfo.querySelector("[data-year]").textContent = `Year: "${movie.Year}"`;
  elInfo.querySelector("[data-rated]").textContent = `Rated: "${movie.Rated}"`;
  elInfo.querySelector("[data-released]").textContent = `Released "${movie.Released}"`;
  elInfo.querySelector("[data-runtime]").textContent = `Runtime: "${movie.Runtime}"`;
  elInfo.querySelector("[data-genre]").textContent = `Genre: "${movie.Genre}"`;
  elInfo.querySelector("[data-director]").textContent = `Director: "${movie.Director}"`; 
  elInfo.querySelector("[data-metascore]").textContent = `Metascore: "${movie.Metascore}"`;
  elInfo.querySelector("[data-type]").textContent = `Type: "${movie.Type}"`;
  elInfo.querySelector("[data-id]").textContent = `imdbId: "${movie.imdbID}"`;
}




