const formContainer = document.getElementById('contenedor');

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'susbtn') {
        // Cargar el HTML del formulario externo
        fetch('formulario.html')
            .then(response => response.text())
            .then(html => {
                // Insertar el formulario en el contenedor
                formContainer.innerHTML = html;

                // Forzar reflow antes de añadir la clase visible (para animación)
                void formContainer.offsetWidth;

                // Mostrar el modal
                formContainer.classList.add('visible');

                // Una vez insertado el HTML, debemos inicializar los eventos del formulario
                inicializarFormulario();
            })
            .catch(error => console.error("Error al cargar el formulario:", error));
    }

    // Cerrar el modal si se hace clic fuera del formulario
    if (e.target === formContainer) {
        formContainer.classList.remove('visible');
    }
});

function inicializarFormulario() {
    // Cogemos el id de el formulario y del mensaje que mandaremos una vez se rellenen los datos
    const formulario = document.getElementById("formularioInscripcion");
    const mensajeExito = document.getElementById("mensajeExito");

    if (!formulario) {
        console.error("No se encontró el formulario.");
        return;
    }

    // Manejar envío del formulario
    formulario.addEventListener("submit", function (evento) {
        // esto hace que la pagina web no se recargue cuando le damos a enviar porque si no se borrarian los datos y no podriamos descargar el archivo
        evento.preventDefault();

        // obtenemos los valores de los campos
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const edad = document.getElementById("edad").value.trim();
        const genero = document.getElementById("genero").value;

        // hacemos una validación ya que no queremos que ningun campo quede vacio
        if (nombre === "" || correo === "" || edad === "" || genero === "") {
            //mostramos un mensaje
            mensajeExito.style.display = "block";
            //le ponemos color rojo para que se vea bien que es un error
            mensajeExito.style.color = "#f00";
            mensajeExito.textContent = "Por favor, completa todos los campos.";
            return;
        }

        // si llegamos aqui es que todo ha ido bien entonces mostramos el mensaje de éxito
        mensajeExito.style.display = "block";
        mensajeExito.style.color = "#0f0";
        mensajeExito.textContent = "¡Inscripción exitosa!";

        // creamos el archivo txt(sacado de youtube)
        //cogemos los datos que introdujo antes el usuario y añadimos tambien la fecha y la hora actual
        const contenido =
            `--- Inscripción MovieFlix ---\n` +
            `Nombre: ${nombre}\n` +
            `Correo: ${correo}\n` +
            `Edad: ${edad}\n` +
            `Género favorito: ${genero}\n` +
            `Fecha: ${new Date().toLocaleString()}\n`;

        // convertimos ese texto anterior en un archivo usando un Blob
        //su funcion es crear archivos en navegadores
        const archivo = new Blob([contenido], { type: 'text/plain' });

        // creamos un enlace temporal que apunte al archivo
        const enlaceDescarga = document.createElement('a');
        //esto genera una URL temporal del archivo que estamos creando
        enlaceDescarga.href = URL.createObjectURL(archivo);
        //le ponemos el nombre con el que queremos que se guarde nuestro archivo
        enlaceDescarga.download = 'inscripcion.txt';
        enlaceDescarga.click(); // forzamos la descarga del archivo como si el usuario le hubiera hecho click


         // limpiamos el formulario 
        formulario.reset();
    });
}