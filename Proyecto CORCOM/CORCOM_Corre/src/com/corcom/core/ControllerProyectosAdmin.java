/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.core;

import com.corcom.bd.ConexionMySQL;
import com.corcom.model.Empresa;
import com.corcom.model.PresupuestoMaterial;
import com.corcom.model.Proyecto;
import com.corcom.model.Visita;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.sql.PreparedStatement;
import java.sql.Statement;

/**
 *
 * @author XXXXX
 */
public class ControllerProyectosAdmin {
    // Metodo de GetAll para los proyectos de los clientes

    public List<Proyecto> getAll(String userToken) throws Exception {
        String sql = "{CALL ObtenerProyectosConEmpresasYVisitas(?)}";
        List<Proyecto> proyectos = new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        ConexionMySQL conexion = new ConexionMySQL();
        try {
            conn = conexion.open();
            cstmt = conn.prepareCall(sql);
            cstmt.setString(1, userToken);

            boolean hasResults = cstmt.execute();
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
            throw new Exception("Error al obtener los proyectos", e);
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

        // Llenar los datos del proyecto
        proyecto.setIdProyecto(rs.getInt("ProyectoID"));
        proyecto.setProblema(rs.getString("problema"));
        proyecto.setNombreProyecto(rs.getString("NombreProyecto"));
        proyecto.setDescripcion(rs.getString("DescripcionProyecto"));
        proyecto.setEstatus(rs.getString("EstatusProyecto"));
        proyecto.setPlanosAquitectonicos(rs.getString("PlanosArquitectonicos"));
        proyecto.setPlanosIC(rs.getString("PlanosIC"));
        proyecto.setFotos(rs.getString("Fotos"));
        proyecto.setVideos(rs.getString("Videos"));
        proyecto.setSoluciones(rs.getString("soluciones"));

        // Llenar los datos de la empresa
        empresa.setIdEmpresa(rs.getInt("EmpresaID"));
        empresa.setNombreEmpresa(rs.getString("NombreEmpresa"));
        empresa.setDireccionEmpresa(rs.getString("DireccionEmpresa"));
        empresa.setEstado(rs.getString("EstadoEmpresa"));
        empresa.setCiudad(rs.getString("CiudadEmpresa"));
        empresa.setCorreoElectronico(rs.getString("CorreoElectronicoEmpresa"));
        empresa.setTipoEmpresa(rs.getString("SectorEmpresarial"));
        empresa.setTelefonoEmpresa(rs.getString("TelefonoEmpresa"));
        empresa.setNumeroIdentificacionFiscal(rs.getString("NumeroIdentificacionFiscal"));
        empresa.setNombreRepresentante(rs.getString("NombreRepresentante"));
        empresa.setTelefonoContactoDirecto(rs.getString("TelefonoContactoDirecto"));
        empresa.setCorreoElectronicoPersonal(rs.getString("CorreoElectronicoPersonal"));
        empresa.setCargo(rs.getString("Cargo"));
        empresa.setHorarioContacto(rs.getString("HorarioContacto"));
        empresa.setNotas(rs.getString("NotasEmpresa"));

        // Llenar los datos de la visita
        visita.setIdVisita(rs.getInt("VisitaID"));
        visita.setEstado(rs.getString("EstadoVisita"));
        visita.setCiudad(rs.getString("CiudadVisita"));
        visita.setCalle(rs.getString("CalleVisita"));
        visita.setColonia(rs.getString("ColoniaVisita"));
        visita.setFechaHora(rs.getString("FechaHoraVisita"));
        visita.setIdicaciones(rs.getString("IndicacionesVisita"));

        // Asignar la empresa y la visita al proyecto
        proyecto.setEmpresa(empresa);
        proyecto.setVisita(visita);

        return proyecto;
    }

    public String actualizarInsertarProyecto(
            int idVisita,
            String fechaHora,
            int idProyecto,
            String estatus,
            String soluciones
    ) throws Exception {
        Connection conn = null;
        CallableStatement cstmt = null;
        ConexionMySQL conexion = new ConexionMySQL();
        try {
            conn = conexion.open();
            String sql = "{CALL ActualizarDatosVisitaYProyecto(?, ?, ?, ?, ?)}";
            cstmt = conn.prepareCall(sql);
            cstmt.setInt(1, idVisita);
            cstmt.setString(2, fechaHora);
            cstmt.setInt(3, idProyecto);
            cstmt.setString(4, estatus);
            cstmt.setString(5, soluciones);
            cstmt.execute();
            return "Proyecto y visita registrados y actualizados exitosamente ADMINISTRADOR";
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception("Error al registrar el proyecto y la visita: " + e.getMessage());
        }
    }

    public static void generarPresupuesto(int p_idProyecto, String p_datosMateriales, double p_costoManoDeObra) throws Exception {
        Connection conn = null;
        CallableStatement cstmt = null;
        ConexionMySQL conexion = new ConexionMySQL();
        try {
            conn = conexion.open();

            // Llamar al procedimiento almacenado
            String sql = "{call GenerarActualizarPresupuesto(?, ?, ?)}";
            cstmt = conn.prepareCall(sql);

            // Configurar los parámetros
            cstmt.setInt(1, p_idProyecto);
            cstmt.setString(2, p_datosMateriales);
            cstmt.setDouble(3, p_costoManoDeObra);            // Ejecutar el procedimiento
            cstmt.execute();

            System.out.println("Presupuesto generado exitosamente.");

        } catch (SQLException e) {
            e.printStackTrace();
            System.err.println("Error al generar el presupuesto: " + e.getMessage());
        } finally {
            // Cerrar los recursos
            try {
                if (cstmt != null) {
                    cstmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public static void aprobarPresupuesto(int p_idPresupuesto) throws Exception {
        Connection conn = null;
        CallableStatement cstmt = null;
        ConexionMySQL conexion = new ConexionMySQL();
        try {
            conn = conexion.open();

            // Llamar al procedimiento almacenado
            String sql = "{call AprobarPresupuesto(?)}";
            cstmt = conn.prepareCall(sql);

            // Configurar el parámetro
            cstmt.setInt(1, p_idPresupuesto);

            // Ejecutar el procedimiento
            cstmt.execute();

            System.out.println("Presupuesto aprobado exitosamente.");

        } catch (SQLException e) {
            e.printStackTrace();
            System.err.println("Error al aprobar el presupuesto: " + e.getMessage());
            throw new Exception("Error al aprobar el presupuesto: " + e.getMessage());
        } finally {
            // Cerrar los recursos
            try {
                if (cstmt != null) {
                    cstmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    
    public List<PresupuestoMaterial> getAllPresupuesto(int idProyecto) throws Exception {
        String sql = "{call corcom.obtenerPresupuestoConMateriales(?)}";
        List<PresupuestoMaterial> presMateriales = new ArrayList<>();
        Connection conn = null;
        CallableStatement cstmt = null;
        ConexionMySQL conexion = new ConexionMySQL();
        try {
            conn = conexion.open();
            cstmt = conn.prepareCall(sql);
            cstmt.setInt(1, idProyecto);
            boolean hasResults = cstmt.execute();
            if (hasResults) {
                try (ResultSet rs = cstmt.getResultSet()) {
                    while (rs.next()) {
                        PresupuestoMaterial presMaterial = fillPresupuesto(rs);
                        presMateriales.add(presMaterial);
                    }
                }
            } else {
                System.out.println("No hay presupuestos para el proyecto");
            }
        } catch (SQLException e) {
            e.printStackTrace(); // Manejo básico de errores, puedes personalizar según tu necesidad
            throw new Exception("Error al obtener los presupuestos", e);
        } finally {
            // Asegúrate de cerrar los recursos
            if (cstmt != null) try { cstmt.close(); } catch (SQLException e) { e.printStackTrace(); }
            if (conn != null) try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
        }
        return presMateriales;
    }

    private PresupuestoMaterial fillPresupuesto(ResultSet rs) throws SQLException {
        int idPresupuesto = rs.getInt("idPresupuesto");
        Double totalPresupuesto = rs.getDouble("totalPresupuesto");
        String fechaVigencia = rs.getString("fechaVigencia");
        int idMaterial = rs.getInt("idMaterial");
        String tipo = rs.getString("tipo");
        String modelo = rs.getString("modelo");
        String marca = rs.getString("marca");
        String caracteristicas = rs.getString("caracteristicas");
        Double precio = rs.getDouble("precio");
        String foto = rs.getString("foto"); // Asumiendo que la foto es una URL o Base64 en formato String
        int existenciaUsada = rs.getInt("existenciaUsada");
        Double totalMaterial = rs.getDouble("totalMaterial");

        return new PresupuestoMaterial(idPresupuesto, totalPresupuesto, fechaVigencia, idMaterial, tipo, modelo, marca, caracteristicas, precio, foto, existenciaUsada, totalMaterial);
    }

}
