/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.corcom.model;

/**
 *
 * @author XXXXX
 */
public class Empresa {
    int idEmpresa;
    String nombreEmpresa;
    String direccionEmpresa;
    String estado;
    String ciudad;
    String correoElectronico;
    String tipoEmpresa;
    String telefonoEmpresa;
    String numeroIdentificacionFiscal;
    String nombreRepresentante;
    String telefonoContactoDirecto;
    String correoElectronicoPersonal;
    String cargo;
    String horarioContacto;
    String notas;

    public Empresa() {
    }

    public Empresa(int idEmpresa, String nombreEmpresa, String direccionEmpresa, String estado, String ciudad, String correoElectronico, String tipoEmpresa, String telefonoEmpresa, String numeroIdentificacionFiscal, String nombreRepresentante, String telefonoContactoDirecto, String correoElectronicoPersonal, String cargo, String horarioContacto, String notas) {
        this.idEmpresa = idEmpresa;
        this.nombreEmpresa = nombreEmpresa;
        this.direccionEmpresa = direccionEmpresa;
        this.estado = estado;
        this.ciudad = ciudad;
        this.correoElectronico = correoElectronico;
        this.tipoEmpresa = tipoEmpresa;
        this.telefonoEmpresa = telefonoEmpresa;
        this.numeroIdentificacionFiscal = numeroIdentificacionFiscal;
        this.nombreRepresentante = nombreRepresentante;
        this.telefonoContactoDirecto = telefonoContactoDirecto;
        this.correoElectronicoPersonal = correoElectronicoPersonal;
        this.cargo = cargo;
        this.horarioContacto = horarioContacto;
        this.notas = notas;
    }

    public int getIdEmpresa() {
        return idEmpresa;
    }

    public void setIdEmpresa(int idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    public String getNombreEmpresa() {
        return nombreEmpresa;
    }

    public void setNombreEmpresa(String nombreEmpresa) {
        this.nombreEmpresa = nombreEmpresa;
    }

    public String getDireccionEmpresa() {
        return direccionEmpresa;
    }

    public void setDireccionEmpresa(String direccionEmpresa) {
        this.direccionEmpresa = direccionEmpresa;
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

    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getTipoEmpresa() {
        return tipoEmpresa;
    }

    public void setTipoEmpresa(String tipoEmpresa) {
        this.tipoEmpresa = tipoEmpresa;
    }

    public String getTelefonoEmpresa() {
        return telefonoEmpresa;
    }

    public void setTelefonoEmpresa(String telefonoEmpresa) {
        this.telefonoEmpresa = telefonoEmpresa;
    }

    public String getNumeroIdentificacionFiscal() {
        return numeroIdentificacionFiscal;
    }

    public void setNumeroIdentificacionFiscal(String numeroIdentificacionFiscal) {
        this.numeroIdentificacionFiscal = numeroIdentificacionFiscal;
    }

    public String getNombreRepresentante() {
        return nombreRepresentante;
    }

    public void setNombreRepresentante(String nombreRepresentante) {
        this.nombreRepresentante = nombreRepresentante;
    }

    public String getTelefonoContactoDirecto() {
        return telefonoContactoDirecto;
    }

    public void setTelefonoContactoDirecto(String telefonoContactoDirecto) {
        this.telefonoContactoDirecto = telefonoContactoDirecto;
    }

    public String getCorreoElectronicoPersonal() {
        return correoElectronicoPersonal;
    }

    public void setCorreoElectronicoPersonal(String correoElectronicoPersonal) {
        this.correoElectronicoPersonal = correoElectronicoPersonal;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getHorarioContacto() {
        return horarioContacto;
    }

    public void setHorarioContacto(String horarioContacto) {
        this.horarioContacto = horarioContacto;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }
    
}
