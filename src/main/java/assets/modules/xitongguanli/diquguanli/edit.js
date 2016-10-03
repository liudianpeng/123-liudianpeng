define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest){
    var id = document.getElementById("postId").value;
        var editVm = avalon.define({
            $id: "editArea",
            name:"",
            items:{},
            change: function (e) {
              console.log(e.target.value);
            },
            data: function(){
               var url = "/api/xitongguanli/area/list";
                 return avalon.get(url,[],function(data){
                 var obj=data.items;
                 editVm.items = obj;
               },"json");
            },
            getData:function(e){
              var model = JSON.parse(JSON.stringify(editVm.$model));
              avalon.ajax({
                    type: "GET",
                    data: model,
                    headers:{
                      'Content-Type': 'application/json'
                    },
                    url:"/api/xitongguanli/area/show/"+id,
                    success: function(res){
                        editVm.name=res.name;
                    }
                  })
            },
            editCheck:function(e){
                 e.preventDefault();
                 var model = JSON.stringify(editVm.$model);
                 avalon.ajax({
                    type: "PUT",
                    data: model,
                    headers:{
                      'Content-Type': 'application/json'
                    },
                    url: "/api/xitongguanli/area/update/"+id,
                    success: function(res){
                        console.log("提交成功");
                        window.location="/xitongguanli/diquguanli";
                      }
                 })
              }

        });
        editVm.data();
        editVm.getData();
        avalon.scan();
    });

