define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/validation/avalon.validation"],
    function(avalon,domReady,mmRequest,edit,smartgrid){
        avalon.templateCache.edit = edit;
         var id=document.getElementById("postId").value;
             console.log(id);

        var validationVM
            var editVm = avalon.define({
                $id: "edit",
                //password:"",
                username:"",
                email:"",
                nickname:"",
                //mobile:"",
                groups:"",
                $skipArray: ["validation"],
                 checkAll: function() {
                 validationVM && validationVM.validateAll()
                 },
//              全部数据json
               data:function(e){
//                e.preventDefault();
                var model = JSON.parse(JSON.stringify(editVm.$model));
                  var dataURl="/api/xitongguanli/member/show/"+id+"";
                   console.log(dataURl);
                avalon.ajax({
                  type: "GET",
                  data: model,
                  url:dataURl,
                  success: function(res){
//                      model=res;
                    editVm.username=res.username;
                    editVm.email=res.email;
                    editVm.nickname=res.nickname;
                    editVm.groups=res.groups;
                  }
                })
               },
               groups:{},
              //用户组json
               data1: function(){
                   var url = "/api/xitongguanli/group/list";
                   return avalon.get(url,[],function(data){
                       editVm.groups=data.items
                     },"json")
                   },
               editCheck:function(e){
                  e.preventDefault();
                  var model = JSON.parse(JSON.stringify(editVm.$model));
                   avalon.ajax({
                    type: "PUT",
                    data: model,
                    url: "/api/xitongguanli/member/update/"+id,
                    success: function(res){
                       res=model;
                       console.log("提交成功");
                       window.location="/xitongguanli/yonghuguanli";
                     }
                 })
                 }
            });

            editVm.data();
            editVm.data1();
            avalon.scan();
            avalon.vmodels.edit = "edit";
        });