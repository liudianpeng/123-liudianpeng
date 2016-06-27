var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

function submitForm()
{
    var form = $("#uploaddd").ajaxForm(function(res){
        var form = liger.get('form');
        var data = form.getData();
        data.filePath=res;

        if (liger.get("title").getValue() == "") {
            form.showFieldError("title","标题不能为空");
            return;
        }


//@TODO   文件为空时  上传错误
        $.ajax({
            type: 'POST',
            url: '/api/xitongguanli/wenjianxiazaiguanli/create',
            data: data,
            success: function(res){
                //res = JSON.parse(res);
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
    });
    form.submit();
}

$(function ()
{
    var form = $('#form').ligerForm({
        inputWidth: 170, labelWidth: 60, space: 40,
        fields: [
            { display: '标题', name: 'title',align: 'center',type:'text' },
            { display: '文件内容', name: 'content', align: 'center',type:'textarea' },
            { display: '文件路径', id: 'upload-path',name: 'filePath', align: 'center',type:'hidden' }
        ]
    });
});