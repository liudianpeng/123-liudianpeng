define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest,edit,smartgrid){
        avalon.templateCache.edit = edit;

            var editVm = avalon.define({
                $id: "edit",
                id:"1212"
            });

            avalon.scan();
            avalon.vmodels.edit = "edit";
        });