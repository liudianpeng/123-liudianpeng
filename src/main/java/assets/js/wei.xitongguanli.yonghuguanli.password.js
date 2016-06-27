var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

function submitForm()
{
    var dialogData = dialog.get('data');

    var form = liger.get('form');
    var data = form.getData();


    if (liger.get("plainPassword").getValue() == "") {
        form.showFieldError("plainPassword","密码不能为空");;
        return;
    }

    if (liger.get("plainPassword").getValue() != liger.get("plainPassword2").getValue()) {

        form.showFieldError("plainPassword","两次输入密码不一样");
        form.showFieldError("plainPassword2","两次输入密码不一样");
        return;
    }


    $.ajax({
        type: 'PUT',
        url: '/api/xitongguanli/member/modpass/'+dialogData.id,
        data: data,
        success: function(res){
//            res = JSON.parse(res);
            if(res.notice=='success'){
                $(".notice_sucess",window.parent.document).addClass("alert-success");
                $(".notice_sucess",window.parent.document).addClass("alert");
                $(".notice_sucess",window.parent.document).html("密码修改成功！");
                window.parent.reload();
                dialog.close();
            }else{
                $('.notice').html(res.message);
            }
        }
    });
}

$(function ()
{
    var form = $('#form').ligerForm({
        inputWidth: 170, labelWidth: 70, space: 40,
        validate: true,
        fields: [

            { display: "新密码", name: "plainPassword", newline: true, type: "password", validate: { required: true, minlength: 6} },
            { display: "重复密码", name: "plainPassword2", newline: true, type: "password", validate: { required: true, minlength: 6} }
        ]
    });
    var res={plainPassword:''};
    form.setData(res);

});
