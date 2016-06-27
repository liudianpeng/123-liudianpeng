/**
 * Created by hanxuemin on 2015/9/25.
 */
define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/textbox/avalon.textbox"],
    function(avalon){
    var id=document.getElementById("postId").value;
        console.log(id);
        var editVm = avalon.define({
            $id: "editDict",
            namespace:"",
            name:"",
            value:"",
            code:"",
            display:"",
            getData:function(){
              var model=JSON.stringify(editVm.$model);
              avalon.ajax({
                 type:"GET",
                 data:model,
                 url:"/api/xitongguanli/dict/show/"+id,
                 success:function(res){
                     editVm.namespace=res.namespace;
                     editVm.name=res.name;
                     editVm.value=res.value;
                     editVm.code=res.code;
                     editVm.display=res.display;
                 }
              })
            },
            checkAll:function(e){
              e.preventDefault();
              var model=JSON.parse(JSON.stringify(editVm.$model));
              avalon.ajax({
                type:"PUT",
                data:model,
                url:"/api/xitongguanli/dict/update/"+id,
                success:function(res){
                  console.log("提交成功");
                  window.location="/xitongguanli/tongyongzidianguanli";
                 }
              })
            }

        });
        editVm.getData();
        avalon.scan();
    });





































