/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.core;

import com.corcom.bd.ConexionMySQL;
import com.corcom.model.Empresa;
import com.corcom.model.Proyecto;
import com.corcom.model.Visita;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author XXXXX
 */
public class ControllerProyectos {

    public String crearNuevoProyecto(
            String problema,
            String nombreProyecto,
            String descripcion,
            String planosAquitectonicos,
            String planosIc,
            String fotos,
            String videos,
            String estado,
            String ciudad,
            String calle,
            String colonia,
            String fechaHora,
            String indicaciones,
            String token) throws Exception {

        Connection conn = null;
        CallableStatement cstmt = null;
        ConexionMySQL conexion = new ConexionMySQL();

        try {
            conn = conexion.open();
            String sql = "{CALL registrarProyectoYVisita(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
            cstmt = conn.prepareCall(sql);

            cstmt.setString(1, problema);
            cstmt.setString(2, nombreProyecto);
            cstmt.setString(3, descripcion);
            cstmt.setString(4, planosAquitectonicos);
            cstmt.setString(5, planosIc);
            cstmt.setString(6, fotos);
            cstmt.setString(7, videos);
            cstmt.setString(8, estado);
            cstmt.setString(9, ciudad);
            cstmt.setString(10, calle);
            cstmt.setString(11, colonia);
            cstmt.setString(12, fechaHora);
            cstmt.setString(13, indicaciones);
            cstmt.setString(14, token);

            cstmt.execute();

            return "Proyecto y visita registrados exitosamente";

        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception("Error al registrar el proyecto y la visita: " + e.getMessage());

        } finally {
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    //Metodo para GETALL de los proyectos

    public List<Proyecto> getAll(String userToken) throws Exception {
        String sql = "{ CALL detalleProyectos(?) }";
        List<Proyecto> proyectos = new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        ConexionMySQL conexion = new ConexionMySQL();

        try {
            conn = conexion.open();
            cstmt = conn.prepareCall(sql);
            cstmt.setString(1, userToken);

            boolean hasResults = cstmt.execute();

            // Verificar si hay resultados
            if (hasResults) {
                try (ResultSet rs = cstmt.getResultSet()) {
                    while (rs.next()) {
                        Proyecto proyecto = fill(rs);
                        proyectos.add(proyecto);
                    }
                }
            } else {
                // Si no hay resultados, imprimir un mensaje
                System.out.println("No hay proyectos disponibles para el token proporcionado.");
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Manejo básico de errores, puedes personalizar según tu necesidad
        } finally {
            // Cerrar recursos en el orden inverso de apertura
            if (cstmt != null) {
                try {
                    cstmt.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }

        return proyectos;
    }

    private Proyecto fill(ResultSet rs) throws SQLException {
        Proyecto proyecto = new Proyecto();
        Visita visita = new Visita();
        Empresa empresa = new Empresa();
        proyecto.setIdProyecto(rs.getInt("id_proyecto"));
        proyecto.setNombreProyecto(rs.getString("nombre_proyecto"));
        proyecto.setDescripcion(rs.getString("descripcion_proyecto"));
        proyecto.setEstatus(rs.getString("estatus_proyecto"));

        empresa.setIdEmpresa(rs.getInt("id_empresa"));
        empresa.setNombreEmpresa(rs.getString("nombre_empresa"));
        empresa.setDireccionEmpresa(rs.getString("direccion_empresa"));
        empresa.setEstado(rs.getString("estado_empresa"));
        empresa.setCargo(rs.getString("ciudad_empresa"));
        empresa.setCorreoElectronico(rs.getString("correo_empresa"));
        empresa.setTipoEmpresa(rs.getString("sector_empresarial"));
        empresa.setTelefonoEmpresa(rs.getString("telefono_empresa"));
        empresa.setNumeroIdentificacionFiscal(rs.getString("identificacion_fiscal_empresa"));
        empresa.setNombreRepresentante(rs.getString("nombre_representante"));
        empresa.setTelefonoContactoDirecto(rs.getString("telefono_contacto_empresa"));
        empresa.setCorreoElectronicoPersonal("correo_personal_empresa");
        empresa.setCargo(rs.getString("cargo_empresa"));
        empresa.setHorarioContacto(rs.getString("horario_contacto_empresa"));
        
        proyecto.setProblema(rs.getString("problema_proyecto"));
        proyecto.setPlanosAquitectonicos(rs.getString("planos_arquitectonicos"));
        proyecto.setPlanosIC(rs.getString("planos_ic"));
        proyecto.setFotos(rs.getString("fotos_proyecto"));
        proyecto.setVideos(rs.getString("videos_proyecto"));
        
        visita.setIdVisita(rs.getInt("id_visita"));
        visita.setEstado(rs.getString("estado_visita"));
        visita.setCiudad(rs.getString("ciudad_visita"));
        visita.setCalle(rs.getString("calle_visita"));
        visita.setColonia(rs.getString("colonia_visita"));
        visita.setFechaHora(rs.getString("fecha_hora_visita"));
        visita.setIdicaciones(rs.getString("indicaciones_visita"));
 

        proyecto.setEmpresa(empresa); // Asignar el objeto Empresa al proyecto
        proyecto.setVisita(visita); // Asignar el objeto Visita al proyecto
        return proyecto;
    }

}
