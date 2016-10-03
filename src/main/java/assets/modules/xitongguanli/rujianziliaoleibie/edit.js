/**
 * Created by hanxuemin on 2015/10/22.
 */

define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest,edit){
        avalon.templateCache.edit = edit;
   var id=document.getElementById("postId").value;
                console.log(id);

        var editVm = avalon.define({
            $id: "editJail",
            name:"",
            //全部数据json
            data:function(e){
                var model = JSON.parse(JSON.stringify(editVm.$model));
                var dataURl="/api/xitongguanli/dict/rujianziliaofenlei/show/"+id+"";
                  console.log(dataURl);
                  avalon.ajax({
                    type: "GET",
                    data: model,
                    url:dataURl,
                    success: function(res){
                    editVm.name=res.name;
                    }
                  })
            },
              editCheck:function(e){
                 e.preventDefault();
                 var model = JSON.parse(JSON.stringify(editVm.$model));
                 avalon.ajax({
                    type: "PUT",
                    data: model,
                    url: "/api/xitongguanli/dict/rujianziliaofenlei/update/"+id+"",
                    success: function(res){
                        res.name=model;
                       console.log("提交成功");
                       window.location="/xitongguanli/rujianziliaoleibie";
                      }
                 })
              }

        });
        editVm.data();
        avalon.scan();
        avalon.vmodels.edit = "edit";
    });

