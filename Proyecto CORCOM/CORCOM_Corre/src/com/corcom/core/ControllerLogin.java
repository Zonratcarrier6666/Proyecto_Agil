/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.core;

import com.corcom.bd.ConexionMySQL;
import java.sql.Connection;
import java.sql.CallableStatement;
import java.sql.Types;

/**
 *
 * @author XXXXX
 */
public class ControllerLogin {

    private String token;

    public boolean logIn(String userName, String password) {

        Connection conn = null;

        CallableStatement cstmt = null;

        ConexionMySQL conexion = new ConexionMySQL();

        try {

            conn = conexion.open();

            String query = "{CALL Login(?,?,?,?)}";

            cstmt = conn.prepareCall(query);

            // Parámetros de entrada
            cstmt.setString(1, userName);

            cstmt.setString(2, password);

            // Parámetros de salida
            cstmt.registerOutParameter(3, Types.VARCHAR); // p_token

            cstmt.registerOutParameter(4, Types.VARCHAR); // p_message

            cstmt.execute();

            // Obtener los valores de salida
            this.token = cstmt.getString(3);

            String message = cstmt.getString(4);

            // Manejar el token y el mensaje según necesites
            if (this.token != null) {

                System.out.println("Token generado: " + this.token);

                System.out.println("Mensaje: " + message);

                return true; // Autenticación exitosa

            } else {

                System.out.println("Error: " + message);

                return false; // Autenticación fallida

            }

        } catch (Exception e) {

            System.out.println("Error al ejecutar el procedimiento almacenado: " + e.getMessage());

            return false; // Autenticación fallida

        } finally {

            try {

                if (cstmt != null) {

                    cstmt.close();

                }

                if (conn != null) {

                    conn.close();

                }

            } catch (Exception e) {

                System.err.println("Error al cerrar la conexión: " + e.getMessage());

            }

        }

    }

    public String getToken() {
        return token;
    }

    public void logOut(String token) {
        Connection conn = null;
        CallableStatement cstmt = null;
        ConexionMySQL conexion = new ConexionMySQL();

        try {
            conn = conexion.open();
            String query = "{CALL Logout(?, ?)}";
            cstmt = conn.prepareCall(query);

            cstmt.setString(1, token);
            cstmt.registerOutParameter(2, Types.VARCHAR); // Registro del parámetro de salida p_message

            cstmt.execute();

            // Obtener el valor del parámetro de salida p_message
            String message = cstmt.getString(2);
            System.out.println("Mensaje: " + message);

        } catch (Exception e) {
            System.out.println("Error al ejecutar el procedimiento almacenado: " + e.getMessage());
        } finally {
            try {
                if (cstmt != null) {
                    cstmt.close();
                }
                if (conn != null) {
                    conn.close();
                }
            } catch (Exception e) {
                System.err.println("Error al cerrar la conexión: " + e.getMessage());
            }
        }
    }
}
