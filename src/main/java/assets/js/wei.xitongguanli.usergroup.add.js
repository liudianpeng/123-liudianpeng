var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

function submitForm()
{
    var form = liger.get('form');
    var data = form.getData();
    //data = JSON.stringify(data);

    if (liger.get("name").getValue() == "") {
        form.showFieldError("name","不能为空");
        return;
    }


    $.ajax({
        type: 'POST',
        url: '/api/xitongguanli/group/create',
        data: data,
        success: function(res){
//            res = JSON.parse(res);
            if(res.notice=='success'){
                $(".notice_sucess",window.parent.document).addClass("alert-success");
                $(".notice_sucess",window.parent.document).addClass("alert");
                $(".notice_sucess",window.parent.document).html("保存成功！");
                window.parent.reload();
                dialog.close();
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
});