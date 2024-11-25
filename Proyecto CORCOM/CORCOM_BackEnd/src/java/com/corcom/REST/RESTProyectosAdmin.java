/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.REST;

import com.corcom.core.ControllerProyectosAdmin;
import com.corcom.model.PresupuestoMaterial;
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
@Path("ProyectosAdmin")
public class RESTProyectosAdmin {

    private final ControllerProyectosAdmin controllerProyectos = new ControllerProyectosAdmin();

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

    @Path("ActaulizarInsertarProyecto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response InsertarActualizar(
            @FormParam("idVisita") int idVisita,
            @FormParam("fechaHora") String fechaHora,
            @FormParam("idProyecto") int idProyecto,
            @FormParam("estatus") String estatus,
            @FormParam("soluciones") String soluciones) {
        try {
            String result = controllerProyectos.actualizarInsertarProyecto(
                    idVisita,
                    fechaHora,
                    idProyecto,
                    estatus,
                    soluciones
            );
            return Response.ok("{\"mensaje\":\"" + result + "\"}").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    @Path("presupuesto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response generarPresupuesto(
            @FormParam("p_idProyecto") int p_idProyecto,
            @FormParam("p_datosMateriales") String p_datosMateriales,
            @FormParam("p_costoManoDeObra") double p_costoManoDeObra) {

        try {
            // Llamar al método DAO para generar el presupuesto
            controllerProyectos.generarPresupuesto(p_idProyecto, p_datosMateriales, p_costoManoDeObra);
            return Response.ok().entity("{\"message\": \"Presupuesto generado exitosamente.\"}").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}").build();
        }
    }

    @Path("aprobarPresupuesto")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response aprobarPresupuesto(
            @FormParam("p_idPresupuesto") int p_idPresupuesto) {

        try {
            // Llamar al método DAO para aprobar el presupuesto
            controllerProyectos.aprobarPresupuesto(p_idPresupuesto);
            return Response.ok().entity("{\"message\": \"Presupuesto aprobado exitosamente.\"}").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}").build();
        }
    }
    @GET
    @Path("getAllPresupuesto")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPresupuesto(@QueryParam("idProyecto") int idProyecto) {
        List<PresupuestoMaterial> presMateriales= null;
        try {
            presMateriales = controllerProyectos.getAllPresupuesto(idProyecto);
            
            if(presMateriales.isEmpty()){
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("NO HAY PRESUPUESTOS")
                    .build();
            }
            Gson gson = new Gson();
            String json = gson.toJson(presMateriales);
            return Response.ok(json).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("error al obtener el presupuesto"+ e.getMessage())
                    .build();
        }
    }
}
