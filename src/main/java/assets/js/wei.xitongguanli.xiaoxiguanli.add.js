var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

function submitForm()
{
    var form = liger.get('form');
    var data = form.getData();
    //data = JSON.stringify(data);
    if (liger.get("title").getValue() == "") {
        form.showFieldError("title","标题不能为空");
        return;
    }

    //if (liger.get("content").getValue() == "") {
    //    form.showFieldError("content","内容不能为空");
    //    return;
    //}


    $.ajax({
        type: 'POST',
        url: '/api/xitongguanli/notice/create',
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
        inputWidth: 170, labelWidth:40, space: 40,
        fields: [
            { display: '标题', name: 'title', newline: true, type: 'text' },
            { display: '内容', name: 'content', newline: true, type:'textarea' }
        ]
    });
});