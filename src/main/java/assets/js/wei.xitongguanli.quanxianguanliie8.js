var manager;

$(function () {
    var GetLength = function (str) {
        ///<summary>获得字符串实际长度，中文2，英文1</summary>
        ///<param name="str">要获得长度的字符串</param>
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
        //alert(1);
    };
    var data = [];
    var columnsArray = [];
    var gridWidth = 0;
    var widthTotal = 0;
    $.ajax({
        type: 'GET',
        url: '/api/xitongguanli/resource/list?M=' + Math.random(),
        async: true,
        timeout: 50000,
        success: function (res) {
            //  res=JSON.parse(res);
            //   console.log('/api/xitongguanli/resource/list'+':'+res);
            var columns = [];
            var role = {};
            role["display"] = "角色";
            role["name"] = "role";
            role["width"] = 150;
            role["height"] = 450;
            role["frozen"] = false;
            columns.push(role);
            //alert(2);
            $.each(res, function (idx, obj) {
                //var str=JSON.stringify(obj);
                // console.log("iterate resource list:"+str);

                var operationsArray = [];
                var resource = {};
                resource['display'] = obj['name'];
                resource['name'] = obj['id'].toString();

                var operations = obj['operations'];

                if (!!operations) {
                    $.each(operations, function (idx1, obj1) {
                        var operation = {};
                        operation['display'] = obj1['name'];
                        operation['name'] = obj1['id'].toString();
                        operation['minColumnWidth'] = GetLength(operation['display']) * 8;
                        operation['width'] = GetLength(operation['display']) * 8;
                        operation['height'] = 300;
                        widthTotal = widthTotal + operation['width'];
                        operationsArray.push(operation);
                    });
                }


                resource['height'] = 200;
                if (operationsArray.length > 0) {
                    var length = operationsArray.length;
                    //    console.log(length);

                    resource['columns'] = operationsArray;
                } else {
                    resource['width'] = GetLength(resource['display']) * 30;

                    widthTotal = widthTotal + resource['width'];
                }

                columns.push(resource);

            });

            //alert(3);
            $.each(columns, function (idx2, obj2) {

            });


            columnsArray = columns;
            $("#pageloading").hide();
            var renderGridData = function (row, isChecked) {
                //alert(4);
                //   var str=JSON.stringify(row);
                //   console.log("renderGridData column :"+str);
                if (row instanceof Object) {
                    //alert(5);
                    var roleid = row['roleid'];
                    var operationId = row['operationId'];
                    if (isChecked === true)
                        return '<input type=\"checkbox\" name=\"quanxian\" roleid=\"' + row['roleid'] + '\"  operationId=\"' + row['operationId'] + '\" checked=\"checked\" ' + ' value=\"' + roleid + '_' + operationId + '\" />';
                    else {
                        return '<input type=\"checkbox\" name=\"quanxian\" roleid=\"' + row['roleid'] + '\" operationId=\"' + row['operationId'] + '\"  ' + ' value=\"' + roleid + '_' + operationId + '\" />';

                    }
                } else {
                    return row;

                }
            };

            $.ajax({
                type: 'GET',
                url: '/api/xitongguanli/role/all?',
                async: false,
                timeout: 5000,
                success: function (res) {
                    var privilegeColumns = [];
                    //alert(6);
                    $.each(columnsArray, function (idx2, obj2) {
                        if (!!obj2['columns']) {
                            $.each(obj2['columns'], function (idx3, obj3) {
                                var columnDef = {};
                                var name = obj3['name'];

                                columnDef['name'] = name;

                                privilegeColumns.push(columnDef);
                                //  console.log('columnDef='+JSON.stringify(columnDef));
                                //  obj3['render']=renderGridData;
                            });
                        } else {
                            var name = obj2['name'];
                            if (name != 'role') {
                                var columnDef = {};

                                columnDef['name'] = name;

                                privilegeColumns.push(columnDef);
                                //  console.log('columnDef='+JSON.stringify(columnDef));
                            }
                            //   obj2['render']=renderGridData;
                        }
                    });
                    //alert(7);
                    var gridRowData = [];
                    $.each(res, function (idx2, obj2) {

                        var data1 = {};
                        var name = obj2['name'];
                        var id = obj2['id'];

                        data1['role'] = name;

                        var myprivileges = obj2['privileges'];
                        //  console.log((!!myprivileges)+' role='+JSON.stringify(obj2));

                        if (!!myprivileges) {
                            $.each(myprivileges, function (idx3, obj3) {

                                var operation = obj3['operation'];
                                var columnName = operation['id'];
                                var privilegeId = obj3['id'];
                                var t = {};
                                t['privilegeId'] = privilegeId;
                                t['roleid'] = id;
                                t['operationId'] = operation['id'];
                                data1[columnName.toString()] = renderGridData(t, true);
                                //    console.log(' privileges='+JSON.stringify(obj3)+" "+renderGridData(t,true));

                            });
                            $.each(privilegeColumns, function (idx2, obj2) {
                                var name = obj2['name'];

                                if (!!!data1[name.toString()]) {
                                    var t = {};
                                    t['roleid'] = id;
                                    t['operationId'] = name;
                                    data1[name.toString()] = renderGridData(t, false);
                                }
                            });
                        }

                        gridRowData.push(data1);
                        //console.log('data1='+JSON.stringify(data1));
                    });


                    var gridData = {items: gridRowData};
                    //alert(9);
                    window['g'] =
                        manager = $("#maingrid").ligerGrid({
                                columns: columnsArray,
                                pageSizeOptions: [10, 20, 50, 100],
                                width: '99.9%',
                                //width: widthTotal+100,
                                //height: 510,
                                height: '100%',
                                inWindow:true,
                                pageSize: 20,
                                record: 'total',
                                data: gridData,
                                dataAction: 'local', //服务器处理
                                root: 'items',
                                usePager: false,       //服务器分页
                                alternatingRow: true,
                                method: 'get',
                                pagesizeParmName: 'limit',
                                switchPageSizeApplyComboBox: true,
                                toolbar: {
                                    items: [
                                        {text: '保存', click: saveItem, icon: 'save'}
                                    ]
                                },
                                onBeforeShowData: function () {
                                },
                                onAfterShowdata: function () {
                                }
                            }
                        );

                    var columns = manager.getColumns();
                    var ct = 0;

                    $.each(columns, function (idx2, obj2) {
                        ct = ct + obj2['width'];

                        //    console.log('obj2='+JSON.stringify(obj2));
                    });
                    //alert(10);


                }
            });


        }
    });
    //   console.log("columnsArray length="+columnsArray.length);


});

function reload() {
    manager.reload(1);
}

function saveItem() {
    var chk_value = [];//定义一个数组
    $('input[name="quanxian"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
        var obj = $(this);
        var v = $(this).val();
        // console.log(v);
        chk_value.push(v);//将选中的值添加到数组chk_value中


    });
    //  console.log(chk_value.length);
    var blkstr = $.map(chk_value, function (val, index) {
        var str = val;
        return str;
    }).join(":");
    //   console.log(blkstr);
    var jsonData = {};
    jsonData['ids'] = blkstr;
    $("#pageloading").show();
    $.ajax({
        type: 'POST',
        url: '/api/xitongguanli/privilege/savePrivileges?M=' + Math.random(),
        data: jsonData,
        async: true,
        timeout: 50000,
        success: function (res) {
            $("#pageloading").hide();
            if (res.notice == 'success') {
                $(".notice_sucess").addClass("alert-success");
                $(".notice_sucess").addClass("alert");
                $(".alert").css("margin", "0px");
                $(".notice_sucess").html("保存成功！");
            } else {
                $('.notice').html(res.message);
            }
            /**
             res = JSON.parse(res);
             if(res.notice=='success'){
                reload();

            }else{
                $('.notice').html(res.message);
            }
             **/
        }
    });


}

