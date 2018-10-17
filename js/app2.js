"use strict";
var guardar = function () {
    var datos = localStorage.info == null ? [] : JSON.parse(localStorage.info);
    var documento = document.querySelector("#txtDocumento").value;
    var nombre = document.querySelector("#txtNombre").value;
    var correo = document.querySelector("#txtCorreo").value;
    var color = document.querySelector("#txtColor").value;
    datos.push({
        'documento': documento,
        'nombre': nombre,
        'correo': correo,
        'color': color
    });
    localStorage.info = JSON.stringify(datos);
    listar();
    swal("Good job!", "You clicked the button!", "success");
};
var listar = function () {
    var datos = localStorage.info == null ? [] : JSON.parse(localStorage.info);
    var tabla = document.querySelector("#tblDatos");
    tabla.innerHTML = "";
    datos.forEach(function (element) {
        tabla.innerHTML += "\n            <tr>\n                <td>" + element.documento + "</td>\n                <td>" + element.nombre + "</td>\n                <td>" + element.correo + "</td>\n                <td style=\"background-color:" + element.color + "\">" + element.color + "</td>\n                <td>\n                    <button class=\"btn btn-primary\" onclick=\"editar(" + element.documento + ")\">Editar</button>\n                    <button class=\"btn btn-danger\" onclick=\"eliminar(" + element.documento + ")\">Eliminar</button>\n                </td>    \n            </tr>\n        ";
    });
};
var editar = function (doc) {
    var datos = localStorage.info == null ? [] : JSON.parse(localStorage.info);
    var documento = document.querySelector("#txtDocumento");
    var nombre = document.querySelector("#txtNombre");
    var correo = document.querySelector("#txtCorreo");
    var color = document.querySelector("#txtColor");
    var id = document.querySelector("#txtId");
    var btnGuardar = document.querySelector("#btnGuardar");
    var btnModificar = document.querySelector("#btnModificar");
    var resultado = datos.find(function (e) { return e.documento == doc; });
    var resultadoIndex = datos.findIndex(function (e) { return e.documento == doc; });
    if (resultado != undefined) {
        btnGuardar.style.display = "none";
        btnModificar.style.display = "block";
        documento.value = resultado.documento;
        nombre.value = resultado.nombre;
        correo.value = resultado.correo;
        color.value = resultado.color;
        id.value = resultadoIndex;
    }
    else {
        alert("No lo encontro");
    }
};
var modificar = function () {
    var datos = localStorage.info == null ? [] : JSON.parse(localStorage.info);
    var documento = document.querySelector("#txtDocumento").value;
    var nombre = document.querySelector("#txtNombre").value;
    var correo = document.querySelector("#txtCorreo").value;
    var color = document.querySelector("#txtColor").value;
    var id = document.querySelector("#txtId").value;
    var btnGuardar = document.querySelector("#btnGuardar");
    var btnModificar = document.querySelector("#btnModificar");
    datos[id].documento = documento;
    datos[id].nombre = nombre;
    datos[id].correo = correo;
    datos[id].color = color;
    btnGuardar.style.display = "block";
    btnModificar.style.display = "none";
    localStorage.info = JSON.stringify(datos);
    listar();
    alert("Se modifico");
};
var eliminar = function (doc) {
    var datos = localStorage.info == null ? [] : JSON.parse(localStorage.info);
    var resultadoIndex = datos.findIndex(function (e) { return e.documento == doc; });
    if (resultadoIndex != -1) {
        datos.splice(resultadoIndex, 1);
        localStorage.info = JSON.stringify(datos);
        listar();
    }
    else {
        alert("No lo encontro");
    }
};
