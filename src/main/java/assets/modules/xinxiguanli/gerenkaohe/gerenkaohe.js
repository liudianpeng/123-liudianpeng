define(["avalon","domReady!","mmRequest", "../../../vendor/avalon.oniui/datepicker/avalon.datepicker","../../../vendor/avalon.oniui/pager/avalon.pager"],
 function(avalon,domReady,mmRequest,gerenkaohe) {
    avalon.templateCache.gerenkaohe = gerenkaohe
    var gerenkaoheVM= avalon.define({
        $id:"gerenkaohe",
        zimulu:"个人考核",
        $skipArray: ['paginationOpt'],
        paginationOpt:{
            perPages: 5,
            currentPage: 1,
            showJumper: false,
            onJump: function(e, data) {
                avalon.log('pager on clicked');
                location.href = "#page=" + data.currentPage;
                gerenkaoheVM.paginate(data.currentPage);
            }
        },
        $cOpts:{
            onSelect:function(date,vmodel,data){
                console.log("选中日期的用户回调");
                alert("请等候...");
            }
        }
    });
//    gerenkaoheVM.paginate();
    avalon.scan();
    avalon.vmodels.gerenkaohe= "gerenkaohe"
});
