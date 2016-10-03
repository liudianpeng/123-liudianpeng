var manager;
var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

$(function () {

    var dialogData = dialog.get('data');
    var jianquId = dialogData.jianquId;
    var position = dialogData.position;

    var api;
    api = "/api/welcome/card_fenbu/detail/"+jianquId+"/"+position;

    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [

                    {display: '单位名称', name: 'f_GroupName', minWidth: 40, width: 180, type: 'int'},
                    {display: '姓名', name: 'f_ConsumerName', width: 150, type: 'text'},
                    {display: '时间', name: 'time', width: 150, type: 'data'}
                ],
                rownumbers:true,
                fixedCellHeight: false,
                checkbox: false,
                switchPageSizeApplyComboBox: false,
                //pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '100%',
                //pageSize: 20,
                record: 'total',
                url: api,
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                }
            }
        );
    $("#pageloading").hide();
});
function reload() {
    manager.reload(1);
}









