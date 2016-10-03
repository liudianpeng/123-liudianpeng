define(["avalon","domReady!","mmRequest",
"../../../vendor/avalon.oniui/scrollspy/avalon.scrollspy","../../../vendor/avalon.oniui/scrollbar/avalon.scrollbar",
"../../../vendor/avalon.oniui/tab/avalon.tab"],
    function(avalon, domReady,mmRequest,rujianziliao) {
        avalon.templateCache.rujianziliao = rujianziliao;

            var tabs = [];
            var tabpanels = [];
            avalon.ajax({
               type:"GET",
               url:"/api/xinxi/rujianziliao/list/7339",
               success:function(res){
               for(var i=0;i<res.length;i++){
                  var obj=res[i];
                  tabs.push({
                    title:obj.fenlei.name,
                    name:"tool" + i
                  });
                  tabpanels.push({
                     content : obj.rjzl + i
                  });
               }
               }
            });
            for(var i=0;i<10;i++){
                tabs.push({
                    title : "身份证" + i,
                    name : "tool" + i
                });
                tabpanels.push({
                    content : "图片" + i
                });
            };

        var rujianziliaoVm = avalon.define({
            $id: "rujianziliao",
            xinxiguanli:"信息管理",
            xxx:"入监资料",
            //////////////////////
            tab : {
                onActivate : function(e){
                    avalon.log("user define cc activate callback")
                },
                active : 1,
                event : "click",
                activeDelay : 250,
                forceCut :false,
                removable : false,
                cutEnd : "",
                tabs : tabs,
                tabpanels : tabpanels
            }

//            data: function(){
//                var url = "/api/xinxi/rujianziliao/list/7339";
//                avalon.get(url,function(data){
//                    for(var i=0;i<data.length;i++){
//                        var obj = data[i];
//                        tabs.push({
//                            title : obj.fenlei.name,
//                            name : "tool" + i
//                        });
//                        tabpanels.push({
//                            content : obj.rjzl + i
//                        });
//                    }
//                });
//            }


        });
//        rujianziliaoVm.data();
        avalon.scan();
        avalon.vmodels.rujianziliao = "rujianziliao";
    });