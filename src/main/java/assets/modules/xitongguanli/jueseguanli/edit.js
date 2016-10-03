/**
 * Created by hanxuemin on 2015/9/25.
 */
define(["avalon","domReady!","mmRequest"],
    function(avalon){
          var id=document.getElementById("postId").value;
          console.log(id);
        var editVm = avalon.define({
            $id: "editRole",
            name : "",
            notice:"",
            getData:function(){
               var model = JSON.parse(JSON.stringify(editVm.$model));
               avalon.ajax({
                   type:"GET",
                   data:model,
                   url:"/api/xitongguanli/role/show/"+id,
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
                  url:"/api/xitongguanli/role/update/"+id,
                  success:function(res){
                        if(res.entity.name==""){
                            editVm.name="";
                            editVm.notice="请输入角色名称";
                        }else{
                             avalon.log("提交成功");
                             window.location="/xitongguanli/jueseguanli";
                        }
                  }
               })
            }
        });
        editVm.getData();
        avalon.scan();
    });





































