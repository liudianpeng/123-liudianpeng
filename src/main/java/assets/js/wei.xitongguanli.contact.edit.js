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
        url: '/api/xitongguanli/contact/update/'+dialogData.id,
        data: data,
        success: function(res){
//            res = JSON.parse(res);
            if(res.notice=='success'){
                $(".notice_sucess",window.parent.document).addClass("alert-success alert");
                $(".alert",window.parent.document).css("margin","0");
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
            { display: '名称', name: 'name', newline: true, type: 'text' },
            { display: '手机', name: 'mobile', newline: true, type: 'text' },
            { display: '电话', name: 'phone', newline: true, type: 'text' },
            { display: '备注', name: 'remark', newline: true, type: 'text' }
        ]
    });

    var dialogData = dialog.get('data');
    $.getJSON("/api/xitongguanli/contact/show/"+dialogData.id, function(res){
        form.setData(res);
    });
});
