var dialog = frameElement.dialog; //调用页面的dialog对象(ligerui对象)

$(function ()
{

    $.getJSON("/xitongguanli/member/group/getlist", function(res){

        var a = new Array();
        var items=res['items'];
        $.each(items, function(n, value) {

            var id=value["id"];
            var text=value["name"];
            var idString   = id.toString();
            var textString = text.toString();
            var obj={"text":textString,"id":idString};
            a.push(obj);

        });


        var dialogData = dialog.get('data');
        var alreadyGroup= new Array();
        $.getJSON("/api/xitongguanli/member/show/"+dialogData.id, function(Groups){

            $.each(Groups, function(n, value) {
                var id=value["id"];
                var text=value["name"];
                var idString   = id.toString();
                var textString=text.toString();
                var obj={"text":textString,"id":idString};
                alreadyGroup.push(obj);
            });



            var notIn = a.filter( function( el ) {
                //console.log(a)
                var t=true;
                $.each(alreadyGroup, function(n, value) {
                    var id=value["id"];
                    var elid=el["id"];
                    if(id===elid){
                        t=false
                    }
                });
                return t;
            } );


            $("#listbox1").ligerListBox({
                isShowCheckBox: true, isMultiSelect: true,
                data:notIn, valueFieldID: 'test2',
                height:280
            });
            //console.log($("#listbox1").data)
            $("#listbox2").ligerListBox({
                isShowCheckBox: true, isMultiSelect: true,
                data:alreadyGroup, valueFieldID: 'test2',
                height:280
            });
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

    if (!shouldSaveDataArray || !shouldSaveDataArray.length) {
        alert("请至少选择一个用户组");
        return;
    }

    var postData={groupId:shouldSaveDataArray};
    // postData['roleId']=shouldSaveDataArray;

    //console.log( postData);


    $.ajax({
        type: 'POST',
        url: '/api/xitongguanli/member/group/maintains/'+dialogData.id,
        data: postData,
        success: function(res){
            res = JSON.parse(res);
            if(res.notice=='success'){
                $(".notice_sucess",window.parent.document).addClass("alert-success");
                $(".notice_sucess",window.parent.document).addClass("alert");
                $(".notice_sucess",window.parent.document).html("用户组设定成功！");
                window.parent.reload();
                dialog.close();
            }else{
                $('.notice').html(res.message);
            }
        }
    });

}
