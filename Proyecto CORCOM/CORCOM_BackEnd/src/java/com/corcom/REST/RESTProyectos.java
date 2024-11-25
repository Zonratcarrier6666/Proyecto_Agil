/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.REST;

import com.corcom.core.ControllerProyectos;
import com.corcom.model.Proyecto;
import com.google.gson.Gson;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

/**
 *
 * @author XXXXX
 */
@Path("proyectos")
public class RESTProyectos {

    private final ControllerProyectos controllerProyectos = new ControllerProyectos();

    @Path("nuevoProyecto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response nuevoProyecto(
            @FormParam("problema") String problema,
            @FormParam("nombreProyecto") String nombreProyecto,
            @FormParam("descripcion") String descripcion,
            @FormParam("planosAquitectonicos") String planosAquitectonicos, 
            @FormParam("planosIc") String planosIc, 
            @FormParam("fotos") String fotos,
            @FormParam("videos") String videos, 
            @FormParam("estado") String estado,
            @FormParam("ciudad") String ciudad,
            @FormParam("calle") String calle,
            @FormParam("colonia") String colonia,
            @FormParam("fechaHora") String fechaHora,
            @FormParam("indicaciones") String indicaciones,
            @FormParam("token") String token) {

        try {
            String result = controllerProyectos.crearNuevoProyecto(
                    problema,
                    nombreProyecto,
                    descripcion,
                    planosAquitectonicos,
                    planosIc,
                    fotos,
                    videos,
                    estado,
                    ciudad,
                    calle,
                    colonia,
                    fechaHora,
                    indicaciones,
                    token
            );

            return Response.ok("{\"mensaje\":\"" + result + "\"}").build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("token") String userToken) {
        List<Proyecto> proyectos = null;

        try {
            proyectos = controllerProyectos.getAll(userToken);

            // Verificar si la lista de proyectos está vacía
            if (proyectos.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("No hay proyectos disponibles para el token proporcionado.")
                        .build();
            }

            // Convertir la lista de proyectos a JSON
            Gson gson = new Gson();
            String json = gson.toJson(proyectos);

            return Response.ok(json).build();
        } catch (Exception e) {
            e.printStackTrace(); // Manejo básico de errores
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error al obtener proyectos: " + e.getMessage())
                    .build();
        }
    }

}
