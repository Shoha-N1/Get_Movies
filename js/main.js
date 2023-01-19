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
    
     html += ` <li data-li>
                <div data-div-li class="box-model">
                    <img src="${movie.Poster}">
                    <button type="button" data-modal-open="#test-modal" class="button-01">Info</button>
                </div>
                <h3>${movie.Title}</h3>
            </li> `
             elLi += elInfo.textContent = ` Name = "${movie.Title}" , Type = "${movie.Type}" , Movie_Id = "${movie.imdbID}" ;  ${movie.Poster}`;
  })
  
  elList.innerHTML = html;
}


function createDiv(movie) {
  let elCard = elTemplate.content.cloneNode(true);

  elCard.querySelector("img").src = movie.Poster;
  elCard.querySelector("h3").textContent = movie.Title;

  return elCard
   
}



