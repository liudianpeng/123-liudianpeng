define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/doublelist/avalon.doublelist"],
    function(avalon){
         var id=document.getElementById("postId").value;
             console.log(id);
            //获取角色数据
            var data = [];
            avalon.ajax({
               type:"GET",
               url:"/api/xitongguanli/role/list",
               success:function(res){
               var g=[];
               g=res.items;
               for(var i=0;i<g.length;i++){
                  var obj=g[i];
                  data.push({
                    name:obj.name,
                    value:obj.id
                  })
               };
               avalon.vmodels.aa.reset(data);
//               avalon.vmodels.aa.data=data;
               console.log(data);
//               avalon.vmodels.aa.render();
               }
            });

            var setroleVm = avalon.define({
                $id: "setrole",
                name:"",
                select:[],
                doublelist:{
                   data:data,
                   select:[],
                   hideSelect: true,
                   onChange:function(newValue,oldValue,vmodels){
                       setroleVm.select=vmodels.select;

                       avalon.log(setroleVm.select)
                   }
                },
                $skipArray:["doublelist"],

                //获取用户组数据
                userData:function(){
                var model=JSON.parse(JSON.stringify(setroleVm.$model));
                avalon.ajax({
                   type:"GET",
                   data:model,
                   url:"/api/xitongguanli/group/show/"+id,
                   success:function(res){
                      setroleVm.name=res.name;
                        var obj=[];
                           obj=res.roles;
                           var id_select = [];
                           for(var i = 0; i<obj.length;i++){
                                id_select.push(
                                   obj[i].id
                                )
                           };
                           avalon.vmodels.aa.select = id_select;
                            console.log(avalon.vmodels.aa.select);
                            avalon.vmodels.aa.reset(data,select);
                   }
                })
            },
                saveRole:function(e){
                   e.preventDefault();
                   avalon.log(setroleVm.$model.select);
                   var  model = JSON.stringify(setroleVm.$model.select);
                   avalon.log(model);
                   avalon.ajax({
                      type:"POST",
                      data:model,
                      url:"/api/xitongguanli/group/role/maintains/"+id,
                      headers:{
                          'Content-Type': 'Application/json'
                      },
                      success:function(res){
                         console.log(res);
                         console.log("提交成功");
                         window.location="/xitongguanli/yonghuzuguanli";
                   }
               })
            }
            });
        setroleVm.select.$watch("length",function(newValue,oldValue){
               setroleVm.select=newValue+oldValue;
//               console.log(setroleVm.select);
           });
            setroleVm.userData();
            avalon.scan();
        });