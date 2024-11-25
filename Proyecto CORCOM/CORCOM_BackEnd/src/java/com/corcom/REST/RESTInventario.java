package com.corcom.REST;

import com.corcom.core.ControllerInventario;
import com.corcom.model.Material;
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
@Path("Storage")
public class RESTInventario {

    private final ControllerInventario controllerInventario = new ControllerInventario();

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("token") String usertoken) {
        List<Material> materiales = null;

        try {
            materiales = controllerInventario.getAll(usertoken);

            if (materiales.isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("No hay nada en el Inventario")
                        .build();
            }
            Gson gson = new Gson();
            String json = gson.toJson(materiales);
            return Response.ok(json).build();

        } catch (Exception e) {
            e.printStackTrace(); // Manejo básico de errores
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error al obtener Materiales: " + e.getMessage())
                    .build();
        }
    }

    @Path("AgregarMaterial")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response agregarMaterial(
            @FormParam("tipo") String tipo,
            @FormParam("marca") String marca,
            @FormParam("modelo") String modelo,
            @FormParam("caracteristicas") String caracteristicas,
            @FormParam("precio") String precio,
            @FormParam("foto") String foto,
            @FormParam("existencias") String existencias
    ) {
        try {
            String result = controllerInventario.agregarMateriales(
                    tipo, marca, modelo, caracteristicas, precio, foto, existencias
            );
            return Response.ok("{\"mensaje\":\"" + result + "\"}").build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage() + "\"}")
                    .build();
        }
    }
}
