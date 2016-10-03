define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest,add,smartgrid){
        avalon.templateCache.add = add;

            var editVm = avalon.define({
                $id: "add",
                id:"1212"
            });

            avalon.scan();
            avalon.vmodels.add = "add";
        });