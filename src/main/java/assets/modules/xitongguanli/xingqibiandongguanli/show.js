define(["avalon","domReady!","mmRequest"],
    function(avalon,domReady,mmRequest,show,smartgrid){
        avalon.templateCache.show = show;

            var editVm = avalon.define({
                $id: "show",
                id:"1212"
            });

            avalon.scan();
            avalon.vmodels.show = "show";
        });