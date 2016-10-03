var manager;
$(function () {
    var id = document.getElementById("postId").value;
    window['g'] =
        manager = $("#maingrid").ligerGrid({
            columns: [
                {display: '考核日期', name: 'date', type: 'date', width: 80, minWidth: 80, align: 'center'},
                {display: '编码', name: 'id', minWidth: 80, align: 'center'},
                {display: '姓名', name: 'name', minWidth: 100, align: 'center', type: 'text'},
                {display: '奖惩日期', name: 'jcdate', type: 'date', width: 100, minWidth: 100, align: 'center'},
                {
                    display: '奖惩类别',
                    name: 'DepartmentID',
                    minWidth: 100,
                    type: 'text',
                    align: 'center',
                    textField: 'DepartmentName'
                },
                {display: '变动分数', name: 'bdfs', minWidth: 70, align: 'center', type: 'currency'},
                {display: '变动记功数', name: 'bdjgs', minWidth: 70, align: 'center'},
                {display: '变动表杨数', name: 'bdbys', minWidth: 70, align: 'center'},
                {
                    display: '裁定日期',
                    name: 'cdrqdate',
                    type: 'date',
                    width: 100,
                    minWidth: 70,
                    align: 'center'
                },
                {display: '判决地方', name: 'panjuedifang', minWidth: 100, type: 'text', align: 'center'},
                {
                    display: '判决法院',
                    name: 'panjuefayuan',
                    minWidth: 100,
                    type: 'text',
                    align: 'center',
                    textField: 'DepartmentName'
                },
                {display: '幅度', name: 'fd', minWidth: 80, align: 'center'},
                {display: '合并刑期', name: 'hbxq', type: 'int', width: 90, minWidth: 90, align: 'center'},
                {display: '现刑起日', name: 'xxqr', type: 'date', width: 90, minWidth: 90, align: 'center'},
                {display: '现刑止日', name: 'xxzr', type: 'date', width: 90, minWidth: 90, align: 'center'},
                {display: '现拨正', name: 'xbz', type: 'text', width: 90, minWidth: 90, align: 'center'},
                {display: '调出部门', name: 'dcbm', type: 'text', width: 90, minWidth: 90, align: 'center'},
                {display: '备注', name: 'bz', type: 'text', width: 90, minWidth: 90, align: 'center'}
            ],
            onSelectRow: function (rowdata, rowindex) {
                $("#txtrowindex").val(rowindex);
            },
            enabledEdit: false,
            //data: Data,
            isSingleCheck: false,
            switchPageSizeApplyComboBox: true,
            pageSizeOptions: [20, 50, 100],
            width: '100%',
            height: '97%',
            pageSize: 20,
            record: 'total',
            url: '/api/jifenkaohe/yuzhengke/yuzhengjiangchengjilu/get/7312/'+id,
            //dataAction: 'server', //服务器处理
            root: 'items',
            usePager: false,        //服务器分页
            alternatingRow: true,
            method: 'get',
            pagesizeParmName: 'limit',
            onBeforeShowData: function () {
            },
            onAfterShowdata: function () {
            }
        });
});

function reload()
{
    manager.reload(1);
}

