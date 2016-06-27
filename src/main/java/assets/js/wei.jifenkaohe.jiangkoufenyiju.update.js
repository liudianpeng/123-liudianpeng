
var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

function submitForm()
{
    var dialogData = dialog.get('data');

    var form = liger.get('form');
    var data = form.getData();
    $.ajax({
        type: 'PUT',
        url: '/api/jifenkaohe/jiangkoufenyiju/update/'+dialogData.id,
        data: data,
        success: function(res){
//            res = JSON.parse(res);
            if(res.notice=='success'){
                window.parent.reload();
                dialog.close();//关闭dialog
            }else{
                form.showFieldError("code","请重新输入编码");
                $('.notice').html(res.message);
            }
        }
    });
}

$(function ()
{
    var form = $('#form').ligerForm({
        inputWidth: 70,
        labelWidth: 80,
        space: 40,newline: true,
        fields: [
            { display: '奖扣分依据', name: 'name',  type: 'text',width:'170' },
            { display: '编码', name: 'code',   align: 'center' }
        ]
    });

    var dialogData = dialog.get('data');
    $.getJSON("/api/jifenkaohe/jiangkoufenyiju/show/"+dialogData.id, function(res){
        form.setData(res);
    });
});
