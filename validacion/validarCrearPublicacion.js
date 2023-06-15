export default function validarCrearCuenta(valores) {

    let errores = {};

    // Validar el nombre del usuario
    if(!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio";
    }

    // validar empresa
    if(!valores.empresa) {
        errores.empresa = "Nombre de Empresa es obligatorio";
    }


    // validar la URL
    if(!valores.url) {
        errores.url = 'La URL de la publicación es obligatorio';
    } else if( !/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url) ) {
        errores.url = "URL mal formateada o no Válida";
    }

    //Validar descripción
    if(!valores.descripcion) {
        errores.descripcion = 'Agrega una descripcion de la publicación';
    }


    return errores;
}