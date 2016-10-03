var manager;

$(function ()
{
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    { display: '考核周期', name: 'name', width: 400, align: 'center',isSort:true },
                    //{ display: '考核天数', name: 'cycle', width: 300, align: 'center',isSort:true },
                    { display: '状态', name: 'state',minWidth:300,align: 'center' },
                    { display: '查看', name: 'show', width:300,minWidth:300,isSort:false, align: 'center',render:function(rowdata){
                        var selectId=rowdata.id;
                        //console.log(selectId);
                        return "<a href='/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/status/"+selectId+"'><b>查看</b></a>"
                    }}
                ],
                checkbox:false,
                fixedCellHeight :false,
                //pageSizeOptions: [10, 20, 50, 100],
                //pageSize: 20,
                height: '97%',
                width: '100%',
                record: 'total',
                url: '/api/jifenkaohe/system/checkingcircle/list',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function ()
                {
                },
                onAfterShowdata: function ()
                {
                }
            }
        );
});
function reload()
{
    manager.reload(1);
}

//var manager;
//
//$(function ()
//{
//    var Data =
//    {
//        Rows: [
//            {
//                "cycle": "考核周期为2016-1-28 到 2016-02-28",
//                "state": "未录入"
//            },
//            {
//                "cycle": "考核周期为2015-12-28 到 2016-01-28",
//                "state": "审核通过"
//            },
//            {
//                "cycle": "考核周期为2015-11-28 到 2015-12-28",
//                "state": "审核通过"
//            }
//
//
//        ], Total: 91
//    };
//
//        window['g'] =
//            manager = $("#maingrid").ligerGrid({
//                    columns: [
//                        { display: '周期', name: 'cycle', width: 300, align: 'center',isSort:true },
//                        { display: '状态', name: 'state',align: 'center',type:'state' },
//                        { display: '查看', name: 'show', width: 200, align: 'center' ,render:showRowData}
//                    ],
//                    checkbox:false,
//                    fixedCellHeight :false,
//                    pageSizeOptions: [10, 20, 50, 100],
//                    pageSize: 20,
//                    height: '97%',
//                    width: '100%',
//                    record: 'total',
//                    url: '',
//                    dataAction: 'server', //服务器处理
//                    data:Data,
//                    //root: 'items',
//                    usePager: false,         //服务器分页
//                    alternatingRow: false,
//                    method: 'get',
//                    pagesizeParmName: 'limit',
//                    switchPageSizeApplyComboBox: true,
//                    onBeforeShowData: function ()
//                    {
//                    },
//                    onAfterShowdata: function ()
//                    {
//                    }
//                }
//            );
//});
//
//function reload()
//{
//    manager.reload(1);
//}
//function showRowData(e){
//    if(e.state=="未录入"){
//        return "<a href='/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/jifenluru' style='color: red;'><b>录入</b></a>"
//    }else {
//        return "<a href='/jifenkaohe/yuzhengke/yuzhengjianxingjiashi/jifenluru/show'> 查看</a>"
//    }
//}
