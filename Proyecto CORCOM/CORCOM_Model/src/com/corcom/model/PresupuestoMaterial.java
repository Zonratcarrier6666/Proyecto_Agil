/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.model;

/**
 *
 * @author XXXXX
 */
public class PresupuestoMaterial {
    private int idPresupuesto;
    private Double totalPresupuesto;
    private String fechaVigencia;
    private int idMaterial;
    private String tipo;
    private String modelo;
    private String marca;
    private String caracteristicas;
    private Double precio;
    private String foto; // Puedes usar otro tipo si prefieres, como String para una URL o Base64
    private int existenciaUsada;
    private Double totalMaterial;

    public PresupuestoMaterial() {
    }

    public PresupuestoMaterial(int idPresupuesto, Double totalPresupuesto, String fechaVigencia, int idMaterial, String tipo, String modelo, String marca, String caracteristicas, Double precio, String foto, int existenciaUsada, Double totalMaterial) {
        this.idPresupuesto = idPresupuesto;
        this.totalPresupuesto = totalPresupuesto;
        this.fechaVigencia = fechaVigencia;
        this.idMaterial = idMaterial;
        this.tipo = tipo;
        this.modelo = modelo;
        this.marca = marca;
        this.caracteristicas = caracteristicas;
        this.precio = precio;
        this.foto = foto;
        this.existenciaUsada = existenciaUsada;
        this.totalMaterial = totalMaterial;
    }

    public int getIdPresupuesto() {
        return idPresupuesto;
    }

    public void setIdPresupuesto(int idPresupuesto) {
        this.idPresupuesto = idPresupuesto;
    }

    public Double getTotalPresupuesto() {
        return totalPresupuesto;
    }

    public void setTotalPresupuesto(Double totalPresupuesto) {
        this.totalPresupuesto = totalPresupuesto;
    }

    public String getFechaVigencia() {
        return fechaVigencia;
    }

    public void setFechaVigencia(String fechaVigencia) {
        this.fechaVigencia = fechaVigencia;
    }

    public int getIdMaterial() {
        return idMaterial;
    }

    public void setIdMaterial(int idMaterial) {
        this.idMaterial = idMaterial;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(String caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public int getExistenciaUsada() {
        return existenciaUsada;
    }

    public void setExistenciaUsada(int existenciaUsada) {
        this.existenciaUsada = existenciaUsada;
    }

    public Double getTotalMaterial() {
        return totalMaterial;
    }

    public void setTotalMaterial(Double totalMaterial) {
        this.totalMaterial = totalMaterial;
    }
    
}




