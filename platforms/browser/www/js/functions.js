function transaltefield(name){
    var array_traduccion={"email":"email","password":"contraseña","phone":"telefono","firstname":"nombre","lastname":"apellidos"};
    return array_traduccion[name];
}
function withoutConection() {
    if(navigator.connection.type==Connection.NONE){
        swal({
            type: 'error',
            title: "No hay conexion a internet"
        });

    }
}