let guardar = () => {

    let datos = localStorage.info==null?[]:JSON.parse(localStorage.info);

    let documento = $("#txtDocumento").val();
    let nombre = $("#txtNombre").val();
    let correo = $("#txtCorreo").val();
    let color = $("#txtColor").val();

    datos.push({
        'documento' : documento,
        'nombre' : nombre,
        'correo' : correo,
        'color' : color
    });

    localStorage.info = JSON.stringify(datos);

    listar();

    alert("Se guardo");
}

let listar = () => {
    let datos = localStorage.info==null?[]:JSON.parse(localStorage.info);
    let tabla = $("#tblDatos");
    tabla.html("");
    datos.forEach(element => {
        tabla.append(`
            <tr>
                <td>${element.documento}</td>
                <td>${element.nombre}</td>
                <td>${element.correo}</td>
                <td style="background-color:${element.color}">${element.color}</td>
                <td>
                    <button class="btn btn-primary" onclick="editar(${element.documento})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminar(${element.documento})">Eliminar</button>
                </td>    
            </tr>
        `);
    });
}

let editar = (doc) => {

    let datos = localStorage.info==null?[]:JSON.parse(localStorage.info);

    let documento = $("#txtDocumento");
    let nombre = $("#txtNombre");
    let correo = $("#txtCorreo");
    let color = $("#txtColor");
    let id = $("#txtId");

    let btnGuardar = $("#btnGuardar");
    let btnModificar = $("#btnModificar");

    let resultado = datos.find(e => e.documento == doc);
    let resultadoIndex = datos.findIndex(e => e.documento == doc);

    if(resultado != undefined){

        btnGuardar.hide();
        btnModificar.show();

        documento.val(resultado.documento);
        nombre.val(resultado.nombre);
        correo.val(resultado.correo);
        color.val(resultado.color);

        id.val(resultadoIndex);
    }else{
        alert("No lo encontro");
    }
}


let modificar = () => {

    let datos = localStorage.info==null?[]:JSON.parse(localStorage.info);

    let documento = $("#txtDocumento").val();
    let nombre = $("#txtNombre").val();
    let correo = $("#txtCorreo").val();
    let color = $("#txtColor").val();
    let id = $("#txtId").val();

    let btnGuardar = $("#btnGuardar");
    let btnModificar = $("#btnModificar");

    datos[id].documento = documento;
    datos[id].nombre = nombre;
    datos[id].correo = correo;
    datos[id].color = color;

    btnGuardar.show();
    btnModificar.hide();

    localStorage.info = JSON.stringify(datos);

    listar();

    alert("Se modifico");
}


let eliminar = (doc) => {

    let datos = localStorage.info==null?[]:JSON.parse(localStorage.info);

    let resultadoIndex = datos.findIndex(e => e.documento == doc);

    if(resultadoIndex != -1){

        datos.splice(resultadoIndex, 1);

        localStorage.info = JSON.stringify(datos);

        listar();
    }else{
        alert("No lo encontro");
    }
}
