var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)


function submitForm()
{
    var dialogData = dialog.get('data');

    var form = liger.get('form');
    var data = form.getData();
    $.ajax({
        type: 'PUT',
        url: '/api/xitongguanli/dict/update/'+dialogData.id,
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
        inputWidth: 170, labelWidth: 60, space: 40, newline: true,
        fields: [
            { display: '字典分类', name: 'namespace',type: 'text'},
            { display: '名称', name: 'name',  type: 'text' },
            { display: '数值', name: 'value', type: 'text' },
            { display: '对照编码', name: 'code', type: 'text' },
            { display: '显示名称', name: 'display', type: 'text' }
        ]
    });

    var dialogData = dialog.get('data');
    $.getJSON("/api/xitongguanli/dict/show/"+dialogData.id, function(res){
        form.setData(res);
    });
});
