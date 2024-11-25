/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.bd;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 *
 * @author XXXXX
 */
public class ConexionMySQL {
    public Connection open() throws Exception {

        String user = "root";
        String password = "2004";

        String url = "jdbc:mysql://127.0.0.1:3306/CORCOM?"
                + "useSSL=false&"
                + "allowPublicKeyRetrieval=true&"
                + "useUnicode=true&"
                + "characterEncoding=utf-8";

        Connection conn = null;

        // Primero registramos el Driver JDBC de MySQL:
        Class.forName("com.mysql.cj.jdbc.Driver");

        // Abrimos una conexion con MySQL:
        conn = DriverManager.getConnection(url, user, password);

        return conn;
    }
}
