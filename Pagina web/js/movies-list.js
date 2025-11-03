
function getNumericViews(viewsValue) {
    if (!viewsValue) return 0;
    const viewsString = String(viewsValue); 
    const cleanNumber = viewsString.replace(/\./g, ''); 
    return parseInt(cleanNumber, 10);
}

fetch('data/data-multimedia-content.json')
.then(response => response.json())
.then(data => {
    let content = data.MULTIMEDIA_CONTENT;

    // Pre-procesar todos los elementos para añadir el campo numérico de ordenación
    const processedContent = content.map(item => {
        item.views_numeric = getNumericViews(item.views);
        return item;
    });

    // ------------------------------------
    // FUNCIONES PARA MOSTRAR LAS SECCIONES
    // ------------------------------------
    
    function showSection(titleText, cateogryFilter, dataArray) {
        /* --- Filtrar, ordear y recortar el top 5 ---
         * Con .filter filtramos 
        const filteredContent = dataArray
            .filter(item => item.category === cateogryFilter)
            .sort((a, b) => b.views_numeric - a.views_numeric)
            .slice(0, 5);

        const container = document.getElementById('movies-container');
    
        /* --- Si no hay contenido no se muestra nada --- */
        if (filteredContent.length === 0) {
            container.innerHTML = `<p>No hay contenido disponible.</p>`;
            return;
        }

        container.insertAdjacentHTML('beforeend', `<h1 class="section-title">${titleText}</h1>`);
        
        const cardRow = document.createElement('div');
        cardRow.classList.add('card-row'); // Usaremos esta clase en el CSS
        
        /* --- Generar el HTML de todas las tarjetas --- */
        filteredContent.forEach(movie => {
            cardRow.innerHTML += createCard(movie);
        });

        container.appendChild(cardRow);
    }

    // ------------------------
    // LLAMADAS A LAS SECCIONES
    // ------------------------

    /* --- Mostrar TOP 5 Películas --- */
    showSection("Películas", "Peliculas", processedContent);

    /* --- Mostrar TOP 5 Series --- */
    showSection("Series", "Series", processedContent);

    /* --- Mostrar TOP 5 Animes --- */
    showSection("Anime", "Anime", processedContent);
})
.catch(error => {
	console.error('Error al cargar el archivo JSON:', error);
});

function createCard(movie) {
    return `
        <div class="card">
            <img class="image" src="images/${movie.subcategory}/${movie.image}" alt="${movie.title}">
            <div class="info">
                <div class="movie-title">${movie.title}</div>
                <a class="button" href="movie-info.html?title=${encodeURIComponent(movie.title)}">Ver más</a>
            </div>
        </div>
    `
}