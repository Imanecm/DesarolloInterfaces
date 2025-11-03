/* --- Función para pasar de string a número --- */
function getNumericViews(viewsValue) {
    if (!viewsValue) return 0;
    const viewsString = String(viewsValue); 
    const cleanNumber = viewsString.replace(/\./g, ''); 
    return parseInt(cleanNumber, 10);
}

/* --- Cargar datos --- */
/* --- Trae el archivo indicado de donde se extraerán los datos --- */
fetch('data/data-multimedia-content.json')
/* --- El archivo se descarga correctamente y convierte la respuesta en un objeto js legible --- */
.then(response => response.json())
/* --- Se utilizan los datos obtenidos --- */
.then(data => {
    /* --- Almacenamos en content el array completo de contenido multimedia --- */
    const content = data.MULTIMEDIA_CONTENT;
    /* --- Guardamos en container el contenedor donde irán las películas --- */
    const container = document.getElementById('movies-container');

    /* --- Pre-procesar todos los elementos para añadir el campo numérico de ordenación --- 
     * map -> Recorre cada objeto del array y crea un nuevo array con los objetos transformados */
    const processedContent = content.map(item => {
        item.views_numeric = getNumericViews(item.views);
        return item;
    });

    /* --- Funcion que muestra una sección de el contenido TOP 5 mas visto ---
     * titleText -> Título de la sección
     * categoryFilter -> Categoría por la que se va a filtrar
     * dataArray -> Array que almacena el contenido que se va a filtrar */
    function showSection(titleText, cateogryFilter, dataArray) {
        /* --- Filtrar, ordear y recortar el top 5 ---
         * Con .filter filtramos el array dejando los elementos cuya categoría coincide con "categoryFilter" 
         * Con .sort ordenamos los elementos filtrados de mayor a menos según el número de visualizaciones 
         * Con .slice cortamos el array a solo 5 elementos, que son los que se mostraran, ya que es un TOP 5 de cada cateogría */
        const filteredContent = dataArray
            .filter(item => item.category === cateogryFilter)
            .sort((a, b) => b.views_numeric - a.views_numeric)
            .slice(0, 5);
    
        /* --- Si no hay contenido no se muestra nada --- */
        if (filteredContent.length === 0) {
            container.innerHTML = `<p>No hay contenido disponible.</p>`;
            return;
        }

        /* --- Insertamos el título de la sección ---
         * container -> Contenedor donde se insertará el contenido
         * insertAdjacentHTML -> Función que inserta el contenido
            * Primer parámetro -> Donde se inserta
            * Segundo parámetro -> Contenido HTML que se inserta */
        container.insertAdjacentHTML('beforeend', `
            <h1 class="section-title">${titleText}</h1>`
        );
        
        /* --- Creamos un div donde irán las 5 tarjetas --- */
        const cardRow = document.createElement('div');
        /* --- Añadimos la clase "card-row" al elemento div --- */
        cardRow.classList.add('card-row');
        
        /* --- Generar el HTML de todas las tarjetas --- 
         * filteredContent -> Array que contiene el contenido filtrado */
        filteredContent.forEach(content => {
            cardRow.innerHTML += createCard(content);
        });

        /* --- Añadimos el contenido de cardRow al contenedor --- */
        container.appendChild(cardRow);
    }

    container.insertAdjacentHTML('beforeend', `
            <div class="page-title">Lo mas visto</div>
        `
    );

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

/* --- Función que contiene la plantilla de las tarjetas --- */
function createCard(multiContent) {
    return `
        <div class="card">
            <img class="image" src="images/${multiContent.subcategory}/${multiContent.image}" alt="${multiContent.title}">
            <div class="info">
                <div class="movie-title">${multiContent.title}</div>
                <a class="button" href="movie-info.html?title=${encodeURIComponent(multiContent.title)}">Ver más</a>
            </div>
        </div>
    `
}