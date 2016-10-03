var manager;
        $(function ()
        {
            window['g'] =
            manager = $("#maingrid").ligerGrid({
                columns: [
                //{ display: '编号', name: 'id',width:100, minWidth : 100, align: 'center'},
                { display: '监区', name: 'name',width:150, minWidth : 100, align: 'center'},
                    { display: '编码', name: 'code', minWidth : 50, align: 'center'},
                //{ display: '创建时间', name: 'created', minWidth :
                //    138, align: 'center',type : 'rizhi_date'}
                ],
                height: '99%',
                width: '100%',
                url: '/api/xinxiguanli/renyuanliebiao/getjianqulist',
                root: 'items',
                alternatingRow: true,
                frozen:true,
                method: 'get',
                usePager:false,
                switchPageSizeApplyComboBox: true,
                onBeforeShowData: function ()
                {
                },
                onAfterShowdata: function ()
                {
                },
                onDblClickRow: function (data, rowindex, rowobj) {
                    //确定选择监区
                    var name=data.name;
                    var id=data.id;
                    //console.log(name);
                   window.parent.manager2.selectedText=name;
                   window.parent.manager2.element.value=name;
                   window.parent.manager2.selectedValue=id;
                   //确定监区后自动清空分监区,需要用户重新选择分监区
                   window.parent.manager3.selectedText="";
                   window.parent.manager3.element.value="";
                   window.parent.manager3.selectedValue="";

                    $.ajaxSettings.async = false;
                    //重新初始化分监区

                    var jianqu_id=window.parent.manager2.selectedValue;
                    var parent_window=window.parent;
                    $.getJSON("/api/xinxiguanli/renyuanliebiao/getfenjianqulist/" + jianqu_id+"?randID="+Math.random,function (res) {
                        var tmp = res.items;

                        if (!tmp || !tmp[0])
                        {
                            parent_window.manager3.selectedText = '';
                            parent_window.manager3.element.value = '';
                            parent_window.manager3.selectedValue = '0';
                        }
                        else
                        {
                            var tmpid = tmp[0].id;
                            var tmpvalue = tmp[0].name;

                            parent_window.manager3.selectedText = tmpvalue;
                            parent_window.manager3.element.value = tmpvalue;
                            parent_window.manager3.selectedValue = tmpid;

                        }

                        parent_window.f_selectContactCancel();
                        parent_window.jianqu();
                    });


                }
            }
            );
        });
function f_select()
{
    return g.getSelectedRow();
}
function reload()
{
    manager.reload(1);
}