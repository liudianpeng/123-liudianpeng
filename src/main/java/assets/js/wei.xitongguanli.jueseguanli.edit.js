var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)


function submitForm()
{
    var dialogData = dialog.get('data');

    var form = liger.get('form');
    var data = form.getData();
    if (liger.get("name").getValue() == "") {
        form.showFieldError("name","名称不能为空");
        return;
    }
    $.ajax({
        type: 'PUT',
        url: '/api/xitongguanli/role/update/'+dialogData.id,
        data: data,
        success: function(res){
//            res = JSON.parse(res);
            if(res.notice=='success'){
                $(".notice_sucess",window.parent.document).addClass("alert-success");
                $(".notice_sucess",window.parent.document).addClass("alert");
                $(".notice_sucess",window.parent.document).html("编辑成功！");
                window.parent.reload();
                dialog.close();//关闭dialog
            }else{
                $('.notice').html(res.message);
            }
        }
    });
}

$(function ()
{
    var form = $('#form').ligerForm({
        inputWidth: 140, labelWidth: 60, space: 40,
        fields: [
            { display: '名称', name: 'name', newline: false, type: 'text' }
        ]
    });

    var dialogData = dialog.get('data');
    $.getJSON("/api/xitongguanli/role/show/"+dialogData.id, function(res){
        form.setData(res);
    });
});
