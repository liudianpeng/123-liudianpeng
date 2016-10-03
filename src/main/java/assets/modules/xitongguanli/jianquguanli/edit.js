/**
 * Created by hanxuemin on 2015/10/22.
 */
define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest){
   var id=document.getElementById("postId").value;
                console.log(id);
        var editVm = avalon.define({
            $id: "editJail",
            name:"",
            items:{},
            data: function(){
               var url = "/api/xitongguanli/jianqu/list";
                 return avalon.get(url,[],function(data){
                 editVm.items = data;
               },"json");
            },
            change:function(e){
                console.log(e.target.value);
            },
            //全部数据json
            getData:function(e){
              var model = JSON.parse(JSON.stringify(editVm.$model));
              avalon.ajax({
                    type: "GET",
                    data: model,
                    url:"/api/xitongguanli/jianqu/show/"+id+"",
                    success: function(res){
                    var obj=res.itmes;
                    editVm.name=obj[0].jianqu.name;
                    console.log(editVm.name);
                    }
                  })
            },
            editCheck:function(e){
                 e.preventDefault();
                 var model = JSON.parse(JSON.stringify(editVm.$model));
                 avalon.ajax({
                    type: "PUT",
                    data: model,
                    url: "/api/xitongguanli/jianqu/update/"+id+"",
                    success: function(res){
                        res.name=model;
                       console.log("提交成功");
                       window.location="/xitongguanli/jianquguanli";
                      }
                 })
              }

        });
        editVm.data();
        editVm.getData();
        avalon.scan();
    });

