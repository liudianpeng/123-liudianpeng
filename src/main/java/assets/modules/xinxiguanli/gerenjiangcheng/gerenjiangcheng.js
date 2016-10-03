define(["avalon","domReady!","mmRequest"],
       function(avalon,personalReward) {

           avalon.templateCache.personalReward = personalReward;

           var personalRewardVm = avalon.define({
               $id: "personalReward",
               xinxiguanli:"信息管理",
               zimulu:"个人奖惩",
//               get_id:document.getElementById("get_id").value,
                get_id : window.parent.document.getElementById("get_id").value,
               //奖惩明细-在wei_jiangchengmingxi这张表中关联字典(省劳积.....)
               items: {},
               items_lj2 : {},
               items_lj3 : {},
               data: function(){
                   var url = "/api/xinxi/gerenjiangcheng/getjiangchengmingxi/"+personalRewardVm.get_id;//第一个犯人的id
                   return avalon.get(url,[],function(data){
                       var a = [];
                       var b = [];
                       var c = [];
                       for (var i=0;i<3;i++){
                            a.push(
                                data[i]
                            )
                       };
                       for (var j=3;j<6;j++){
                            b.push(
                                data[j]
                            )
                       };
                       for (var n=6;n<data.length;n++){
                            c.push(
                                data[n]
                            )
                       };
                       personalRewardVm.items = a;
                       personalRewardVm.items_lj2 = b;
                       personalRewardVm.items_lj3 = c;
                       avalon.log(data.length);
                   },"json");
               },

               //刑期明细--在wei_xqbdmx表中
               items1: {},
               data1: function(){
                   var url = "/api/xinxi/gerenjiangcheng/getxingqimingxi/"+personalRewardVm.get_id;
                   return avalon.get(url,[],function(data){
                       personalRewardVm.items1 = data;
                       avalon.log(data.length);
                   },"json");
               }

               //刑期变动(没有刑期变动.都在刑期明细里面)
//               items2: {},
//               data2: function(){
//                   var url = "/api/xinxi/gerenjiangcheng/getxingqibiandong/7339";
//                   return avalon.get(url,[],function(data){
//                       personalRewardVm.items2 = data;
//                       avalon.log(data.length);
//                   },"json");
//               }
           });
           personalRewardVm.data();
           personalRewardVm.data1();
//           personalRewardVm.data2();
           avalon.scan();
           avalon.vmodels.personalReward = "personalReward";
       });