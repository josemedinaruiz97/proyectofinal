$(function () {
    var form_data = new FormData();
    form_data.append("id_receiver", localStorage.getItem("id_user_login"));
    var alto_pantalla=$(window).height();
    var alto_header=$(".contenedor_header").height();
    var alto_busqueda=$("#field_search").height();
    $("#frcontact").height(alto_pantalla-alto_busqueda-alto_header-10);
    getUser(form_data);
    $(".btn_primario").on("click", function (e) {
        localStorage.removeItem("id_user_login");
        window.location.assign("index.html");
    });
    $(".btn_secundario").on("click", function (e) {
        sessionStorage.setItem("id_receiver",localStorage.getItem("id_user_login"));
        window.location.assign("vistausuario.html");
    });
    $('.search_user').on('keyup paste', function (e) {
        var busqueda=$(this).val();
        form_data.append("busqueda",busqueda);
        getUser(form_data);
    });
    getNotificaciones(localStorage.getItem("id_user_login"));
});

function getUser(form_data) {
    $.ajax({
        method: "post",
        processData: false,
        data: form_data,
        contentType: false,
        url: "https://proyectofinal-josemedinaruiz97.c9users.io/getUsuarios.php",
        success: function (response) {
            var texto="";
            var parsed_data = JSON.parse(response);
            if (parsed_data.success == true) {
                $.each(JSON.parse(parsed_data.data), function (i, e) {
                    if (e.message !== "") {
                        texto+='<div class="ui card contacto" data-user=' + e.id + '>\n' +
                            '                            <div class="content user">\n' +
                            '                            <div class="image">\n' +
                            '                            <img class="ui avatar user image" src="https://proyectofinal-josemedinaruiz97.c9users.io/fotos_usuario/' + e.img + '">\n' +
                            '                            </div>\n' +
                            '                            <div class="contenido user">\n' +
                            '                            <div class="center aligned header">\n' + e.firstname + ', ' + e.lastname +
                            '                        </div>\n' +
                            '                        <div class="center aligned description">\n' +
                            '                            <p>' + e.message + '</p>\n' +
                            '                        </div>\n' +
                            '                        </div>\n' +
                            '                        <div class="notification">\n' +
                            '                            <a class="ui olive circular label">' + e.num_messages + '</a>\n' +
                            '                        </div>\n' +
                            '                        </div>\n' +
                            '                        </div>';
                    } else {
                        texto+='<div class="ui card contacto" data-user=' + e.id + '>\n' +
                            '                            <div class="content user">\n' +
                            '                            <div class="image">\n' +
                            '                            <img class="ui avatar user image" src="https://proyectofinal-josemedinaruiz97.c9users.io/fotos_usuario/' + e.img + '">\n' +
                            '                            </div>\n' +
                            '                            <div class="contenido user">\n' +
                            '                            <div class="center aligned header">\n' + e.firstname + ', ' + e.lastname +
                            '                        <div class="center aligned description">\n' +
                            '                        </div>\n' +
                            '                        </div>\n' +
                            '                        <div class="notification">\n' +
                            '                        </div>\n' +
                            '                        </div>\n' +
                            '                        </div>\n' +
                            '                        </div>\n' +
                            '                        </div>';
                    }
                });
                $(".contenedor_usuarios").html(texto);
                $(".contacto").on("click", function (e) {
                    var id_user = $(this).data("user");
                    sessionStorage.setItem("id_receiver", id_user);
                    window.location.assign("conversacion.html");
                });
                $(".avatar.user.image").on("click",function (e) {
                    e.stopPropagation();
                    var id_user=$(this).closest(".contacto").data("user");
                    sessionStorage.setItem("id_receiver",id_user);
                    window.location.assign("vistausuario.html");

                });
            } else {
                texto+='<div class="ui card contacto">\n' +
                    '                            <div class="content user">\n' +
                    '                            <div class="contenido user">\n' +
                    '                            <div class="center aligned header">' +
                    '                            No hay ningun usuario              ' +
                    '                        </div>\n' +
                    '                        </div>\n' +
                    '                        </div>\n' +
                    '                        </div>';
                $(".contenedor_usuarios").html(texto);
            }
        }
    });
}
function getNotificaciones(id_user){
    var form_data = new FormData();
    form_data.append("id_receiver", id_user);
    $.ajax({
        url:"https://proyectofinal-josemedinaruiz97.c9users.io/getNotificaciones.php",
        method:"post",
        processData: false,
        data: form_data,
        contentType: false,
        success:function (response) {
            var texto="";
            var parsed_data=JSON.parse(response);
            if(parsed_data.success===true){
                $.each(JSON.parse(parsed_data.data),function (i,e) {
                    if($(".contacto[data-user='"+e.id+"']").length!=0){
                        $(".contacto[data-user='"+e.id+"']").find(".notification").html('<a class="ui olive circular label">' + e.num_messages + '</a>');
                        $(".contacto[data-user='"+e.id+"']").find(".description").html('<p>' + e.message + '</p>')
                    }else{
                        texto+='<div class="ui card contacto" data-user=' + e.id + '>\n' +
                            '                            <div class="content user">\n' +
                            '                            <div class="image">\n' +
                            '                            <img class="ui avatar user image" src="https://proyectofinal-josemedinaruiz97.c9users.io/fotos_usuario/' + e.img + '">\n' +
                            '                            </div>\n' +
                            '                            <div class="contenido user">\n' +
                            '                            <div class="center aligned header">\n' + e.firstname + ', ' + e.lastname +
                            '                        </div>\n' +
                            '                        <div class="center aligned description">\n' +
                            '                            <p>' + e.message + '</p>\n' +
                            '                        </div>\n' +
                            '                        </div>\n' +
                            '                        <div class="notification">\n' +
                            '                            <a class="ui olive circular label">' + e.num_messages + '</a>\n' +
                            '                        </div>\n' +
                            '                        </div>\n' +
                            '                        </div>';
                    }

                });
                $(".contacto").append(texto);
            }
            interval=setTimeout(getNotificaciones(id_user),5000);
        }
    });
}
