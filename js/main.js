let API_KEY = "d51655be";
let API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
let IMG_URL = `http://img.omdbapi.com/?apikey=${API_KEY}`;

let elForm = document.querySelector("[data-form");
let elList = document.querySelector("[data-list]");
let elDIvInfo = document.querySelector("[data-div-info]")
let elInfo = document.querySelector("[data-info]")
let elLi = document.querySelector("[data-li]")
let elDivLi = document.querySelector("[data-div-li]")
let elTemplate = document.querySelector("[data-template]")
let elButton = document.querySelector('[data-modal-open]')


elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let formData = new FormData(elForm);
  let name = formData.get("input-name");

  searchMovies(name);
  elList.prepend(createDiv(movie));
  
 
});


async function searchMovies(query) {
  elList.innerHTML = `<h1 class="h1">Loading...</h1>`;
  let res = await fetch(`${API_URL}&s=${query}`);
  let searchResult = await res.json();

  renderMovies(searchResult.Search);
  
  
}


function renderMovies(movies) {
  elList.innerHTML = "";
  let html = ""
  movies.forEach(movie => {
    html = elLi =  elInfo.textContent = ` Name = "${movie.Title}" , Type = "${movie.Type}" , Movie_Id = "${movie.imdbID}" ;  ${movie.Poster}`;
  })
  movies.filter((movie) => elList.append(createDiv(movie))) 
  elList = html
}


function createDiv(movie) {
  
  
  let elCard = elTemplate.content.cloneNode(true);

  elCard.querySelector("img").src = movie.Poster;
  elCard.querySelector("h3").textContent = movie.Title;

  return elCard
   
}



