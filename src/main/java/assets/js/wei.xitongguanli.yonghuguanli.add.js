var eee;
$(function () {
    $.validator.addMethod(
        "notnull",
        function (value, element, regexp) {
            if (!value) return true;
            return !$(element).hasClass("l-text-field-null");
        },
        "不能为空"
    );
    $.metadata.setType("attr", "validate");
    var v = $("form").validate({
        //调试状态，不会提交数据的
        debug: true,
        errorPlacement: function (lable, element) {
            if (element.hasClass("l-textarea")) {
                element.addClass("l-textarea-invalid");
            }
            else if (element.hasClass("l-text-field")) {
                element.parent().addClass("l-text-invalid");
            }
            $(element).removeAttr("title").ligerHideTip();
            $(element).attr("title", lable.html()).ligerTip();
        },
        success: function (lable) {
            var element = $("#" + lable.attr("for"));
            if (element.hasClass("l-textarea")) {
                element.removeClass("l-textarea-invalid");
            }
            else if (element.hasClass("l-text-field")) {
                element.parent().removeClass("l-text-invalid");
            }
            $(element).removeAttr("title").ligerHideTip();
        },
        submitHandler: function () {
            $.ajax({
                type: 'post',
                url: '/api/xitongguanli/member/create',
                data: $("form").serialize(),
                success: function (data) {
                    if (data.notice == "success") {
                        $(".l-bar-button.l-bar-btnload", window.parent.document).click();
//                                $(".notice",window.parent.document).css("color","green");
                        $(".notice_sucess", window.parent.document).addClass("alert-success");
                        $(".notice_sucess", window.parent.document).addClass("alert");
                        $(".notice_sucess", window.parent.document).html("保存成功！");
                        closeDialog();
                    }
                }
            });
        }
    });
    $("form").ligerForm();
});
function closeDialog() {
    parent.$.ligerDialog.close();
    parent.$(".l-dialog,.l-window-mask").css("display", "none");
}
//回车事件
document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.keyCode==13){ // enter 键
        $.ajax({
            type: 'post',
            url: '/api/xitongguanli/member/create',
            data: $("form").serialize(),
            success: function (data) {
                if (data.notice == "success") {
                    $(".l-bar-button.l-bar-btnload", window.parent.document).click();
//                                $(".notice",window.parent.document).css("color","green");
                    $(".notice_sucess", window.parent.document).addClass("alert-success");
                    $(".notice_sucess", window.parent.document).addClass("alert");
                    $(".notice_sucess", window.parent.document).html("保存成功！");
                    closeDialog();
                }
            }
        });
    }
};