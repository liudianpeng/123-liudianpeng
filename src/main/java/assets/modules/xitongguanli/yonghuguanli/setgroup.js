define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/doublelist/avalon.doublelist"],
    function(avalon,domReady,mmRequest,doublelist){
        var id=document.getElementById("postId").value;
        console.log(id);
        //获取用户组数据
        var data = [];
        avalon.ajax({
            type:"GET",
            url:"/api/xitongguanli/group/list",
            success:function(res){
                var g=[];
                g=res.items;
                for(var i=0;i<g.length;i++){
                    var obj=g[i];
                    data.push({
                        name:obj.name,
                        value:obj.id
                    })
                }
                avalon.vmodels.aa.reset(data);
//                avalon.vmodels.aa.data=data;
//                console.log(avalon.vmodels.aa.data);
            }
        });

        var setgroupVm = avalon.define({
            $id: "setgroup",
            username:"",
            doublelist:{
                data :data,
                select : [],
                onInit:function(vmodel, options, vmodels){
                   avalon.vmodels.aa.reset(data,select);
                },
                //隐藏以选中的项目
                hideSelect: true,
                countLimit: function(select, action, change) {
                   var len = action == "delete" ? select.length - change >= 1 : select.length + change <= 20
                   if(!len) {
                      alert("最少选择一个用户组!" )
                   }
                   return len
                },
                onChange: function(newValue, oldValue, vmodels) {
                    setgroupVm.select=vmodels.select.$model;
                    avalon.vmodels.aa.select = vmodels.select.$model;
                    avalon.log(setgroupVm.select);
                }
            },
            select :[],
           $skipArray : ["doublelist"],
            //获取用户数据
            userData:function(){
                var model=JSON.parse(JSON.stringify(setgroupVm.$model));
                avalon.ajax({
                    type:"GET",
                    data:model,
                    url:"/api/xitongguanli/member/show/"+id,
                    success:function(res){
                        setgroupVm.username=res.username;
                        var obj=[];
                           obj=res.groups;
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
            saveGroup:function(e){
                e.preventDefault();
                var model = JSON.stringify(setgroupVm.$model.select);
                avalon.ajax({
                    type: "POST",
                    data:model,
                    headers:{
                       'Content-Type': 'application/json'
                    },
                    url: "/api/xitongguanli/member/group/maintains/"+id,
                    success:function(res){
//                        console.log(res);
                        console.log('保存成功');
                        window.location="/xitongguanli/yonghuguanli";
                    }
                });
            }
        });
           setgroupVm.select.$watch("length",function(newValue,oldValue){
               setgroupVm.select=newValue+oldValue;
//               console.log(setgroupVm.select);
           });
        setgroupVm.userData();
        avalon.scan();
    });