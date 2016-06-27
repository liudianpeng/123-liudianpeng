var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '编号', name: 'id', width: 100, align: 'center'},
                    {display: '用户编号', name: 'memberId', width: 100, align: 'left'},
                    {display: '用户名', name: 'username', width: 200, align: 'left'},
                    {display: 'IP地址', name: 'ip', width: 200, align: 'left'},
                    {display: '其他内容', name: 'content', width: 800, align: 'left'}
                ],
                pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '100%',
                pageSize: 20,
                record: 'total',
                url: '/api/xitongguanli/operationLog/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
                rownumbers: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                }
            }
        );
});


function getSelected() {
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请选择行');
        return;
    }
    alert(JSON.stringify(row));
}
function reload() {
    manager.reload(1);
}