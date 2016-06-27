var manager;

$(function () {
    var fenjianquId = null;
    $.getJSON("/api/jifenkaohe/common/memberfenjianqus", function (res) {

        var Data = [];
        $.each(res, function (value, name) {
            if (res[value].fenjianqus.length == 0) {
                var jianqu = {'id': res[value].jianquId, "text": res[value].jianquName};//监区
                Data.push(jianqu);
            } else {
                var len = res[value].fenjianqus;
                $.each(len, function (a, b) {
                    var tmmp = {'id': len[a].fenjianquId, "text": res[value].jianquName + "," + len[a].fenjianquName};//分监区
                    Data.push(tmmp);
                });
            }
        });
        //console.log(Data);
        $("#txtPro").before("<label>请选择分监区进行数据录入：</label>");
        manager2 = $("#txtPro").ligerComboBox({
            data: Data,
            isMultiSelect: false,//是否多选
            initIsTriggerEvent: false,
            onSelected: function (value, text) {
                fenjianquId = value;//监区或分监区ID

                var fenjianquApi;
                //需要找一个可以判断的条件,不可以这样写
                if (text.indexOf(",") >= 0) {
                    //alert(1);
                    fenjianquApi = '/api/jifenkaohe/fenjianqu/data/get/' + fenjianquId
                } else {
                    //alert(0);
                    fenjianquApi = '/api/jifenkaohe/fenjianqu/data/getjianqu/' + fenjianquId
                }
                var data = [];
                var columnsArray = [];
                var gridWidth = 0;
                var widthTotal = 0;
                $.ajax({
                    type: 'GET',
                    url: '/api/jifenkaohe/common/kaohexiang/getfenjianqu',//分监区考核项
                    async: true,
                    timeout: 50000,
                    success: function (res) {
                        if (res.notice == 'error') {
                            $('.notice').html(res.message);
                        } else {
                            $('.notice').html("");
                            //拼接固定cid和name两列
                            var columns = [];
                            var bianhao = {};
                            bianhao["display"] = "编号";
                            bianhao["name"] = "cid";
                            bianhao["width"] = 150;
                            bianhao["height"] = 450;
                            bianhao['frozen'] = true;
                            bianhao['isSort'] = true;
                            columns.push(bianhao);
                            //console.log("cidcidcicicicicic111"+bianhao.name);
                            var xingming = {};
                            xingming["display"] = "姓名";
                            xingming["name"] = "name";
                            xingming["width"] = 150;
                            xingming["height"] = 450;
                            xingming["type"] = text;
                            xingming['frozen'] = true;
                            xingming['isSort'] = true;
                            columns.push(xingming);
                            //console.log("nammememeamemme"+xingming.display);
                            //拼接获取考核项
                            $.each(res, function (idx, obj) {
                                //var str=JSON.stringify(obj);
                                // console.log("iterate resource list:"+str);
                                //console.log("zhehisceshi++++"+  res[0].name);
                                var kaohexiang = {};
                                kaohexiang['display'] = obj['name'];//考核项的名称
                                //kaohexiang['id'] = obj['id'];//考核项的id
                                kaohexiang['name'] = obj['id'].toString();//也是考核项的名称/考核项字段
                                kaohexiang['height'] = 200;
                                kaohexiang['type'] = 'currency';
                                kaohexiang['isSort'] = true;
                                kaohexiang['editor'] = {type: 'currency'};//grid编辑框定义
                                kaohexiang['totalSummary'] = {//求和
                                    align: 'left',
                                    type: 'sum',
                                    render: function (e) {
                                        return "<div>合计:" + e.sum + "</div>";
                                    }
                                };
                                //获取最大值
                                var maxValue=obj['max_value'];
                                if (maxValue !== null || maxValue !== undefined || maxValue !== '') {
                                    kaohexiang['max_value']=maxValue;
                                }
                                //获取最小值
                                var minValue=obj['min_value'];
                                if (minValue !== null || minValue !== undefined || minValue !== '') {
                                    kaohexiang['min_value']=minValue;
                                }

                                //获取默认值
                                var defaultValue=obj['default_value'];
                                if (defaultValue !== null || defaultValue !== undefined || defaultValue !== '') {
                                    kaohexiang['default_value']=defaultValue;
                                }
                                columns.push(kaohexiang);
                                //console.log("ddddddddddddddddddd"+kaohexiang.name+kaohexiang.id);
                            });

                            $.each(columns, function (idx2, obj2) {//??????没有起作用

                            });
                            columnsArray = columns;
                            $.ajax({
                                type: 'GET',
                                url: fenjianquApi,//获取考核犯人的Api
                                async: false,
                                timeout: 5000,
                                success: function (data) {
                                    if (data.notice == 'error') {
                                        $('.notice').html(data.message);
                                    } else {
                                        $('.notice').html("");
                                        var obj = data.items;//获取考核犯人
                                        //console.log("-----"+data.items[0].name);
                                        var gridRowData = [];//表格数据
                                        $.each(obj, function (idx2, value) {
                                            var fanrenData = {};
                                            var cid = value['cid'];
                                            var name = value['name'];
                                            fanrenData['cid'] = cid;
                                            fanrenData['name'] = name;
                                            var kaohexiang = {};
                                            kaohexiang = value.kaohefen;
                                            //console.log(fanrenData);
                                            //console.log(kaohexiang);
                                            var newSrc = $.extend({}, fanrenData, kaohexiang);
                                            //console.log(newSrc);
                                            gridRowData.push(newSrc);

                                        });
                                        $.each(columnsArray, function (idx1, obj1) {
                                            //    console.log('grid column Data='+JSON.stringify(obj1));
                                            var columnName=obj1['name'];
                                            //获取默认值
                                            var defaultValue=obj1['default_value'];
                                            if (defaultValue === null || defaultValue == undefined || defaultValue == '') {
                                                return ;
                                            }
                                            //赋默认值
                                            $.each(gridRowData, function (idx2, obj2) {
                                                var value=obj2[columnName];
                                                if (value === null || value == undefined || value == '') {
                                                    obj2[columnName]=defaultValue;
                                                }

                                            });
                                        });
                                        var gridData = {items: gridRowData};//创建带有数据源items的gridData

                                        window['g'] =
                                            manager = $("#maingrid").ligerGrid({
                                                    ColumnEditor: {
                                                        type: 'currency'
                                                    },
                                                    columns: columnsArray,
                                                    record: 'total',
                                                    data: $.extend(true,{},gridData),
                                                    root: 'items',
                                                    alternatingRow: true,
                                                    method: 'get',
                                                    pagesizeParmName: 'limit',
                                                    isScroll: false,
                                                    checkbox: false,
                                                    isSingleCheck: false,//是否单选
                                                    usePager: false,
                                                    dataAction: 'server', //服务器处理
                                                    pageSizeOptions: [10, 20, 50, 100],
                                                    pageSize: 20,
                                                    switchPageSizeApplyComboBox: true,
                                                    width: '100%',
                                                    height: '97%',
                                                    where : f_getWhere(),
                                                toolbar: {
                                                        items: [
                                                            {text: '保存', click: saveItem, icon: 'save'},
                                                            {text: '提交', click: putItem, icon: 'save'}
                                                        ]
                                                    },
                                                    onBeforeShowData: function () {
                                                    },
                                                    onAfterShowdata: function () {
                                                    },
                                                onAfterEdit: f_onAfterEdit
                                                }
                                            );
                                        var id1 = manager2.selectedValue;
                                        var text1 = manager2.selectedText;
                                        //console.log(text);
                                        //console.log(id);
                                        if (text1.indexOf(",") >= 0) {
                                            //alert(1);
                                            panduanApi = '/api/jifenkaohe/fenjianqu/fenjianqukaohe/panduan/' + id1
                                        } else {
                                            //alert(0);
                                            panduanApi = '/api/jifenkaohe/fenjianqu/fenjianqukaohe/panduanjianqu/' + id1
                                        }
                                        $.ajax({
                                            type: "GET",
                                            url: panduanApi,
                                            success: function (panduan) {
                                                if (panduan.notice == "true") {
                                                    manager = $("#maingrid").ligerGrid({
                                                        enabledEdit: true,
                                                        clickToEdit: true
                                                    });
                                                } else {
                                                    $.ligerDialog.alert('该分监区数据已经提交', '提示');
                                                    manager = $("#maingrid").ligerGrid({
                                                        enabledEdit: false,
                                                        clickToEdit: false
                                                    });
                                                }
                                            }
                                        });

                                        //manager.editor.editing=false;
                                        var columns = manager.getColumns();
                                        var ct = 0;
                                        $.each(columns, function (idx2, value) {
                                            ct = ct + value['width'];
                                            //console.log('value='+JSON.stringify(value));
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }

        });
        /**
         *键盘回车进入下一项编辑
         */
        $(document).bind('keydown.grid', function (event) {
            if (event.keyCode == 13) //enter,也可以改成9:tab
            {
                g.endEditToNext();
            }
        });

    });

    /**
     * 保存数据-需要api
     */
    function saveItem() {
        var id = manager2.selectedValue;
        var text = manager2.selectedText;
        //console.log(text);
        //console.log(id);
        var data = manager.getData();
        var valueStr = '';
        //
        $.each(data, function (index, value) {
            var cidValue = value['cid'];
            var str1 = cidValue;
            for (var item in value) {
                if (item != 'cid' && item != 'name') {
                    str1 = str1 + "_" + item + "_" +'0'+ value[item];
                    //   console.log(str1);
                }
                //   console.log("person中"+item+"的值="+value[item]);
            }
            valueStr = valueStr + str1 + '|';
        });
        //console.log(valueStr);

        $.ajax({
            type: 'POST',
            url: '/api/jifenkaohe/fenjianqu/fenjianqukaohe/create/' + fenjianquId,
            data: {"dt": valueStr},
            success: function (res) {
                if (res == '操作成功') {
                    $(".notice").html('保存成功');
                } else if (res.notice) {
                    $.ligerDialog.alert(res.notice, '提示');
                }
            }
        });
    }

    //提交
    function putItem(pup) {
        var id = manager2.selectedValue;
        var text = manager2.selectedText;
        //console.log(text);
        //console.log(id);
        if (text.indexOf(",") >= 0) {
            //alert(1);
            jianquApi = '/api/jifenkaohe/fenjianqu/data/tijiao/' + id
        } else {
            //alert(0);
            jianquApi = '/api/jifenkaohe/fenjianqu/data/tijiaojianqudata/' + id
        }
        $.ajax({
            type: "GET",
            url: panduanApi,
            success: function (res) {
                if (res.notice == "true") {
                    //alert("未提交");
                    $.ligerDialog.confirm('提交数据将不再修改?', function (e) {
                        if (e) {
                            $.ajax({
                                type:'GET',
                                url:jianquApi,
                                success:function(tj){
                                    if (tj.tijiao == "error") {
                                        $.ligerDialog.alert('您还未保存,请先保存！', '提示');
                                    }else {
                                        $(".notice").html('您已提交数据，不可再更改');
                                        manager = $("#maingrid").ligerGrid({
                                            enabledEdit: false,
                                            clickToEdit: false
                                        })
                                    }
                                }
                            })
                        } else {
                            $.ligerDialog.alert('取消提交！', '提示');
                        }
                    });
                } else {
                    //alert("已提交")
                    $.ligerDialog.alert('该分监区数据已经提交', '提示');
                    manager = $("#maingrid").ligerGrid({
                        enabledEdit: false,
                        clickToEdit: false
                    })
                }
            }
        });

    }
});


/**
 * 刷新数据
 */

function reload() {
    manager.reload(1);
}

function f_search()
{
    manager.options.data = $.extend(true, {},manager.options.data);
    manager.loadData(f_getWhere());
}
function f_getWhere()
{
    if (!manager) return null;
    var clause = function (rowdata, rowindex)
    {
        var key = $("#txtKey").val();
        return rowdata.name.indexOf(key) > -1;
    };
    return clause;
}

