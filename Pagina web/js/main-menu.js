const rootDirectory = window.location.origin;

function createMenuSection(section) {
    const menuSection = document.createElement('li');
    
    /* --- Si la sección tiene hasDropdown en true --- */
    if (section.hasDropdown) {
        menuSection.classList.add('dropdown');
        menuSection.innerHTML = `
            <a href="${section.reference}" class="menu-links dropdown-toggle">${section.name}</a>
            <div class="dropdown-menu categories-dropdown">
                <div class="dropdown-content">
                    
                    <!-- COLUMNA PELÍCULAS -->
                    <div class="categories-column category" data-category="Peliculas">
                        <h4>PELÍCULAS</h4>
                        <ul>
                            <li><a class="subcategory" data-subcategory="Drama">Drama</a></li>
                            <li><a class="subcategory" data-subcategory="Comedia">Comedia</a></li>
                            <li><a class="subcategory" data-subcategory="Aventura">Aventura</a></li>
                            <li><a class="subcategory" data-subcategory="Terror">Terror</a></li>
                            <li><a class="subcategory" data-subcategory="Ciencia Ficción">Ciencia Ficción</a></li>
                        </ul>
                    </div>
                    
                    <!-- COLUMNA SERIES -->
                    <div class="categories-column category" data-category="Series">
                        <h4>SERIES</h4>
                        <ul>
                            <li><a class="subcategory" data-subcategory="Drama">Drama</a></li>
                            <li><a class="subcategory" data-subcategory="Comedia">Comedia</a></li>
                            <li><a class="subcategory" data-subcategory="Aventura">Aventura</a></li>
                            <li><a class="subcategory" data-subcategory="Terror">Terror</a></li>
                            <li><a class="subcategory" data-subcategory="Ciencia Ficción">Ciencia Ficción</a></li>
                        </ul>
                    </div>
                    
                    <!-- COLUMNA ANIME -->
                    <div class="categories-column category" data-category="Anime">
                        <h4>ANIME</h4>
                        <ul>
                            <li><a class="subcategory" data-subcategory="Drama">Drama</a></li>
                            <li><a class="subcategory" data-subcategory="Comedia">Comedia</a></li>
                            <li><a class="subcategory" data-subcategory="Aventura">Aventura</a></li>
                            <li><a class="subcategory" data-subcategory="Acción">Acción</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        const subcategorias = menuSection.querySelectorAll('.subcategory');

        subcategorias.forEach(subcat => {
            subcat.addEventListener('click', (event) => {
                event.preventDefault(); /* --- evita el comportamiento por defecto de la etiqueta a --- */
                const subcategoria = subcat.getAttribute('data-subcategory');

                /* --- Encuentra la categoría padre --- */
                const categoriaContainer = subcat.closest('.category');
                const categoria = categoriaContainer?.getAttribute('data-category');

                /* --- Redirigimos a la plantilla que generará las películas con los parámetros category y subcategory --- */
                window.location.href = `categoria.html?category=${encodeURIComponent(categoria)}&subcategory=${encodeURIComponent(subcategoria)}`;
            });
        });
    } else {
        menuSection.innerHTML = `<a href="${section.reference}" class="menu-links">${section.name}</a>`;
    }
    
    document.getElementById('menu-main-list').appendChild(menuSection);
}

/*
 *
 *
 * 
 * 
 * 
 * 
*/
fetch('data/data-main-menu.json')
.then(response => response.json())
.then(data => {
    const sections = data.MAINMENU_ITEMS;

    /* --- CREA GENERA CADA UNA DE LA SECCIONES ALMACENADAS EN EL JSON --- */
    sections.forEach(createMenuSection);
})
.catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
});