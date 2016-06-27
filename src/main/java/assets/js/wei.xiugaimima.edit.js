
var form = liger.get('form');
//保存
function submitForm()
{

    var form = liger.get('form');
    var data = form.getData();

        if (liger.get("oldPassword").getValue() == "") {
            form.showFieldError("oldPassword","原密码不能为空");
            return;
        }

        if (liger.get("newPassword1").getValue() == "") {
            form.showFieldError("newPassword1","新密码不能为空");
            return;
        }
        if (liger.get("newPassword1").getValue() != liger.get("newPassword2").getValue()) {

            form.showFieldError("newPassword1","两次输入密码不一样");
            form.showFieldError("newPassword2","两次输入密码不一样");
            return;
        }


    $.ajax({
        type: 'POST',
        url: '/api/xitongguanli/account/password',
        data: data,
        success: function(res){
            //res = JSON.parse(res);
            if(res.notice=='success'){
                alert("密码修改成功");
                window.top.location.reload();
                //window.parent.location.href="/logout";
                //form.close();
            }else{
                $('.notice').html("<div style='color:#f00;' >"+res.message+"</div>");
            }
        }
    });
}


$(function ()
{
    var form = $('#form').ligerForm({
        inputWidth: 170, labelWidth: 100, space: 40,
        fields: [
//            { display: '姓名', name: 'nickname', newline: false, type: 'text' ,width:470 },
            { display: '请输入原密码', name: 'oldPassword', newline: false, type: 'password' ,width:470 },
            { display: '请输入新密码', name: 'newPassword1', newline: false, type: 'password',width:470  },
            { display: '请确认新密码', name: 'newPassword2',type: 'password',width:470 }
        ]
    });

    //var res={newPassword:''};
    //form.setData(res);
//加载数据
//    $.getJSON("/current", function(res){
//        form.setData(res);
//        console.log("res"+res);
//    });
});
