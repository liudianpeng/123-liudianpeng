var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)


function submitForm()
{

    var form = $("#uploaddd").ajaxForm(function(res){
        var dialogData = dialog.get('data');
        var form = liger.get('form');
        var data = form.getData();
        data.filePath=res;

        $.ajax({
            type: 'PUT',
            url: '/api/xitongguanli/wenjianxiazaiguanli/update/'+dialogData.id,
            data: data,
            success: function(res){
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
    var dialogData = dialog.get('data');
    $.getJSON("/api/xitongguanli/wenjianxiazaiguanli/show/"+dialogData.id, function(res){
        form.setData(res);
        var published=res['published'];
        var publishedCheckbox=$("input[name='published']");
        if(!!published){
            publishedCheckbox.attr("checked",'checked');
            publishedCheckbox.val(1);
        }



    });
});
