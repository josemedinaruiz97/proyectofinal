$(function () {
    var interval=null;
    var id_user=localStorage.getItem("id_user_login");
    var id_sender=sessionStorage.getItem("id_receiver");
    getFoto(id_sender);
    var frm_message=$("#frm_message");
    $("#send_message").on("click",function (e) {
        e.preventDefault();
        var message=$(".input_message").val();
        $(".input_message").val("");
        $.ajax({
            url:"https://proyectofinal-josemedinaruiz97.c9users.io/sendMessage.php",
            method:"post",
            data:{data:JSON.stringify({id_user:id_user,id_user_conver:id_sender,message:message})},
            success:function (response) {
                var parsed_data=JSON.parse(response);
                var datos=JSON.parse(parsed_data.data);
                $(".content_message").append('<div class="container_chat darker">\n' +
                    '                    <img src="https://proyectofinal-josemedinaruiz97.c9users.io/fotos_usuario/'+datos.img+'" alt="Avatar" class="right" style="width:100%;">\n' +
                    '                    <p>'+message+'</p>\n' +
                    '                    <span class="time-left">'+moment().format("HH:mm")+'</span>\n' +
                    '                </div>');
                $(".content_message").animate({ scrollTop: $('.content_message')[0].scrollHeight}, 1000);
            }
        });
    });
    $(".btn_primario").on("click",function (e) {
        sessionStorage.removeItem("id_receiver");
        window.location.assign("conversaciones.html");
    });
    $.ajax({
        url:"https://proyectofinal-josemedinaruiz97.c9users.io/getAllMessages.php",
        method:"post",
        data:{data:JSON.stringify({id_user:id_user,id_user_conver:id_sender})},
        success:function (response) {
            var parsed_data=JSON.parse(response);
            if(parsed_data.success===true){
                $.each(JSON.parse(parsed_data.data),function (i,e) {
                    var mt=moment(e.time_created,"X");
                    console.log(e.id_sender);
                    console.log(id_user);
                    if(e.id_sender==id_user){
                        $(".content_message").append('<div class="container_chat darker">\n' +
                            '                    <img src="https://proyectofinal-josemedinaruiz97.c9users.io/fotos_usuario/'+e.img+'" alt="Avatar" class="right" style="width:100%;">\n' +
                            '                    <p>'+e.message+'</p>\n' +
                            '                    <span class="time-left">'+mt.format('DD-mm-YYYY HH:mm')+'</span>\n' +
                            '                </div>');
                    }else{
                        $(".content_message").append('<div class="container_chat">\n' +
                            '                    <img src="https://proyectofinal-josemedinaruiz97.c9users.io/fotos_usuario/'+e.img+'" alt="Avatar" style="width:100%;">\n' +
                            '                    <p>'+e.message+'</p>\n' +
                            '                    <span class="time-right">'+mt.format('DD-mm-YYYY HH:mm')+'</span>\n' +
                            '                </div>');
                    }
                });
            }
            var alto_pantalla=$(window).height();
            var alto_input=$(".content_input").height();
            var alto_header=$(".header").height();
            $(".content_message").height(alto_pantalla-alto_input-alto_header-15);
            $("input").on("click",function (e) {
                Keyboard.show();
                alert("entra");
                alto_pantalla=$(window).height();
                alto_input=$(".content_input").height();
                alto_header=$(".header").height();
                var alto_teclado=NativeKeyboard.height();
                alert(alto_teclado);
                $(".content_message").height(alto_pantalla-alto_teclado-alto_input-alto_header-15);
            })
            $(".content_message").animate({ scrollTop: $('.content_message')[0].scrollHeight}, 1000);
        }

    });
    getMessages(id_user,id_sender);
    $(".content_message").on("click",function (e) {
        $("input").blur();
    });

});
function getMessages(id_user,id_sender){
    $.ajax({
        url:"https://proyectofinal-josemedinaruiz97.c9users.io/getMessages.php",
        method:"post",
        data:{data:JSON.stringify({id_user:id_user,id_user_conver:id_sender})},
        success:function (response) {
            var parsed_data=JSON.parse(response);
            if(parsed_data.success===true){
                $.each(JSON.parse(parsed_data.data),function (i,e) {
                    var mt=moment(e.time_created,"X");
                    $(".content_message").append('<div class="container_chat">\n' +
                        '                    <img src="https://proyectofinal-josemedinaruiz97.c9users.io/fotos_usuario/'+e.img+'" alt="Avatar" style="width:100%;">\n' +
                        '                    <p>'+e.message+'</p>\n' +
                        '                    <span class="time-right">'+mt.format('DD-mm-YYYY HH:mm')+'</span>\n' +
                        '                </div>');
                });
                /*var posicion_boton = $(".container_chat").last().position();
                $(".content_message").animate({scrollTop:posicion_boton+"px"});*/
                $(".content_message").animate({ scrollTop: $('.content_message')[0].scrollHeight}, 1000);
            }
            interval=setTimeout(getMessages(id_user,id_sender),5000);
        }
    });
}
function getFoto(id_sender) {
    var nombre="";
    var foto="";
    var form_data=new FormData();
    form_data.append("id_user",id_sender);
    $.ajax({
        url:"https://proyectofinal-josemedinaruiz97.c9users.io/getDataUser.php",
        method:"post",
        processData: false,
        data: form_data,
        contentType: false,
        success:function (response) {
            var parsed_data=JSON.parse(response);
            var datos=JSON.parse(parsed_data.data);
            nombre=datos.firstname;
            foto=datos.img;
            $(".avatar.image").attr("src","https://proyectofinal-josemedinaruiz97.c9users.io/fotos_usuario/"+foto);
            $(".header.img").append(nombre);
        }
    });
}