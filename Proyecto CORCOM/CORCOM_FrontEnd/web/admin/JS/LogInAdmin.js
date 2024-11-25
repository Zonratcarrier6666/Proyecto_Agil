function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');
    var eyeIcon = document.querySelector('.eye-icon img');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.src = '../../media/img/visibilidad.png'; // Cambia a un icono de ojo abierto
    } else {
        passwordInput.type = 'password';
        eyeIcon.src = '../../media/img/ojo-cerrado.png'; // Cambia a un icono de ojo cerrado
    }
}

function getValueAndTrim(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        return element.value.trim();
    }
    return '';
}

document.getElementById('btnLogin').addEventListener('click', function () {
    logIn(); // Llamar a la función logIn cuando se haga clic en el botón Login
});

async function logIn() {
    const userName = getValueAndTrim('username');
    const password = getValueAndTrim('password');

    let url = "http://localhost:8080/CORCOM_BackEnd/api/loginADM/login";
    console.log("Preparando el fetch");
    console.log("Ejecutando 1 parte del logIn " + userName + " " + password);

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'userName': userName,
                'password': password
            })
        });
        
        console.log("Después de realizar la solicitud fetch");
        console.log("response.ok:", response.ok);
        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
        
        if (!response.ok) {
            console.error("Error en la respuesta del servidor:", response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Guardar el mensaje y el token en el localStorage
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('mensaje', responseData.mensaje);
        
        /// Redirigir a la página correcta según el mensaje
        if (responseData.mensaje === "Administrador") {
            window.location.href = '../../admin/proyectosAdmin/proyectosAdmin.html';
        } else if (responseData.mensaje === "LogIn exitoso") {
            window.location.href = '../../admin/inicio/inicioCliente.html';
        }
    } catch (error) {
        console.error("No se pudo realizar el LOGIN", error);
        alert(`No se pudo realizar el LOGIN: ${error.message}`);
    }
}
