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
        $(function() {
            cordova.plugins.notification.local.hasPermission(function(granted){
                if(!granted){
                    cordova.plugins.notification.local.registerPermission(function(granted){});
                }
            });
            withoutConection();
            if(localStorage.getItem("id_user_login")!==undefined && localStorage.getItem("id_user_login")!==null){
                window.location.assign("conversaciones.html");
            }
            var frm = $("#frlogin");
            errorForm(frm);
            logIn(frm);
            signIn();
        });
    },
};

app.initialize();

function errorForm(frm){

    var object={};
    $.each($(frm).serializeObject(),function(i,e){
        if(i==="email"){
            object[i] = {identifier: i, rules: [{type: 'email', prompt: 'Error campo ' + transaltefield(i) + ' vacio'}]}
        }else{
            object[i] = {identifier: i, rules: [{type: 'empty', prompt: 'Error campo ' + transaltefield(i) + ' vacio'}]}
        }
    });
    $(frm).form({fields: object});
}
function logIn(frm) {
    frm.submit(function (e) {
        var form_data = new FormData();
        var valores=frm.serializeObject();
        $.each(valores,function (i,e) {
            if(i=="password"){
                e=$.md5(e);
            }
            form_data.append(i,e);
        });
        e.preventDefault();
        if ($(frm).form('is valid')) {
            $.ajax({
                method: frm.attr("method"),
                data: form_data,
                url: frm.attr("action"),
                processData: false,
                contentType: false,
                success: function (response) {
                    var data_parsed = JSON.parse(response);
                    if (data_parsed.success == true) {
                        localStorage.setItem("id_user_login", atob(data_parsed.data));
                        window.location.assign("conversaciones.html");
                    } else {
                        swal({
                            type: 'error',
                            title: data_parsed.error
                        });
                    }
                }
            });
        }
    });
}
function signIn(){
    $(".sign_in").on("click",function(e){
        e.preventDefault();
        window.location.assign("registro.html");
    });
}
