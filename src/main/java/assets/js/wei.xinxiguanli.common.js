//信息管理图标导航链接
var id = window.parent.wei.selectedCriminal;
$(function(){
    $("#gerenxinxi").attr("href","javascript:window.parent.f_addTab('menu-gerenxinxi', '个人信息', '/xinxiguanli/gerenxinxi/"+id+"')");
    $("#gerenjianli").attr("href","javascript:window.parent.f_addTab('menu-gerenjianli', '个人简历', '/xinxiguanli/gerenjianli/"+id+"')");
    $("#fanzuishishi").attr("href","javascript:window.parent.f_addTab('menu-fanzuishishi', '犯罪事实', '/xinxiguanli/fanzuishishi/"+id+"')");
    $("#shehuiguanxi").attr("href","javascript:window.parent.f_addTab('menu-shehuiguanxi', '社会关系', '/xinxiguanli/shehuiguanxi/"+id+"')");
    $("#qinqinghuijian").attr("href","javascript:window.parent.f_addTab('menu-qinqinghuijian', '亲情会见', '/xinxiguanli/qinqinghuijian/"+id+"')");
    $("#gerenjiangcheng").attr("href","javascript:window.parent.f_addTab('menu-gerenjiangcheng', '个人奖惩', '/xinxiguanli/gerenjiangcheng/"+id+"')");
    $("#chaoshigouwu").attr("href","javascript:window.parent.f_addTab('menu-chaoshigouwu', '超市购物', '/xinxiguanli/chaoshigouwu/"+id+"')");
    $("#gerenzhanghu").attr("href","javascript:window.parent.f_addTab('menu-gerenzhanghu', '个人账户', '/xinxiguanli/gerenzhanghu/"+id+"')");
    $("#qinqingduanxin").attr("href","javascript:window.parent.f_addTab('menu-qinqingduanxin', '亲情短信', '/xinxiguanli/qinqingduanxin/"+id+"')");
    $("#qinqingdianhua").attr("href","javascript:window.parent.f_addTab('menu-qinqingdianhua', '亲情电话', '/xinxiguanli/qinqingdianhua/"+id+"')");
    $("#gerenkaohe").attr("href","javascript:window.parent.f_addTab('menu-gerenkaohe', '个人考核', '/xinxiguanli/gerenkaohe/"+id+"')");
    $("#rujianziliao").attr("href","javascript:window.parent.f_addTab('menu-rujianziliao', '入监资料', '/xinxiguanli/rujianziliao/"+id+"')");
    $("#zhifabiaoge").attr("href","javascript:window.parent.f_addTab('menu-zhifabiaoge', '执法表格', '/xinxiguanli/zhifabiaoge/"+id+"')");
});