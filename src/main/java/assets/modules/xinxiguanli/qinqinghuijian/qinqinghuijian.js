define(["avalon","domReady!","mmRequest","../../../vendor/avalon.oniui/tab/avalon.tab"],
function(avalon, domReady,mmRequest,personalMeeting) {

    avalon.templateCache.personalMeeting = personalMeeting;

    var personalMeetingVm = avalon.define({
          $id: "personalMeeting",
          xinxiguanli:"信息管理",
          zimulu:"亲情会见",
          //查看详情的点击
          xq :function(a){
             alert(a)
          },

          currentIndex:0,
          active:function($index){
               personalMeetingVm.currentIndex=$index
          },
          //这里是获取亲属姓名的
//          get_id:document.getElementById("get_id").value,
            get_id : window.parent.document.getElementById("get_id").value,
          items: {},
          data: function(){
              var url = "/api/xinxi/qinqinghuijian/list/"+personalMeetingVm.get_id+"/6591";//前id犯人的id :后id社会关系
              return avalon.get(url,[],function(data){
                  personalMeetingVm.items = data;
              },"json");
          },
          //这里是其他关系(后期)
//          items2: {},
//          data2: function(){
//              var url = "/api/xinxi/qinqinghuijian/relations/7339";
//              return avalon.get(url,[],function(data){
//                  personalMeetingVm.items2 = data;
//              },"json");
//          }
        });

    personalMeetingVm.data();
//    personalMeetingVm.data2();
    avalon.scan();
    avalon.vmodels.personalMeeting = "personalMeeting";
});