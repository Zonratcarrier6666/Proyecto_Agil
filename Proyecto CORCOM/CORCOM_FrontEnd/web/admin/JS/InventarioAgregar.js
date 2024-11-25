//let base64Image = "";
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            base64Image = e.target.result;
            console.log(base64Image); // Puedes ver el resultado en la consola
        }
        reader.readAsDataURL(file);
    }
});

async function agregarmaterial() {
    console.log('Funcion para agregar materiales');
    let tipo = document.getElementById("txtTipo").value; // Asegúrate de tener el ID correcto
    let modelo = document.getElementById("txtModelo").value;
    let marca = document.getElementById("txtMarca").value;
    let caracteristicas = document.getElementById("txtCaracteristicas").value;
    let precio = document.getElementById("txtPrecio").value;
    let existencias = document.getElementById("txtExistencias").value;

    let datosMaterial = {
        tipo: tipo,
        modelo: modelo,
        marca: marca,
        caracteristicas: caracteristicas,
        precio: precio,
        existencias: existencias,
        foto: base64Image // Asigna la imagen en base64
    };

    console.log('Datos del material', datosMaterial);
    let url = "http://localhost:8080/CORCOM_BackEnd/api/Storage/AgregarMaterial";
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'tipo': tipo,
                'marca': marca,
                'modelo': modelo,
                'caracteristicas': caracteristicas,
                'precio': precio,
                'foto': base64Image, // Envía la imagen en base64
                'existencias': existencias
            })
        });

        if (response.ok) {
            window.location.href = '../../admin/inventario/inventario.html';
        } else {
            alert('Hubo un problema al crear el material. Por favor, inténtalo nuevamente.');
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        // Mostrar una alerta en caso de error de red u otro problema
        alert('Ocurrió un error al comunicarse con el servidor. Por favor, inténtalo más tarde.');
    }
}























function agregarMaterial(material) {
    let tablaUsadosBody = document.querySelector('#tablaMaterialesUsados tbody');

    let fila = document.createElement('tr');
    fila.dataset.idMaterial = material.idMaterial; // Asignar el idMaterial al atributo data

    let celdaIdMaterial = document.createElement('td');
    celdaIdMaterial.textContent = material.idMaterial;

    let celdaNombreMaterial = document.createElement('td');
    celdaNombreMaterial.textContent = material.nombre;

    let celdaExistencias = document.createElement('td');
    let inputExistencias = document.createElement('input');
    inputExistencias.type = 'number';
    inputExistencias.value = material.existenciaUsada || 0;
    inputExistencias.classList.add('form-control');
    celdaExistencias.appendChild(inputExistencias);

    let celdaAcciones = document.createElement('td');
    let botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', function() {
        fila.remove();
        eliminarMaterialDeLista(material.idMaterial);
    });
    celdaAcciones.appendChild(botonEliminar);

    fila.appendChild(celdaIdMaterial);
    fila.appendChild(celdaNombreMaterial);
    fila.appendChild(celdaExistencias);
    fila.appendChild(celdaAcciones);

    tablaUsadosBody.appendChild(fila);
}