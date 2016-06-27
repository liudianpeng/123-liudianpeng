define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest){
        var id=document.getElementById("postId").value
        var editVm = avalon.define({
            $id: "editQuyu",
            name:"",
            items:{},
            change: function (e) {
              console.log(e.target.value);
            },
            data: function(){
               var url = "/api/xitongguanli/quyu/list";
                 return avalon.get(url,[],function(data){
                 editVm.items = data;
               },"json");
            },
            getData:function(e){
              var model = JSON.parse(JSON.stringify(editVm.$model));
              avalon.ajax({
                    type: "GET",
                    data: model,
                    url:"/api/xitongguanli/quyu/show/"+id,
                    headers:{
                      'Content-Type': 'application/json'
                    },
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
                    url: "/api/xitongguanli/quyu/update/"+id,
                    success: function(res){
                        res.name=model;
                       console.log("提交成功");
                       window.location="/xitongguanli/quyuzidianguanli";
                      }
                 })
              }

        });
        editVm.data();
        editVm.getData();
        avalon.scan();
    });

