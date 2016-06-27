/**
 * Created by hanxuemin on 2015/9/25.
 */
define(["avalon","domReady!","mmRequest"],
    function(avalon){
        var addVm = avalon.define({
            $id: "addRole",
            name:"",
            notice: "",
             //提交数据
             checkAll:function(e){
                 e.preventDefault();
                 var model = JSON.parse(JSON.stringify(addVm.$model));
                 avalon.ajax({
                     type: "POST",
                     data: model,
                     url: "/api/xitongguanli/role/create",
                     success: function(res){
                        if(res.entity.name==""){
                            addVm.name="";
                            addVm.notice="请输入角色名称"
                        }else{
                             avalon.log("提交成功")
                             window.location="/xitongguanli/jueseguanli";
                        }
                     }
                 })
             }
        })
        avalon.scan();
    });





































