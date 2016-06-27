var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

function submitForm()
{
    var form = liger.get('form');
    var data = form.getData();
    //data = JSON.stringify(data);
    //console.log(data);
    $.ajax({
        type: 'POST',
        url: '/api/jifenkaohe/jiangkoudanjuleibie/create',
        data: data,
        success: function(res){
//            res = JSON.parse(res);
            if(res.notice=='success'){
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
        inputWidth: 170, labelWidth: 90, space: 40, newline: true,
        fields: [
            { display: '奖扣单据类别', name: 'name', type: 'text' ,width:170 },
            { display: 'code', name: 'code',  type: 'text' ,width:170 }
        ]
    });
});