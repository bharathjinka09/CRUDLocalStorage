declare var swal : any;
declare var $ : any;

let guardar = () => {

    let datos = localStorage.info==null?[]:JSON.parse(localStorage.info);

    let documento = (<HTMLInputElement>document.querySelector("#txtDocumento")).value;
    let nombre = (<HTMLInputElement>document.querySelector("#txtNombre")).value;
    let correo = (<HTMLInputElement>document.querySelector("#txtCorreo")).value;
    let color = (<HTMLInputElement>document.querySelector("#txtColor")).value;

    datos.push({
        'documento' : documento,
        'nombre' : nombre,
        'correo' : correo,
        'color' : color
    });

    localStorage.info = JSON.stringify(datos);

    listar();

    swal("Good job!", "You clicked the button!", "success");
}

let listar = () => {
    let datos = localStorage.info==null?[]:JSON.parse(localStorage.info);
    let tabla = (<HTMLTableElement>document.querySelector("#tblDatos"));
    tabla.innerHTML = "";
    datos.forEach((element : any) => {
        tabla.innerHTML += `
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
        `;
    });
}

let editar = (doc : any) => {

    let datos = localStorage.info==null?[]:JSON.parse(localStorage.info);

    let documento = (<HTMLInputElement>document.querySelector("#txtDocumento"));
    let nombre = (<HTMLInputElement>document.querySelector("#txtNombre"));
    let correo = (<HTMLInputElement>document.querySelector("#txtCorreo"));
    let color = (<HTMLInputElement>document.querySelector("#txtColor"));
    let id = (<HTMLInputElement>document.querySelector("#txtId"));

    let btnGuardar = (<HTMLButtonElement>document.querySelector("#btnGuardar"));
    let btnModificar = (<HTMLButtonElement>document.querySelector("#btnModificar"));

    let resultado = datos.find((e : any) => e.documento == doc);
    let resultadoIndex = datos.findIndex((e : any) => e.documento == doc);

    if(resultado != undefined){

        btnGuardar.style.display = "none";
        btnModificar.style.display = "block";

        documento.value = resultado.documento;
        nombre.value = resultado.nombre;
        correo.value = resultado.correo;
        color.value = resultado.color;

        id.value = resultadoIndex;
    }else{
        alert("No lo encontro");
    }
}


let modificar = () => {

    let datos = localStorage.info==null?[]:JSON.parse(localStorage.info);

    let documento = (<HTMLInputElement>document.querySelector("#txtDocumento")).value;
    let nombre = (<HTMLInputElement>document.querySelector("#txtNombre")).value;
    let correo = (<HTMLInputElement>document.querySelector("#txtCorreo")).value;
    let color = (<HTMLInputElement>document.querySelector("#txtColor")).value;
    let id = (<HTMLInputElement>document.querySelector("#txtId")).value;

    let btnGuardar = (<HTMLButtonElement>document.querySelector("#btnGuardar"));
    let btnModificar = (<HTMLButtonElement>document.querySelector("#btnModificar"));

    datos[id].documento = documento;
    datos[id].nombre = nombre;
    datos[id].correo = correo;
    datos[id].color = color;

    btnGuardar.style.display = "block";
    btnModificar.style.display = "none";

    localStorage.info = JSON.stringify(datos);

    listar();

    alert("Se modifico");
}


let eliminar = (doc : any) => {

    let datos = localStorage.info==null?[]:JSON.parse(localStorage.info);

    let resultadoIndex = datos.findIndex((e: any) => e.documento == doc);

    if(resultadoIndex != -1){

        datos.splice(resultadoIndex, 1);

        localStorage.info = JSON.stringify(datos);

        listar();
    }else{
        alert("No lo encontro");
    }
}
