define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/tab/avalon.tab"],
function(avalon, domReady,mmRequest,personalMessage) {

    avalon.templateCache.personalMessage = personalMessage;

         var personalMessageVm = avalon.define({
             $id: "personalMessage",
             xinxiguanli:"信息管理",
             zimulu:"亲情短信",
             array:{},
             currentIndex:0,
             active:function($index){
                 personalMessageVm.currentIndex=$index
             },
//             get_id:document.getElementById("get_id").value,
                get_id : window.parent.document.getElementById("get_id").value,
             data: function(){
                 var url = "/api/xinxi/qinqingduanxin/list/"+personalMessageVm.get_id;//亲情短信数据
                  avalon.get(url,[],function(data){
                    var duanxin = [];
                    duanxin = data.items;
                    var changdu = duanxin.length;
                     personalMessageVm.array= duanxin;
                 },"json");
             }
         });
         personalMessageVm.data();
         avalon.scan();
         avalon.vmodels.personalMessage = "personalMessage";
    });