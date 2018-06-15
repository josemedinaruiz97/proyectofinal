$(function() {
    if(sessionStorage.getItem("id_user_login")!==undefined && sessionStorage.getItem("id_user_login")!==null){
        window.location.assign("conversaciones.html");
    }
    var frm = $("#frlogin");
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
                        sessionStorage.setItem("id_user_login", atob(data_parsed.data));
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
    $(".sign_in").on("click",function(e){
        e.preventDefault();
        window.location.assign("registro.html");
    });
    var object={};
    $.each($(frm).serializeObject(),function(i,e){
        if(i==="email"){
            object[i] = {identifier: i, rules: [{type: 'email', prompt: 'Error campo ' + transaltefield(i) + ' vacio'}]}
        }else{
            object[i] = {identifier: i, rules: [{type: 'empty', prompt: 'Error campo ' + transaltefield(i) + ' vacio'}]}
        }
    });
    $('.ui.form').form({fields: object});
});
