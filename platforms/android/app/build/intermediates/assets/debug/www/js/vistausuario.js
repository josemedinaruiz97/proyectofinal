var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        $(function () {
            withoutConection();
            $(".btn_primario").on("click",function (e) {
                sessionStorage.removeItem("id_receiver");
                window.location.assign("conversaciones.html");
            });
            var form_data=new FormData();
            form_data.append("id_user",sessionStorage.getItem("id_receiver"));
            getDataUser(form_data);
            uploadPhoto(form_data);

        });
    },
};

app.initialize();
function uploadPhoto(form_data) {
    $(".imagen_usuario").find("img").on("click",function (e) {
        e.preventDefault();
        if(sessionStorage.getItem("id_receiver")===localStorage.getItem("id_user_login")){
            (async function getImage () {
                const {value: file} = await swal({
                    title: 'Seleccione su foto de perfil',
                    input: 'file',
                    inputAttributes: {
                        'accept': 'image/*',
                        'aria-label': 'Suba su foto de perfil'
                    }
                });
                if (file) {
                    form_data.append("fichero",file);
                    $.ajax({
                        url: "https://proyectofinal-josemedinaruiz97.c9users.io/subirFoto.php",
                        method: "post",
                        processData: false,
                        data: form_data,
                        contentType: false,
                        success: function (response) {
                            var parsed_data=JSON.parse(response);
                            if(parsed_data.success==true){
                                swal({
                                    type: 'success',
                                    title: 'La imagen se ha subido correctamente'
                                }).then((result) => {
                                    location.reload();

                                });
                            }else{
                                swal({
                                    type: 'error',
                                    title: 'La imagen no se ha subido correctamente'
                                })
                            }
                        },
                        error:function(){
                            swal({
                                type: 'error',
                                title: 'La imagen no se ha subido correctamente'
                            })
                        }
                    });
                }
            })()
        }
    });
}
function getDataUser(form_data) {
    $.ajax({
        url:"https://proyectofinal-josemedinaruiz97.c9users.io/getDataUser.php",
        method:"post",
        processData: false,
        data: form_data,
        contentType: false,
        success:function (response) {
            var texto="";
            var parsed_data=JSON.parse(response);
            $.each(JSON.parse(parsed_data.data),function(i,e){
                if(i==="img"){
                    $(".imagen_usuario").find("img").attr("src","https://proyectofinal-josemedinaruiz97.c9users.io/fotos_usuario/"+e);
                }else if(i!=="id" && i!=="password"){
                    texto+='<div class="item">\n' +
                        '                    <div class="content">\n' +
                        '                        <a class="header">'+transaltefield(i)+'</a>\n' +
                        '                        <div class="description">'+e+'</div>\n' +
                        '                    </div>\n' +
                        '                </div>';
                }
            });
            $(".ui.relaxed.divided.list").append(texto);
        }
    });
}