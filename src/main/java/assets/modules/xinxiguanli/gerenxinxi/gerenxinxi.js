
define(["avalon","domReady!","mmRequest","weiutils"],function(avalon, domReady,mmRequest, weiutils) {
    var gerenVM= avalon.define({
        $id:"gerenxinxi",
        xinxiguanli:"信息管理",
        title:"个人信息",
        get_id:document.getElementById("get_id").value,
        //个人信息
//        get_id : window.parent.document.getElementById("get_id").value,
         items: {},
         getData : function(){
             avalon.ajax({
                 type : "GET",
                 url : "/api/xinxi/gerenxinxi/"+gerenVM.get_id,
                 success : function(data){
                     var jibenxinxi=[];
                     jibenxinxi.push({
                         id : data.id,
                         xm : weiutils.kongzhi(data.xm),
                         csrq : weiutils.kongzhi(weiutils.dateFormat(data.csrq,0)),//出生日期
                         oldcri : weiutils.kongzhi(data.oldcri),//是否老年犯
                         marialStatus : weiutils.isNull(data.marialStatus),//婚姻状况
                         syzm : weiutils.kongzhi(data.syzm),//罪名
                         newEdu : weiutils.isNull(data.newEdu),//文化程度
                         youngcri: weiutils.kongzhi(data.youngcri),//是否少年犯
                         manageLevel : weiutils.isNull(data.manageLevel),//分管等级
                         jgqh : weiutils.isNull(data.jgqh),//籍贯
                         lgf : weiutils.kongzhi(data.lgf),//是否惯犯
                         duty : weiutils.isNull(data.duty),//长员职位
                         jtqh : weiutils.isNull(data.jtqh),//家庭住址
                         newCriminalType : weiutils.isNull(data.newCriminalType),//现犯案类别
                         health : weiutils.isNull(data.health),//健康状况
                         jyrq : weiutils.kongzhi(weiutils.dateFormat(data.jyrq,0)),//羁押日期
                         dbrq : weiutils.kongzhi(weiutils.dateFormat(data.dbrq,0)),//逮捕日期
                         fylx : weiutils.kongzhi(data.fylx),//分压类别
                         ldgw : weiutils.isNull(data.ldgw),//劳动岗位
                         dbqh : weiutils.isNull(data.dbqh),//逮捕机关
                         ysmx : weiutils.kongzhi(data.ysmx),//判决机关
                         escapedType : weiutils.isNull(data.escapedType),//流窜类别
                         sddj :  weiutils.isNull(data.sddj),//三涉
                         rjrq : weiutils.kongzhi(weiutils.dateFormat(data.rjrq,0)),//入监日期
                         ysxh : weiutils.kongzhi(data.ysxh),//判决字号
                         ssdj : weiutils.isNull(data.ssdj),//四史
                        /////////////////////////////////
                         yxq : weiutils.kongzhi(data.yxq),//原判刑期
                         xq :  weiutils.kongzhi(data.xq),//现有刑期
                         ybznx : weiutils.isNull(data.ybznx),//原附加刑
                         bznx : weiutils.isNull(data.bznx),//现附加刑
                         yqr : weiutils.kongzhi(weiutils.stringDate(data.yqr)),//原刑期起始
                         yzr : weiutils.kongzhi(weiutils.stringDate(data.yzr)),//原刑期终止日期
                         qr : weiutils.kongzhi(weiutils.stringDate(data.qr)),//刑期起始
                         zr : weiutils.kongzhi(weiutils.stringDate(data.zr))//刑期终止日期
                     })
                     gerenVM.items = jibenxinxi;
                     window.parent.avalon.vmodels.pages.getId = data.id;
                     window.parent.avalon.vmodels.lianHao.xm = data.xm;
                     window.parent.avalon.vmodels.lianHao.dabh = data.dabh;
                 }
             })
         },
        /////////////////////////////////////////////
        lh : "联号信息",
        lianhao : {},
        get_lianhaoDate : function(){
            avalon.ajax({
                type : "GET",
                url : "/api/xinxi/gerenxinxi/getlianhao/"+gerenVM.get_id,
                success : function(data){
                    var lianhaoxinxi = [];
                    lianhaoxinxi.push({
                        id : data[0].id,
                        name : weiutils.kongzhi(data[0].name),
                        dabh : weiutils.kongzhi(data[0].dabh)
                    })
                    gerenVM.lianhao = lianhaoxinxi;
                }
            })
        },
        ///////////////////////////////////////////////
        //点击联号信息之后要出现联号信息人的相关信息
        getLianhao :function(){
//            alert("马友书------"),
            var url = "/api/xinxi/gerenxinxi/6400";//这里应该是动态获取
            avalon.get(url,function(data1){
            gerenVM.items= data1;
            });
        },
        //////////////////////////////////////////////
        xq : "刑期变动",//刑期变动表wei_sentence_changement;
        xqbd : {},
        data_xqbd : function(){
            var url = "/api/xinxi/gerenxinxi/getxingqibiandong/"+gerenVM.get_id;
            avalon.get(url,function(data){
            gerenVM.xqbd = data[0];
            })
        },
        yfxsyx:"已服刑/剩余刑期",
        
        //////////////////////////////////
        ///////需要计算出来///////////////
        //////////////////////////////////
        //////////////////////////////////

        jxhkhqk:"减刑后考核情况",//wei_xqbdmx
        kh : {},
        kh_fenshu:{},//这里需要显示最后一次减刑后的(表扬数,记功书,剩余考核分)//判决日期
        data_kh : function(){
            var url = "/api/xinxi/gerenxinxi/getxingqimingxi/"+gerenVM.get_id;
            avalon.get(url,function(data){
                //表扬数,记功数,剩余考核分，//最后一次减刑的表扬数记功数剩余考核分
                var fenshu =[];
                fenshu.push({
                    bys :weiutils.kongzhi(data[0].bys),
                    jgs : weiutils.kongzhi(data[0].jgs),
                    df : weiutils.kongzhi(data[0].df),
                    pjrq : weiutils.kongzhi(data[0].pjrq)
                })
                gerenVM.kh_fenshu = fenshu;
                //////////////////////////////////
                //减刑幅度，减刑日期
                var jianxing = [];
                for(var i=0;i<data.length;i++){
                    var obj = data[i];
                    jianxing.push({
                        jcrq : weiutils.kongzhi(weiutils.dateFormat(obj.jcrq,0)),
                        fd :weiutils.kongzhi(obj.fd)
                    })
                }
                gerenVM.kh = jianxing;
            })
        }

    });
    //体貌特征
    var appearanceVm = avalon.define({
        $id : "appearance",
        tz : "体貌特征",
        tmtz: {},
        data: function(){
            var url = "/api/xinxi/gerenxinxi/gettimaotezheng/"+gerenVM.get_id;
            avalon.get(url,[],function(data){
              appearanceVm.tmtz= data;
            });
        }
    });
    gerenVM.getData();//基本信息
    gerenVM.get_lianhaoDate();//联号信息
    gerenVM.data_xqbd();//刑期变动
    gerenVM.data_kh();//刑期明细
    appearanceVm.data();//体貌特征
    avalon.scan();
});
