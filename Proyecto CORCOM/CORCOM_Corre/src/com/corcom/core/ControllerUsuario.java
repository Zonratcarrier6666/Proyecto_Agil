/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.core;

/**
 *
 * @author XXXXX
 */
import com.corcom.bd.ConexionMySQL;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.commons.codec.digest.DigestUtils;
import com.corcom.bd.ConexionMySQL;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.commons.codec.digest.DigestUtils;
public class ControllerUsuario {

    public String crearCuenta(String nombreEmpresa, String direccionEmpresa, String estado,
            String ciudad, String correoElectronico, String sectorEmpresarial,
            String telefonoEmpresa, String numeroIdentificacionFiscal,
            String nombreRepresentante, String telefonoContactoDirecto,
            String correoElectronicoPersonal, String cargo, String horarioContacto,
            String notas, String password) throws Exception {

        Connection conn = null;
        CallableStatement cstmt = null;
        ConexionMySQL conexion = new ConexionMySQL();

        try {
            // Establecer la conexión
            conn = conexion.open();

            // Generar token
            String token = generarToken(nombreEmpresa);

            // Llamar al procedimiento almacenado
            String sql = "{CALL RegistrarUsuario(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
            cstmt = conn.prepareCall(sql);

            // Configurar parámetros de entrada
            cstmt.setString(1, nombreEmpresa);
            cstmt.setString(2, direccionEmpresa);
            cstmt.setString(3, estado);
            cstmt.setString(4, ciudad);
            cstmt.setString(5, correoElectronico);
            cstmt.setString(6, sectorEmpresarial);
            cstmt.setString(7, telefonoEmpresa);
            cstmt.setString(8, numeroIdentificacionFiscal);
            cstmt.setString(9, nombreRepresentante);
            cstmt.setString(10, telefonoContactoDirecto);
            cstmt.setString(11, correoElectronicoPersonal);
            cstmt.setString(12, cargo);
            cstmt.setString(13, horarioContacto);
            cstmt.setString(14, notas);
            cstmt.setString(15, password);
            cstmt.setString(16, token);

            // Configurar parámetros de salida
            cstmt.registerOutParameter(17, Types.VARCHAR); // p_username
            cstmt.registerOutParameter(18, Types.VARCHAR); // p_out_token

            // Ejecutar el procedimiento almacenado
            cstmt.execute();

            // Obtener los valores de salida
            String username = cstmt.getString(17);
            String outToken = cstmt.getString(18);

            // Retornar el token de salida para confirmación
            return outToken;

        } catch (SQLException ex) {
            ex.printStackTrace();
            // Manejo de excepciones
            return null; // o lanzar una excepción personalizada
        } finally {
            // Cerrar conexiones y liberar recursos
            try {
                if (cstmt != null) {
                    cstmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }

    public String generarToken(String nombreEmpresa) {
        String tokenizer = null;
        Date myDate = new Date();
        String fecha = new SimpleDateFormat("dd-MM-yyyy").format(myDate);
        String token = "CORCOM" + "." + nombreEmpresa + "." + fecha; // Generar token con nombre de empresa
        tokenizer = DigestUtils.md5Hex(token);
        return tokenizer;
    }
}
