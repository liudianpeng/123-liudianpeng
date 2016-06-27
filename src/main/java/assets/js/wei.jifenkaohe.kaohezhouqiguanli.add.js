function submitForm()
{
    var form = liger.get('form');
    var data = form.getData();
    $.ajax({
        type: 'POST',
        url: '/api/jifenkaohe/system/checkingcircle/create',
        data: data,
        success: function(res){
            if(res.notice=='error'){
                $(".notice").html(res.message);
            }else if (res.notice=='success'){
                $(".notice").html('保存成功');
            }
        }
    });
}
$(function ()
{
    $.getJSON("/api/jifenkaohe/system/dict/checkingflow/list",function(flowsData){
        var fdata = [];
        $.each(flowsData,function(id,name){
            fdata.push({"id":id,"name":name});
        });

        var form = $('#form').ligerForm({
            inputWidth: 170, labelWidth: 90, space: 40,

            fields: [
                { display:'考核流程',name:'checkingFlowId',type:'select',comboboxName: "checkingFlowId", options:{data:fdata, valueField:'id',textField:'name'},validate:{required:true }},
                { display: "考核开始日期 ", name: "startDate", newline: true, type: "date" ,
                    validate:{required:true },
                    editor: {format:"yyyy-MM-dd"  }
                },
                { display: '考核周期', name: 'cycle', newline: true, type: 'digits',validate:{required:true } }
            ]
        });
        //初始化值
        $.getJSON("/api/jifenkaohe/system/checkingcircle/add", function(res){
            var newDate=date_riqi(res.startDate,0);
            $("input[name='startDate']").ligerGetDateEditorManager().setValue(newDate);
                form.setData(res);
        });
    });
});