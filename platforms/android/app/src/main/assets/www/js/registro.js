$(function () {
    var frm = $("#fregister");
    var imagen = null;
    frm.submit(function (e) {
        e.preventDefault();
        if ($(frm).form('is valid')) {
            var form_data = new FormData();
            var valores=frm.serializeObject();
            $.each(valores,function (i,e) {
                form_data.append(i,e);
            });
            if(imagen!==null){
                form_data.append("fichero", imagen);
            }
            $.ajax({
                method: frm.attr("method"),
                data: form_data,
                url: frm.attr("action"),
                processData: false,
                contentType: false,
                success: function (response) {
                    var data_parsed = JSON.parse(response);
                    var parsed_data = JSON.parse(response);
                    if (data_parsed.success == true) {
                        swal({
                            title: parsed_data.data,
                            type: 'success'
                        }).then((result) => {
                            window.location.assign("index.html");
                        });
                    } else {
                        swal({
                            title: parsed_data.error,
                            type: 'error'
                        });
                    }
                }
            });
        }
    });
    $(".send_foto").on("click", function (e) {
        e.preventDefault();
        (async function getImage () {
            const {value: file} = await swal({
                title: 'Select image',
                input: 'file',
                inputAttributes: {
                    'accept': 'image/*',
                    'aria-label': 'Upload your profile picture'
                }
            });
            if (file) {
                imagen=file;
                $(".send_foto").addClass("positive");
            }
        })()
    });
    $(".cancel").on("click", function (e) {
        e.preventDefault();
        swal({
            title: 'Cancelar',
            text: "¿Esta seguro de cancelar el registro?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                window.location.assign("index.html");
            }
        })
    });
    var object = {};
    $.each($(frm).serializeObject(), function (i, e) {
        if(i==="email"){
            object[i] = {identifier: i, rules: [{type: 'email', prompt: 'Error campo ' + transaltefield(i) + ' vacio'}]}
        }else{
            object[i] = {identifier: i, rules: [{type: 'empty', prompt: 'Error campo ' + transaltefield(i) + ' vacio'}]}
        }
    });
    $('.ui.form').form({fields: object});
});
