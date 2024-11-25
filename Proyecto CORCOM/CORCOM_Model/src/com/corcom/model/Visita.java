/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.model;

/**
 *
 * @author XXXXX
 */
public class Visita {

    int idVisita;
    String estado;
    String ciudad;
    String calle;
    String colonia;
    String fechaHora;
    String idicaciones;
    String Direccion;

    public String getDireccion() {
        return Direccion;
    }

    public void setDireccion(String Direccion) {
        this.Direccion = Direccion;
    }

    public Visita(int idVisita, String estado, String ciudad, String calle, String colonia, String fechaHora, String idicaciones, String Direccion, Proyecto proyecto) {
        this.idVisita = idVisita;
        this.estado = estado;
        this.ciudad = ciudad;
        this.calle = calle;
        this.colonia = colonia;
        this.fechaHora = fechaHora;
        this.idicaciones = idicaciones;
        this.Direccion = Direccion;
        this.proyecto = proyecto;
    }
    Proyecto proyecto;

    public Visita() {
    }

    public Visita(int idVisita, String estado, String ciudad, String calle, String colonia, String fechaHora, String idicaciones, Proyecto proyecto) {
        this.idVisita = idVisita;
        this.estado = estado;
        this.ciudad = ciudad;
        this.calle = calle;
        this.colonia = colonia;
        this.fechaHora = fechaHora;
        this.idicaciones = idicaciones;
        this.proyecto = proyecto;
    }

    public int getIdVisita() {
        return idVisita;
    }

    public void setIdVisita(int idVisita) {
        this.idVisita = idVisita;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getCalle() {
        return calle;
    }

    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getColonia() {
        return colonia;
    }

    public void setColonia(String colonia) {
        this.colonia = colonia;
    }

    public String getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(String fechaHora) {
        this.fechaHora = fechaHora;
    }

    public String getIdicaciones() {
        return idicaciones;
    }

    public void setIdicaciones(String idicaciones) {
        this.idicaciones = idicaciones;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

}
