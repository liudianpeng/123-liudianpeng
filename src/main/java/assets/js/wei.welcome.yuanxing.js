var manager;
var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)


function addNewTabForGerenxinxi(cid) {

    window.parent.parent.wei.selectedCriminal = cid;
    window.parent.parent.wei.selectCriminal(cid);
    //alert(cid +"000000")
    window.parent.parent.f_addTab("menu-gerenxinxi", "个人信息", "/xinxiguanli/gerenxinxi/" + cid);
}


$(function () {
    var dialogData = dialog.get('data');
    var jianquId = dialogData.jianquId;
    var fenjianquId = dialogData.fenjianquId;
    var yuanxingYear = dialogData.yuanxingYear;
    var operator = dialogData.operator;
    if(!operator){
        operator="less";
    }
    var api;

    api = '/api/xinxiguanli/welcome/statistics_detail/yuanxing/' + jianquId + "/" + fenjianquId + '/' + yuanxingYear+"/"+operator

    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '档案编号', name: 'dabh', minWidth: 40, width: 100, type: 'int', frozen: true},
                    {display: '考核编号', name: 'code', width: 100, type: 'text', frozen: true},
                    {
                        display: '姓名', name: 'xm', width: 150, type: 'text', frozen: true,
                        render: function (rowdata, value) {
                            var nname = rowdata.xm;
                            var ccid = rowdata.id;
                            return "<a style='font-weight: 600'  href=\"javascript:addNewTabForGerenxinxi('" + ccid + "')\">" + nname + "</a>";
                        }
                    },
                    {
                        display: '刑期', name: 'xq', width: 260, type: 'text',
                        render: function (rowdata) {
                            var xq = rowdata.xq;

                            return "<span  style='color:blue;font-weight: 900'>" + get_xq(xq) + "</span>"
                        }
                    }

                ],
                fixedCellHeight: false,
                checkbox: false,
                switchPageSizeApplyComboBox: true,
                pageSizeOptions: [50, 100],
                height: '97%',
                width: '100%',
                pageSize: 50,
                record: 'total',
                //url: '/api/xinxiguanli/welcome/yxqMingxi/' + jianquId + '/' + yuanxing,
                url: api,
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                alternatingRow: true,
                method: 'get',
                pagesizeParmName: 'limit',
                onDblClickRow: function (rowdata, rowindex, rowobj) {
                    //新页签打开人员基本信息
                    var cid = rowdata.id;
                    window.parent.parent.wei.selectedCriminal = cid;
                    window.parent.parent.wei.selectCriminal(cid);
                    //alert(name);
                    //alert(cid);
                    return window.parent.parent.f_addTab("menu-gerenxinxi", "个人信息", "/xinxiguanli/gerenxinxi/" + cid)

                }
            }
        );
    $("#pageloading").hide();
});
function reload() {
    manager.reload(1);
}









