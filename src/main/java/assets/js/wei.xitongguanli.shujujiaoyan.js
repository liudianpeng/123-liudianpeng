
/**
 *原判刑期起始日期小于逮捕日期和小于羁押日期人员
 */
var dbrq_jyrq_qr;
var apiUrl = '/api/xitongguanli/shujujiaoyan/dbrqjyrqqr';
$(function () {
    window['g'] =
        dbrq_jyrq_qr = $("#dbrq_jyrq_qr").ligerGrid({
                columns: [
                    {display: '档案编号', name: 'dabh', width: 80,  align: 'left'},
                    {display: '姓名', name: 'xm', width: 60,  align: 'left',
                        render:function(rowdata,value){
                            var nname=rowdata.xm;
                            var ccid = rowdata.id;
                            return "<a style='font-weight: 600'  href=\"javascript:addNewTabForGerenxinxi('"+ccid+"')\">"+nname+"</a>";
                        }},
                    {display: '考核编号', name: 'code', width: 80,  align: 'left'},
                    {display: '羁押日期', name: 'jyrq', width: 80,  align: 'left',type:'date'},
                    {display: '逮捕日期', name: 'dbrq', width: 80,  align: 'left',type:'date'},
                    {display: '入监日期', name: 'rjrq', width: 80,  align: 'left',type:'date'},
                    {display: '刑期起始', name: 'qr', width: 80,  align: 'left',type:'date'},
                    {display: '判决日期', name: 'pjrq', width: 80,  align: 'left',type:'date'},
                    {display: '原判刑期', name: 'xq', width: 80,  align: 'left',
                        render:function(rowdata){
                            if (!!rowdata.xq){
                                return get_xq(rowdata.xq);
                            }
                        }
                    }
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:600,
                width: 760,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
                url: apiUrl,
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                //pagesizeParmName: 'limit',
                //switchPageSizeApplyComboBox: true,
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                }
            }
        );

});

/**
 基本信息wei_criminal中code值为null或者不等于7位的人员统计
 */
var code_null_not7;
$(function () {
    window['g'] =
        code_null_not7 = $("#code_null_not7").ligerGrid({
                columns: [
                    {display: '档案编号', name: 'dabh', width: 80,  align: 'left'},
                    {display: '姓名', name: 'xm', width: 60,  align: 'left',
                        render:function(rowdata,value){
                            var nname=rowdata.xm;
                            var ccid = rowdata.id;
                            return "<a style='font-weight: 600'  href=\"javascript:addNewTabForGerenxinxi('"+ccid+"')\">"+nname+"</a>";
                        }},
                    {display: '考核编号', name: 'code', width: 80,  align: 'left'},
                    {display: '监区/分监区', name: 'jianqu', width: 150,  align: 'left',type:'date',
                        render:function(rowdata){
                            return rowdata.jianqu+rowdata.fenjianqu
                        }
                    }
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:600,
                width: 760,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
                url: '/api/xitongguanli/shujujiaoyan/wcodenullstr',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                //pagesizeParmName: 'limit',
                //switchPageSizeApplyComboBox: true,
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                }
            }
        );

});

/**
 基本信息wei_criminal中code值的前四位是不等分监区wei_dict_fenjianqu中的code值的人员统计
 有的人员分监区为空，只统计分监区不为空的
 */
var w_code_jianqu_code;
$(function () {
    window['g'] =
        w_code_jianqu_code = $("#w_code_jianqu_code").ligerGrid({
                columns: [
                    {display: '档案编号', name: 'dabh', width: 80,  align: 'left'},
                    {display: '姓名', name: 'xm', width: 60,  align: 'left',
                        render:function(rowdata,value){
                            var nname=rowdata.xm;
                            var ccid = rowdata.id;
                            return "<a style='font-weight: 600'  href=\"javascript:addNewTabForGerenxinxi('"+ccid+"')\">"+nname+"</a>";
                        }},
                    {display: '考核编号', name: 'code', width: 80,  align: 'left'},
                    {display: '考核编号前四位', name: 'wei_str_code', width: 80,  align: 'left'},
                    {display: '分监区code', name: 'fenjianqu_code', width: 80,  align: 'left'},
                    {display: '监区/分监区', name: 'jianqu', width: 150,  align: 'left',type:'date',
                        render:function(rowdata){
                            return rowdata.jianqu+rowdata.fenjianqu
                        }
                    }
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:600,
                width: 760,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
                url: '/api/xitongguanli/shujujiaoyan/wcodefenjianqucode',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                //pagesizeParmName: 'limit',
                //switchPageSizeApplyComboBox: true,
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                }
            }
        );

});


/**
 刑期wei_sentence_changement中xq不等于9995,9996,9997,9990并且长度等于6位,或者null的人员统计
 */
var xq_srt_null;
$(function () {
    window['g'] =
        xq_srt_null = $("#xq_srt_null").ligerGrid({
                columns: [
                    {display: '档案编号', name: 'dabh', width: 80,  align: 'left'},
                    {display: '姓名', name: 'xm', width: 60,  align: 'left',
                        render:function(rowdata,value){
                            var nname=rowdata.xm;
                            var ccid = rowdata.id;
                            return "<a style='font-weight: 600'  href=\"javascript:addNewTabForGerenxinxi('"+ccid+"')\">"+nname+"</a>";
                        }},
                    {display: '刑期', name: 'xq', width: 80,  align: 'left'},
                    {display: '考核编号', name: 'code', width: 80,  align: 'left'}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:600,
                width: 760,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
                url: '/api/xitongguanli/shujujiaoyan/xqsrtnull',
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: false,       //服务器分页
                alternatingRow: true,
                method: 'get',
                //pagesizeParmName: 'limit',
                //switchPageSizeApplyComboBox: true,
                onBeforeShowData: function () {
                },
                onAfterShowdata: function () {
                }
            }
        );

});





function reload() {
    manager.reload(1);
};

//
function addNewTabForGerenxinxi(cid){
    window.parent.wei.selectedCriminal = cid;
    window.parent.wei.selectCriminal(cid);

    window.parent.f_addTab("menu-gerenxinxi", "个人信息", "/xinxiguanli/gerenxinxi/"+cid);
}