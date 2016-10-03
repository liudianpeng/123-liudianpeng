/**
 * Created by hanxuemin on 2015/9/24.
 */
define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest){
        var shouquanguanliVm = avalon.define({
            $id: "shouquanguanli",
            system:"系统管理",
            authorize:"授权管理",
            //角色数据
            items1:{},
            roleData:function(){
              var url="/api/xitongguanli/role/list";
              avalon.get(url,function(data){
                  var res=data.items;
                  shouquanguanliVm.items1=res;
              })
            },
//            data : [{},{},{}, {}, {}, {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
            data : [],
            priData:function(){
               var url="/api/xitongguanli/privilegeController/list";
               avalon.get(url,function(data){
                  var res=data.items;

//                    console.log(res);
//                    var roleID=res.role.id;
//                    console.log(roleID);
//                    console.log("-----------2---------------");
//                    data.operation.id
                    shouquanguanliVm.data=res;
//                   var role=[];
//                  role=shouquanguanliVm.items1;
               })
            }
        });

        var operationVm = avalon.define({
            $id: "operation",
            //操作数据
            items:{},
            operationData:function(){
                var url="/api/xitongguanli/resource/list";
                avalon.get(url,function(data){
                  operationVm.items=data;
//                  console.log(data);
                })
            }
        });
        shouquanguanliVm.data.$watch("length", function(a) {
               shouquanguanliVm.langtext = dynamic.lang.join(",")
                console.log(shouquanguanliVm.data)
        })
        shouquanguanliVm.roleData();
        shouquanguanliVm.priData();
        operationVm.operationData();
        avalon.scan();
    });





































