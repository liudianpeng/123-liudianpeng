var manager;

$(function () {
    var navtab = null;
    $(function () {
        $("#tab1").ligerTab();
        navtab = $("#tab1").ligerGetTabManager();
    });
    //监区审核
    window['g'] =
        manager = $("#maingrid1").ligerGrid({
                columns: [
                    {display: '周期', name: 'name', minWidth: 400, width: 400, align: 'center', isSort: true},
                    {display: '状态', name: 'state', minWidth: '400', width: 400, align: 'center'},
                    //{
                    //    display: '查看', name: 'show', width: 320, minWidth: '320', align: 'center',
                    //    render: function () {
                    //        return "<a href='/jifenkaohe/jianqu/jifenshenhe/jianqustatus'>查看</a>"
                    //    }
                    //},
                    { display: '查看', name: 'show', minWidth: 200, align: 'center',isSort:false,render:function(rowdata){
                        var selectId=rowdata.id;
                        //console.log(selectId);
                        return "<a href='/jifenkaohe/jianqu/jifenshenhe/jianqustatus/"+selectId+"'><b>查看</b></a>"
                    }}
                ],
                checkbox: false,
                fixedCellHeight: false,
                pageSizeOptions: [10, 20, 50, 100],
                pageSize: 20,
                height: '97%',
                width: '100%',
                record: 'total',
                //data:Data1,
                url: '/api/jifenkaohe/system/checkingcircle/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
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

    //分监区审核

    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '周期', name: 'name', width: 300, align: 'center', isSort: true},
                    {display: '状态', name: 'state', minWidth: 400, align: 'center'},
                    //{
                    //    display: '查看', name: 'show', minWidth: 400, align: 'center', render: function () {
                    //    return "<a href='/jifenkaohe/jianqu/jifenshenhe/fenjianqustatus'>查看</a>"
                    //}
                    //},
                    { display: '查看', name: 'show', width: 200, align: 'center',isSort:false,render:function(rowdata){
                        var selectId=rowdata.id;
                        //console.log(selectId);
                        return "<a href='/jifenkaohe/jianqu/jifenshenhe/fenjianqustatus/"+selectId+"'><b>查看</b></a>"
                    }}
                ],
                checkbox: false,
                fixedCellHeight: false,
                pageSizeOptions: [10, 20, 50, 100],
                pageSize: 20,
                height: '97%',
                width: '100%',
                record: 'total',
                url: '/api/jifenkaohe/system/checkingcircle/list',
                dataAction: 'server', //服务器处理
                //data: Data,
                root: 'items',
                usePager: false,       //服务器分页
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

