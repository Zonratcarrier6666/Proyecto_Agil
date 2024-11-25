document.addEventListener('DOMContentLoaded', function () {
    const btnNext = document.getElementById('btnNext');

    if (btnNext) {
        btnNext.addEventListener('click', function (event) {
            handleFormSubmit('../login/registro2.html', validateFormRegistro);
        });
    }

    function handleFormSubmit(redirectUrl, validationFunction) {
        if (validationFunction()) {
            localStorage.setItem('nombreEmpresa', getValueAndTrim('txtNombreEmpresa'));
            localStorage.setItem('direccionEmpresa', getValueAndTrim('txtDireccionEmpresa'));
            localStorage.setItem('ciudad', getValueAndTrim('txtCiudad'));
            localStorage.setItem('estado', document.getElementById('cmbEstado').value);
            localStorage.setItem('correoElectronico', getValueAndTrim('txtCorreoElectronico'));
            localStorage.setItem('sectorEmpresa', getValueAndTrim('txtSectorEmpresa'));
            localStorage.setItem('telefonoEmpresa', getValueAndTrim('txtTelefonoEmpresa'));
            localStorage.setItem('numeroIdentificacionFiscal', getValueAndTrim('txtNumeroIdentificacionFiscal'));

            window.location.href = redirectUrl;
        } else {
            alert('Por favor, completa todos los campos correctamente antes de continuar.');
        }
    }

    function validateFormRegistro() {
        const nombreEmpresa = getValueAndTrim('txtNombreEmpresa');
        const direccionEmpresa = getValueAndTrim('txtDireccionEmpresa');
        const ciudad = getValueAndTrim('txtCiudad');
        const estado = document.getElementById('cmbEstado').value;
        const correoElectronico = getValueAndTrim('txtCorreoElectronico');
        const sectorEmpresa = getValueAndTrim('txtSectorEmpresa');
        const telefonoEmpresa = getValueAndTrim('txtTelefonoEmpresa');
        const numeroIdentificacionFiscal = getValueAndTrim('txtNumeroIdentificacionFiscal');

        let valid = true;

        if (!/^[\w\s]{3,50}$/.test(nombreEmpresa)) {
            valid = false;
            showErrorMessage('txtNombreEmpresa', 'El nombre debe tener entre 3 y 50 caracteres.');
        }

        if (!/^[\w\sáéíóúüñÁÉÍÓÚÜÑ'#]{5,100}$/.test(direccionEmpresa)) {
            valid = false;
            showErrorMessage('txtDireccionEmpresa', 'La dirección debe tener entre 5 y 100 caracteres.');
        }

        if (!/^[\w\s]{2,50}$/.test(ciudad)) {
            valid = false;
            showErrorMessage('txtCiudad', 'La ciudad debe tener entre 2 y 50 caracteres.');
        }

        if (estado === "") {
            valid = false;
            showErrorMessage('cmbEstado', 'Selecciona un estado.');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico)) {
            valid = false;
            showErrorMessage('txtCorreoElectronico', 'Ingresa un correo electrónico válido.');
        }

        if (!/^[\w\s]{3,50}$/.test(sectorEmpresa)) {
            valid = false;
            showErrorMessage('txtSectorEmpresa', 'El sector debe tener entre 3 y 50 caracteres.');
        }

        if (!/^\d{10}$/.test(telefonoEmpresa)) {
            valid = false;
            showErrorMessage('txtTelefonoEmpresa', 'El teléfono debe tener 10 dígitos.');
        }

        if (!/^[\w\s]{5,20}$/.test(numeroIdentificacionFiscal)) {
            valid = false;
            showErrorMessage('txtNumeroIdentificacionFiscal', 'El número de identificación debe tener entre 5 y 20 caracteres.');
        }

        return valid;
    }

    function getValueAndTrim(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            return element.value.trim();
        }
        return 'UNKNONW'; // Manejo de caso donde el elemento no se encuentra
    }


    function showErrorMessage(elementId, message) {
        const inputElement = document.getElementById(elementId);
        inputElement.style.borderColor = 'red';

        let errorMessageElement = inputElement.nextElementSibling;
        if (errorMessageElement && errorMessageElement.className === 'error-message') {
            errorMessageElement.textContent = message;
        } else {
            errorMessageElement = document.createElement('span');
            errorMessageElement.style.color = 'red';
            errorMessageElement.style.fontSize = '12px';
            errorMessageElement.className = 'error-message';
            errorMessageElement.textContent = message;
            inputElement.parentNode.insertBefore(errorMessageElement, inputElement.nextSibling);
        }
    }

    const btnRegistrarme = document.getElementById('btnRegistrarme');
    const alertModal = document.getElementById('alertModal');
    const btnRevisar = document.getElementById('btnRevisar');
    const btnAceptar = document.getElementById('btnAceptar');
    if (btnRegistrarme) {
        btnRegistrarme.addEventListener('click', function () {
            if (validateFormRegistro2()) {
                alertModal.style.display = 'block';
            } else {
                console.log('Formulario no válido. No se muestra el modal.');
            }
        });
    }

    if (btnAceptar) {
        btnAceptar.addEventListener('click', function () {
            const nombreRepresentante = getValueAndTrim('txtNombreRepresentante');
            const nombreEmpresa = localStorage.getItem('nombreEmpresa');
            const userName = `${nombreRepresentante} ${nombreEmpresa}`.trim(); // Generar el userName concatenando ambos nombres

            const additionalText = 'Estamos creando cuenta. Espera un poco...';
            alertModal.style.display = 'none'; // Ocultar el modal antes de mostrar el mensaje de alerta
            showSimpleAlert(`Te damos la bienvenida ${userName}`, additionalText);

            const password = getValueAndTrim('txtPassword');
            setTimeout(function () {
                crearCuenta(password).then(() => {
                    console.log("Después de realizar la solicitud fetch");
                    window.location.href = '../../admin/inicio/inicioCliente.html';
                    console.log('30 segundos han pasado. Creando cuenta...');
                }).catch((error) => {
                    console.error('Error al crear la cuenta:', error);
                    alert(`Error al crear la cuenta: ${error.message}`);
                });
            }, 20000);
        });
    }

    function getValueAndTrim(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            return element.value.trim();
        }
        return '';
    }



    if (btnRevisar) {
        btnRevisar.addEventListener('click', function () {
            alertModal.style.display = 'none';
        });
    }

    function validateFormRegistro2() {
        const nombreRepresentante = getValueAndTrim('txtNombreRepresentante');
        const telefonoContactoDirecto = getValueAndTrim('txtTelefonoContactoDirecto');
        const correoElectronicoPersonal = getValueAndTrim('txtCorreoElectronicoPersonal');
        const cargo = getValueAndTrim('txtCargo');
        const horarioContacto = getValueAndTrim('txtHorarioContacto');
        const notas = getValueAndTrim('txtNotas');
        const password = getValueAndTrim('txtPassword');
        const passwordConfirm = getValueAndTrim('txtPasswordConfirm');

        let valid = true;

        if (!/^[\w\s]{3,50}$/.test(nombreRepresentante)) {
            valid = false;
            showErrorMessage('txtNombreRepresentante', 'El nombre del representante debe tener entre 3 y 50 caracteres.');
        }

        if (!/^\d{10}$/.test(telefonoContactoDirecto)) {
            valid = false;
            showErrorMessage('txtTelefonoContactoDirecto', 'El teléfono debe tener 10 dígitos.');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronicoPersonal)) {
            valid = false;
            showErrorMessage('txtCorreoElectronicoPersonal', 'Ingresa un correo electrónico válido.');
        }

        if (!/^[\w\s]{3,50}$/.test(cargo)) {
            valid = false;
            showErrorMessage('txtCargo', 'El cargo debe tener entre 3 y 50 caracteres.');
        }


        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,15}$/.test(password)) {
            valid = false;
            showErrorMessage('txtPassword', 'La contraseña debe tener mas 8 de caracteres y menos de 16, y por lo menos numeros y letras.');
        }
        if (password !== passwordConfirm) {
            valid = false;
            showErrorMessage('txtPasswordConfirm', 'Las contraseñas deben de ser las mismas');
        }
        return valid;
    }


    function showSimpleAlert(message, additionalText = '') {
        const alertContainer = document.createElement('div');
        alertContainer.style.position = 'fixed';
        alertContainer.style.top = '0';
        alertContainer.style.left = '0';
        alertContainer.style.width = '100%';
        alertContainer.style.height = '100%';
        alertContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Fondo semi-transparente
        alertContainer.style.display = 'flex';
        alertContainer.style.justifyContent = 'center';
        alertContainer.style.alignItems = 'center';
        alertContainer.style.zIndex = '1000';

        const alertBox = document.createElement('div');
        alertBox.style.backgroundColor = '#000000';
        alertBox.style.color = '#fff';
        alertBox.style.padding = '20px';
        alertBox.style.borderRadius = '5px';
        alertBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.7)';
        alertBox.style.textAlign = 'center'; // Alineación del contenido al centro

        const alertContent = document.createElement('div');
        alertContent.textContent = message;
        alertContent.style.fontSize = '20px'; // Tamaño de letra personalizado

        if (additionalText !== '') {
            const additionalContent = document.createElement('div');
            additionalContent.textContent = additionalText;
            additionalContent.style.fontSize = '40px'; // Tamaño de letra para el texto adicional
            alertContent.appendChild(document.createElement('br'));
            alertContent.appendChild(additionalContent);
        }

        const alertImage = document.createElement('img');
        alertImage.src = '../../media/video/password.gif'; // Ruta de la imagen que deseas mostrar
        alertImage.style.maxWidth = '100%'; // Ajusta el tamaño máximo de la imagen
        alertImage.style.marginTop = '10px'; // Espacio superior para separar la imagen del texto

        alertBox.appendChild(alertContent);
        alertBox.appendChild(alertImage); // Agrega la imagen al contenedor de la alerta
        alertContainer.appendChild(alertBox);
        document.body.appendChild(alertContainer);
    }
    async function crearCuenta(password) {
        console.log("Función crearCuenta llamada");

        let nombreEmpresa = localStorage.getItem('nombreEmpresa');
        let direccion = localStorage.getItem('direccionEmpresa');
        let estado = localStorage.getItem('estado');
        let ciudad = localStorage.getItem('ciudad');
        let correoElectronico = localStorage.getItem('correoElectronico');
        let sectorEmpresarial = localStorage.getItem('sectorEmpresa');
        let telefonoEmpresa = localStorage.getItem('telefonoEmpresa');
        let numeroIdentificacionFiscal = localStorage.getItem('numeroIdentificacionFiscal');
        let nombreRepresentante = getValueAndTrim('txtNombreRepresentante');
        let telefonoContactoDirecto = getValueAndTrim('txtTelefonoContactoDirecto');
        let correoElectronicoPersonal = getValueAndTrim('txtCorreoElectronicoPersonal');
        let cargo = getValueAndTrim('txtCargo');
        let horarioContacto = getValueAndTrim('txtHorarioContacto');
        let notas = getValueAndTrim('txtNotas');

        console.log("Datos recopilados:", {
            nombreEmpresa, direccion, estado, ciudad, correoElectronico,
            sectorEmpresarial, telefonoEmpresa, numeroIdentificacionFiscal,
            nombreRepresentante, telefonoContactoDirecto, correoElectronicoPersonal,
            cargo, horarioContacto, notas, password
        });

        let url = "http://localhost:8080/CORCOM_BackEnd/api/user/crearCuenta";
        try {
            console.log("Preparando la solicitud fetch");

            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'nombreEmpresa': nombreEmpresa,
                    'direccion': direccion,
                    'estado': estado,
                    'ciudad': ciudad,
                    'correoElectronico': correoElectronico,
                    'sectorEmpresarial': sectorEmpresarial,
                    'telefonoEmpresa': telefonoEmpresa,
                    'numeroIdentificacionFiscal': numeroIdentificacionFiscal,
                    'nombreRepresentante': nombreRepresentante,
                    'telefonoContactoDirecto': telefonoContactoDirecto,
                    'correoElectronicoPersonal': correoElectronicoPersonal,
                    'cargo': cargo,
                    'horarioContacto': horarioContacto,
                    'notas': notas,
                    'password': password,
                    'token': '' // Asegúrate de enviar el token aquí si es necesario
                })

            });


            console.log("Después de realizar la solicitud fetch");

            if (!response.ok) {
                console.error("Error en la respuesta del servidor:", response.statusText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseText = await response.text();
            console.log("Respuesta del servidor en texto:", responseText);

            let result;
            try {
                result = JSON.parse(responseText);
                console.log("Respuesta del servidor parseada en JSON:", result);

                console.log('Cuenta creada exitosamente, userName:', result.userName, ', token:', result.token);
                localStorage.clear();
                localStorage.setItem('UserName', result.userName);
                localStorage.setItem('token', result.token);
                if (result.token !== null) {
                    console.log('Cuenta creada exitosamente.');

                }

            } catch (parseError) {
                console.error("Error al parsear la respuesta JSON:", parseError);
                throw new Error("Error al parsear la respuesta JSON");
            }


        } catch (error) {
            console.error('Error al crear la cuenta:', error);
            alert(`Error al crear la cuenta: ${error.message}`);
        }
    }
});
