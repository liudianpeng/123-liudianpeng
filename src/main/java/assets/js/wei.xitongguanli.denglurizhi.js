var manager;
$(function () {
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '编号', name: 'id', width: 100, minWidth: 100, align: 'center'},
                    {display: '用户编号', name: 'memberId', width: 120, minWidth: 100, align: 'center'},
                    {display: '用户名', name: 'username', minWidth: 100, align: 'center'},
                    {display: 'IP地址', name: 'ip', minWidth: 100, align: 'center'},
                    {display: '其他内容', name: 'content', minWidth: 150, align: 'center'},
                    {display: '创建时间', name: 'created', minWidth: 138, align: 'center', type: 'rizhi_date'}
                ],
                pageSizeOptions: [10, 20, 50, 100],
                height: '97%',
                width: '100%',
                pageSize: 20,
                record: 'total',
                rownumbers: true,
                url: '/api/xitongguanli/loginLog/list',
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

function reload() {
    manager.reload(1);
}