// Manejar la carga de archivos y convertir a Base64
document.getElementById('inputPlanosArquitectonicos').addEventListener('change', function (event) {
    handleFileSelect(event, 'imgPreviewPlanosArquitectonicos', 'previewPlanosArquitectonicos', 'base64PlanosArquitectonicos');
});
document.getElementById('inputPlanosIc').addEventListener('change', function (event) {
    handleFileSelect(event, 'imgPreviewPlanosIc', 'previewPlanosIc', 'base64PlanosIc');
});

document.getElementById('inputFotos').addEventListener('change', function (event) {
    handlePdfSelect(event, 'pdfPreview', 'previewPdf', 'base64Fotos');
});

// Función para validar campos de texto con REGEX
function validarCampos(problema, descripcion, nombreProyecto) {
    // Expresión regular para verificar que el campo no esté vacío
    const regexVacio = /^\s*$/;

    // Verificar cada campo
    if (regexVacio.test(problema) || regexVacio.test(descripcion) || regexVacio.test(nombreProyecto)) {
        return false; // Uno de los campos está vacío
    }

    return true; // Todos los campos están llenos
}
function getProjectData1() {
    var problema = document.getElementById('txtProblema').value;
    var descripcion = document.getElementById('txtDescripcion').value;
    var nombreProyecto = document.getElementById('txtNombreProyecto').value;

    // Guardar datos en localStorage
    localStorage.setItem('problema', problema);
    localStorage.setItem('descripcion', descripcion);
    localStorage.setItem('nombreProyecto', nombreProyecto);

    console.log('Datos del proyecto guardados en localStorage.');
}

function handleFileSelect(event, imgPreviewId, previewContainerId, localStorageKey) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var base64 = e.target.result;
            console.log('Base64:', base64);
            document.getElementById(imgPreviewId).src = base64;
            document.getElementById(previewContainerId).style.display = 'block';
            // Guardar el Base64 en localStorage si se proporciona una clave
            if (localStorageKey) {
                localStorage.setItem(localStorageKey, base64);
                console.log('Base64 guardado en localStorage:', localStorageKey);
            }
        };
        reader.readAsDataURL(file);
    }
}

function handlePdfSelect(event, pdfPreviewId, previewContainerId, localStorageKey) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var base64 = e.target.result;
            console.log('Base64:', base64);
            document.getElementById(pdfPreviewId).src = base64;
            document.getElementById(previewContainerId).style.display = 'block';
            // Guardar el Base64 en localStorage si se proporciona una clave
            if (localStorageKey) {
                localStorage.setItem(localStorageKey, base64);
                console.log('Base64 guardado en localStorage:', localStorageKey);
            }
        };
        reader.readAsDataURL(file);
    }
}

// PARA PONER LOS DATOS DE LA PRIMERA PARTE EN EL LOCALSTORAGE
document.getElementById('btnSiguiente').addEventListener('click', function () {
    // Obtener los valores de los campos de texto
    var problema = document.getElementById('txtProblema').value;
    var descripcion = document.getElementById('txtDescripcion').value;
    var nombreProyecto = document.getElementById('txtNombreProyecto').value;
    
    if (!validarCampos(problema, descripcion, nombreProyecto)) {
        alert('Por favor, completa todos los campos antes de continuar.');
        return;
    }
    // Obtener los valores Base64 de los archivos
    var base64PlanosArquitectonicos = localStorage.getItem('base64PlanosArquitectonicos');
    var base64PlanosIc = localStorage.getItem('base64PlanosIc');
    var base64Fotos = localStorage.getItem('base64Fotos');

    // Guardar los datos en localStorage
    localStorage.setItem('txtProblema', problema);
    localStorage.setItem('txtDescripcion', descripcion);
    localStorage.setItem('txtNombreProyecto', nombreProyecto);

    // Si tienes los datos en Base64, también guárdalos
    if (base64PlanosArquitectonicos) {
        localStorage.setItem('base64PlanosArquitectonicos', base64PlanosArquitectonicos);
    }
    if (base64PlanosIc) {
        localStorage.setItem('base64PlanosIc', base64PlanosIc);
    }
    if (base64Fotos) {
        localStorage.setItem('base64Fotos', base64Fotos);
    }

    // Redirigir a la siguiente página
    window.location.href = '../../admin/proyectos/LocalizacionProyecto.html';
});
document.getElementById('btnAgendarvisita').addEventListener('click', function () {
    // Obtener los valores de los campos de texto
    var problema = document.getElementById('txtProblema').value;
    var descripcion = document.getElementById('txtDescripcion').value;
    var nombreProyecto = document.getElementById('txtNombreProyecto').value;
    
    if (!validarCampos(problema, descripcion, nombreProyecto)) {
        alert('Por favor, completa todos los campos antes de continuar.');
        return;
    }
    // Obtener los valores Base64 de los archivos
    var base64PlanosArquitectonicos = localStorage.getItem('base64PlanosArquitectonicos');
    var base64PlanosIc = localStorage.getItem('base64PlanosIc');
    var base64Fotos = localStorage.getItem('base64Fotos');

    // Guardar los datos en localStorage
    localStorage.setItem('txtProblema', problema);
    localStorage.setItem('txtDescripcion', descripcion);
    localStorage.setItem('txtNombreProyecto', nombreProyecto);

    // Si tienes los datos en Base64, también guárdalos
    if (base64PlanosArquitectonicos) {
        localStorage.setItem('base64PlanosArquitectonicos', base64PlanosArquitectonicos);
    }
    if (base64PlanosIc) {
        localStorage.setItem('base64PlanosIc', base64PlanosIc);
    }
    if (base64Fotos) {
        localStorage.setItem('base64Fotos', base64Fotos);
    }

    // Redirigir a la siguiente página
    window.location.href = '../../admin/proyectos/AgendaVisita.html';
});
function fusionarFechaYHora(fecha, hora) {
    // Obtener partes de la fecha y hora
    let fechaPartes = fecha.split('-'); // Suponiendo que la fecha está en formato YYYY-MM-DD
    let horaPartes = hora.split(':');   // Suponiendo que la hora está en formato HH:mm

    // Crear un nuevo objeto de fecha y establecer la hora
    let fechaHora = new Date(
        parseInt(fechaPartes[0]),   // Año
        parseInt(fechaPartes[1]) - 1, // Mes (restamos 1 porque los meses van de 0 a 11 en JavaScript)
        parseInt(fechaPartes[2]),   // Día
        parseInt(horaPartes[0]),    // Horas
        parseInt(horaPartes[1]),    // Minutos
        0                           // Segundos (en este ejemplo, los establecemos en 0)
    );

    // Formatear la fecha y hora en el formato deseado YYYY-MM-DD HH:mm:ss
    let fechaHoraFormateada = fechaHora.toISOString().slice(0, 19).replace('T', ' ');

    return fechaHoraFormateada;
}

async function crearNuevoproyecto() {
    console.log("Función para crear Proyecto");

    // Obtener datos del localStorage
    let problema = localStorage.getItem('txtProblema');
    let descripcion = localStorage.getItem('txtDescripcion');
    let nombreProyecto = localStorage.getItem('txtNombreProyecto');
    let planosAquitectonicos = localStorage.getItem('base64PlanosArquitectonicos');
    let planosIc = localStorage.getItem('base64PlanosIc');
    let fotos = localStorage.getItem('base64Fotos');
    
    // Obtener datos del formulario
    let estado = document.getElementById("cmbEstadoProyecto").value;
    let ciudad = document.getElementById("txtCiudadProyecto").value;
    let calle = document.getElementById("txtCalleProyecto").value;
    let colonia = document.getElementById("txtColoniaProyecto").value;
    let indicaciones = document.getElementById("txtIndicaciones").value;
    let fecha = document.getElementById("txtFecha").value; // Supongo que obtienes la fecha en formato YYYY-MM-DD
    let horario = document.getElementById("txtHoraProyecto").value; // Supongo que obtienes la hora en formato HH:mm
    
    // Fusionar fecha y hora en el formato deseado
    let fechaHora = fusionarFechaYHora(fecha, horario);
    let token = localStorage.getItem('token');
    // Objeto con todos los datos del proyecto
    let datosProyecto = {
        problema: problema,
        descripcion: descripcion,
        nombreProyecto: nombreProyecto,
        planosAquitectonicos: planosAquitectonicos,
        planosIc: planosIc,
        fotos: fotos,
        estado: estado,
        ciudad: ciudad,
        calle: calle,
        colonia: colonia,
        indicaciones: indicaciones,
        fecha: fechaHora,
        token: token
        // Aquí utilizamos la fecha y hora formateadas
    };

    console.log('Datos del proyecto', datosProyecto);

    // URL del endpoint para crear un nuevo proyecto
    let url = "http://localhost:8080/CORCOM_BackEnd/api/proyectos/nuevoProyecto";
    
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'problema': problema,
                'nombreProyecto': nombreProyecto,
                'descripcion': descripcion,
                'planosAquitectonicos': planosAquitectonicos,
                'planosIc': planosIc,
                'fotos': fotos,
                'video': '', // Si no tienes video, asegúrate de enviar un campo vacío o eliminarlo
                'estado': estado,
                'ciudad': ciudad,
                'calle': calle,
                'colonia': colonia,
                'fechaHora': fechaHora,
                'indicaciones': indicaciones,
                'token': token
            })
        });

        if (response.ok) {
            // Si la respuesta es exitosa, redirigir a la siguiente página
            window.location.href = '../../admin/proyectos/InicioProyectos.html';

            // Limpiar localStorage excepto el token
            localStorage.removeItem('txtProblema');
            localStorage.removeItem('txtDescripcion');
            localStorage.removeItem('txtNombreProyecto');
            localStorage.removeItem('base64PlanosArquitectonicos');
            localStorage.removeItem('base64PlanosIc');
            localStorage.removeItem('base64Fotos');
        } else {
            // Si la respuesta no es exitosa, mostrar una alerta
            alert('Hubo un problema al crear el proyecto. Por favor, inténtalo nuevamente.');
        }

    } catch (error) {
        console.error('Error al enviar los datos:', error);
        // Mostrar una alerta en caso de error de red u otro problema
        alert('Ocurrió un error al comunicarse con el servidor. Por favor, inténtalo más tarde.');
    }
}

// Asociar la función crearNuevoproyecto al evento click del botón
document.getElementById('btnCrearProyecto').addEventListener('click', crearNuevoproyecto);
document.getElementById('btnAgendarvisita').addEventListener('click', crearNuevoproyecto);