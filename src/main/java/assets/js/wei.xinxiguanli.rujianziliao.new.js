var manager;
    $(function ()
    {
        var id = window.parent.wei.selectedCriminal;
        $("#backRujianziliao").attr("href","/xinxiguanli/rujianziliao/"+id);
        $("#rujianziliao-cid").attr("value",id);
        //console.log("zheshi---"+id);
    });



























//var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)
//
//
//function submitForm()
//{
//    var dialogData = dialog.get('data');//这里还没弄清楚,需要获取id
////    var id = window.parent.wei.selectedCriminal;
//
//    var form = liger.get('form');
//    var data = form.getData();
//    $.ajax({
//        type: 'POST',
//        url: '/api/xinxi/rujianziliao/create/'+dialogData.id,
//        data: data,
//        success: function(res){
//            res = JSON.parse(res);
//            if(res.notice=='success'){
//                window.parent.reload();
//                dialog.close();//关闭dialog
//            }else{
//                $('.notice').html(res.message);
//            }
//        }
//    });
//}
//
//$(function ()
//{
//    var form = $('#form').ligerForm({
//        inputWidth: 170, labelWidth: 90, space: 40,
//        fields: [
//            { display: '选择资料类型', name: 'name', newline: false, type: 'text' ,width:470 },
//            { display: '添加入监文件', name: 'sequence', newline: false, type: '' }
//        ]
//    });
//
//});

