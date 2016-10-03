var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)


function submitForm()
{
    var dialogData = dialog.get('data');

    var form = liger.get('form');
    var data = form.getData();
    if (liger.get("title").getValue() == "") {
        form.showFieldError("title","标题不能为空");
        return;
    }


    $.ajax({
        type: 'PUT',
        url: '/api/xitongguanli/notice/update/'+dialogData.id,
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
        inputWidth: 170, labelWidth:60, space: 40,
        fields: [
            { display: '标题', name: 'title', newline: true, type: 'text' },
            { display: '是否发布', name: 'published', newline: true, type: 'checkbox'  },
            { display: '内容', name: 'content', newline: true, type:'textarea' }
        ]
    });

    var dialogData = dialog.get('data');
    $.getJSON("/api/xitongguanli/notice/show/"+dialogData.id, function(res){
        form.setData(res);
        var published=res['published'];
        var publishedCheckbox=$("input[name='published']");
        if(!!published){
            publishedCheckbox.attr("checked",'checked');
            publishedCheckbox.val(1);
        }



    });
});
