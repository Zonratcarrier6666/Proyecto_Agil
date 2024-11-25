/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.REST;

import com.corcom.core.ControllerLogin;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 *
 * @author XXXXX
 */
@Path("loginADM")
public class RESTLogIn {

    @Path("login")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response login(
            @FormParam("userName") String userName,
            @FormParam("password") String password
    ) {
        try {
            ControllerLogin controllerLogin = new ControllerLogin();
            // Verificar las credenciales con el controlador
            boolean loggedIn = controllerLogin.logIn(userName, password);

            // Si las credenciales coinciden con "Admin" y "&rfd%uiubET789"
            if (loggedIn && "Admin".equals(userName) && "&rfd%uiubET789".equals(password)) {
                String token = controllerLogin.getToken();
                return Response.ok().entity("{\"mensaje\":\"Administrador\",\"token\":\"" + token + "\"}").build();
            } else if (loggedIn) {
                // Si las credenciales son correctas pero no son las específicas, devolver un mensaje general
                String token = controllerLogin.getToken();
                return Response.ok().entity("{\"mensaje\":\"LogIn exitoso\",\"token\":\"" + token + "\"}").build();
            } else {
                // Si las credenciales no son correctas
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity("{\"error\":\"Credenciales incorrectas\"}")
                        .build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Error interno del servidor\"}")
                    .build();
        }
    }

    @Path("logout")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response logout(
            @FormParam("token") String token
    ) {
        try {
            ControllerLogin controllerLogin = new ControllerLogin();
            controllerLogin.logOut(token);
            System.out.println("Usuario deslogeado Existosamente: " + token);
            return Response.ok().entity("{\"mensaje\":\"LogOut exitoso\", \"token\":\"" + token + "\"}").build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Error interno del servidor\"}")
                    .build();
        }
    }
}
