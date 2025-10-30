const rootDirectory = window.location.origin;

function createMenuSection(section) {
    const menuSection = document.createElement('li');
    
    if (section.hasDropdown) {
        menuSection.classList.add('dropdown');
        menuSection.innerHTML = `
            <a href="${section.reference}" class="menu-links dropdown-toggle">${section.name}</a>
            <div class="dropdown-menu categories-dropdown">
                <div class="dropdown-content">
                    <!-- COLUMNA PELÍCULAS -->
                    <div class="categories-column">
                        <h4>PELÍCULAS</h4>
                        <ul>
                            <li><a href="categoria-drama-peliculas.html">Drama</a></li>
                            <li><a href="categoria-comedia-peliculas.html">Comedia</a></li>
                            <li><a href="categoria-aventura-peliculas.html">Aventura</a></li>
                            <li><a href="categoria-terror-peliculas.html">Terror</a></li>
                            <li><a href="categoria-ciencia-ficcion-peliculas.html">Ciencia Ficción</a></li>
                        </ul>
                    </div>
                    
                    <!-- COLUMNA SERIES -->
                    <div class="categories-column">
                        <h4>SERIES</h4>
                        <ul>
                            <li><a href="categoria-drama-series.html">Drama</a></li>
                            <li><a href="categoria-comedia-series.html">Comedia</a></li>
                            <li><a href="categoria-aventura-series.html">Aventura</a></li>
                            <li><a href="categoria-terror-series.html">Terror</a></li>
                            <li><a href="categoria-ciencia-ficcion-series.html">Ciencia Ficción</a></li>
                        </ul>
                    </div>
                    
                    <!-- COLUMNA ANIME -->
                    <div class="categories-column">
                        <h4>ANIME</h4>
                        <ul>
                            <li><a href="categoria-aventura-anime.html">Aventura</a></li>
                            <li><a href="categoria-drama-anime.html">Drama</a></li>
                            <li><a href="categoria-terror-anime.html">Terror</a></li>
                            <li><a href="categoria-accion-anime.html">Acción</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } else {
        menuSection.innerHTML = `<a href="${section.reference}" class="menu-links">${section.name}</a>`;
    }
    
    document.getElementById('menu-main-list').appendChild(menuSection);
}

// Cargar el menú
fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        const sections = data.mainmenu_items;
        sections.forEach(createMenuSection);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });