
document.getElementById('btnNuevoProyecto').addEventListener('click', function () {
    redirectToProyectos(); // Llamar a la función logIn cuando se haga clic en el botón Login
});

function redirectToProyectos() {
    window.location.href = "../../admin/proyectos/RegistroProyecto.html";
}


// Función para obtener todos los proyectos
function obtenerProyectos(token) {
    // URL de la API
    let url = 'http://localhost:8080/CORCOM_BackEnd/api/proyectos/getAll?token=' + encodeURIComponent(token);
    // Petición Fetch
    fetch(url)
            .then(response => {
                // Verificar el estado de la respuesta
                if (!response.ok) {
                    throw new Error('No se pudo obtener la lista de proyectos');
                }
                // Conertir la respuesta a JSON
                return response.json();
            })
            .then(data => {
                // Llamar a la función actualizarContenido con la respuesta
                actualizarContenido({status: 200, proyectos: data});
            })
            .catch(error => {
                // Capturar errores
                console.error('Error al obtener proyectos:', error);
                // Llamar a la función actualizarContenido con un estado de error
                actualizarContenido({status: 400});
            });
}

let proyectosArray = [];


function llenarTablaProyectos(proyectos) {
    // Guardar los proyectos en el array global
    proyectosArray = proyectos;

    // Referencia a la tabla en el HTML
    let tabla = document.getElementById('tablaProyectos');

    // Verificar si la tabla existe en el documento
    if (!tabla) {
        console.error('Elemento tablaProyectos no encontrado en el documento.');
        return;
    }

    // Limpiar la tabla antes de llenarla nuevamente
    tabla.innerHTML = '';

    // Agregar clases de Bootstrap a la tabla
    tabla.classList.add('table', 'table-black', 'table-striped', 'text-white');

    // Encabezados de la tabla
    let encabezados = ['Nombre Proyecto', 'Dirección', 'Estatus', 'Nombre Empresa', 'Responsable', 'Acciones'];

    // Crear fila de encabezados
    let filaEncabezados = tabla.createTHead().insertRow();
    encabezados.forEach(encabezado => {
        let th = document.createElement('th');
        th.textContent = encabezado;
        th.style.color = 'white'; // Color blanco para el texto de los encabezados
        filaEncabezados.appendChild(th);
    });

    // Iterar sobre los proyectos y agregar filas a la tabla
    proyectos.forEach((proyecto, index) => {
        let fila = tabla.insertRow();
        fila.insertCell(0).textContent = proyecto.nombreProyecto;

        // Construir la dirección concatenando los campos de la visita
        let direccionVisita = `${proyecto.visita.estado}, ${proyecto.visita.ciudad}, ${proyecto.visita.calle}, ${proyecto.visita.colonia}`;
        fila.insertCell(1).textContent = direccionVisita;

        let estatusCelda = fila.insertCell(2);
        estatusCelda.textContent = proyecto.estatus;
        aplicarEstiloEstatus(estatusCelda, proyecto.estatus);
        fila.insertCell(3).textContent = proyecto.empresa.nombreEmpresa;
        fila.insertCell(4).textContent = proyecto.empresa.nombreRepresentante;

        // Crear celda para el botón de detalles
        let celdaAcciones = fila.insertCell(5);
        let detallesBoton = document.createElement('button');
        detallesBoton.style.backgroundColor = '#054014'; // Color de fondo
        detallesBoton.style.border = 'none'; // Sin borde
        detallesBoton.style.borderRadius = '5px'; // Bordes redondeados opcional
        detallesBoton.style.cursor = 'pointer'; // Cambiar el cursor al pasar sobre el botón
        detallesBoton.style.width = '65px'; // Ajustar el ancho del botón al tamaño de la imagen
        detallesBoton.style.height = '45px'; // Ajustar la altura del botón al tamaño de la imagen
        detallesBoton.style.display = 'flex'; // Alinear el contenido del botón
        detallesBoton.style.alignItems = 'center'; // Centrar verticalmente la imagen dentro del botón
        detallesBoton.style.justifyContent = 'center'; // Centrar horizontalmente la imagen dentro del botón
        detallesBoton.style.padding = '0';

        // Crear elemento de imagen
        let detallesImagen = document.createElement('img');
        detallesImagen.src = '../../media/img/ver.png'; // Reemplaza con la ruta de tu imagen
        detallesImagen.style.width = '50px'; // Tamaño de la imagen opcional
        detallesImagen.style.height = '40px'; // Tamaño de la imagen opcional
        detallesImagen.style.margin = '0'; // Quitar cualquier margen de la imagen

        // Añadir la imagen al botón
        detallesBoton.appendChild(detallesImagen);

        // Añadir el evento onclick al botón
        detallesBoton.onclick = function () {
            cargarDetallesProyecto(index);
        };

        // Añadir el botón a la celda
        celdaAcciones.appendChild(detallesBoton);
    });
}
function cargarDetallesProyecto(index) {
    // Obtener el proyecto del array global usando el índice
    let datosProyecto = proyectosArray[index];

    // Llenar campos del proyecto
    document.getElementById('txtNombreProyecto').value = datosProyecto.nombreProyecto;
    document.getElementById('txtDescripcion').value = datosProyecto.descripcion;
    document.getElementById('txtEstatus').value = datosProyecto.estatus;

    // Llenar campos de la empresa
    document.getElementById('txtNombreEmpresa').value = datosProyecto.empresa.nombreEmpresa;
    document.getElementById('txtDireccion').value = datosProyecto.empresa.direccionEmpresa;
    document.getElementById('txtEstadoEmpresa').value = datosProyecto.empresa.estado || '';
    document.getElementById('txtCiudadEmpresa').value = datosProyecto.visita.estado || '';  // Debes proveer el valor correspondiente si lo tienes

    document.getElementById('txtCorreoEmpresa').value = datosProyecto.empresa.correoElectronico || '';
    document.getElementById('txtSectorEmpresarial').value = datosProyecto.empresa.tipoEmpresa || '';
    document.getElementById('txtTelefonoEmpresa').value = datosProyecto.empresa.telefonoEmpresa || '';
    document.getElementById('txtNumeroIdentificacionFiscal').value = datosProyecto.empresa.numeroIdentificacionFiscal || '';
    document.getElementById('txtNombreRepresentante').value = datosProyecto.empresa.nombreRepresentante || '';
    document.getElementById('txtTelefonoContacto').value = datosProyecto.empresa.telefonoContactoDirecto || '';
    document.getElementById('txtCorreoPersonal').value = datosProyecto.empresa.correoElectronicoPersonal || '';
    document.getElementById('txtCargoEmpresa').value = datosProyecto.empresa.cargo || '';
    document.getElementById('txtHorarioContacto').value = datosProyecto.empresa.horarioContacto || '';

    // Llenar otros campos del proyecto si existen
    document.getElementById('txtProblema').value = datosProyecto.problema || '';
    document.getElementById('txtIndicaciones').value = datosProyecto.visita.idicaciones || '';  // Debes proveer el valor correspondiente si lo tienes
    // Suponiendo que datosProyecto es tu objeto JSON
    let fechaHora = datosProyecto.visita.fechaHora;

// Separar la fecha y la hora
    let [fecha, hora] = fechaHora.split(' ');

// Asignar la fecha y la hora a los campos correspondientes
    document.getElementById('txtFecha').value = fecha;
    document.getElementById('txtHoraProyecto').value = hora;

    // Mostrar planos e imágenes
    let imgPlanoArquitectonico = document.getElementById('imgPlanoArquitectonico');
     
    let imgPlanoIC = document.getElementById('imgPlanoIC');
    let pdfPlano = document.getElementById('pdfPlano');

    // Asignar imagenes
    imgPlanoArquitectonico.src = datosProyecto.planosAquitectonicos;
    document.getElementById('linkPlanoArquitectonico').href = datosProyecto.planosAquitectonicos;
    
    imgPlanoIC.src = datosProyecto.planosIC;
    document.getElementById('linkPlanoIC').href = datosProyecto.planosIC;
    // Asignar PDF
    pdfPlano.src = datosProyecto.fotos;


    // Mostrar el modal
    $('#detallesProyectoModal').modal('show');
}

function llenarCamposProyecto(datosProyecto) {
    // Llenar campos del proyecto
    document.getElementById('txtNombreProyecto').value = datosProyecto.nombreProyecto;
    document.getElementById('txtDescripcion').value = datosProyecto.descripcion;
    document.getElementById('txtEstatus').value = datosProyecto.estatus;

    // Llenar campos de la empresa
    document.getElementById('txtNombreEmpresa').value = datosProyecto.empresa.nombreEmpresa;
    document.getElementById('txtDireccion').value = datosProyecto.empresa.direccionEmpresa;
    document.getElementById('txtEstadoEmpresa').value = datosProyecto.empresa.estado || '';
    document.getElementById('txtCiudadEmpresa').value = '';  // Debes proveer el valor correspondiente si lo tienes

    document.getElementById('txtCorreoEmpresa').value = datosProyecto.empresa.correoElectronico || '';
    document.getElementById('txtSectorEmpresarial').value = datosProyecto.empresa.tipoEmpresa || '';
    document.getElementById('txtTelefonoEmpresa').value = datosProyecto.empresa.telefonoEmpresa || '';
    document.getElementById('txtNumeroIdentificacionFiscal').value = datosProyecto.empresa.numeroIdentificacionFiscal || '';
    document.getElementById('txtNombreRepresentante').value = datosProyecto.empresa.nombreRepresentante || '';
    document.getElementById('txtTelefonoContacto').value = datosProyecto.empresa.telefonoContactoDirecto || '';
    document.getElementById('txtCorreoPersonal').value = datosProyecto.empresa.correoElectronicoPersonal || '';
    document.getElementById('txtCargoEmpresa').value = datosProyecto.empresa.cargo || '';
    document.getElementById('txtHorarioContacto').value = datosProyecto.empresa.horarioContacto || '';

    // Llenar otros campos del proyecto si existen
    document.getElementById('txtProblema').value = datosProyecto.problema || '';
    document.getElementById('txtIndicaciones').value = datosProyecto.visita.idicaciones || '';  // Debes proveer el valor correspondiente si lo tienes
}




// Función para mostrar un mensaje en la interfaz
function mostrarMensaje(mensaje) {
    // Por ejemplo, mostrar el mensaje en un elemento de la página
    let mensajeElemento = document.getElementById('mensaje');
    if (mensajeElemento) {
        mensajeElemento.textContent = mensaje;
    } else {
        console.error('Elemento mensaje no encontrado en el documento.');
    }
}

// Llamar a la función para obtener proyectos al cargar la página
window.onload = function () {
    let token = localStorage.getItem('token');
    if (token) {
        obtenerProyectos(token);
    } else {
        mostrarMensaje('No se encontró token de usuario.');
    }
};

function actualizarContenido(response) {
    console.log("Estado de la respuesta:", response.status);
    console.log("Se están cargando los datos");

    let mensaje1;
    let mensaje2;
    let imagen; // Imagen por defecto

    // Verificar el estado de la respuesta
    if (response.status === 200 && response.proyectos && response.proyectos.length > 0) {
        mensaje1 = "Estos son tus proyectos";
        mensaje2 = "Puedes revisarlos a continuación";
        imagen = "../../media/img/reparar.png"; // Cambiar la imagen según sea necesario

        // Llamar a la función llenarTablaProyectos con los proyectos
        llenarTablaProyectos(response.proyectos);
    } else if (response.status === 400) {
        mensaje1 = "No tienes proyectos";
        mensaje2 = "¿Quieres empezar uno nuevo?";
        imagen = "../../media/img/simbolo-matematico-conjunto-vacio.png"; // Cambiar la imagen según sea necesario
    }

    // Actualizar el contenido de los elementos HTML
    document.getElementById('mensaje1').textContent = mensaje1;
    document.getElementById('mensaje2').textContent = mensaje2;
    document.getElementById('logoImagen').src = imagen; // Cambiar la imagen
}
function aplicarEstiloEstatus(celda, estatus) {
    switch (estatus) {
        case 'Registrado':
            celda.style.backgroundColor = 'rgba(29, 66, 115, 0.6)'; // Azul con 60% opacidad
            celda.style.color = '#FFFFFF'; // Blanco
            break;
        case 'En observacion':
            celda.style.backgroundColor = 'rgba(43, 99, 173, 0.6)'; // Amarillo con 60% opacidad
            celda.style.color = '#FFFFFF'; // Blanco
            break;
        case 'Analizando':
            celda.style.backgroundColor = 'rgba(74, 176, 217, 0.6)'; // Verde con 60% opacidad
            celda.style.color = '#FFFFFF'; // Blanco
            break;
        case 'Generando presupuesto':
            celda.style.backgroundColor = 'rgba(54, 129, 158, 0.6)'; // Rojo con 60% opacidad
            celda.style.color = '#FFFFFF'; // Blanco
            break;
        case 'Requiere revisión':
            celda.style.backgroundColor = 'rgba(5, 89, 35, 0.6)'; // Rojo con 60% opacidad
            celda.style.color = '#FFFFFF'; // Blanco
            break;
        case 'En espera de aprobación de presupuesto':
            celda.style.backgroundColor = 'rgba(9, 148, 57, 0.6)'; // Rojo con 60% opacidad
            celda.style.color = '#FFFFFF'; // Blanco
            break;
        case 'Trabajando en el proyecto':
            celda.style.backgroundColor = 'rgba(185, 217, 72, 0.6)'; // Rojo con 60% opacidad
            celda.style.color = '#FFFFFF'; // Blanco
            break;
        case 'Proyecto terminado':
            celda.style.backgroundColor = 'rgba(135, 158, 52, 0.6)'; // Rojo con 60% opacidad
            celda.style.color = '#FFFFFF'; // Blanco
            break;
        case 'Proyecto cancelado':
            celda.style.backgroundColor = 'rgba(255, 0, 0, 0.6)'; // Rojo con 60% opacidad
            celda.style.color = '#FFFFFF'; // Blanco
            break;
        default:
            celda.style.backgroundColor = 'rgba(128, 128, 128, 0.6)'; // Gris con 60% opacidad
            celda.style.color = '#FFFFFF'; // Blanco
            break;
    }
}
// Llamar a la función para obtener proyectos al cargar la página
window.onload = function () {
    let token = localStorage.getItem('token');
    if (token) {
        obtenerProyectos(token);
    } else {
        mostrarMensaje('No se encontró token de usuario.');
    }
};

