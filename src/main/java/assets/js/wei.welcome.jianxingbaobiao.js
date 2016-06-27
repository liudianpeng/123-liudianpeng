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
    //查旬条件
    var name = dialogData.name;
    var jm = dialogData.jm;
    var jiguan = dialogData.jg;
        //alert(name+jm+jiguan);
    //alert(jianquId);
    //alert(fenjianquId);

    //var api;
    //api = '/api/xinxiguanli/jianxingbaobiao/'+jianquId+'/'+fenjianquId;

    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '档案编号', name: 'dabh', width: 80, type: 'int',align: 'left', frozen: true},
                    {
                        display: '姓名', name: 'xm', width: 60, type: 'text',align: 'left', frozen: true,
                        render: function (rowdata, value) {
                            var nname = rowdata.xm;
                            var ccid = rowdata.id;
                            return "<a style='font-weight: 600'  href=\"javascript:addNewTabForGerenxinxi('" + ccid + "')\">" + nname + "</a>";
                        }

                    },
                    {display: '监区', name: 'jianqu', width: 100, align: 'left',type: 'text',frozen: true
                        ,render:jianqu_fenjianqu
                    },
                    {display: '嘉奖', name: 'jj', width: 50, type: 'text'},
                    //{display: '嘉奖转化分', name: 'jj_fen', width: 40, type: 'text'},

                    //{display: '专项表扬', name: 'zxby', width: 40, align: 'center',type: 'text'},
                    //{display: '专项表扬转化分', name: 'zxby_fen', width: 40, type: 'text'},

                    //{display: '专项记功', name: 'zxjg', width: 40, type: 'text'},
                    //{display: '专项记功转化分', name: 'zxjg_fen', width: 40, type: 'text'},
                    {display: '表扬', name: 'by', width: 50, type: 'int_'},
                    {display: '记功', name: 'jg', width: 50, type: 'int_'},
                    //{display: '记功转化分', name: 'jg_fen', width: 40, type: 'text'},

                    {display: '监区劳积', name: 'jqlj', width: 60, type: 'text'},
                    //{display: '监区劳积转化分', name: 'jqlj_fen', width: 40, type: 'text'},

                    {display: '监狱劳积', name: 'jylj', width: 60, type: 'text'},
                    //{display: '监狱劳积转化分', name: 'jylj_fen', width: 40, type: 'text'},

                    {display: '省劳积', name: 'slj', width: 60, type: 'text'},
                    //{display: '省劳积转化分', name: 'slj_fen', width: 40, type: 'text'},

                    {display: '考核余分', name: 'jf', width: 60, type: 'text'},
                    //{display: '转化总分', name: 'zhuahua_fen', width: 50, type: 'text'},
                    //{display: '可用积分', name: 'count_fen', width: 50, type: 'text'},

                    {display: '可以减刑月数', name: 'mon', width: 80, type: 'text'},
                    {display: '剩余刑期', name: 'yx', width: 140, type: 'text'}
                ],
                headerRowHeight:40,
                allowAdjustColWidth:true,
                fixedCellHeight:false,
                checkbox: false,
                switchPageSizeApplyComboBox: true,
                pageSizeOptions: [50, 100],
                height: '97%',
                width: '100%',
                pageSize: 50,
                record: 'total',
                //url: api,
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

                },
                onBeforeShowData: function () {

                }
            }
        );
    //重新设置grid
    manager.setParm("xm",name);
    manager.setParm("jm",jm);
    manager.setParm("jiguang",jiguan);
    var api = '/api/xinxiguanli/jianxingbaobiao/'+jianquId+'/'+fenjianquId;
    manager = $("#maingrid").ligerGrid({
        url: api,
        dataAction: 'server' //服务器处理
    });
    //manager.set("url",api);

    $("#pageloading").hide();


});
function reload() {
    manager.reload(1);
}
//返回整数字符串
//gird 格式化--记功,表扬,整数
$.ligerDefaults.Grid.formatters['int_'] = function (value, column) {

    var str_data = value;
    if (!!str_data) {
        if (str_data.length > 3 && str_data.substr(str_data.length - 3, 3) == '.00') {
            return str_data.substr(0, str_data.length - 3)
        } else {
            return str_data;
        }
    } else {
        return '';
    }
};


//获取监区
function jianqu_fenjianqu(rowdata) {
    if(rowdata.jianqu==""||rowdata.jianqu==null||rowdata.jianqu==undefined){
        return ""
    }else if(rowdata.fenjianqu==""||rowdata.fenjianqu==null||rowdata.fenjianqu==undefined){
        return rowdata.jianqu;
    }else {
        return rowdata.jianqu+':'+rowdata.fenjianqu;
    }
    //return null === rowdata.jianqu||''===rowdata.jianqu||undefined ===rowdata.jianqu ?rowdata.fenjianqu:rowdata.jianqu;
}