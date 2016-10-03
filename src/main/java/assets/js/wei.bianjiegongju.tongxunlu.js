var manager;
$(function () {
    //var id = window.parent.wei.selectedCriminal;
    //alert(id)
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    /*{display: 'ID', name: 'id', width: 100, align: 'center'},*/
                    {display: '名称', name: 'name', minWidth: 100, align: 'center'},
                    {display: '手机', name: 'mobile', minWidth: 200, align: 'left'},
                    {display: '电话', name: 'phone', minWidth: 100, align: 'center'},
                    {display: '备注', name: 'remark', minWidth: 100, align: 'center'}
                ],
                fixedCellHeight: false,
                checkbox: false,
                isSingleCheck: true,
                height: '97%',
                width: '100%',
                pageSizeOptions: [20, 100, 200, 500],
                pageSize: 20,
                record: 'total',
                rownumbers: true,
                url: '/api/bianjiegongju/tongxinlu/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
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