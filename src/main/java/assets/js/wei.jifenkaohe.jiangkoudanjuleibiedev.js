var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)
function submitForm()
{
    var dialogData = dialog.get('data');
//把上级目录的id获取出来（就是parentId）
    var Pid=$("input[name='parentId']");
    Pid.val(document.getElementById("tmpParentID").value);
//   alert(Pid.val());
    var form = liger.get('form');
    var data = form.getData();
    //console.log(data)
    var form = liger.get('form');
    var data = form.getData();
    //data = JSON.stringify(data);
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
        inputWidth: 170, labelWidth: 90, space: 40,newline: true,
        fields: [
            { display: '一级目录名称', name: 'parentId',  type: 'hidden'  },
            { display: '奖扣单据类别', name: 'name', type: 'text'  },
            { display: 'code', name: 'code',  type: 'text'  }
        ]
    });

    var id = dialog.frame.parent.getSelectedId();
//        console.log(id);
    $.getJSON("/api/jifenkaohe/jiangkoudanjuleibie/show/"+id, function(res){
        if(res.parent==null){
            //        定义上级地区的名称
            var Noparentname=res.name;
            //console.log(Noparentname);
            document.getElementById("tmpParentName").value=Noparentname;
            var NoparentId=res.id;
            document.getElementById("tmpParentID").value=NoparentId;
        }else{
            //        console.log(res.parent.name);
            //        定义一级目录的名称
            var vparentname=res.parent.name;
            //        定义一级目录的id
            var vparentid=res.parent.id;
            //        将一级目录的id赋值给tmpParentID(此值供以向服务器端提交数据)
            document.getElementById("tmpParentID").value=vparentid;
            //        将一级目录的name赋值给tmpParentName(此值供以在浏览器显示)
            document.getElementById("tmpParentName").value=vparentname;
        }

    });
});
