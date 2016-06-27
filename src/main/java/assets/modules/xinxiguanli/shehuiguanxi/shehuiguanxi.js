define(["avalon","domReady!","mmRequest",
"../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid",
"../../../vendor/avalon.oniui/switchdropdown/avalon.switchdropdown","weiutils"],
      function(avalon, domReady,mmRequest,smartgrid,switchdropdown,weiutils) {
//           avalon.templateCache.personalRelationship = personalRelationship;
            var personalRelationshipVm = avalon.define({
                  $id: "personalRelationship",
                  xinxiguanli:"信息管理",
                  zimulu:"社会关系",
                  items: {},
                  sg2Opt : {
                        $skipArray : ["pager"],
                        isAffix : true,
                        pager : {
                           totalItems:200,
                           perPages:5,
                           options : [5,10,20,50,100],
                           currentPage: 1,
                           onJump : function(e,page){
                              location.href = "#page=" + page.currentPage
                              personalRelationshipVm.getData(page.currentPage);
                              console.log(page.currentPage)
                           },
                           canChangePageSize : true,
                           pageable : true,
                           dropdown : {
                              onChange : function(newValue,oldValue,vmodel){
                                 personalRelationshipVm.sg2Opt.pager.perPages=newValue
                                 personalRelationshipVm.getData(1)
                              }
                           }
                        },
                        columns : [
                            {
                              key : "xm",
                              name : "亲属姓名",
                              sortable :true,
                              width: '10%',
                            },
                            {
                              key : "relation",
                              name : "关系",
                              sortable :true,
                              width: '10%',
                            },
                            {
                              key : "dwqh",
                              name : "所在单位",
                              sortable :true,
                              width: '40%',
                              isLock : true
                            },
                            {
                              key : "jtqh",
                              name : "家庭住址",
                              sortable :true,
                              width: '40%'
                            }
                            ]
                  },

//            get_id:document.getElementById("get_id").value,
            get_id : window.parent.document.getElementById("get_id").value,
            getData : function(currentPage){
                 var limit=personalRelationshipVm.sg2Opt.pager.perPages;
                 avalon.ajax({
                     type : "GET",
                     url :  "/api/xinxi/shehuiguanxi/list/"+personalRelationshipVm.get_id+"/"+currentPage+"/"+limit,
                     success : function(res){
                         var AllRecords=res.allResults;
                         var shuju = [];
                         shuju = res.items;
                         var shgx = [];
                         for (var i = 0;i<shuju.length;i++){
                             var obj = shuju[i];
                             shgx.push({
                                xm : obj.xm,//亲属姓名
                                relation : weiutils.isNull(obj.relation),//关系
                                dwqh : weiutils.isNull(obj.dwqh),//所在单位
                                jtqh : weiutils.isNull(obj.jtqh)//家庭住址
                           });
                         };
                        avalon.vmodels.sg.data = shgx;
                         var pagerInterval = setInterval(function(){
                            if(avalon.vmodels.sg.pager.totalItems){
                                avalon.vmodels.sg.pager.totalItems = AllRecords;
                                clearInterval(pagerInterval)
                            }else{pagerInterval();}
                         });
                        avalon.vmodels.sg.render();
                    }
                });
            }
         });
      personalRelationshipVm.getData();
      avalon.scan();
});