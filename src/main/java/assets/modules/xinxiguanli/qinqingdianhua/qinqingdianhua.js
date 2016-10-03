define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/tab/avalon.tab"],
  function(avalon, domReady,mmRequest,personalPhone) {
      avalon.templateCache.personalPhone = personalPhone;
      var personalPhoneVm = avalon.define({
          $id: "personalPhone",
          xinxiguanli:"信息管理",
          zimulu:"亲情电话",

          itemsP2: {},
          //查看详情的点击
          xq :function(a){
              alert(a)
          },
          /////////////////
          currentIndex:0,
          active:function($index){
              personalPhoneVm.currentIndex=$index
          },
//          get_id:document.getElementById("get_id").value,
          get_id : window.parent.document.getElementById("get_id").value,
          items: {},
          data1: function(){
              var url = "/api/xinxi/qinqingdianhua/list/"+personalPhoneVm.get_id+"/6591";//获取数据:cid犯人的 7422,社会关系
              return avalon.get(url,[],function(data){
                  personalPhoneVm.items = data;
              },"json");
          },

          //亲属关系
//          gx: {},
//          data2: function(){
//              var url = "/api/xinxi/qinqingdianhua/relations/"+personalPhoneVm.get_id;//获取数据:社会关系
//              return avalon.get(url,[],function(data){
//                  personalPhoneVm.gx = data;
//              },"json");
//          }




      });
    personalPhoneVm.data1();
//    personalPhoneVm.data2();
    avalon.scan();
    avalon.vmodels.personalPhone = "personalPhone";
});