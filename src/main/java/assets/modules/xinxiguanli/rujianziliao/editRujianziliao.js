define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest,editrujianziliao,smartgrid){
        avalon.templateCache.editrujianziliao = editrujianziliao;
        var editVm = avalon.define({
            $id: "editrujianziliao",
            bm:"选择分类",
            wj:"文件上传：",
            //用户组json
            items:{},
            data: function(){
                var url = "/api/xitongyonghuzu/userList.json";
                return avalon.get(url,[],function(data){
                    editVm.items = data;
                    avalon.log(data.length);
                },"json");
            },
            //部门json
            items2:{},
            data2: function(){
                var url = "/api/xitongyonghuzu/bumen.json";
                return avalon.get(url,[],function(data2){
                    editVm.items2 = data2;
                    avalon.log(data2.length);
                },"json");
            }
        });

        editVm.data();
        editVm.data2();
        avalon.scan();
        avalon.vmodels.editrujianziliao = "editrujianziliao";
    });