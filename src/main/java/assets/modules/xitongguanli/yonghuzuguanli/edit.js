define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/doublelist/avalon.doublelist"],
    function(avalon){
         var id=document.getElementById("postId").value;
                     console.log(id);
            var editVm = avalon.define({
                $id: "edit",
                name:"",
               data:function(){
                  var model=JSON.parse(JSON.stringify(editVm.$model));
                  avalon.ajax({
                     type:"GET",
                     data:model,
                     url:"/api/xitongguanli/group/show/"+id,
                     success:function(res){
                       editVm.name=res.name;
                     }
                  })
               },
               checkAll:function(e){
                  e.preventDefault();
                  var model=JSON.parse(JSON.stringify(editVm.$model));
                  avalon.ajax({
                    type:"PUT",
                    data:model,
                    url:"/api/xitongguanli/group/update/"+id,
                    success:function(res){
                       console.log("提交成功");
                       window.location="/xitongguanli/yonghuzuguanli";
                    }
                  })
               }
            });
        editVm.data();
        avalon.scan();
        });