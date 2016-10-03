var manager_zybz;
var manager_lgf;
var manager_jianqu;
var manager_jianqu_fenjainqu;
var manager_gender_id;
var manager_nation_id
var old_education_id;

//jianqu
$(function () {
    window['g'] =
        manager_jianqu = $("#manager_jianqu").ligerGrid({
                columns: [

                    {display: '监区', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                    totalSummary:{
                        align:'right',
                        type:'sum',
                        render:function(e){
                            return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                        }
                    }
                    }
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:700,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
                url: '/api/xitongguanli/shujutongji/jianqu',
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
//分监区
$(function () {
    window['g'] =
        manager_jianqu_fenjainqu = $("#manager_jianqu_fenjainqu").ligerGrid({
                columns: [

                    {display: '监区/分监区', name: 'name1', width: 215, align: 'left',
                    render:function(rowdata){
                        var j =( null==rowdata.name||""==rowdata.name||undefined == rowdata.name)?"":rowdata.name;
                        var f = (null==rowdata.name1||""==rowdata.name1||undefined == rowdata.name1)?"":rowdata.name1;
                        return ""==f?j:j+";"+f;

                    }},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:700,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
                url: '/api/xitongguanli/shujutongji/jianqufenjianqu',
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
//是否在押
$(function () {
    window['g'] =
        manager_zybz = $("#maingrid_zybz").ligerGrid({
                columns: [

                    {display: '是否在押', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height: 168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
                url: '/api/xitongguanli/shujutongji/zybz',
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
 * 关联通用字典，以下方法gird适用同一条api,需要传递不同的参数即可
 */
var apiURL = '/api/xitongguanli/shujutongji/str';

//累惯犯
$(function () {
    window['g'] =
        manager_lgf = $("#manager_lgf").ligerGrid({
                columns: [

                    {display: '累惯犯', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height: 168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,

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

    //传递参数给后台
    manager_lgf.setParm("str","lgf");
    manager_lgf = $("#manager_lgf").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });
});
//gender_id
$(function () {
    window['g'] =
        manager_gender_id = $("#manager_gender_id").ligerGrid({
                columns: [

                    {display: '性别', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    manager_gender_id.setParm("str","gender_id");
    manager_gender_id = $("#manager_gender_id").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });
});
//nation_id
$(function () {
    window['g'] =
        manager_nation_id = $("#manager_nation_id").ligerGrid({
                columns: [

                    {display: '民族', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    manager_nation_id.setParm("str","nation_id");
    manager_nation_id = $("#manager_nation_id").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });

});
//old_education_id
$(function () {
    window['g'] =
        old_education_id = $("#old_education_id").ligerGrid({
                columns: [

                    {display: '原文化程度', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    old_education_id.setParm("str","old_education_id");
    old_education_id = $("#old_education_id").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//new_education_id
var new_education_id;
$(function () {
    window['g'] =
        new_education_id = $("#new_education_id").ligerGrid({
                columns: [

                    {display: '现文化程度', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    new_education_id.setParm("str","new_education_id");
    new_education_id = $("#new_education_id").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var old_position_id;
$(function () {
    window['g'] =
        old_position_id = $("#old_position_id").ligerGrid({
                columns: [

                    {display: '职业', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    old_position_id.setParm("str","old_position_id");
    old_position_id = $("#old_position_id").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var bqmm;
$(function () {
    window['g'] =
        bqmm = $("#bqmm").ligerGrid({
                columns: [

                    {display: '政治面貌', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:308,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    bqmm.setParm("str","bqmm");
    bqmm = $("#bqmm").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var marital_status_id;
$(function () {
    window['g'] =
        marital_status_id = $("#marital_status_id").ligerGrid({
                columns: [

                    {display: '婚姻状况', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:285,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    marital_status_id.setParm("str","marital_status_id");
    marital_status_id = $("#marital_status_id").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//fylx
var fylx;
$(function () {
    window['g'] =
        fylx = $("#fylx").ligerGrid({
                columns: [

                    {display: '分押类型', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:280,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    fylx.setParm("str","fylx");
    fylx = $("#fylx").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//fjjn
var fjjn;
$(function () {
    window['g'] =
        fjjn = $("#fjjn").ligerGrid({
                columns: [

                    {display: '罚金缴纳', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    fjjn.setParm("str","fjjn");
    fjjn = $("#fjjn").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//户口分类
var hkfl;
$(function () {
    window['g'] =
        hkfl = $("#hkfl").ligerGrid({
                columns: [

                    {display: '户口分类', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:280,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    hkfl.setParm("str","hkfl");
    hkfl = $("#hkfl").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });

});


//流窜类别
var escaped_type;
$(function () {
    window['g'] =
        escaped_type = $("#escaped_type").ligerGrid({
                columns: [

                    {display: '流窜类别', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    escaped_type.setParm("str","escaped_type");
    escaped_type = $("#escaped_type").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var old_criminal_type;
$(function () {
    window['g'] =
        old_criminal_type = $("#old_criminal_type").ligerGrid({
                columns: [

                    {display: '原押犯类别', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    old_criminal_type.setParm("str","old_criminal_type");
    old_criminal_type = $("#old_criminal_type").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var new_criminal_type;
$(function () {
    window['g'] =
        new_criminal_type = $("#new_criminal_type").ligerGrid({
                columns: [

                    {display: '现押犯类别', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    new_criminal_type.setParm("str","new_criminal_type");
    new_criminal_type = $("#new_criminal_type").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var managelevel_id;
$(function () {
    window['g'] =
        managelevel_id = $("#managelevel_id").ligerGrid({
                columns: [

                    {display: '分管等级', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:280,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    managelevel_id.setParm("str","managelevel_id");
    managelevel_id = $("#managelevel_id").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var sddj;
$(function () {
    window['g'] =
        sddj = $("#sddj").ligerGrid({
                columns: [

                    {display: '三涉', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    sddj.setParm("str","sddj");
    sddj = $("#sddj").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var ssdj;
$(function () {
    window['g'] =
        ssdj = $("#ssdj").ligerGrid({
                columns: [

                    {display: '四史', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    ssdj.setParm("str","ssdj");
    ssdj = $("#ssdj").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var zyzw;
$(function () {
    window['g'] =
        zyzw = $("#zyzw").ligerGrid({
                columns: [

                    {display: '长员职位', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    zyzw.setParm("str","zyzw");
    zyzw = $("#zyzw").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var health;
$(function () {
    window['g'] =
        health = $("#health").ligerGrid({
                columns: [

                    {display: '健康状况', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    health.setParm("str","health");
    health = $("#health").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var ldgw;
$(function () {
    window['g'] =
        ldgw = $("#ldgw").ligerGrid({
                columns: [

                    {display: '劳动岗位', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    ldgw.setParm("str","ldgw");
    ldgw = $("#ldgw").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var mj;
$(function () {
    window['g'] =
        mj = $("#mj").ligerGrid({
                columns: [

                    {display: '查询密级', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    mj.setParm("str","mj");
    mj = $("#mj").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});

//
var pxcd;
$(function () {
    window['g'] =
        pxcd = $("#pxcd").ligerGrid({
                columns: [

                    {display: '减刑尺度', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    pxcd.setParm("str","pxcd");
    pxcd = $("#pxcd").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var zm;
$(function () {
    window['g'] =
        zm = $("#zm").ligerGrid({
                columns: [

                    {display: '罪名', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    zm.setParm("str","zm");
    zm = $("#zm").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var czzl;
$(function () {
    window['g'] =
        czzl = $("#czzl").ligerGrid({
                columns: [

                    {display: '新收/常押', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    czzl.setParm("str","czzl");
    czzl = $("#czzl").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});
//
var zxdl;
$(function () {
    window['g'] =
        zxdl = $("#zxdl").ligerGrid({
                columns: [

                    {display: '注销倒流', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    zxdl.setParm("str","zxdl");
    zxdl = $("#zxdl").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });



});

/**
 * 以下方法关联地区字典，gird适用同一条api,需要传递不同的参数即可
 */
var areaURL = '/api/xitongguanli/shujutongjiarea/str';
var csqh;
$(function () {
    window['g'] =
        csqh = $("#csqh").ligerGrid({
                columns: [

                    {display: '出生地点', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    csqh.setParm("str","csqh");
    csqh = $("#csqh").ligerGrid({
        url: areaURL,
        dataAction: 'server' //服务器处理
    });



});
var jgqh;
$(function () {
    window['g'] =
        jgqh = $("#jgqh").ligerGrid({
                columns: [

                    {display: '籍贯', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jgqh.setParm("str","jgqh");
    jgqh = $("#jgqh").ligerGrid({
        url: areaURL,
        dataAction: 'server' //服务器处理
    });



});
var hjqh;
$(function () {
    window['g'] =
        hjqh = $("#hjqh").ligerGrid({
                columns: [

                    {display: '行政区划', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    hjqh.setParm("str","hjqh");
    hjqh = $("#hjqh").ligerGrid({
        url: areaURL,
        dataAction: 'server' //服务器处理
    });



});
var jtqh;
$(function () {
    window['g'] =
        jtqh = $("#jtqh").ligerGrid({
                columns: [

                    {display: '家庭区域', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jtqh.setParm("str","jtqh");
    jtqh = $("#jtqh").ligerGrid({
        url: areaURL,
        dataAction: 'server' //服务器处理
    });



});
var dbqh;
$(function () {
    window['g'] =
        dbqh = $("#dbqh").ligerGrid({
                columns: [

                    {display: '逮捕地区', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    dbqh.setParm("str","dbqh");
    dbqh = $("#dbqh").ligerGrid({
        url: areaURL,
        dataAction: 'server' //服务器处理
    });



});
var ysqh;
$(function () {
    window['g'] =
        ysqh = $("#ysqh").ligerGrid({
                columns: [

                    {display: '判决地点', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    ysqh.setParm("str","ysqh");
    ysqh = $("#ysqh").ligerGrid({
        url: areaURL,
        dataAction: 'server' //服务器处理
    });

});
////////////////////////////add/////////////////////////////////////////////////////
var zsqh;
$(function () {
    window['g'] =
        zsqh = $("#zsqh").ligerGrid({
                columns: [

                    {display: 'zsqh', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    zsqh.setParm("str","zsqh");
    zsqh = $("#zsqh").ligerGrid({
        url: areaURL,
        dataAction: 'server' //服务器处理
    });

});
//qsqh
var qsqh;
$(function () {
    window['g'] =
        qsqh = $("#qsqh").ligerGrid({
                columns: [

                    {display: 'qsqh', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    qsqh.setParm("str","qsqh");
    qsqh = $("#qsqh").ligerGrid({
        url: areaURL,
        dataAction: 'server' //服务器处理
    });

});

//团伙犯罪类别apiURL
var thfz;
$(function () {
    window['g'] =
        thfz = $("#thfz").ligerGrid({
                columns: [

                    {display: '团伙犯罪类别', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    thfz.setParm("str","thfz");
    thfz = $("#thfz").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });
});
//犯罪时是否成年
var cnbz;
$(function () {
    window['g'] =
        cnbz = $("#cnbz").ligerGrid({
                columns: [

                    {display: '犯罪时成年/未成年', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    cnbz.setParm("str","cnbz");
    cnbz = $("#cnbz").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });
});
//家庭状况
var jtzk;
$(function () {
    window['g'] =
        jtzk = $("#jtzk").ligerGrid({
                columns: [

                    {display: '家庭状况', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jtzk.setParm("str","jtzk");
    jtzk = $("#jtzk").ligerGrid({
        url: apiURL,
        dataAction: 'server' //服务器处理
    });
});


/**
 * 以下统计使用的是strApi
 */
var strApi='/api/xitongguanli/shujutongjistring/string';
//剥政年限
var bznx;
$(function () {
    window['g'] =
        bznx = $("#bznx").ligerGrid({
                columns: [

                    {display: '剥政年限', name: 'name', width: 215, align: 'left',
                        render:function(rowdata){
                            if (!!rowdata.name){
                                return get_bznx(rowdata.name);
                            }
                        }

                    },
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:392,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    bznx.setParm("str","bznx");
    bznx = $("#bznx").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});
//逮捕机关-dbmx
var dbmx;
$(function () {
    window['g'] =
        dbmx = $("#dbmx").ligerGrid({
                columns: [

                    {display: '逮捕机关', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    dbmx.setParm("str","dbmx");
    dbmx = $("#dbmx").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});
//判决机关
var ysmx;
$(function () {
    window['g'] =
        ysmx = $("#ysmx").ligerGrid({
                columns: [

                    {display: '判决机关', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    ysmx.setParm("str","ysmx");
    ysmx = $("#ysmx").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});
//判决机关2-zsmx
var zsmx;
$(function () {
    window['g'] =
        zsmx = $("#zsmx").ligerGrid({
                columns: [

                    {display: '判决机关2', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    zsmx.setParm("str","zsmx");
    zsmx = $("#zsmx").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});
//判决字号－yssm
var yssm;
$(function () {
    window['g'] =
        yssm = $("#yssm").ligerGrid({
                columns: [

                    {display: '判决字号', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    yssm.setParm("str","yssm");
    yssm = $("#yssm").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});
//判决字号2-zssm
var zssm;
$(function () {
    window['g'] =
        zssm = $("#zssm").ligerGrid({
                columns: [

                    {display: '判决字号2', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    zssm.setParm("str","zssm");
    zssm = $("#zssm").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});
//起诉机关-
var qsmx;
$(function () {
    window['g'] =
        qsmx = $("#qsmx").ligerGrid({
                columns: [

                    {display: '起诉机关', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    qsmx.setParm("str","qsmx");
    qsmx = $("#qsmx").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});
//起诉字号－
var qssm;
$(function () {
    window['g'] =
        qssm = $("#qssm").ligerGrid({
                columns: [

                    {display: '起诉字号', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    qssm.setParm("str","qssm");
    qssm = $("#qssm").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});
//所学专业－　
var zy;
$(function () {
    window['g'] =
        zy = $("#zy").ligerGrid({
                columns: [

                    {display: '所学专业', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    zy.setParm("str","zy");
    zy = $("#zy").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});
//有无上诉-ss
var ss;
$(function () {
    window['g'] =
        ss = $("#ss").ligerGrid({
                columns: [

                    {display: '有无上诉', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    ss.setParm("str","ss");
    ss = $("#ss").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});
//终审情况-
var zsqk;
$(function () {
    window['g'] =
        zsqk = $("#zsqk").ligerGrid({
                columns: [

                    {display: '终审情况', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    zsqk.setParm("str","zsqk");
    zsqk = $("#zsqk").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});

//派出所
var pcs;
$(function () {
    window['g'] =
        pcs = $("#pcs").ligerGrid({
                columns: [

                    {display: '派出所', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    pcs.setParm("str","pcs");
    pcs = $("#pcs").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });
});

//勤杂分工
var nwfg;
$(function () {
    window['g'] =
        nwfg = $("#nwfg").ligerGrid({
                columns: [

                    {display: '勤杂分工', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    nwfg.setParm("str","nwfg");
    nwfg = $("#nwfg").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });



});

//监舍号
var jsh;
$(function () {
    window['g'] =
        jsh = $("#jsh").ligerGrid({
                columns: [

                    {display: '监舍号', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jsh.setParm("str","jsh");
    jsh = $("#jsh").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });



});
//工种
var gz;
$(function () {
    window['g'] =
        gz = $("#gz").ligerGrid({
                columns: [

                    {display: '工种', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    gz.setParm("str","gz");
    gz = $("#gz").ligerGrid({
        url: strApi,
        dataAction: 'server' //服务器处理
    });



});

//社会关系统计;api统计的是社会关系表的数据,
var shehuiguanxi;
$(function () {
    window['g'] =
        shehuiguanxi = $("#shehuiguanxi").ligerGrid({
                columns: [

                    {display: '社会关系', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:500,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
                url: '/api/xitongguanli/shujutongjistring/shehuiguanxi',
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



/////////////////////////////////////////////////////////////////////////////////////
/**
 * JDBC连接客户机，数据对比grid
 */

/**
 *监区/分监区字典
 *  */
//在押标志
var jdbc_zybz
//是否在押
$(function () {
    window['g'] =
        jdbc_zybz = $("#jdbc_zybz").ligerGrid({
                columns: [

                    {display: '是否在押', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height: 168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
                url: '/api/xitongguanli/shujutongji/jdbc/zybz',
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

var jdbc_db
//监区
$(function () {
    window['g'] =
        jdbc_db = $("#jdbc_db").ligerGrid({
                columns: [

                    {display: '监区', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }
                    }
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:700,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
                url: '/api/xitongguanli/shujutongji/jdbc/jianqu',
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

var jdbc_db2//分监区

/**
 * 通用字典
 */
var jdbcApiUrl = '/api/xitongguanli/shujutongji/jdbc/dict';

//性别
var jdbc_xb;
$(function () {
    window['g'] =
        jdbc_xb = $("#jdbc_xb").ligerGrid({
                columns: [
                    {display: '性别', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_xb.setParm("jdbcstr","xb");
    jdbc_xb = $("#jdbc_xb").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//累惯犯
var jdbc_lgf;
$(function () {
    window['g'] =
        jdbc_lgf = $("#jdbc_lgf").ligerGrid({
                columns: [
                    {display: '累惯犯', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_lgf.setParm("jdbcstr","lgf");
    jdbc_lgf = $("#jdbc_lgf").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//政治面貌
var jdbc_bqmm;
$(function () {
    window['g'] =
        jdbc_bqmm = $("#jdbc_bqmm").ligerGrid({
                columns: [
                    {display: '政治面貌', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:308,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_bqmm.setParm("jdbcstr","bqmm");
    jdbc_bqmm = $("#jdbc_bqmm").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//罪名
var jdbc_zm;
$(function () {
    window['g'] =
        jdbc_zm = $("#jdbc_zm").ligerGrid({
                columns: [
                    {display: '罪名', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_zm.setParm("jdbcstr","zm");
    jdbc_zm = $("#jdbc_zm").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//剥政年限
var jdbc_bznx;
$(function () {
    window['g'] =
        jdbc_bznx = $("#jdbc_bznx").ligerGrid({
                columns: [
                    {display: '剥政年限', name: 'name', width: 215, align: 'left',
                        render:function(rowdata){
                            if (!!rowdata.name){
                                return get_bznx(rowdata.name);
                            }
                        }},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:392,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_bznx.setParm("jdbcstr","bznx");
    jdbc_bznx = $("#jdbc_bznx").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//民族
var jdbc_mz;
$(function () {
    window['g'] =
        jdbc_mz = $("#jdbc_mz").ligerGrid({
                columns: [
                    {display: '民族', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_mz.setParm("jdbcstr","mz");
    jdbc_mz = $("#jdbc_mz").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//婚姻状况
var jdbc_hy;
$(function () {
    window['g'] =
        jdbc_hy = $("#jdbc_hy").ligerGrid({
                columns: [
                    {display: '婚姻状况', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:285,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_hy.setParm("jdbcstr","hy");
    jdbc_hy = $("#jdbc_hy").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//户口分类
var jdbc_hkfl;
$(function () {
    window['g'] =
        jdbc_hkfl = $("#jdbc_hkfl").ligerGrid({
                columns: [
                    {display: '户口分类', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:280,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_hkfl.setParm("jdbcstr","hkfl");
    jdbc_hkfl = $("#jdbc_hkfl").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//新收常押
var jdbc_czzl;
$(function () {
    window['g'] =
        jdbc_czzl = $("#jdbc_czzl").ligerGrid({
                columns: [
                    {display: '新收/常押', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_czzl.setParm("jdbcstr","czzl");
    jdbc_czzl = $("#jdbc_czzl").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//注销倒流
var jdbc_zxdl;
$(function () {
    window['g'] =
        jdbc_zxdl = $("#jdbc_zxdl").ligerGrid({
                columns: [
                    {display: '注销倒流', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_zxdl.setParm("jdbcstr","zxdl");
    jdbc_zxdl = $("#jdbc_zxdl").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//流窜类别
var jdbc_lclb;
$(function () {
    window['g'] =
        jdbc_lclb = $("#jdbc_lclb").ligerGrid({
                columns: [
                    {display: '流窜类别', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_lclb.setParm("jdbcstr","lclb");
    jdbc_lclb = $("#jdbc_lclb").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//监舍号
var jdbc_jsh;
$(function () {
    window['g'] =
        jdbc_jsh = $("#jdbc_jsh").ligerGrid({
                columns: [
                    {display: '监舍号', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_jsh.setParm("jdbcstr","jsh");
    jdbc_jsh = $("#jdbc_jsh").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//工种
var jdbc_gz;
$(function () {
    window['g'] =
        jdbc_gz = $("#jdbc_gz").ligerGrid({
                columns: [
                    {display: '工种', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_gz.setParm("jdbcstr","gz");
    jdbc_gz = $("#jdbc_gz").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//派出所
var jdbc_pcs;
$(function () {
    window['g'] =
        jdbc_pcs = $("#jdbc_pcs").ligerGrid({
                columns: [
                    {display: '派出所', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_pcs.setParm("jdbcstr","pcs");
    jdbc_pcs = $("#jdbc_pcs").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//减刑尺度
var jdbc_pxcd;
$(function () {
    window['g'] =
        jdbc_pxcd = $("#jdbc_pxcd").ligerGrid({
                columns: [
                    {display: '减刑尺度', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_pxcd.setParm("jdbcstr","pxcd");
    jdbc_pxcd = $("#jdbc_pxcd").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//密级
var jdbc_mj;
$(function () {
    window['g'] =
        jdbc_mj = $("#jdbc_mj").ligerGrid({
                columns: [
                    {display: '查询密级', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_mj.setParm("jdbcstr","mj");
    jdbc_mj = $("#jdbc_mj").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//分管等级
var jdbc_fgdj;
$(function () {
    window['g'] =
        jdbc_fgdj = $("#jdbc_fgdj").ligerGrid({
                columns: [
                    {display: '分管等级', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:280,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_fgdj.setParm("jdbcstr","fgdj");
    jdbc_fgdj = $("#jdbc_fgdj").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//原押犯类别
var jdbc_yaflb;
$(function () {
    window['g'] =
        jdbc_yaflb = $("#jdbc_yaflb").ligerGrid({
                columns: [
                    {display: '原押犯类别', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_yaflb.setParm("jdbcstr","yaflb");
    jdbc_yaflb = $("#jdbc_yaflb").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//现押犯类别
var jdbc_xaflb;
$(function () {
    window['g'] =
        jdbc_xaflb = $("#jdbc_xaflb").ligerGrid({
                columns: [
                    {display: '现押犯类别', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_xaflb.setParm("jdbcstr","xaflb");
    jdbc_xaflb = $("#jdbc_xaflb").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//分押类型
var jdbc_fylx;
$(function () {
    window['g'] =
        jdbc_fylx = $("#jdbc_fylx").ligerGrid({
                columns: [
                    {display: '分押类型', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:280,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_fylx.setParm("jdbcstr","fylx");
    jdbc_fylx = $("#jdbc_fylx").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//勤杂分工
var jdbc_nwfg;
$(function () {
    window['g'] =
        jdbc_nwfg = $("#jdbc_nwfg").ligerGrid({
                columns: [
                    {display: '勤杂分工', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_nwfg.setParm("jdbcstr","nwfg");
    jdbc_nwfg = $("#jdbc_nwfg").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//原 文化程度
var jdbc_bqwhcd;
$(function () {
    window['g'] =
        jdbc_bqwhcd = $("#jdbc_bqwhcd").ligerGrid({
                columns: [
                    {display: '原文化程度', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_bqwhcd.setParm("jdbcstr","bqwhcd");
    jdbc_bqwhcd = $("#jdbc_bqwhcd").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//现文化程度
var jdbc_xwhcd;
$(function () {
    window['g'] =
        jdbc_xwhcd = $("#jdbc_xwhcd").ligerGrid({
                columns: [
                    {display: '现文化程度', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_xwhcd.setParm("jdbcstr","xwhcd");
    jdbc_xwhcd = $("#jdbc_xwhcd").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//职业
var jdbc_bqzy;
$(function () {
    window['g'] =
        jdbc_bqzy = $("#jdbc_bqzy").ligerGrid({
                columns: [
                    {display: '职业', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_bqzy.setParm("jdbcstr","bqzy");
    jdbc_bqzy = $("#jdbc_bqzy").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//罚金缴纳
var jdbc_fjjn;
$(function () {
    window['g'] =
        jdbc_fjjn = $("#jdbc_fjjn").ligerGrid({
                columns: [
                    {display: '罚金缴纳', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:168,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_fjjn.setParm("jdbcstr","fjjn");
    jdbc_fjjn = $("#jdbc_fjjn").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//团伙犯罪类别
var jdbc_thfz;
$(function () {
    window['g'] =
        jdbc_thfz = $("#jdbc_thfz").ligerGrid({
                columns: [
                    {display: '团伙犯罪类别', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_thfz.setParm("jdbcstr","thfz");
    jdbc_thfz = $("#jdbc_thfz").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//行政区划
var jdbc_zsqh;
$(function () {
    window['g'] =
        jdbc_zsqh = $("#jdbc_zsqh").ligerGrid({
                columns: [
                    {display: 'zsqh', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_zsqh.setParm("jdbcstr","zsqh");
    jdbc_zsqh = $("#jdbc_zsqh").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//犯罪时成年/未成年
var jdbc_cnbz;
$(function () {
    window['g'] =
        jdbc_cnbz = $("#jdbc_cnbz").ligerGrid({
                columns: [
                    {display: '犯罪时成年/未成年', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_cnbz.setParm("jdbcstr","cnbz");
    jdbc_cnbz = $("#jdbc_cnbz").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//家庭状况
var jdbc_jtzk;
$(function () {
    window['g'] =
        jdbc_jtzk = $("#jdbc_jtzk").ligerGrid({
                columns: [
                    {display: '家庭状况', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_jtzk.setParm("jdbcstr","jtzk");
    jdbc_jtzk = $("#jdbc_jtzk").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});


/**
 * 地区字典
 */
var jdbc_area_url='';
//行政区化-家庭区域
var jdbc_jtqh;
$(function () {
    window['g'] =
        jdbc_jtqh = $("#jdbc_jtqh").ligerGrid({
                columns: [
                    {display: '家庭区域', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_jtqh.setParm("jdbcstr","jtqh");
    jdbc_jtqh = $("#jdbc_jtqh").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//行政区化-出生地点
var jdbc_csqh;
$(function () {
    window['g'] =
        jdbc_csqh = $("#jdbc_csqh").ligerGrid({
                columns: [
                    {display: '出生地点', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_csqh.setParm("jdbcstr","csqh");
    jdbc_csqh = $("#jdbc_csqh").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//籍贯
var jdbc_jgqh;
$(function () {
    window['g'] =
        jdbc_jgqh = $("#jdbc_jgqh").ligerGrid({
                columns: [
                    {display: '籍贯', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_jgqh.setParm("jdbcstr","jgqh");
    jdbc_jgqh = $("#jdbc_jgqh").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//行政区划
var jdbc_hjqh;
$(function () {
    window['g'] =
        jdbc_hjqh = $("#jdbc_hjqh").ligerGrid({
                columns: [
                    {display: '行政区划', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_hjqh.setParm("jdbcstr","hjqh");
    jdbc_hjqh = $("#jdbc_hjqh").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//行政区划-逮捕地区
var jdbc_dbqh;
$(function () {
    window['g'] =
        jdbc_dbqh = $("#jdbc_dbqh").ligerGrid({
                columns: [
                    {display: '逮捕地区', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_dbqh.setParm("jdbcstr","dbqh");
    jdbc_dbqh = $("#jdbc_dbqh").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//判决地点-
var jdbc_ysqh;
$(function () {
    window['g'] =
        jdbc_ysqh = $("#jdbc_ysqh").ligerGrid({
                columns: [
                    {display: '判决地点', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_ysqh.setParm("jdbcstr","ysqh");
    jdbc_ysqh = $("#jdbc_ysqh").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//jdbc_qsqh
var jdbc_qsqh;
$(function () {
    window['g'] =
        jdbc_qsqh = $("#jdbc_qsqh").ligerGrid({
                columns: [
                    {display: 'qsqh', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_qsqh.setParm("jdbcstr","qsqh");
    jdbc_qsqh = $("#jdbc_qsqh").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//三涉
var jdbc_sddj;
$(function () {
    window['g'] =
        jdbc_sddj = $("#jdbc_sddj").ligerGrid({
                columns: [
                    {display: '三涉', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_sddj.setParm("jdbcstr","sddj");
    jdbc_sddj = $("#jdbc_sddj").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//四史
var jdbc_ssdj;
$(function () {
    window['g'] =
        jdbc_ssdj = $("#jdbc_ssdj").ligerGrid({
                columns: [
                    {display: '四史', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_ssdj.setParm("jdbcstr","ssdj");
    jdbc_ssdj = $("#jdbc_ssdj").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//new add 2016-06-01
//逮捕机关
var jdbc_dbmx;
$(function () {
    window['g'] =
        jdbc_dbmx = $("#jdbc_dbmx").ligerGrid({
                columns: [
                    {display: '逮捕机关', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_dbmx.setParm("jdbcstr","dbmx");
    jdbc_dbmx = $("#jdbc_dbmx").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//判决机关
var jdbc_ysmx;
$(function () {
    window['g'] =
        jdbc_ysmx = $("#jdbc_ysmx").ligerGrid({
                columns: [
                    {display: '判决机关', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_ysmx.setParm("jdbcstr","ysmx");
    jdbc_ysmx = $("#jdbc_ysmx").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//jdbc_zsmx判决机关2
var jdbc_zsmx;
$(function () {
    window['g'] =
        jdbc_zsmx = $("#jdbc_zsmx").ligerGrid({
                columns: [
                    {display: '判决机关2', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_zsmx.setParm("jdbcstr","zsmx");
    jdbc_zsmx = $("#jdbc_zsmx").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//判决字号-
var jdbc_yssm;
$(function () {
    window['g'] =
        jdbc_yssm = $("#jdbc_yssm").ligerGrid({
                columns: [
                    {display: '判决字号', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_yssm.setParm("jdbcstr","yssm");
    jdbc_yssm = $("#jdbc_yssm").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//判决字号2
var jdbc_zssm;
$(function () {
    window['g'] =
        jdbc_zssm = $("#jdbc_zssm").ligerGrid({
                columns: [
                    {display: '判决字号2', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_zssm.setParm("jdbcstr","zssm");
    jdbc_zssm = $("#jdbc_zssm").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//--起诉机关
var jdbc_qsmx;
$(function () {
    window['g'] =
        jdbc_qsmx = $("#jdbc_qsmx").ligerGrid({
                columns: [
                    {display: '起诉机关', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_qsmx.setParm("jdbcstr","qsmx");
    jdbc_qsmx = $("#jdbc_qsmx").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//--起诉字号
var jdbc_qssm;
$(function () {
    window['g'] =
        jdbc_qssm = $("#jdbc_qssm").ligerGrid({
                columns: [
                    {display: '起诉字号', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_qssm.setParm("jdbcstr","qssm");
    jdbc_qssm = $("#jdbc_qssm").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//--所学专业
var jdbc_zy;
$(function () {
    window['g'] =
        jdbc_zy = $("#jdbc_zy").ligerGrid({
                columns: [
                    {display: '所学专业', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_zy.setParm("jdbcstr","zy");
    jdbc_zy = $("#jdbc_zy").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//-jdbc_ss-有无上诉
var jdbc_ss;
$(function () {
    window['g'] =
        jdbc_ss = $("#jdbc_ss").ligerGrid({
                columns: [
                    {display: '有无上诉', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_ss.setParm("jdbcstr","ss");
    jdbc_ss = $("#jdbc_ss").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});
//-终审情况
var jdbc_zsqk;
$(function () {
    window['g'] =
        jdbc_zsqk = $("#jdbc_zsqk").ligerGrid({
                columns: [
                    {display: '终审情况', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:644,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
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
    //传递参数给后台
    jdbc_zsqk.setParm("jdbcstr","zsqk");
    jdbc_zsqk = $("#jdbc_zsqk").ligerGrid({
        url: jdbcApiUrl,
        dataAction: 'server' //服务器处理
    });

});

//社会关系
var jdbc_shehuiguanxi;
$(function () {
    window['g'] =
        jdbc_shehuiguanxi = $("#jdbc_shehuiguanxi").ligerGrid({
                columns: [
                    {display: '关系', name: 'name', width: 215, align: 'left'},
                    {display: '统计', name: 'counts', width: 175,  align: 'left',
                        totalSummary:{
                            align:'right',
                            type:'sum',
                            render:function(e){
                                return "<div style='text-align: left'>合计"+ e.sum + "</div>";
                            }
                        }}
                ],
                //pageSizeOptions: [10, 20, 50, 100],
                checkbox: false,
                height:500,
                width: 440,
                //pageSize: 20,
                record: 'total',
                headerRowHeight:25,
                rownumbers: true,
                url: '/api/xitongguanli/shujutongji/jdbc/shehuiguanxi',
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
}