var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

function submitForm()
{
    var form = liger.get('form');
    var data = form.getData();
    //data = JSON.stringify(data);
    $.ajax({
        type: 'POST',
        url: '/api/xitongguanli/dict/create',
        data: data,
        success: function(res){
//            res = JSON.parse(res);
            if(res.notice=='success'){
                $(".notice_sucess",window.parent.document).addClass("alert-success alert");
                $(".alert",window.parent.document).css("margin","0");
                $(".notice_sucess",window.parent.document).html("保存成功！");
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
        inputWidth: 170, labelWidth: 60, space: 40,
        fields: [
            { display: '字典分类', name: 'namespace', newline: true, type: 'text'},
            { display: '名称', name: 'name', newline: true, type: 'text' },
            { display: '数值', name: 'value', newline: true, type: 'text' },
            { display: '对照编码', name: 'code', newline: true, type: 'text' },
            { display: '显示名称', name: 'display', newline: true, type: 'text' }
        ]
    });
});