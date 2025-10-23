
function generateMovieCard(movie) {
    const container = document.getElementById('movies-container');

    container.insertAdjacentHTML('beforeend', `
        <div class="card">
            <img class="image" src="images/${movie.image}" alt="${movie.title}">
            <div class="info">
                <div class="movie-title">${movie.title}</div>
                <a class="button" href="movie-info.html?title=${encodeURIComponent(movie.title)}" target="_blank">Ver más</a>
            </div>
        </div>
    `);
}

fetch('data/data.json')
.then(response => response.json())
.then(data=> {
	const movie = data.movies_list;

	movie.forEach(generateMovieCard);
})
.catch(error => {
	console.error('Error al cargar el archivo JSON:', error);
});