var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

$(function ()
{
    var dialogData = dialog.get('data');
    var a = new Array();
    $.getJSON("/api/xitongguanli/fenjianqu/showFenjianquMembers/"+dialogData.id, function(res){

        var fenJianquMembers=res['fenJianquMembers'];

        if(fenJianquMembers.length<1){
            alert("此分监区未分配用户组,请到'系统管理模块'给分监区分配用户组");
        };

        $.each(fenJianquMembers, function(n, value) {//获得member数据

            var id=value["id"];
            var text=value["nickname"];
            var idString   = id.toString();
            var textString=text.toString();
            var obj={"text":textString,"id":idString};
            a.push(obj);
        });

        var alreadyRoles=new Array();
        $.getJSON("/api/xitongguanli/fenjianqu/showFenjianquMember/"+dialogData.id,function(res){

        var kaoheMembers =res['kaoheMembers'];//获取考核人员数据
        $.each(kaoheMembers, function(n, value) {
            var id=value["id"];
            var text=value["nickname"];
            var idString   = id.toString()
            var textString=text.toString();
            var obj={"text":textString,"id":idString};
            alreadyRoles.push(obj);
        });


        var notIn = a.filter( function( el ) {
            var t=true;
            $.each(alreadyRoles, function(n, value) {
                var id=value["id"];
                var elid=el["id"];
                if(id===elid){
                    t=false
                }
            });
            return t;
        } );

/////////////////////////////////////////////////////////////////////
        $("#listbox1").ligerListBox({
            isShowCheckBox: true, isMultiSelect: true,
            data:notIn, valueFieldID: 'test2',
            height:280
        });
        $("#listbox2").ligerListBox({
            isShowCheckBox: true, isMultiSelect: true,
            data:alreadyRoles, valueFieldID: 'test2',
            height:280
        });

//////
    });
    });


});



function moveToLeft()
{
    var box1 = liger.get("listbox1"), box2 = liger.get("listbox2");
    var selecteds = box2.getSelectedItems();
    if (!selecteds || !selecteds.length) return;
    box2.removeItems(selecteds);
    box1.addItems(selecteds);
}
function moveToRight()
{
    var box1 = liger.get("listbox1");
    var box2 = liger.get("listbox2");
    var selecteds = box1.getSelectedItems();
    if (!selecteds || !selecteds.length) return;
    box1.removeItems(selecteds);
    box2.addItems(selecteds);
}
function moveAllToLeft()
{
    var box1 = liger.get("listbox1");
    var box2 = liger.get("listbox2");
    var selecteds = box2.data;
    if (!selecteds || !selecteds.length) return;
    box1.addItems(selecteds);
    box2.removeItems(selecteds);
}
function moveAllToRight()
{
    var box1 = liger.get("listbox1");
    var box2 = liger.get("listbox2");
    var selecteds = box1.data;
    if (!selecteds || !selecteds.length) return;
    box2.addItems(selecteds);
    box1.removeItems(selecteds);

}

function getValue()
{
    //   alert($("#test3").val());
    var box1 = liger.get("listbox1");
    //console.log(  box1.getSelectedItems());
}
function setValue()
{
    liger.get("listbox1").setValue("1;2;5");
}

function save(){

    var dialogData = dialog.get('data');
    var box2 = liger.get("listbox2");
    var shouldSaveData=box2.data;
    var shouldSaveDataArray=new Array();

    if(!!shouldSaveData){
        $.each(shouldSaveData, function(n, value) {
            var id=value["id"];
            shouldSaveDataArray.push(id);

        });
    }

    if (!shouldSaveDataArray || !shouldSaveDataArray.length){
        alert("请至少选择一个用户");
        return;
    }

    var postData={kaoherenId:shouldSaveDataArray};


    //console.log( postData);


    $.ajax({
        type: 'POST',
        url: '/api/jifenkaohe/fenjianqu/member/create/'+dialogData.id,
        data: postData,
        success: function(res){
            res = JSON.parse(res);
            if(res.notice=='success'){
                window.parent.reload();
                dialog.close();//关闭dialog
            }else{
                $('.notice').html(res.message);
            }
        }
    });
}


