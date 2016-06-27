var manager;
$(function () {
    var id = document.getElementById("postId").value;
    //console.log(id);
    var Data = {
            "Rows": [
                {
                    "jianqu": '一监区',
                    "scroe": "43",
                    "state": '审核通过'
                },
                {
                    "jianqu": '二监区',
                    "scroe": "63",
                    "state": '审核通过'
                },
                {
                    "jianqu": '三监区',
                    "scroe": "73",
                    "state": '审核通过'
                },
                {
                    "jianqu": '四监区',
                    "scroe": "45",
                    "state": '审核通过'
                },
                {
                    "jianqu": '五监区',
                    "scroe": "55",
                    "state": '审核通过'
                }, {
                    "jianqu": '六监区',
                    "scroe": "76",
                    "state": '审核通过'
                }, {
                    "jianqu": '七监区',
                    "scroe": "89",
                    "state": '审核通过'
                }, {
                    "jianqu": '九监区',
                    "scroe": "43",
                    "state": '审核通过'
                }
            ], "Total": "77"
        };
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '监区', name: 'jianqu', width: 300, align: 'center', isSort: true},
                    {display: '总得分', name: 'scroe', width: 100, align: 'center', isSort: true,render:score},
                    {display: '状态', name: 'state', minWidth: 300, align: 'center'}
                ],
                //toolbar: {
                //    items: [
                //        {text: '查看', click: showItem, icon: 'add'},
                //        {line: true}
                //    ]
                //},
                checkbox: false,
                fixedCellHeight: false,
                pageSizeOptions: [10, 20, 50, 100],
                pageSize: 20,
                data:Data,
                //url: '/jifenkaohe/fenjianqu/fenjianquzhuangtai/list/' + id,
                height: '97%',
                width: '100%',
                record: 'total',
                //dataAction: 'server', //服务器处理
                //root: 'items',
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                //pagesizeParmName: 'limit',
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
function getSelectedId() {
    var row = manager.getSelectedRow();
    if (!row) {
        alert('请先选择一行');
        return;
    }
    return row.jianqu;
}
function showItem(show) {
    var selectedId = getSelectedId();
    var row = manager.getSelectedRow();
    //console.log(selectedId);
    if (!selectedId) {
        return;
    }
    if (row.state == "录入中") {
        $.ligerDialog.waitting('正在录入中...');
        setTimeout(function () {
            $.ligerDialog.closeWaitting();
        }, 2000);
    } else {

    }

}
function score(rowdata){
    var scroe=rowdata.scroe;
    return "<a style='color:#fa0000;' href='javascript:Scores();'>"+scroe+"</a>"
}
function Scores(){
    var selectedId = manager.getSelectedRow().id;
    $.ligerDialog.open({
        height: 400,
        width: 800,
        title: '查看',
        url: '/jifenkaohe/yuzhengke/huizongchaxun/show',
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