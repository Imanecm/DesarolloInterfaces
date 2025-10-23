const rootDirectory = window.location.origin;

function createMenuSection(section) {
    const menuSection = document.createElement('li');

    menuSection.innerHTML = `
        <a href="${section.reference}" class="menu-links">${section.name}</a>
    `;

    document.getElementById('menu-main-list').appendChild(menuSection);
}

fetch('data/data.json')
.then(response => response.json())
.then(data => {
	const sections = data.mainmenu_items;

	sections.forEach(createMenuSection);
})
.catch(error => {
	console.error('Error al cargar el archivo JSON:', error);
});