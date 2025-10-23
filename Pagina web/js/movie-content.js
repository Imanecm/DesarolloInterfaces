function generateMovieContent(movie) {
    const container = document.getElementById('movie-content');

    container.insertAdjacentHTML('beforeend', `
        <div class="navbar">Detalles de la película - ${movie.title}</div>

        <div class="movie-container">
            <img class="movie-poster" src="images/${movie.image}" alt="${movie.title}">
            
            <div class="movie-details">
                <h2 class="movie-title">${movie.title}</h2>
                <h3 class="movie-description">${movie.description}</h3>
                <h3 class="movie-castt">Cast:</h3>
                <div class="cast-list">
                    ${movie.castlist}
                </div>
                <a class="trailer-button" href="${movie.trailer}" target="_blank">Ver tráiler</a>
                <a class="trailer-button" href="boutaina.html" target="_blank">Volver</a>

                <div class="reviews">
                    <strong>Reviews</strong>
                    <h3 class="review">Reomendada</h3>
                    <h3 class="review">Mind-blowing</h3>
                    <h3 class="review">Perfecta</h3>
                </div>
            </div>
        </div>
    `);
}

fetch('data/data.json')
.then(response => response.json())
.then(data=> {
	const movie = data.movie_content;

	const params = new URLSearchParams(window.location.search);
    const movieTitle = params.get('title');

    const selectedMovie = movie.find(m => 
        m.title.toLowerCase() === movieTitle?.toLowerCase()
    );

    if (selectedMovie) {
        generateMovieContent(selectedMovie);
    } else {
        document.getElementById('movie-content').innerHTML = "<h2>Película no encontrada</h2>";
    }
})
.catch(error => {
	console.error('Error al cargar el archivo JSON:', error);
});