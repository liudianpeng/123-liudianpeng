var manager;

$(function () {
    var id = document.getElementById("jianquId").value;
    //console.log(id);
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '监区', name: 'jianqu', minWidth: 400, width: 400, align: 'center', isSort: true},
                    {display: '状态', name: 'state', minWidth: '400', align: 'center'}
                    //{
                    //    display: '查看', name: 'show', width: 320, minWidth: '320', align: 'center',
                    //    render: function () {
                    //        return "<a href='/jifenkaohe/jianqu/jifenshenhe/jianqushow'>查看</a>"
                    //    }
                    //}
                ],
                toolbar: {
                    items: [
                        {text: '查看', click: showItem, icon: 'add'},
                        {line: true}
                    ]
                },
                checkbox: false,
                fixedCellHeight: false,
                pageSizeOptions: [10, 20, 50, 100],
                pageSize: 20,
                height: '97%',
                width: '100%',
                record: 'total',
                url: '/jifenkaohe/jianqu/jianqushenhezhuangtai/list/' + id,
                //data: Data,
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
                },
                rowAttrRender: function (rowdata, rowid) {
                    if (rowdata.state == "录入中") {
                        return "style='color:gray;font-weight:bold'";
                    } else if (rowdata.state == "审核通过") {
                        return "style='color:green;font-weight:bold'";
                    } else if (rowdata.state == "等待审核") {
                        return "style='color:blue;font-weight:bold'";
                    } else if (rowdata.state == "审核未通过") {
                        return "style='color:red;font-weight:bold'";
                    }
                }

            }
        );
});
function reload()
{
    manager.reload();
}
function getSelectedId() {
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请先选择一行');
        return;
    }
    return row.jianquid;
}
function showItem() {
    var selectedId = getSelectedId();
    var row = manager.getSelectedRow();
    //console.log(selectedId);
    if(!selectedId){
        return;
    }
    if (row.state=="录入中"){
        $.ligerDialog.waitting('正在录入中...');
        setTimeout(function () {
            $.ligerDialog.closeWaitting();
        }, 2000);
    }else {
        $.ligerDialog.open({
            height: 500,
            width: 900,
            title: '查看状态',
            url: '/jifenkaohe/jianqu/jifenshenhe/jianqushow',
            showMax: true,
            showToggle: true,
            showMin: false,
            isResize: true,
            slide: false,
            data: {
                id: selectedId
            }
        })
    }

}