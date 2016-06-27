define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest,addrujianziliao,smartgrid){
        avalon.templateCache.addrujianziliao = addrujianziliao;

            var addVm = avalon.define({
                $id: "addrujianziliao",
                fl:"选择分类",
                wj:"文件上传：",
                //入监资料分类

                name : "",
                selectchange: function(a) {
                    addVm.name = a
                },
                rjzl : "",
                selectchange1: function(a) {
                    addVm.rjzl = a
                },

                //获取入监资料分类
                fenlei:{},
                data: function(){
                    var url = "/api/xitongguanli/dict/rujianziliaofenlei/list";//这里应该是入监资料分类的api,使用的是系统管理里面的入监资料分类的api
                    avalon.get(url,function(data){
                        addVm.fenlei = data.items;
                    });
                },


                //post入监资料-新建入监资料
            addCheck:function(e){
               e.preventDefault();
               var model = JSON.parse(JSON.stringify(addVm.$model));
               avalon.ajax({
                   type: "POST",
                   data: model,
                   url: "/api/xinxi/rujianziliao/create/7339",
                   success: function(res){
                   res = model;
                   window.location="/xinxiguanli/rujianziliao";
                   }
               })
            }
        });

            addVm.data();
            avalon.scan();
            avalon.vmodels.addrujianziliao = "addrujianziliao";
        });