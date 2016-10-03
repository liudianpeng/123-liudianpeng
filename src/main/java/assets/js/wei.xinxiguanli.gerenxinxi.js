var manager;
//js判断某个字符出现的次数
function patch(str, substr) { //参数1正则式，参数2字符串
    var count;
    var reg = "/" + substr + "/gi";    //查找时忽略大小写
    reg = eval(reg);
    if (str.match(reg) == null) {
        count = 0;
    } else {
        count = str.match(reg).length;
    }
    return count;

    //返回找到的次数
}
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
};
$(function () {
    var id = window.parent.wei.selectedCriminal;
    $.getJSON("/api/xinxi/gerenxinxi/" + id, function (res) {

        $("#pageloading").hide();
        if (res == undefined) {
            return ""
        } else {
            var str=JSON.stringify(res.escapedType);
            //  console.log("流窜类别(res.escapedType:" + str);
            //  console.log("csrq:" + getFormatDateByLong(res.csrq));
            var photoPathValue = res.photoPath;
            // console.log(!!photoPathValue);
            if (!!photoPathValue) {
                var str = photoPathValue.split(";");
                if (str && str.length > 0) {
                    for (var i = 0; i < str.length; i++) {
                        var dabh = res.dabh;
                        if (!!dabh) {
                            if (i == 0) {
                                //大图片
                                $(".jqzoom").html("<img jqimg='" + kongzhi('/downloadCriminalImage?dabh=' + dabh + '&sequence=1') + "' src='" + kongzhi('/downloadCriminalImage?dabh=' + dabh + '&sequence=1') + "'/>");
                                $(".items>ul>li:nth-child(1)").append("<li><img bimg='" + kongzhi('/downloadCriminalImage?dabh=' + dabh + '&sequence=1') + "' src='" + kongzhi('/downloadCriminalImage?dabh=' + dabh + '&sequence=1') + "'onmousemove='preview(this);'/></li>");
                            } else if (i == 1) {
                                $(".items>ul>li:nth-child(2)").append("<li><img bimg='" + kongzhi('/downloadCriminalImage?dabh=' + dabh + '&sequence=2') + "' src='" + kongzhi('/downloadCriminalImage?dabh=' + dabh + '&sequence=2') + "'onmousemove='preview(this);'/></li>");
                            } else if (i == 2) {
                                $(".items>ul>li:nth-child(3)").append("<li><img bimg='" + kongzhi('/downloadCriminalImage?dabh=' + dabh + '&sequence=3') + "' src='" + kongzhi('/downloadCriminalImage?dabh=' + dabh + '&sequence=3') + "'onmousemove='preview(this);'/></li>");
                            }
                        }
                    }
                }
            }
            $("#gerenxinxi_xm").append(kongzhi(res.xm));
            $("#gerenxinxi_bh").append(kongzhi(res.dabh));
            $("#gerenxinxi_khbh").append(kongzhi(res.code));
            if((!!res.jianqu)&&(!!res.fenjianqu))
                $("#gerenxinxi_fenjianquList").append(kongzhi(res.jianqu.name+":"+res.fenjianqu.name));
            else if((!!res.jianqu)&&(!res.fenjianqu)){
                $("#gerenxinxi_fenjianquList").append(kongzhi(res.jianqu.name));
            }
            $("#gerenxinxi_csrq").append(getFormatDateByLong(res.csrq));
            $("#gerenxinxi_oldcri").append(kongzhi(res.oldcri));
            $("#gerenxinxi_marialStatus").append(kongzhi_zidain(res.marialStatus));
            $("#gerenxinxi_syzm").append(kongzhi(res.syzm));
            $("#gerenxinxi_newEdu").append(kongzhi_zidain(res.newEdu));
            $("#gerenxinxi_youngcri").append( kongzhi(res.youngcri));
            $("#gerenxinxi_manageLevel").append(kongzhi_zidain(res.manageLevel));
            $("#gerenxinxi_jgqh").append(kongzhi_zidain(res.jgqh));
            $("#gerenxinxi_lgf").append(kongzhi_zidain(res.lgf));
            $("#gerenxinxi_duty").append( kongzhi_zidain(res.duty));
            $("#gerenxinxi_jtqh").append( kongzhi(res.jtmx));
            $("#gerenxinxi_newCriminalType").append(kongzhi_zidain(res.newCriminalType));
            $("#gerenxinxi_health").append(kongzhi_zidain(res.health));
            $("#gerenxinxi_jyrq").append(getFormatDateByLong(res.jyrq));
            $("#gerenxinxi_dbrq").append(getFormatDateByLong(res.dbrq));
            $("#gerenxinxi_fylx").append(kongzhi_zidain(res.fylx));
            $("#gerenxinxi_ldgw").append(kongzhi_zidain(res.ldgw));

            if(!!res.dbmx){
                var dbqh_mx=kongzhi_zidain(res.dbqh)+res.dbmx;
                dbqh_mx=dbqh_mx.replace(/\s+/g, "");
                $("#gerenxinxi_dbqh").append(dbqh_mx);
                $("#gerenxinxi_dbqh").attr("title",kongzhi_zidain(res.dbqh)+res.dbmx);
            }else{
                $("#gerenxinxi_dbqh").append(kongzhi_zidain(res.dbqh));
                $("#gerenxinxi_dbqh").attr("title",kongzhi_zidain(res.dbqh));
            }


            if(!!res.ysmx){
                var ysqh_mx=kongzhi_zidain(res.ysqh)+res.ysmx;
                ysqh_mx=ysqh_mx.replace(/\s+/g, "");
                $("#gerenxinxi_ysmx").append(ysqh_mx);
            }else{
                $("#gerenxinxi_ysmx").append(kongzhi_zidain(res.ysqh));
            }



            $("#gerenxinxi_escapedType").append(kongzhi_zidain(res.escapedType));
            $("#gerenxinxi_sddj").append(kongzhi_zidain(res.sddj));
            $("#gerenxinxi_rjrq").append(getFormatDateByLong(res.rjrq));
            $("#gerenxinxi_ssdj").append(kongzhi_zidain(res.ssdj));

            var xian_xingqi_zr=(res.zr);
            var xian_xingqi_xq=(res.xq);

            $.getJSON("/api/xinxiguanli/xingqibiandong/getXqbdList/"+id,function(res){
                var str=JSON.stringify(res);
                //  console.log("nowdate:" + str);
                var nowdate=res.nowdate;
                res=res.items;
                //  console.log("nowdate:" + nowdate);
                if(!!res&&res.length>0){
                    var l=res.length-1;
                    var yuanpan=res[0];
                    var xianpan=res[l];
                    //  console.log("(yuanpan:"  +JSON.stringify(yuanpan));
                    var panjueriqi=yuanpan.pcrq;
                    $("#xingqimingxi_pjrq").append(date(panjueriqi));
                    var panjuezihao_value=yuanpan.pczh;
                    var panjuezihao_pcmx=yuanpan.pcmx;
                    var panjuezihao_pcsm=yuanpan.pcsm;
                    var panjuezihao_label=getpanjuelabel(panjuezihao_pcsm,panjuezihao_value);
                    $("#gerenxinxi_ysxh").append(panjuezihao_label);
                    //if (GetLength(kongzhi(panjuezihao_label))>16){
                    //    $("#gerenxinxi_ysxh").attr("title",kongzhi(panjuezihao_label));
                    //}else {
                    //    $("#gerenxinxi_ysxh").append(kongzhi(panjuezihao_label));
                    //}
                    var yuanpan_xinqi=yuanpan.xq;
                    $("#gerenxinxi_yxq").append(get_xq(yuanpan_xinqi));
                    var yuanpan_bznx=yuanpan.bznx;
                    $("#gerenxinxi_ybznx").append("" + get_bznx(yuanpan_bznx));
                    var yuanpan_xingqi_start_date=yuanpan.qr;
                    var yuanpan_xingqi_end_date=yuanpan.zr;
                    $("#gerenxinxi_yqr_yzr").append("自"+date(yuanpan_xingqi_start_date) + "至" + date(yuanpan_xingqi_end_date));
                    var xianpan_xingqi=xianpan.xq;
                    $("#gerenxinxi_xq").append(get_xq(xianpan_xingqi));
                    var xianpan_bznx=xianpan.bznx;
                    $("#gerenxinxi_bznx").append(get_bznx(xianpan_bznx));
                    var xianpan_xingqi_start_date=xianpan.qr;
                    var xianpan_xingqi_end_date=xianpan.zr;
                    $("#gerenxinxi_qr_zr").append("自" + date(xianpan_xingqi_start_date) + "至" + date(xianpan_xingqi_end_date));
                }
                var xingqibiandongArray=new Array();
                //记录上次的刑期
                var pre=0;
                //首次的判决日期
                var firstPanjueStartDate='';
                //最后一次判的终止日期
                var  lastPanjueEndDate='';
                //首次的判决的刑期的起始日期
                var firstPanjueXingQiStartDate='';
               //第一次判决刑期的起始日期
                var  startFuxingqiDate=firstPanjueXingQiStartDate;
                //减刑日期_减刑幅度 根据bdfd来进行计算
                for (var i = 0; i < res.length; i++) {
                    var xq= res[i].xq;
                    var bdfd= res[i].bdfd;
                    var rq= date(res[i].pcrq);
                    //起始日期
                    var qr= res[i].qr;
                    //终止日期
                    var zr= res[i].zr;
                    var setenceChangementType= res[i].setenceChangementType.name;
                    var xingqi = new Object();
                    if(i==0){
                        firstPanjueXingQiStartDate=qr;
                    }
                    if(i== res.length-1){
                        lastPanjueEndDate=zr;
                    }
                      xingqi.rq = rq;
                    if(!!bdfd){
                        if(bdfd=='9990'){
                            xingqi.xq = setenceChangementType +":"+get_xq(bdfd)+get_xq(xq);
                        }else{
                            xingqi.xq = setenceChangementType +":"+get_xq(bdfd);
                        }

                        xingqibiandongArray.push(xingqi);
                    }

                };
                var l=xingqibiandongArray.length-1;
                for (; l>=0; l--) {

                    var x=xingqibiandongArray[l];

                    $("#xqbdmx_table").append("<tr><td colspan='2'><span>" + x.rq+

                    "</span></td><td colspan='3'><span>"+ x.xq + "</span></td></tr>");

                }

                var currentDate=nowdate;

                var year1 =  currentDate.substr(0,4);
                var month1 = currentDate.substr(4,2);
                var day1 = currentDate.substr(6,2);
                var currentDate1= new NewDate(year1 + '-' + month1 + '-' +day1);

                //alert("currentDateyearmonthday"+year1+"--"+month1+"--"+day1);
                //alert("currentDate1==1"+currentDate1);
                //alert('firstPanjueStartDate='+firstPanjueStartDate);
                //alert('lastPanjueEndDate='+lastPanjueEndDate);
                var  currentDate2=new Date();
                //alert("currentDate2==1"+currentDate2);
                currentDate2.setTime(currentDate1.getTime());
                //alert("currentDate2==2"+currentDate2);
               currentDate2= DateAdd('d',-1,currentDate2);
                //alert("currentDate2==3"+currentDate2);
                startFuxingqiDate=firstPanjueXingQiStartDate;

                var yifu=calculateTwoDatePeriod(startFuxingqiDate,currentDate2);

                //alert("yifu==="+yifu);

                $("#gerenxinxi_yfxq").append(yifu);

                var shengyu='';
                if(xian_xingqi_xq=="9995" ||xian_xingqi_xq=="9996"||xian_xingqi_xq=="9997"){

                }else{
                    if(!xian_xingqi_zr){
                        if(lastPanjueEndDate.length>0){
                            var year2 =  lastPanjueEndDate.substr(0,4);
                            var month2 = lastPanjueEndDate.substr(4,2);
                            var day2 = lastPanjueEndDate.substr(6,2);
                            var lastPanjueEndDate2= NewDate(year2 + '-' + month2 + '-' +day2);
                            //var lastPanjueEndDate3=lastPanjueEndDate2;
                            //  var date_xian_xingqi_zr= DateAdd('d',1,lastPanjueEndDate2);

                            shengyu=calculateTwoDatePeriod(currentDate,lastPanjueEndDate2);

                        }


                    }else{
                      //  console.log("date_xian_xingqi_zr="+xian_xingqi_zr);
                        var year2 =  xian_xingqi_zr.substr(0,4);
                        var month2 = xian_xingqi_zr.substr(4,2);
                        var day2 = xian_xingqi_zr.substr(6,2);
                        var lastPanjueEndDate2= NewDate(year2 + '-' + month2 + '-' +day2);
                     //   console.log("lastPanjueEndDate2="+lastPanjueEndDate2 );
                      //  var date_xian_xingqi_zr= DateAdd('d',1,lastPanjueEndDate2);
                        var date_xian_xingqi_zr=lastPanjueEndDate2;
                        shengyu=calculateTwoDatePeriod(currentDate,date_xian_xingqi_zr);
                    }
                    $("#gerenxinxi_syxq").append(shengyu);
                }



            });


    }
    });
    //联号信息
    $.getJSON("/api/xinxi/gerenxinxi/getlianhao/" + id, function (res) {
        if (res[0] == undefined) {
            return ""
        } else {
            $("#lianhao_name").append(kongzhi(res[0].name));
            $("#lianhao_dabh").append(kongzhi(res[0].dabh));
        }
    });
    $.getJSON("/api/xinxi/gerenxinxi/gettimaotezheng/" + id, function (res) {
        if (res[0] == undefined) {
            return ""
        } else {
            $("#tm_face").append(kongzhi(res[0].face));
            $("#tm_sg").append(kongzhi(res[0].sg));
            $("#tm_heigth").append(kongzhi(res[0].heigth));
            $("#tm_blood").append(kongzhi(res[0].blood));
            $("#tm_ky").append(kongzhi(res[0].ky));
            $("#tm_tx").append(kongzhi(res[0].tx));
            $("#tm_zc").append(kongzhi(res[0].zc));
            $("#tm_shoe").append(kongzhi(res[0].shoe));
            if(!!res[0]){
                $("#tm_pftz").append(kongzhi(res[0].pftz));
                $("#tm_other").append(kongzhi(res[0].other));
            }

        }
    });
});
//图片放大镜效果
$(function () {
    $(".jqzoom").jqueryzoom({xzoom: 50, yzoom: 50});
});
//图片预览小图移动效果,页面加载时触发
$(function () {
    var tempLength = 0; //临时变量,当前移动的长度
    var viewNum = 5; //设置每次显示图片的个数量
    var moveNum = 2; //每次移动的数量
    var moveTime = 300; //移动速度,毫秒
    var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
    var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
    var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
    var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度
    //下一张
    $(".spec-scroll .next").bind("click", function () {
        if (tempLength < countLength) {
            if ((countLength - tempLength) > moveLength) {
                scrollDiv.animate({left: "-=" + moveLength + "px"}, moveTime);
                tempLength += moveLength;
            } else {
                scrollDiv.animate({left: "-=" + (countLength - tempLength) + "px"}, moveTime);
                tempLength += (countLength - tempLength);
            }
        }
    });
    //上一张
    $(".spec-scroll .prev").bind("click", function () {
        if (tempLength > 0) {
            if (tempLength > moveLength) {
                scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
                tempLength -= moveLength;
            } else {
                scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
                tempLength = 0;
            }
        }
    });
});
//鼠标经过预览图片函数
function preview(img) {
    $("#preview .jqzoom img").attr("src", $(img).attr("src"));
    $("#preview .jqzoom img").attr("jqimg", $(img).attr("bimg"));
}
function getpanjuelabel(panjuezihao_pcsm,panjuezihao_value){
    if((!!panjuezihao_value)&&(panjuezihao_value.length ==10)){
        panjuezihao_nian=parseInt(panjuezihao_value.substring(0,4));

        panjuezihao_num=parseInt(panjuezihao_value.substring(4));
        if(!!panjuezihao_pcsm)
        return '['+panjuezihao_nian+']'+panjuezihao_pcsm+"第"+panjuezihao_num+"号";
        else
            return '['+panjuezihao_nian+']'+"第"+panjuezihao_num+"号";
    }
}

function calculateTwoDatePeriod(date1,date2){

    var date1yyyymmdd,date2yyyymmdd,year1,year2,month1,month2,day1,day2,startDate,endDate;
    if(typeof date1=='string'){

        if(date1.indexOf("-")<0){
            year1 =  date1.substr(0,4);
            month1 = date1.substr(4,2);
            day1 = date1.substr(6,2);
            startDate=NewDate(year1 + '-' + month1 + '-' +day1);
            date1yyyymmdd=date1;
        }else{
            startDate=NewDate(date1);
            date1yyyymmdd=formatterDateNoMinus(startDate);
        }
        /**
         year1 =  date1.substr(0,4);
         month1 = date1.substr(4,2);
         day1 = date1.substr(6,2);
         startDate= new Date(year1 + '-' + month1 + '-' +day1);
         date1yyyymmdd=date1;
         **/
    }else if(typeof date1=='object'){
        startDate=date1;
        date1yyyymmdd= formatterDateNoMinus(date1);
    }
    if(typeof date2=='string'){
        year2 =  date2.substr(0,4);
        month2 = date2.substr(4,2);
        day2 = date2.substr(6,2);
        endDate= NewDate(year2 + '-' + month2 + '-' +day2);
        date2yyyymmdd=date2;
    }else if(typeof date2=='object'){
        endDate=date2;
        date2yyyymmdd= formatterDateNoMinus(date2);
    }

    //  console.log('date1==='+date1);
    // console.log('startdate==='+startDate);
    //  console.log('date1yyyymmdd =='+date1yyyymmdd);
    //   console.log('endDate  =='+endDate);
    //  console.log('date2yyyymmdd  =='+date2yyyymmdd);


    var d=getMonthNumber(date1yyyymmdd,date2yyyymmdd);

    var tempDate1,tempDate2,tempDate3,justFindDate,startDate0,startDate1,startDate2,startDate3;



    if(d>=1){

        tempDate1= DateAdd('m',d-1,startDate);

        tempDate2= DateAdd('m',1,tempDate1);

        tempDate3= DateAdd('m',1,tempDate2);

         //console.log('startdate==='+startDate);
         //console.log('temp date1=='+tempDate1);
         //console.log('temp date2=='+tempDate2);
         //console.log('temp date3=='+tempDate3);
         //console.log('enddate=='+endDate);

        if(tempDate1.getTime() <= endDate.getTime()&&tempDate2.getTime() > endDate.getTime()){

            justFindDate=tempDate1;
            d=d-1;


        }else  if(tempDate2.getTime() <= endDate.getTime()&&tempDate3.getTime() >endDate.getTime()){

            justFindDate=tempDate2;

        }

       //console.log("justFindDate=="+justFindDate);

    }else{
        justFindDate= startDate
    }


    var year=parseInt(d/12);
    var month=parseInt(d%12);
    var diffDays=Math.abs(getDateDiffDays(justFindDate,endDate));
     //console.log('d/12=='+d/12);
     //console.log('d%12=='+d%12);
     //console.log('diffDays=='+diffDays);
    var diffXQ;

   //console.log("pad(year,2)=="+pad(year,2));
   // console.log("pad(month,2)=="+pad(month,2));
   //  console.log("pad(diffDays,2)=="+pad(diffDays,2));
    diffXQ=pad(year,2)+""+pad(month,2)+""+pad(diffDays,2);
    //console.log('diffXQ=='+diffXQ);
    return get_xq(diffXQ);

}

