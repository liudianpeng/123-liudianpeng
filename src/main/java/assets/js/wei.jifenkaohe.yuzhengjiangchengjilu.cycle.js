
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
                        return "<a href='/jifenkaohe/yuzhengke/yuzhengjiangchengjilu/status/"+selectId+"'><b>查看</b></a>"
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





