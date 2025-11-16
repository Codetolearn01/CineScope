const TMDB_KEY = "569d29428db190258f88ccc652b81446";
const OMDB_KEY = "727328ef";

const container = document.getElementById("movieContainer");

const movieId = new URLSearchParams(window.location.search).get("id");
//https://www.omdbapi.com/?i=tt3896198/
async function loadMovie() {
  const url = `
  https://www.omdbapi.com/?i=tt3896198&api_key=${OMDB_KEY}
  `.replace(/\s+/g, "");

  const res = await fetch(url);
  const movie = await res.json();

  const imdbRating = await getIMDB(movie.imdbID);
  const ottLink = await getOTT(movieId);

  container.innerHTML = `
    <img src="${movie.Poster}" />

    <div class="info">
      <h2>${movie.Title}</h2>
      <p><b>Release:</b> ${movie.Language}</p>
      <p><b>Release:</b> ${movie.Released}</p>
      <p><b>Runtime:</b> ${movie.Runtime} mins</p>
      <p><b>Rating:</b> ${imdbRating}</p>
      <p><b>Overview:</b> ${movie.Plot}</p>

      <a href="${ottLink}" target="_blank">Watch on OTT</a>
    </div>
  `;
}

async function getIMDB(id) {
  if (!id) return "N/A";

  const url = `https://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${id}`;
  const res = await fetch(url);
  const data = await res.json();

  return data.imdbRating || "N/A";
}

async function getOTT(id) {
  const url = `
  https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${TMDB_KEY}
  `.replace(/\s+/g, "");

  const res = await fetch(url);
  const data = await res.json();

  const IN = data.results.IN;

  if (!IN || !IN.flatrate) return "#";

  return IN.flatrate[0].link;
}

loadMovie();