/* --- Función que genera la tarjeta con la información
 * del contenido multimedia seleccionado --- 
 * multiContent -> Contenido multimedia seleccionado */
function generateMultiContent(multiContent) {
    const container = document.getElementById('movie-content');

    container.insertAdjacentHTML('beforeend', `
        <div class="navbar">Detalles de la película - ${multiContent.title}</div>

        <div class="movie-container">
            <img class="movie-poster" src="images/${multiContent.subcategory}/${multiContent.image}" alt="${multiContent.title}">
            
            <div class="movie-details">
                <h2 class="movie-title">${multiContent.title}</h2>
                <h3 class="movie-description">${multiContent.description}</h3>
                <h3 class="movie-castt">Cast:</h3>
                <div class="cast-list">
                    ${multiContent.castlist}
                </div>
                <a class="trailer-button" href="${multiContent.trailer}" target="_blank">Ver tráiler</a>
                <a class="trailer-button" href="boutaina.html" target="_blank">Volver</a>

                <div class="reviews">
                    <strong>Reviews</strong>
                    <h3 class="review">Recomendada</h3>
                    <h3 class="review">Mind-blowing</h3>
                    <h3 class="review">Perfecta</h3>
                </div>
            </div>
        </div>
    `);
}

fetch('data/data-multimedia-content.json')
.then(response => response.json())
.then(data=> {
    /* --- Guardamos el array completo con el contenido multimedia -- */
	const multiContent = data.MULTIMEDIA_CONTENT;

    /* --- Buscamos el título del contenido seleccionado desde la barra de direcciones --- */
	const params = new URLSearchParams(window.location.search);
    const movieTitle = params.get('title');

    /* --- Buscamos dentro del array los resultados que coincidan
     * con el título extraído de la URL --- */
    const selectedContent = multiContent.find(m => 
        m.title.toLowerCase() === movieTitle?.toLowerCase()
    );

    /* --- Si hay contenido, se genera la información de dicho contenido
     * si no hay, se muestra un mensaje --- */
    if (selectedContent) {
        generateMultiContent(selectedContent);
    } else {
        document.getElementById('movie-content').innerHTML = "<h2>Película no encontrada</h2>";
    }
})
.catch(error => {
	console.error('Error al cargar el archivo JSON:', error);
});