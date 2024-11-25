/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.model;

/**
 *
 * @author XXXXX
 */
public class Proyecto {
    int idProyecto;
    String problema;
    String nombreProyecto;
    String descripcion;
    String planosAquitectonicos;
    String planosIC;
    String fotos;
    String videos;
    String estatus;
    String soluciones;

    public String getSoluciones() {
        return soluciones;
    }

    public void setSoluciones(String soluciones) {
        this.soluciones = soluciones;
    }

    public Proyecto(int idProyecto, String problema, String nombreProyecto, String descripcion, String planosAquitectonicos, String planosIC, String fotos, String videos, String estatus, String soluciones, Empresa empresa, Visita visita) {
        this.idProyecto = idProyecto;
        this.problema = problema;
        this.nombreProyecto = nombreProyecto;
        this.descripcion = descripcion;
        this.planosAquitectonicos = planosAquitectonicos;
        this.planosIC = planosIC;
        this.fotos = fotos;
        this.videos = videos;
        this.estatus = estatus;
        this.soluciones = soluciones;
        this.empresa = empresa;
        this.visita = visita;
    }
    Empresa empresa;
    Visita visita;

    public Visita getVisita() {
        return visita;
    }

    public void setVisita(Visita visita) {
        this.visita = visita;
    }


    public Proyecto() {
    }

    public Proyecto(int idProyecto, String problema, String nombreProyecto, String descripcion, String planosAquitectonicos, String planosIC, String fotos, String videos, String estatus, Empresa empresa) {
        this.idProyecto = idProyecto;
        this.problema = problema;
        this.nombreProyecto = nombreProyecto;
        this.descripcion = descripcion;
        this.planosAquitectonicos = planosAquitectonicos;
        this.planosIC = planosIC;
        this.fotos = fotos;
        this.videos = videos;
        this.estatus = estatus;
        this.empresa = empresa;
    }

    public int getIdProyecto() {
        return idProyecto;
    }

    public void setIdProyecto(int idProyecto) {
        this.idProyecto = idProyecto;
    }

    public String getProblema() {
        return problema;
    }

    public void setProblema(String problema) {
        this.problema = problema;
    }

    public String getNombreProyecto() {
        return nombreProyecto;
    }

    public void setNombreProyecto(String nombreProyecto) {
        this.nombreProyecto = nombreProyecto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getPlanosAquitectonicos() {
        return planosAquitectonicos;
    }

    public void setPlanosAquitectonicos(String planosAquitectonicos) {
        this.planosAquitectonicos = planosAquitectonicos;
    }

    public String getPlanosIC() {
        return planosIC;
    }

    public void setPlanosIC(String planosIC) {
        this.planosIC = planosIC;
    }

    public String getFotos() {
        return fotos;
    }

    public void setFotos(String fotos) {
        this.fotos = fotos;
    }

    public String getVideos() {
        return videos;
    }

    public void setVideos(String videos) {
        this.videos = videos;
    }

    public String getEstatus() {
        return estatus;
    }

    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    public Empresa getEmpresa() {
        return empresa;
    }

    public void setEmpresa(Empresa empresa) {
        this.empresa = empresa;
    }
    
}
