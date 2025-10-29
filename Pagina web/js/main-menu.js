const rootDirectory = window.location.origin;

function createMenuSection(section) {
    const menuSection = document.createElement('li');
    
    if (section.hasDropdown) {
        menuSection.classList.add('dropdown');
        menuSection.innerHTML = `
            <a href="${section.reference}" class="menu-links dropdown-toggle">${section.name}</a>
            <div class="dropdown-menu categories-dropdown">
                <div class="dropdown-content">
                    <div class="categories-column">
                        <h4>Películas y Anime</h4>
                        <ul>
                            <li><a href="peliculas.html">Todas las Películas</a></li>
                            <li><a href="anime.html">Todo el Anime</a></li>
                            <li><a href="series.html">Todas las Series</a></li>
                        </ul>
                    </div>
                    <div class="categories-column">
                        <h4>Géneros</h4>
                        <ul>
                            <li><a href="categoria.html?genero=Drama">Drama</a></li>
                            <li><a href="categoria.html?genero=Comedia">Comedia</a></li>
                            <li><a href="categoria.html?genero=Acción">Acción</a></li>
                            <li><a href="categoria.html?genero=Aventura">Aventura</a></li>
                            <li><a href="categoria.html?genero=Ciencia Ficción">Ciencia Ficción</a></li>
                            <li><a href="categoria.html?genero=Terror">Terror</a></li>
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