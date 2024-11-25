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
        mensaje1 = "Estos son los proyectos pendientes proyectos";
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

function obtenerProyectos(token) {
    // URL de la API
    let url = 'http://localhost:8080/CORCOM_BackEnd/api/ProyectosAdmin/getAll?token=' + encodeURIComponent(token);
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


let datosProyecto = {}; // Variable global para almacenar los datos del proyecto actual

function cargarDetallesProyecto(index) {
    // Obtener el proyecto del array global usando el índice
    datosProyecto = proyectosArray[index]; // Asignar el proyecto seleccionado a la variable global

    // Llenar campos del proyecto
    document.getElementById('txtNombreProyecto').value = datosProyecto.nombreProyecto || '';
    document.getElementById('txtDescripcion').value = datosProyecto.descripcion || '';
    document.getElementById('txtEstatus').value = datosProyecto.estatus || '';

    // Llenar campos de la empresa
    document.getElementById('txtNombreEmpresa').value = datosProyecto.empresa.nombreEmpresa || '';
    document.getElementById('txtDireccion').value = datosProyecto.empresa.direccionEmpresa || '';
    document.getElementById('txtEstadoEmpresa').value = datosProyecto.empresa.estado || '';
    document.getElementById('txtCiudadEmpresa').value = datosProyecto.empresa.ciudad || '';
    document.getElementById('txtCorreoEmpresa').value = datosProyecto.empresa.correoElectronico || '';
    document.getElementById('txtSectorEmpresarial').value = datosProyecto.empresa.tipoEmpresa || '';
    document.getElementById('txtTelefonoEmpresa').value = datosProyecto.empresa.telefonoEmpresa || '';
    document.getElementById('txtNumeroIdentificacionFiscal').value = datosProyecto.empresa.numeroIdentificacionFiscal || '';
    document.getElementById('txtNombreRepresentante').value = datosProyecto.empresa.nombreRepresentante || '';
    document.getElementById('txtTelefonoContacto').value = datosProyecto.empresa.telefonoContactoDirecto || '';
    document.getElementById('txtCorreoPersonal').value = datosProyecto.empresa.correoElectronicoPersonal || '';
    document.getElementById('txtCargoEmpresa').value = datosProyecto.empresa.cargo || '';
    document.getElementById('txtHorarioContacto').value = datosProyecto.empresa.horarioContacto || '';
    document.getElementById('txtEstadoVisita').value = datosProyecto.visita.estado || '';
    document.getElementById('txtCiudadVisita').value = datosProyecto.visita.ciudad || '';
    document.getElementById('txtCalleVisita').value = datosProyecto.visita.calle || '';
    document.getElementById('txtColoniaeVisita').value = datosProyecto.visita.colonia || '';
    document.getElementById('txtProblema').value = datosProyecto.problema || '';
    document.getElementById('txtSolucion').value = datosProyecto.soluciones || '';
    document.getElementById('txtNotasEmpresa').value = datosProyecto.empresa.notas || '';
    document.getElementById('txtIndicaciones').value = datosProyecto.visita.indicaciones || '';

    let fechaHora = datosProyecto.visita.fechaHora || '';
    let [fecha, hora] = fechaHora.split(' ');
    document.getElementById('txtFecha').value = fecha || '';
    document.getElementById('txtHoraProyecto').value = hora || '';

    // Mostrar planos e imágenes
    let imgPlanoArquitectonico = document.getElementById('imgPlanoArquitectonico');
    let imgPlanoIC = document.getElementById('imgPlanoIC');
    let pdfPlano = document.getElementById('pdfPlano');

    // Asignar imágenes y PDF o mostrar mensaje de "No se subió planos"
    if (datosProyecto.planosArquitectonicos && datosProyecto.planosArquitectonicos.length > 50) {
        imgPlanoArquitectonico.src = datosProyecto.planosArquitectonicos;
        document.getElementById('linkPlanoArquitectonico').href = datosProyecto.planosArquitectonicos;
        imgPlanoArquitectonico.alt = 'Plano arquitectónico';
    } else {
        imgPlanoArquitectonico.src = ''; // Limpiar imagen
        imgPlanoArquitectonico.alt = 'No se subió planos arquitectónicos';
        document.getElementById('linkPlanoArquitectonico').href = '#'; // Desactivar enlace
    }

    if (datosProyecto.planosIC && datosProyecto.planosIC.length > 50) {
        imgPlanoIC.src = datosProyecto.planosIC;
        document.getElementById('linkPlanoIC').href = datosProyecto.planosIC;
        imgPlanoIC.alt = 'Plano IC';
    } else {
        imgPlanoIC.src = ''; // Limpiar imagen
        imgPlanoIC.alt = 'No se subió planos IC';
        document.getElementById('linkPlanoIC').href = '#'; // Desactivar enlace
    }

    if (datosProyecto.fotos && datosProyecto.fotos.length > 50) {
        pdfPlano.src = datosProyecto.fotos;
        pdfPlano.alt = 'Documento PDF';
    } else {
        pdfPlano.src = ''; // Limpiar PDF
        pdfPlano.alt = 'No se subió PDF';
    }

    // Guardar el idProyecto en el localStorage
    localStorage.setItem('idProyectoActivo', datosProyecto.idProyecto);

    // Mostrar el modal
    $('#detallesProyectoModal').modal('show');
    obtenerPresupuesto();
}

// Función para limpiar el idProyecto del localStorage cuando se cierra el modal
function limpiarLocalStorage() {
    localStorage.removeItem('idProyectoActivo');
}

// Agregar listener para limpiar el localStorage al cerrar el modal
$('#detallesProyectoModal').on('hidden.bs.modal', function () {
    limpiarLocalStorage();
});


function fusionarFechaYHora(fecha, hora) {
    // Obtener partes de la fecha y hora
    let fechaPartes = fecha.split('-'); // Suponiendo que la fecha está en formato YYYY-MM-DD
    let horaPartes = hora.split(':');   // Suponiendo que la hora está en formato HH:mm

    // Crear un nuevo objeto de fecha y establecer la hora
    let fechaHora = new Date(
            parseInt(fechaPartes[0]), // Año
            parseInt(fechaPartes[1]) - 1, // Mes (restamos 1 porque los meses van de 0 a 11 en JavaScript)
            parseInt(fechaPartes[2]), // Día
            parseInt(horaPartes[0]), // Horas
            parseInt(horaPartes[1]), // Minutos
            0                           // Segundos (en este ejemplo, los establecemos en 0)
            );

    // Formatear la fecha y hora en el formato deseado YYYY-MM-DD HH:mm:ss
    let fechaHoraFormateada = fechaHora.toISOString().slice(0, 19).replace('T', ' ');

    return fechaHoraFormateada;
}

async function insertarModificarProyecto() {
    console.log("Function de insertar y modificar");

    let idVisita = datosProyecto.visita.idVisita || '';
    let fecha = document.getElementById("txtFecha").value; // Supongo que obtienes la fecha en formato YYYY-MM-DD
    let horario = document.getElementById("txtHoraProyecto").value; // Supongo que obtienes la hora en formato HH:mm
    let fechaHora = fusionarFechaYHora(fecha, horario);
    let idProyecto = datosProyecto.idProyecto || '';
    let estatus = document.getElementById("txtEstatus").value || '';
    let soluciones = document.getElementById("txtSolucion").value || '';

    let datos = {
        idVisita: idVisita,
        fechaHora: fechaHora,
        idProyecto: idProyecto,
        estatus: estatus,
        soluciones: soluciones
    };
    console.log("datos proyecto", datos);

    let url = "http://localhost:8080/CORCOM_BackEnd/api/ProyectosAdmin/ActaulizarInsertarProyecto";
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:  new URLSearchParams({
                'idVisita':idVisita,
                'fechaHora':fechaHora,
                'idProyecto':idProyecto,
                'estatus':estatus,
                'soluciones':soluciones
            })
        });

        if (response.ok) {
            console.log("Proyecto actualizado/insertado exitosamente");
            window.location.href ='../../admin/proyectosAdmin/proyectosAdmin.html';
        } 
    } catch (error) {
        console.error("Error al realizar la petición:", error);
    }
}
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnGuardar").addEventListener("click", insertarModificarProyecto);
});
function abrirModalPresupuesto() {
    // Cerrar el modal activo
    $('#detallesProyectoModal').modal('hide');

    // Abrir el nuevo modal
    $('#presupuestoModal').modal('show');
}
//Para el apartado de la generacion de los presupuestos
// Para asegurarte de que el modal de detalles del proyecto esté oculto completamente antes de abrir el de presupuesto

function obtenerMateriales(token) {
    // URL de la API
    let url = 'http://localhost:8080/CORCOM_BackEnd/api/Storage/getAll?token=' + encodeURIComponent(token);

    // Petición Fetch
    fetch(url)
            .then(response => {
                // Verificar el estado de la respuesta
                if (!response.ok) {
                    throw new Error('No se pudo obtener la lista de materiales');
                }
                // Convertir la respuesta a JSON
                return response.json();
            })
            .then(data => {
                // Llamar a la función llenarTablaMateriales con la respuesta
                llenarTablaMateriales(data);
            })
            .catch(error => {
                // Capturar errores
                console.error('Error al obtener materiales:', error);
                // Mostrar un mensaje de error en la tabla
                let tabla = document.getElementById('tablaInventario');
                if (tabla) {
                    tabla.innerHTML = '<tr><td colspan="7" class="text-center text-white">Error al obtener materiales: ' + error.message + '</td></tr>';
                }
            });
}
let materialesArray = []; // Array para almacenar todos los materiales


// Función para llenar la tabla con los resultados de la búsqueda
function llenarTablaMateriales(materiales) {
    materialesArray = materiales;
    let tabla = document.getElementById('tablaInventario');
    if (!tabla) {
        console.error('Elemento tablaInventario no encontrado en el documento.');
        return;
    }

    tabla.innerHTML = '';
    tabla.classList.add('table', 'table-black', 'table-striped', 'text-white');

    // Crear elementos <thead> y <tbody>
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    tabla.appendChild(thead);  // Agregar el <thead> a la tabla
    tabla.appendChild(tbody);  // Agregar el <tbody> a la tabla

    // Crear fila de encabezados
    let encabezados = ['Tipo', 'Marca', 'Descripción', 'Modelo', 'Precio', 'Existencias', 'Foto', 'Acciones'];
    let headerRow = document.createElement('tr');
    encabezados.forEach(encabezado => {
        let th = document.createElement('th');
        th.innerText = encabezado;
        th.classList.add('text-center', 'align-middle', 'border', 'border-white');
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);  // Agregar fila de encabezados al <thead>

    // Crear filas de datos
    materiales.forEach(material => {
        let row = document.createElement('tr');
        row.classList.add('text-center');

        let campos = ['tipo', 'marca', 'caracteristicas', 'modelo', 'precio', 'existencias'];
        campos.forEach(campo => {
            let cell = document.createElement('td');
            cell.innerText = material[campo];
            cell.classList.add('align-middle', 'border', 'border-white');
            row.appendChild(cell);
        });

        let fotoCell = document.createElement('td');
        let fotoLink = document.createElement('a');
        fotoLink.href = '#';
        fotoLink.addEventListener('click', function () {
            mostrarImagenEnModal(material.foto);
        });

        let fotoImg = document.createElement('img');
        fotoImg.src = material.foto;
        fotoImg.alt = 'Foto';
        fotoImg.classList.add('img-thumbnail');
        fotoImg.style.width = '50%';
        fotoImg.style.height = '50%';

        fotoLink.appendChild(fotoImg);
        fotoCell.appendChild(fotoLink);
        row.appendChild(fotoCell);

        // Crear celda para los botones de acción
        let accionesCell = document.createElement('td');
        accionesCell.classList.add('align-middle', 'border', 'border-white');

        // Botón para agregar (verde)
        let agregarBtn = document.createElement('button');
        agregarBtn.innerText = 'Agregar';
        agregarBtn.classList.add('btn', 'btn-success', 'mr-2');
        agregarBtn.addEventListener('click', function () {
            agregarMaterial(material);
        });
        accionesCell.appendChild(agregarBtn);

        // Botón para eliminar (rojo)
        let eliminarBtn = document.createElement('button');
        eliminarBtn.innerText = 'Eliminar';
        eliminarBtn.classList.add('btn', 'btn-danger');
        eliminarBtn.addEventListener('click', function () {
            eliminarMaterial(material);
        });
        accionesCell.appendChild(eliminarBtn);

        row.appendChild(accionesCell);

        tbody.appendChild(row);  // Agregar fila de datos al <tbody>
    });

    // Configurar el listener para el campo de entrada de búsqueda
    setupSearchListener();

    // Actualizar el contador de materiales
    document.getElementById('materialCount').innerText = `${materialesSeleccionados.length} materiales añadidos`;
    actualizarListaMaterialesUsados(); // Actualizar la lista de materiales usados
}



// Función para agregar un material a la lista de seleccionados
let materialesSeleccionados = [];

function agregarMaterial(material) {
    // Agregar el material a la lista
    materialesSeleccionados.push(material);
    // Actualizar la tabla
    actualizarListaMaterialesUsados();
}

function eliminarMaterial(material) {
    // Filtrar el material eliminado
    materialesSeleccionados = materialesSeleccionados.filter(m => m.idMaterial !== material.idMaterial);
    // Actualizar la tabla
    actualizarListaMaterialesUsados();
}

function actualizarListaMaterialesUsados() {
    let tablaUsados = document.getElementById('tablaMaterialesUsados');
    tablaUsados.innerHTML = ''; // Limpiar la tabla

    let tbody = document.createElement('tbody');
    tablaUsados.appendChild(tbody);  // Agregar el <tbody> a la tabla

    // Crear filas de datos
    materialesSeleccionados.forEach(material => {
        let row = document.createElement('tr');
        row.classList.add('text-center');

        let campos = ['idMaterial', 'modelo', 'marca', 'tipo'];
        campos.forEach(campo => {
            let cell = document.createElement('td');
            cell.innerText = material[campo];
            cell.classList.add('align-middle');
            row.appendChild(cell);
        });

        // Crear celda para la entrada de existencias
        let existenciasCell = document.createElement('td');
        let existenciasInput = document.createElement('input');
        existenciasInput.type = 'number';
        existenciasInput.min = '0'; // Evitar valores negativos
        existenciasInput.value = material.cantidad || '0'; // Usar la cantidad existente o '0'
        existenciasInput.classList.add('form-control');
        existenciasInput.addEventListener('input', function () {
            material.cantidad = parseInt(existenciasInput.value) || 0;
            console.log('Cantidad actualizada para', material.modelo, ':', material.cantidad);
            actualizarTotal(); // Actualizar el total al cambiar las existencias
        });
        existenciasCell.appendChild(existenciasInput);
        row.appendChild(existenciasCell);

        // Crear celda para el botón de eliminar
        let accionesCell = document.createElement('td');
        let eliminarBtn = document.createElement('button');
        eliminarBtn.innerText = 'Eliminar';
        eliminarBtn.classList.add('btn', 'btn-danger');
        eliminarBtn.addEventListener('click', function () {
            eliminarMaterial(material);
        });
        accionesCell.appendChild(eliminarBtn);
        row.appendChild(accionesCell);

        tbody.appendChild(row);  // Agregar fila de datos al <tbody>
    });

    // Actualizar el total después de llenar la tabla
    actualizarTotal();
}

function actualizarTotal() {
    console.log('Materiales Seleccionados:', materialesSeleccionados);

    let totalMateriales = 0;

    // Calcular el costo de los materiales
    materialesSeleccionados.forEach(material => {
        const cantidad = material.cantidad || 0;
        const precio = parseFloat(material.precio) || 0;
        const costoMaterial = precio * cantidad;
        totalMateriales += costoMaterial;

        // Mostrar información del material en la consola
        console.log(`Material: ${material.modelo}`);
        console.log(`Precio: ${precio}`);
        console.log(`Cantidad: ${cantidad}`);
        console.log(`Costo Total del Material: ${costoMaterial}`);
    });

    // Obtener el costo de la mano de obra
    const costoManoDeObra = parseFloat(document.getElementById('txtManoDeObra').value) || 0;
    console.log(`Costo de Mano de Obra: ${costoManoDeObra}`);

    // Calcular el total
    const total = totalMateriales + costoManoDeObra;
    console.log(`Total Materiales: ${totalMateriales}`);
    console.log(`Total General: ${total}`);

    // Actualizar el campo txtTotal
    document.getElementById('txtTotal').value = total.toFixed(2); // Muestra dos decimales
}






// Función para actualizar el costo total de un material
function actualizarCostoTotal(material, celdaCostoTotal) {
    let precio = parseFloat(material.precio) || 0;
    let cantidad = material.cantidad || 0;
    let costoTotal = precio * cantidad;
    celdaCostoTotal.textContent = costoTotal.toFixed(2);
    actualizarTotal();
}

// Función para actualizar el total general
function actualizarTotal() {
    console.log('Materiales Seleccionados:', materialesSeleccionados); // Verifica los datos
    
    let totalMateriales = 0;

    // Calcular el costo de los materiales
    materialesSeleccionados.forEach(material => {
        const cantidad = material.cantidad || 0;
        const precio = parseFloat(material.precio) || 0;
        const costoMaterial = precio * cantidad;
        totalMateriales += costoMaterial;
        
        // Mostrar información del material en la consola
        console.log(`Material: ${material.modelo}`);
        console.log(`Precio: ${precio}`);
        console.log(`Cantidad: ${cantidad}`);
        console.log(`Costo Total del Material: ${costoMaterial}`);
    });

    // Obtener el costo de la mano de obra
    const costoManoDeObra = parseFloat(document.getElementById('txtManoDeObra').value) || 0;
    console.log(`Costo de Mano de Obra: ${costoManoDeObra}`);

    // Calcular el total
    const total = totalMateriales + costoManoDeObra;
    console.log(`Total Materiales: ${totalMateriales}`);
    console.log(`Total General: ${total}`);

    // Actualizar el campo txtTotal
    document.getElementById('txtTotal').value = total.toFixed(2); // Muestra dos decimales
}


// Función para eliminar un material de la lista de seleccionados
function eliminarMaterial(material) {
    materialesSeleccionados = materialesSeleccionados.filter(m => m.idMaterial !== material.idMaterial);
    console.log('Material eliminado:', material);
    document.getElementById('materialCount').innerText = `${materialesSeleccionados.length} materiales añadidos`;
    actualizarListaMaterialesUsados(); // Actualizar la tabla de materiales usados
}

// Función para actualizar la tabla de materiales usados
// Función para actualizar la tabla de materiales usados
// Función para actualizar la tabla de materiales usados

function setupSearchListener() {
    const searchInput = document.getElementById('search-input');
    const tbody = document.querySelector('#tablaInventario tbody');
    if (tbody) {
        searchInput.addEventListener('input', function () {
            const searchText = this.value.toLowerCase();
            const rows = tbody.rows;

            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                let match = false;

                for (let j = 0; j < row.cells.length; j++) {
                    const cell = row.cells[j];
                    if (cell.innerText.toLowerCase().includes(searchText)) {
                        match = true;
                        break;
                    }
                }

                row.style.display = match ? '' : 'none';
            }
        });
    } else {
        console.error('No se encontró el tbody de la tabla.');
    }
}


// Llamar a setupSearchListener en el momento adecuado
document.addEventListener('DOMContentLoaded', setupSearchListener);

// Manejo del evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token');
    if (token) {
        obtenerMateriales(token);
    } else {
        mostrarMensaje('No se encontró token de usuario.');
    }
});
function mostrarImagenEnModal(foto) {
    let imageModal = document.getElementById('imageModal');
    if (imageModal) {
        let modalImg = imageModal.querySelector('.modal-body img');
        modalImg.src = foto;
        $('#imageModal').modal('show');
    }
}


// Función para obtener el costo de mano de obra
function obtenerManoDeObra() {
    // Obtener el valor del input
    let manoDeObraInput = document.getElementById('txtManoDeObra');
    
    // Verificar si el input existe
    if (manoDeObraInput) {
        // Obtener el valor y eliminar cualquier caracter no numérico (excepto el punto decimal)
        let manoDeObraValue = manoDeObraInput.value;
        
        // Convertir a número flotante
        let manoDeObra = parseFloat(manoDeObraValue.replace(/[^0-9.-]+/g,""));
        
        // Verificar si la conversión fue exitosa
        if (!isNaN(manoDeObra)) {
            console.log('Costo de mano de obra:', manoDeObra);
            return manoDeObra;
        } else {
            console.log('Valor de mano de obra no válido');
            return 0;
        }
    } else {
        console.error('No se encontró el input con ID txtManoDeObra');
        return 0;
    }
}

// Ejemplo de uso
let costoManoDeObra = obtenerManoDeObra();


// Función para calcular y actualizar el total


// Función para actualizar el total cuando cambie el costo de la mano de obra
function setupManoDeObraListener() {
    const manoDeObraInput = document.getElementById('txtManoDeObra');
    manoDeObraInput.addEventListener('input', actualizarTotal);
}

// Función para actualizar el total cuando cambien las existencias de los materiales
function setupExistenciasListeners() {
    const tablaUsados = document.getElementById('tablaMaterialesUsados');
    tablaUsados.addEventListener('input', function(event) {
        if (event.target.type === 'number') {
            actualizarTotal();
        }
    });
}

// Llamar a las funciones de configuración
setupManoDeObraListener();
setupExistenciasListeners();

// Llamar a actualizarTotal cuando se añadan o eliminen materiales
function actualizarListaMaterialesUsados() {
    let tablaUsados = document.getElementById('tablaMaterialesUsados');
    tablaUsados.innerHTML = ''; // Limpiar la tabla

    let tbody = document.createElement('tbody');
    tablaUsados.appendChild(tbody);  // Agregar el <tbody> a la tabla

    // Crear filas de datos
    materialesSeleccionados.forEach(material => {
        let row = document.createElement('tr');
        row.classList.add('text-center');
        row.dataset.idMaterial = material.idMaterial; // Agregar idMaterial al dataset de la fila

        let campos = ['idMaterial', 'modelo', 'marca', 'tipo'];
        campos.forEach(campo => {
            let cell = document.createElement('td');
            cell.innerText = material[campo];
            cell.classList.add('align-middle');
            row.appendChild(cell);
        });

        // Crear celda para la entrada de existencias
        let existenciasCell = document.createElement('td');
        let existenciasInput = document.createElement('input');
        existenciasInput.type = 'number';
        existenciasInput.min = '0'; // Evitar valores negativos
        existenciasInput.value = material.cantidad || '0'; // Usar la cantidad existente o '0'
        existenciasInput.classList.add('form-control');
        existenciasInput.addEventListener('input', function () {
            material.cantidad = parseInt(existenciasInput.value) || 0;
            console.log('Cantidad actualizada para', material.modelo, ':', material.cantidad);

            // Actualizar el costo total para esta fila
            let precio = parseFloat(material.precio) || 0;
            let costoTotal = precio * material.cantidad;
            row.querySelector('.costo-total').innerText = costoTotal.toFixed(2);

            // Actualizar el total general
            actualizarTotal();
        });
        existenciasCell.appendChild(existenciasInput);
        row.appendChild(existenciasCell);

        // Crear celda para el costo total
        let costoTotalCell = document.createElement('td');
        costoTotalCell.classList.add('costo-total', 'align-middle');
        let precio = parseFloat(material.precio) || 0;
        let costoTotal = precio * (material.cantidad || 0);
        costoTotalCell.innerText = costoTotal.toFixed(2);
        row.appendChild(costoTotalCell);

        // Crear celda para el botón de eliminar
        let accionesCell = document.createElement('td');
        let eliminarBtn = document.createElement('button');
        eliminarBtn.innerText = 'Eliminar';
        eliminarBtn.classList.add('btn', 'btn-danger');
        eliminarBtn.addEventListener('click', function () {
            eliminarMaterial(material);
            actualizarListaMaterialesUsados(); // Actualizar la tabla después de eliminar un material
        });
        accionesCell.appendChild(eliminarBtn);
        row.appendChild(accionesCell);

        tbody.appendChild(row);  // Agregar fila de datos al <tbody>
    });

    // Actualizar el total después de llenar la tabla
    actualizarTotal();
}



function generarPresupuesto() {
    console.log('Generando Presupuesto');

    // Obtener el id del proyecto desde localStorage
    let idProyecto = localStorage.getItem('idProyectoActivo');
    if (!idProyecto) {
        console.error('No se encontró el idProyectoActivo en localStorage.');
        return;
    }

    // Obtener la tabla de materiales usados
    let tablaUsados = document.getElementById('tablaMaterialesUsados');
    if (!tablaUsados) {
        console.error('No se encontró la tabla de materiales usados.');
        return;
    }

    // Obtener las filas del cuerpo de la tabla
    let filas = tablaUsados.querySelectorAll('tbody tr');

    // Crear un array para almacenar los datos de los materiales
    let datosMateriales = [];

    filas.forEach(fila => {
        // Obtener los datos del material
        let idMaterial = fila.dataset.idMaterial; // Asume que el idMaterial está en un atributo data en la fila
        let existenciaUsada = fila.querySelector('input[type="number"]').value || 0;

        // Crear un objeto para el material y añadirlo al array
        datosMateriales.push({
            idMaterial: parseInt(idMaterial, 10), // Asegúrate de que esto sea un número
            existenciaUsada: parseInt(existenciaUsada, 10)
        });
    });

    // Obtener el costo de la mano de obra
    let manoDeObra = parseFloat(document.getElementById('txtManoDeObra').value) || 0;
    console.log(`Costo de Mano de Obra: ${manoDeObra}`);

    // Crear el objeto de presupuesto en formato de parámetros URL
    let datosMaterialesString = JSON.stringify(datosMateriales);
    let params = new URLSearchParams({
        p_idProyecto: idProyecto,
        p_datosMateriales: datosMaterialesString,
        p_costoManoDeObra: manoDeObra
    }).toString();

    // Mostrar los datos en la consola
    console.log(`idProyecto: ${idProyecto}`);
    console.log(`datosMateriales: ${datosMaterialesString}`);
    console.log(`ManoDeObra: ${manoDeObra.toFixed(2)}`);

    // Enviar el JSON al servidor
    fetch('http://localhost:8080/CORCOM_BackEnd/api/ProyectosAdmin/presupuesto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // Enviar el contenido como URL-encoded
        },
        body: params // Enviar los parámetros URL-encoded como cuerpo de la solicitud
    })
    .then(response => response.json())
    .then(data => {
        console.log('Presupuesto guardado:', data);
        // Aquí puedes manejar la respuesta del servidor
    })
    .catch(error => {
        console.error('Error al guardar el presupuesto:', error);
    });
}

document.getElementById('guardarPresupuestoBtn').addEventListener('click', generarPresupuesto);

function obtenerPresupuesto() {
    // URL de la API
    let idProyecto = localStorage.getItem('idProyectoActivo');
    
    let url = 'http://localhost:8080/CORCOM_BackEnd/api/ProyectosAdmin/getAllPresupuesto?idProyecto=' + encodeURIComponent(idProyecto);
    
    // Petición Fetch
    fetch(url)
        .then(response => {
            // Verificar el estado de la respuesta
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de presupuestos');
            }
            // Convertir la respuesta a JSON
            return response.json();
        })
        .then(data => {
            // Llamar a la función llenarTablaPresupuestos con la respuesta
            llenarTablaPresupuestos(data);
        })
        .catch(error => {
            // Capturar errores
            console.error('Error al obtener presupuestos:', error);
            // Aquí puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
        });
}

let presupuestosArray = [];

function llenarTablaPresupuestos(presupuesto) {
    // Guardar los presupuestos en el array global
    presupuestosArray = presupuesto;

    // Referencia a la tabla en el HTML
    let tabla = document.getElementById('tablaDetallesPresupuesto');

    // Verificar si la tabla existe en el documento
    if (!tabla) {
        console.error('Elemento tablaDetallesPresupuesto no encontrado en el documento.');
        return;
    }

    // Limpiar la tabla antes de llenarla nuevamente
    tabla.innerHTML = '';

    // Agregar clases de Bootstrap a la tabla
    tabla.classList.add('table', 'table-black', 'table-striped', 'text-white');

    // Encabezados de la tabla
    let encabezados = ['Fecha de Vigencia', 'ID Material', 'Tipo', 'Modelo', 'Marca', 'Características', 'Precio', 'Foto', 'Existencia Usada', 'Total Material'];

    // Crear fila de encabezados
    let filaEncabezados = tabla.createTHead().insertRow();
    encabezados.forEach(encabezado => {
        let th = document.createElement('th');
        th.textContent = encabezado;
        th.style.color = 'white'; // Color blanco para el texto de los encabezados
        filaEncabezados.appendChild(th);
    });

    // Iterar sobre los presupuestos y agregar filas a la tabla
    presupuesto.forEach((presupuesto, index) => {
        let fila = tabla.insertRow();
        fila.insertCell(0).textContent = presupuesto.fechaVigencia;
        fila.insertCell(1).textContent = presupuesto.idMaterial;
        fila.insertCell(2).textContent = presupuesto.tipo;
        fila.insertCell(3).textContent = presupuesto.modelo;
        fila.insertCell(4).textContent = presupuesto.marca;
        fila.insertCell(5).textContent = presupuesto.precio;
        
        // Mostrar la foto si está disponible
        let fotoCelda = fila.insertCell(6);
        if (presupuesto.foto) {
            let img = document.createElement('img');
            img.src = presupuesto.foto;
            img.style.width = '100px'; // Tamaño opcional
            fotoCelda.appendChild(img);
        } else {
            fotoCelda.textContent = 'No disponible';
        }

        fila.insertCell(7).textContent = presupuesto.existenciaUsada;
        fila.insertCell(8).textContent = presupuesto.totalMaterial;

        // Crear celda para el botón de detalles
        let celdaAcciones = fila.insertCell(9);
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
            // Aquí puedes implementar la lógica para mostrar los detalles del presupuesto seleccionado
            console.log('Detalles del presupuesto con índice:', index);
        };

        // Añadir el botón a la celda
        celdaAcciones.appendChild(detallesBoton);
    });

    // Mostrar el ID del presupuesto y el total debajo de la tabla
    let totalPresupuestoDiv = document.getElementById('totalPresupuestoDiv');

    if (presupuesto.length > 0) {
        let idPresupuesto = presupuesto[0].idPresupuesto;
        let totalPresupuesto = presupuesto.reduce((sum, pres) => sum + pres.totalMaterial, 0);

        totalPresupuestoDiv.innerHTML = `
            <p><strong>ID del Presupuesto:</strong> ${idPresupuesto}</p>
            <p><strong>Total Presupuesto:</strong> ${totalPresupuesto.toFixed(2)}</p>
        `;
    } else {
        totalPresupuestoDiv.innerHTML = '<p>No hay presupuestos disponibles.</p>';
    }
}

// Asegúrate de que el código se ejecute después de que el documento esté completamente cargado
// Limpiar el localStorage cuando se cierre el modal de detalles del proyecto
$('#detallesProyectoModal').on('hidden.bs.modal', function () {
    localStorage.removeItem('idProyectoActivo');
});

// Limpiar el localStorage cuando se cierre el modal de presupuesto
$('#presupuestoModal').on('hidden.bs.modal', function () {
    localStorage.removeItem('idProyectoActivo');
});

