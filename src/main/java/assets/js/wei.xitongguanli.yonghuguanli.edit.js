var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

function submitForm()
{
    var dialogData = dialog.get('data');

    var form = liger.get('form');
    var data = form.getData();
    if (liger.get("username").getValue() == "" || liger.get("nickname").getValue() == "" || liger.get("email").getValue() == "") {
        form.showFieldError("username","用户名不能为空");
        form.showFieldError("nickname","姓名不能为空");
        form.showFieldError("email","邮箱不能为空");
        return;
    }
    $.ajax({
        type:'PUT',
        url:'/api/xitongguanli/member/update/'+dialogData.id,
        data:data,
        success:function(res){
            if (res.notice=='success'){
                $(".notice_sucess",window.parent.document).addClass("alert-success");
                $(".notice_sucess",window.parent.document).addClass("alert");
                $(".notice_sucess",window.parent.document).html("编辑成功！");
                    window.parent.reload();
                    dialog.close();
            }else {
                $('.notice').html(res.message);
            }
        }
    })
}

$(function ()
{
    var form = $('#form').ligerForm({
        inputWidth: 170, labelWidth: 60, space: 40,
        fields: [
            { display: '用户名', name: 'username', newline: true, type: 'text'},
            { display: '姓名', name: 'nickname', newline: true, type: 'text'},
            { display: '密码', name: 'plainPassword', newline: true, type: 'password'},
            { display: '手机号', name: 'mobile',newline: true,type: 'text'},
            { display: '邮箱', name: 'email',newline: true,type: 'text'}
        ]
    });

    var dialogData = dialog.get('data');
    $.getJSON("/api/xitongguanli/member/showupdata/"+dialogData.id, function(res){
        form.setData(res);
    });
});
