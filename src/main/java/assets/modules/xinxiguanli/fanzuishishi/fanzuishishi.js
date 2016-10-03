define(["avalon","domReady!","mmRequest",
"../../../vendor/avalon.oniui/smartgrid/avalon.smartgrid","../../../vendor/avalon.oniui/switchdropdown/avalon.switchdropdown"],
function(avalon, domReady,mmRequest,personalCrime) {
    avalon.templateCache.personalCrime = personalCrime;
    var personalCrimeVm = avalon.define({
        $id: "personalCrime",
        xinxiguanli:"信息管理",
        zimulu:"犯罪事实",
        items: {},
//        get_id:document.getElementById("get_id").value,
        get_id : window.parent.document.getElementById("get_id").value,
        data: function(){
            var url = "/api/xinxi/fanzuishishi/list/"+personalCrimeVm.get_id;
            avalon.get(url,function(data){
            personalCrimeVm.items = data;
            });
        }
    });
    personalCrimeVm.data();
    avalon.scan();
    avalon.vmodels.personalCrime = "personalCrime";
});