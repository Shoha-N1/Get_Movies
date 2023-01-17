let API_KEY = "d51655be";
let API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
let IMG_URL = `http://img.omdbapi.com/?apikey=${API_KEY}`;


let elForm = document.querySelector("[data-form");
let elList = document.querySelector("[data-movie-list]");


elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

 
  let formData = new FormData(elForm)
  let name = formData.get("input-name")

  searchMovies(name)


})

async function searchMovies(query){

    elList.innerHTML = `<p class="p"></p>`
    let res = await fetch(`${API_URL}&s=${query}`)
    let searchResult = await res.json();

    renderMovies(searchResult.Search)

  }

  function renderMovies(movies) {
    elList.innerHTML = "";
    let html = "";
    movies.forEach(movie => {
        html += `<li> <div><img src= "${movie.Poster}" alt="${movie.Title}" /> </div> <h3>${movie.Title}</h3></li>`
    })
    
    elList.innerHTML = html;
  };
  