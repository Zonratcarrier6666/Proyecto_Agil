/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.model;

/**
 *
 * @author XXXXX
 */
public class Presupuesto {

    int idPresupuesto;
    Proyecto proyecto;
    Material material;
    Inventario inventario;
    String total;

    public Presupuesto() {
    }

    public Presupuesto(int idPresupuesto, Proyecto proyecto, Material material, Inventario inventario, String total) {
        this.idPresupuesto = idPresupuesto;
        this.proyecto = proyecto;
        this.material = material;
        this.inventario = inventario;
        this.total = total;
    }

    public int getIdPresupuesto() {
        return idPresupuesto;
    }

    public void setIdPresupuesto(int idPresupuesto) {
        this.idPresupuesto = idPresupuesto;
    }

    public Proyecto getProyecto() {
        return proyecto;
    }

    public void setProyecto(Proyecto proyecto) {
        this.proyecto = proyecto;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public Inventario getInventario() {
        return inventario;
    }

    public void setInventario(Inventario inventario) {
        this.inventario = inventario;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

}
