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
        e.preventDefault();
        if ($(frm).form('is valid')) {
            $.ajax({
                method: frm.attr("method"),
                data: frm.serialize(),
                url: frm.attr("action"),
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
