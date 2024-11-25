/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.core;

import com.corcom.bd.ConexionMySQL;
import com.corcom.model.Material;
import com.corcom.model.Proyecto;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author XXXXX
 */
public class ControllerInventario {
    //Metodo GetAll para el Inventario

    public List<Material> getAll(String userToken) throws Exception {
        String sql = "{CALL ObtenerMaterialesPorToken(?)}";

        List<Material> materiales = new ArrayList<>();
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
                        Material material = fill(rs);
                        materiales.add(material);
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
        return materiales;
    }

    private Material fill(ResultSet rs) throws SQLException {
        Material material = new Material();
        material.setIdMaterial(rs.getInt("idMaterial"));
        material.setTipo(rs.getString("tipo"));
        material.setMarca(rs.getString("marca"));
        material.setModelo(rs.getString("modelo"));
        material.setCaracteristicas(rs.getString("caracteristicas"));
        material.setPrecio(rs.getString("precio"));
        material.setFoto(rs.getString("foto"));
        material.setEstatus(rs.getString("estatus"));
        material.setExistencias(rs.getInt("existencias"));

        return material;
    }

    //Para agregar nuevos Materiales
    public String agregarMateriales(
            String tipo,
            String marca,
            String modelo,
            String caracteristicas,
            String precio,
            String foto,
            String existencias) throws Exception {
        Connection conn = null;
        CallableStatement cstmt = null;
        ConexionMySQL conexion = new ConexionMySQL();
        try {
            conn = conexion.open();
            String sql = "{CALL AgregarMaterialInventario(?, ?, ?, ?, ?, ?, ?)}";
            cstmt = conn.prepareCall(sql);
            cstmt.setString(1, tipo);
            cstmt.setString(2, marca);
            cstmt.setString(3, modelo);
            cstmt.setString(4, caracteristicas);
            cstmt.setString(5, precio);
            cstmt.setString(6, foto);
            cstmt.setString(7, existencias);

            cstmt.execute();
            return "Material Agregado Correctamente";
        } catch (SQLException e) {
            e.printStackTrace();
            throw new Exception("Error al registrar el material: " + e.getMessage());
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

}
