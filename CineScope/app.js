const TMDB_KEY = "569d29428db190258f88ccc652b81446";
const OMDB_KEY = "727328ef";

/*let currentPage = 1;
let currentQuery = "";
// let currentLang = "";

// DOM
const movieList = document.getElementById("movieList");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const pageNumber = document.getElementById("pageNumber");
const year = document.getElementById("yearFilter");
const currentLang = document.getElementById("languageFilter");

// Search
searchBtn.onclick = () => {
  currentQuery = searchInput.value;
  currentPage = 1;
  fetchMovies();
};

async function fetchMovies() {
  movieList.innerHTML = "Loading...";
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}
  &query=${currentQuery}
  &page=${currentPage}
  &language=${currentLang}
  `.replace(/\s+/g, "");
  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || !Array.isArray(data.results)) {
    movieList.innerHTML = "<h2>No movies available</h2>";
    return;
  }

  displayMovies(data.results);
  pageNumber.textContent = currentPage;

//   displayMovies(res.results);

}


// Fetch movies
// async function fetchMovies() {
//   movieList.innerHTML = "<h2>Loading...</h2>";
// //   https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}
//   const url = `
//   https://api.themoviedb.org/3/movie/${searchInput}?api_key=${TMDB_KEY}
//   &query=${currentQuery}
//   &language=${currentLang}
//   &page=${currentPage}
//   `.replace(/\s+/g, "");

//   const res = await fetch(url);
//   const data = await res.json();

//   displayMovies(data.results);
//   pageNumber.textContent = currentPage;
// }

function displayMovies(movies) {
  if (!Array.isArray(movies)) {
    movieList.innerHTML = "<h2>No movies found</h2>";
    return;
  }
//   const sel_year = movies.release_date.slice(0,4);
  movieList.innerHTML = "";
 
    movies.forEach(movie => {
        if(movie.original_language === currentLang.value){
            movieList.innerHTML += `
            <div class="movieCard">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Image">
                <div class="content">
                    <h3>${movie.title}</h3>
                    <p><b>Year : </b>${movie.release_date?.slice(0, 4) || "N/A"}</p>
                    <button onclick="openMovie(${movie.id})">Click Here To Watch</button>
                </div
            </div>
            `;
        }
    });
 

//   movies.forEach(movie => {
//     movieList.innerHTML += `
//       <div class="movieCard onclick="openMovie(${movie.id})">
//         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
//         <h3>${movie.title}</h3>
//         <p>${movie.release_date?.slice(0, 4) || "N/A"}</p>
//       </div>
//     `;
//   });
}


// Display movies
// function displayMovies(movies) {
//   movieList.innerHTML = "";

//   movies.forEach(movie => {
//     movieList.innerHTML += `
//       <div class="movieCard" onclick="openMovie(${movie.id})">
//         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
//         <h3>${movie.title}</h3>
//         <p>${movie.release_date?.slice(0, 4) || "N/A"}</p>
//       </div>
//     `;
//   });
// }

function openMovie(id) {
  window.location.href = `movie.html?id=${id}`;
}

// Pagination
document.getElementById("nextPage").onclick = () => {
  currentPage++;
  fetchMovies();
};

document.getElementById("prevPage").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    fetchMovies();
  }
};*/

let currentPage = 1;               // Website page number
let currentQuery = "";
let fullResults = [];              // All results from ALL API pages
const MOVIES_PER_PAGE = 18;

// DOM
const movieList = document.getElementById("movieList");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const pageNumber = document.getElementById("pageNumber");
const currentLang = document.getElementById("languageFilter");
const year = document.getElementById("year");
const totalResults = document.getElementById("total_results");


// Search button
searchBtn.onclick = () => {
  currentQuery = searchInput.value.trim();
//   if(currentQuery === ""){
//     movieList.innerHTML = "<h1>Please Enter Some Things to Search!!</h1>";
//     // movieList.innerHTML = year.value;
//     return;
//   }
  currentPage = 1;
//   SearchByMovieName();
  loadAllResults();
};

async function SearchByMovieName(){
    movieList.innerHTML = "<h2>Loading...</h2>";
    totalResults.innerHTML = `<h3>Total Results : ${filtered.length}</h3>`;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${currentQuery}&language=${currentLang.value}`;
            // `.replace(/\s+/g, "");
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.results);
    
    if (!data.results || !Array.isArray(data.results)) {
        movieList.innerHTML = "<h2>No movies available</h2>";
        return;
      }
    const movies = data.results;

    movies.forEach(movie => {
        movieList.innerHTML += `
          <div class="movieCard">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <div class="content">
                  <h3>${movie.title}</h3>
                  <p><b>Year:</b> ${movie.release_date?.slice(0, 4) || "N/A"}</p>
                  <button onclick="openMovie(${movie.id})">Click Here To Watch</button>
              </div>
          </div>
        `;
      });
}

// 🔥 1. Fetch ALL API pages for the search
async function loadAllResults() {
  movieList.innerHTML = "<h2>Loading...</h2>";
  fullResults = [];

  let apiPage = 1;

  while (true) {
    let url = "";
    if(currentQuery !== ""){
     url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${currentQuery}&page=${apiPage}&with_original_language=${currentLang.value}&sort_by=vote_average.desc`;
    }else if(year.value !== ""){
     url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&primary_release_year=${year.value}&page=${apiPage}&with_original_language=${currentLang.value}&sort_by=vote_average.desc`;
    }
    // `.replace(/\s+/g, "");
    // https://api.themoviedb.org/3/discover/movie?api_key=KEY&primary_release_year=1980
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.results);
    
    if (!data.results || data.results.length === 0) {
      break; // No more pages
    }

    fullResults = [...fullResults, ...data.results];
    // console.log(fullResults);
    // console.log(apiPage);
    // break;

    if (apiPage >= data.total_pages) break;  // Stop if last API page reached
    apiPage++;
  }
  showPage(currentPage);
}


// 🔥 2. Show 20 results for the current website page
function showPage(page) {
  movieList.innerHTML = "";

  // Filtering by language (optional)
  const filtered = fullResults.filter(
    movie => {
        if(currentLang.value !==""){
        return movie.original_language === currentLang.value;
        }
        // else if(year.value !== ""){
        //     return movie.release_date.slice(0,4) === year;
        // }
        return fullResults;
    }
  );

  const start = (page - 1) * MOVIES_PER_PAGE;
  const end = start + MOVIES_PER_PAGE;

  const pageItems = filtered.slice(start, end);
  totalResults.innerHTML = `<h3>Total Results : ${filtered.length}</h3>`;

  if (pageItems.length === 0) {
    movieList.innerHTML = "<h2>No more movies found</h2>";
    return;
  }

  pageItems.forEach(movie => {
    if(movie.poster_path && movie.title && movie.release_date){
        movieList.innerHTML += `
        <div class="movieCard">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            <div class="content">
                <h3>${movie.title}</h3>
                <p><b>Year:</b> ${movie.release_date?.slice(0, 4) || "N/A"}</p>
                <button onclick="openMovie(${movie.id})">Click Here To Watch</button>
            </div>
        </div>
        `;
    }
  });

  pageNumber.textContent = page;
}


// Movie click
function openMovie(id) {
  window.location.href = `movie.html?id=${id}`;
}


// 🔥 3. Pagination buttons
document.getElementById("nextPage").onclick = () => {
  currentPage++;
  showPage(currentPage);
};

document.getElementById("prevPage").onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
};

