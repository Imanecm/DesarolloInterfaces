/* --- Cogemos los parámetros de la URL (category y subcategory) --- */
const params = new URLSearchParams(window.location.search);
const categoria = params.get("category");
const subcategoria = params.get("subcategory");

/* --- Si existe una categoría en la URL, procedemos a cargar las películas correspondientes --- */
if (categoria) {
    /* --- Cambiamos el título de la página según la categoría --- */
    document.title = `Categoría: ${categoria}`;

    /* --- Cargamos el archivo JSON con la información multimedia --- */
    fetch("data/data-multimedia-content.json")
    .then(response => response.json())
    .then(data => {
        /* --- Filtramos las películas según la categoría y subcategoría --- */
        const filtradas = data.MULTIMEDIA_CONTENT.filter(movie => {
            const matchCategory = movie.category.toLowerCase() === categoria.toLowerCase();
            const matchSub = subcategoria 
                ? (movie.subcategory && movie.subcategory.toLowerCase() === subcategoria.toLowerCase()) 
                : true;
            return matchCategory && matchSub;
        });
        
        /* --- Mostramos las películas filtradas en pantalla --- */
        mostrarPeliculas(filtradas);
    })
    /* --- En caso de error al cargar el archivo JSON mostramos un mensaje en consola --- */
    .catch(error => console.error("Error al cargar el archivo JSON", error));
}

/* --- Función para mostrar las películas filtradas dentro del contenedor --- */
function mostrarPeliculas(lista) {
    const container = document.getElementById('movies-container');
    container.innerHTML = '';  /* --- Limpiamos el contenedor antes de insertar nuevas películas --- */
    
    /* --- Si no se encontraron películas, mostramos un mensaje al usuario --- */
    if (lista.length === 0) {
        container.innerHTML = `<p>No se encontraron películas para esta categoría y subcategoría.</p>`;
        return;
    }

    /* --- Creamos una fila para las tarjetas de las películas --- */
    const cardRow = document.createElement('div');
    cardRow.classList.add('filtered-card-row');
    
    /* --- Recorremos la lista de películas y generamos las tarjetas una por una --- */
    lista.forEach(movie => {
        cardRow.innerHTML += generateMovieCard2(movie);
    });
    
    /* --- Mostramos el nombre de la categoría y subcategoría encima de las películas --- */
    container.insertAdjacentHTML('beforeend', `
        <div id="categoria-nombre">${categoria}</div>
        <div id="subcategoria-nombre">${subcategoria} (${lista.length})</div>
    `);

    /* --- Finalmente añadimos las tarjetas al contenedor principal --- */
    container.appendChild(cardRow);
}

/* --- Función que genera el código HTML de cada tarjeta de película --- */
function generateMovieCard2(movie) {
    return `
        <div class="card" data-link="movie-info.html?title=${encodeURIComponent(movie.title)}">
            <img class="image" src="images/${movie.subcategory}/${movie.image}" alt="${movie.title}">
            <div class="info">
                <div class="movie-title">${movie.title}</div>
                <div class="movie-views">
                    ${movie.views}
                    <img src="images/icons/eye.png" alt="Visualizaciones" class="views-img">
                </div>
                <a class="button" href="movie-info.html?title=${encodeURIComponent(movie.title)}" target="_blank">Ver más</a>
            </div>
        </div>
    `;
}

/* --- Detectamos los clics en las tarjetas para redirigir a la página de información --- */
document.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card && card.dataset.link) {
        window.location.href = card.dataset.link;
    }
});