package com.corcom.REST;

import jakarta.ws.rs.Path;
import com.corcom.core.ControllerUsuario;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

/**
 *
 * @author XXXXX
 */
@Path("user")
public class RESTCrearCuenta {

    private final ControllerUsuario controllerUsuario = new ControllerUsuario();

    @Path("crearCuenta")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response crearCuenta(
            @FormParam("nombreEmpresa") String nombreEmpresa,
            @FormParam("direccion") String direccion,
            @FormParam("estado") String estado,
            @FormParam("ciudad") String ciudad,
            @FormParam("correoElectronico") String correoElectronico,
            @FormParam("sectorEmpresarial") String sectorEmpresarial,
            @FormParam("telefonoEmpresa") String telefonoEmpresa,
            @FormParam("numeroIdentificacionFiscal") String numeroIdentificacionFiscal,
            @FormParam("nombreRepresentante") String nombreRepresentante,
            @FormParam("telefonoContactoDirecto") String telefonoContactoDirecto,
            @FormParam("correoElectronicoPersonal") String correoElectronicoPersonal,
            @FormParam("cargo") String cargo,
            @FormParam("horarioContacto") String horarioContacto,
            @FormParam("notas") String notas,
            @FormParam("password") String password,
            @FormParam("token") String token
    ) {
        try {
            // Llamar al método crearCuenta del controlador
            String outToken = controllerUsuario.crearCuenta(
                    nombreEmpresa, direccion, estado, ciudad, correoElectronico,
                    sectorEmpresarial, telefonoEmpresa, numeroIdentificacionFiscal, nombreRepresentante,
                    telefonoContactoDirecto, correoElectronicoPersonal, cargo, horarioContacto, notas, password
            );
            System.out.println("Token"+outToken);

            // Construir la respuesta JSON
            String jsonResponse = "{\"mensaje\": \"Usuario creado correctamente\", \"token\": \"" + outToken + "\"}";
            return Response.ok(jsonResponse).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().build();
        }
    }
}
