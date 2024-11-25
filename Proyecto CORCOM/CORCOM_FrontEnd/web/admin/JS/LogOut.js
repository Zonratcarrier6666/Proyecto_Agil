document.getElementById('btnLogOut').addEventListener('click', function () {
    logOut(); // Llamar a la función logIn cuando se haga clic en el botón Login
});
async function logOut() {
    let token = localStorage.getItem('token');

    if (!token) {
        console.error('No token found in localStorage');
        alert('No se encontró el token. Ya estás deslogueado.');
        return;
    }

    let url = "http://localhost:8080/CORCOM_BackEnd/api/loginADM/logout";
    console.log("Preparando el fetch para el logOut");
    console.log("Deslogeando el Token: " + token);

    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'token': token
            })
        });

        console.log("Después de realizar la solicitud fetch");
        console.log("response.ok:", response.ok);

        const responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);

        if (!response.ok) {
            console.error("Error en la respuesta del servidor:", response.statusText);
            alert(`Error al desloguear: ${responseData.error || response.statusText}`);
            return;
        }

        // Limpiar el localStorage y redirigir al usuario a la página de inicio de sesión
        localStorage.clear();
        window.location.href = 'http://localhost:8080/CORCOM_FrontEnd/';

    } catch (error) {
        console.error("No se pudo realizar el LOGOUT", error);
        alert(`No se pudo realizar el LOGOUT: ${error.message}`);
    }
}