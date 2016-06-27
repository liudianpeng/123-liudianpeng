var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

function submitForm()
{
    var form = liger.get('form');
    var data = form.getData();
    //data = JSON.stringify(data);
    if (liger.get("min_value").getValue() == null || liger.get("min_value").getValue()== undefined ||liger.get("min_value").getValue()=="") {
        form.showFieldError("min_value","请输入最小值");
        return;
    }else if(liger.get("max_value").getValue() == null || liger.get("max_value").getValue()== undefined ||liger.get("max_value").getValue()==""){
        form.showFieldError("max_value","请输入最大值");
        return;
    }else if (liger.get("default_value").getValue() == null || liger.get("default_value").getValue()== undefined ||liger.get("default_value").getValue()==""){
        form.showFieldError("default_value","请输入默认值");
        return;
    }else if (liger.get("min_value").getValue()>liger.get("max_value").getValue()){
        form.showFieldError("min_value","最小值不能大于最大值");
        form.showFieldError("max_value","最大值不能小于最大值");
        return;
    }
    $.ajax({
        type: 'POST',
        url: '/api/jifenkaohe/jianqukaohexiang/create',
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
        inputWidth: 170, labelWidth: 60, space: 40, newline: true,
        fields: [
            { display: '名称', name: 'name',  type: 'text'  },
            { display: '拼音', name: 'pinyin', type: 'text'  },
            { display: '顺序', name: 'sequence', type: 'digits' },
            { display: '最小值', name: 'min_value', type: 'text'  },
            { display: '最大值', name: 'max_value',  type: 'text'  },
            { display: '默认值', name: 'default_value', type: 'text'  },
            { display: '存档', name: 'archive',type: 'checkbox'}
        ]
    });
});