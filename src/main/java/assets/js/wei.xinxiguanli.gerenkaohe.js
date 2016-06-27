var manager;
$(function () {
    var id = window.parent.wei.selectedCriminal;
    window['g'] =
        manager = $("#maingrid").ligerGrid({
                columns: [
                    {display: '考核日期', name: 'khrq', width: 80, align: 'left', type: 'date', frozen: true, isSort: true},
                    {
                        display: '分监区考核', columns: [
                        {display: '奖分', name: 'fjqjf', align: 'left', width: 35, type: 'int_fenshu'},
                        {display: '扣分', name: 'fjqkf', align: 'left', width: 35, type: 'int_fenshu'}
                    ]
                    },
                    {
                        display: '监区考核分数', columns: [
                        {display: '监区得分', name: 'jqsdf', align: 'left', width: 60, type: 'int_fenshu'},
                        {display: '监区专项', name: 'jqzxjf', align: 'left', width: 60, type: 'int_fenshu'}
                    ]
                    },
                    {
                        display: '监狱考核分', columns: [
                        {display: '监狱专项', name: 'jyzxjf', align: 'left', width: 60, type: 'int_fenshu'},
                        {display: '监狱扣分', name: 'jykf', align: 'left', width: 60, type: 'int_fenshu'}
                    ]
                    },
                    {
                        display: '风险抵押',
                        columns: [
                            {display: '奖分', name: 'dzjf', align: 'left', width: 35, type: 'int_fenshu'},
                            {display: '扣分', name: 'dzkf', align: 'left', width: 35, type: 'int_fenshu'}
                        ]
                    },
                    {display: '超标否决', name: 'fjf', width: 60, align: 'left', type: 'int_fenshu'},
                    {display: '月实得分', name: 'monsdf', width: 60, align: 'left', type: 'int_fenshu'},
                    {
                        display: '结余变动',
                        columns: [
                            {display: '积分', name: 'jybd_jf', align: 'left', width: 50, type: 'int_fenshu'},
                            {display: '记功', name: 'jybd_jg', align: 'left', width: 50, type: 'int_jigongbiaoyang'},
                            {display: '表扬', name: 'jybd_by', align: 'left', width: 50, type: 'int_jigongbiaoyang'}
                        ]
                    },
                    {display: '奖惩记录', name: 'jcjl', width: 130, align: 'left', type: 'text'},
                    {
                        display: '累计结余',
                        columns: [
                            {display: '积分', name: 'ljjy_jf', minWidth: 50, align: 'left', width: 50, type: 'int_fenshu'},
                            {
                                display: '记功',
                                name: 'ljjy_jg',
                                minWidth: 50,
                                align: 'left',
                                width: 50,
                                type: 'int_jigongbiaoyang'
                            },
                            {
                                display: '表扬',
                                name: 'ljjy_by',
                                minWidth: 50,
                                align: 'left',
                                width: 50,
                                type: 'int_jigongbiaoyang'
                            }
                        ]
                    },
                    {
                        display: '积极分子',
                        columns: [
                            {
                                display: '省级',
                                name: 'slj',
                                align: 'left',
                                minWidth: 70,
                                width: 50,
                                type: 'int_jigongbiaoyang'
                            },
                            {
                                display: '监狱级',
                                name: 'jylj',
                                align: 'left',
                                minWidth: 70,
                                width: 50,
                                type: 'int_jigongbiaoyang'
                            },
                            {
                                display: '监区级',
                                name: 'jqlj',
                                align: 'left',
                                minWidth: 90,
                                width: 50,
                                type: 'int_jigongbiaoyang'
                            }
                        ]
                    }
                ],
                pageSizeOptions: [24, 36, 120],
                height: '97%',
                width: '100%',
                pageSize: 24,
                record: 'total',
                url: '/api/xinxiguanli/gerenkaohe/gerenkaoheList/' + id,
                dataAction: 'server', //服务器处理
                root: 'items',
                usePager: true,       //服务器分页
                method: 'get',
                pagesizeParmName: 'limit',
                alternatingRow: true,
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function () {
                    $.getJSON("/api/xinxi/gerenxinxi/" + id, null, function (res) {
                        var html = "个人考核　　" + "当前犯人：" + res.xm + " | 档案编号：" + res.dabh + "  | 监区：" + res.jianqu.name;
                        //alert(res.dabh)
                        /** @namespace res.fenjianqu */
                        if ("fenjianqu" in res && res.fenjianqu !== null) {
                            html = html + " | 分监区：" + res.fenjianqu.name;
                        }
                        $('#title').html(html);
                    });
                },
                onLoaded: function () {
                    var arry = this.getData();
                    //console.log(arry);
                    if (arry.length == 0) {
                        $(".l-grid-body-inner").html("<p style='padding: 10px; text-align: center'>无相关数据</b>");
                        $(".l-grid-loading").remove();
                    }
                }
            }
        );

});

//gird 格式化--记功,表扬,整数
$.ligerDefaults.Grid.formatters['int_jigongbiaoyang'] = function (value, column) {

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

//如果是0.00,返回0;如果是

$.ligerDefaults.Grid.formatters['int_fenshu'] = function (value, column) {

    var str_data = value;
    //alert(str_data.substr(str_data.length-1,1))
    if (!!str_data) {
        if (str_data.length > 3 && str_data.substr(str_data.length - 3, 3) == '.00') {
            //1.00返回1;0.00返回0;
            return str_data.substr(0, str_data.length - 3)
        } else if (str_data.substr(str_data.length - 2, str_data.length) == '.0') {
            //2.30返回2.3;2.0返回2;
            return str_data.substr(0, str_data.length - 2)
        } else if (str_data.length > 0 && str_data.substr(str_data.length - 1, 1) == '0' && str_data != 0) {
            //3.0;0.0;
            return str_data.substr(0, str_data.length - 1);
        } else {
            return str_data
        }
    } else {
        return '';
    }
};

//
$.ligerDefaults.Grid.formatters['int_fenshu1'] = function (value, column) {
    //1.40;2.65;3.00;0.00;null;0;-23.78;-0.20;
    var str_data = value;

    if (!!str_data) {
        var str_lt = str_data.length;
        if (str_data == '0.00') {
            //0.00
            return '0' + "y=" + str_data
        }
        if (str_data.substr(str_lt - 3, str_lt) == '.00') {
            alert("ss" + value);
            //3.00
            return str_data.substr(0, str_lt - 3) + "y=" + str_data
        }
        if (str_data.substr(str_lt - 1, str_lt) == '0') {
            //1.0/2.10
            alert(value);
            return str_data.substr(0, str_lt - 1) + "y=" + str_data
        }

    } else {
        return ''
    }
};



