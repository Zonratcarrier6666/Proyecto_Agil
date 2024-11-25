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

let materialesArray = [];

// Mover la función llenarTablaMateriales fuera del manejador de eventos DOMContentLoaded
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
    let encabezados = ['Tipo', 'Marca', 'Descripción', 'Modelo', 'Precio', 'Existencias', 'Foto'];
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

        tbody.appendChild(row);  // Agregar fila de datos al <tbody>
    });

    // Agregar el listener de búsqueda después de llenar la tabla
    setupSearchListener();
}

// Mover la función setupSearchListener fuera del manejador de eventos DOMContentLoaded
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

// Llamar a la función para obtener materiales al cargar la página
window.onload = function () {
    let token = localStorage.getItem('token');
    if (token) {
        obtenerMateriales(token);
    } else {
        mostrarMensaje('No se encontró token de usuario.');
    }
};
