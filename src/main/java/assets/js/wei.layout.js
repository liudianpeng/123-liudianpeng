var tab = null;
var accordion = null;
var tree = null;
var weiLayoutTab = null;
var tabItems = [];


var dataReady = false;

$(function () {
    //布局
    $("#layout1").ligerLayout({
        leftWidth: 140,
        height: '100%',
        heightDiff: -34,
        space: 4,
        onHeightChanged: f_heightChanged
    });

    var height = $(".l-layout-center").height();

    //Tab
    weiLayoutTab = $("#framecenter").ligerTab({
        height: height,
        showSwitchInTab: true,
        showSwitch: true,
        onAfterAddTabItem: function (tabdata) {
            tabItems.push(tabdata);
            //saveTabStatus();
        },
        onAfterRemoveTabItem: function (tabid) {
            for (var i = 0; i < tabItems.length; i++) {
                var o = tabItems[i];
                if (o.tabid == tabid) {
                    tabItems.splice(i, 1);
                    //saveTabStatus();
                    break;
                }
            }
        },
        onReload: function (tabdata) {
            var tabid = tabdata.tabid;
            addFrameSkinLink(tabid);
        }
    });

    menus_init();

    var dataReadyInterval = window.setInterval(function () {
        if (dataReady) {
            $("#accordion1").ligerAccordion({
                height: height - 24, speed: null
            });

            $(".xinxiguanliSubMenu").click(function (e) {
                if (wei.selectedCriminal !== null) {
                } else {
                    e.preventDefault();
                    alert("请先在人员列表中选择要查看的人员");
                }
            });
            clearInterval(dataReadyInterval);
        } else {
            dataReadyInterval;
        }
    }, 100);

    dataReadyInterval;

    $(".l-link")
        .hover(function () {
            $(this).addClass("l-link-over");
        }, function () {
            $(this).removeClass("l-link-over");
        });


    tab = liger.get("framecenter");
    accordion = liger.get("accordion1");
    tree = liger.get("tree1");
    $("#pageloading").hide();

    css_init();
    pages_init();

    $.getJSON("/current",null,function(res){
        var html = "您好,"+res.username;
        $("#top-span").html(html);
    });

});

function f_heightChanged(options) {
    if (tab)
        tab.addHeight(options.diff);
    if (accordion && options.middleHeight - 24 > 0)
        accordion.setHeight(options.middleHeight - 24);
}
function f_addTab(tabid, text, url) {
    tab.addTabItem({
        tabid: tabid,
        text: text,
        url: url,
        callback: function () {
            addFrameSkinLink(tabid);
        }
    });
}

function addFrameSkinLink(tabid) {
    var prevHref = getLinkPrevHref(tabid) || "";
    var skin = getQueryString("skin");
    if (!skin) return;
    skin = skin.toLowerCase();
    attachLinkToFrame(tabid, prevHref + skin_links[skin]);
}
var skin_links = {
    "aqua": "lib/ligerUI/skins/Aqua/css/ligerui-all.css",
    "gray": "lib/ligerUI/skins/Gray/css/all.css",
    "silvery": "lib/ligerUI/skins/Silvery/css/style.css",
    "gray2014": "lib/ligerUI/skins/gray2014/css/all.css"
};
function pages_init() {
    var tabJson = $.cookie('liger-home-tab');
    if (tabJson) {
        var tabitems = JSON2.parse(tabJson);
        for (var i = 0; tabitems && tabitems[i]; i++) {
            f_addTab(tabitems[i].tabid, tabitems[i].text, tabitems[i].url);
        }
    }
}
//cookie
//function saveTabStatus() {
//    $.cookie('liger-home-tab', JSON2.stringify(tabItems));
//}
function css_init() {
    var css = $("#mylink").get(0), skin = getQueryString("skin");
    $("#skinSelect").val(skin);
    $("#skinSelect").change(function () {
        if (this.value) {
            location.href = "demo.html?skin=" + this.value;
        } else {
            location.href = "demo.html";
        }
    });


    if (!css || !skin) return;
    skin = skin.toLowerCase();
    $('body').addClass("body-" + skin);
    $(css).attr("href", skin_links[skin]);
}
function getQueryString(name) {
    var now_url = document.location.search.slice(1), q_array = now_url.split('&');
    for (var i = 0; i < q_array.length; i++) {
        var v_array = q_array[i].split('=');
        if (v_array[0] == name) {
            return v_array[1];
        }
    }
    return false;
}
function attachLinkToFrame(iframeId, filename) {
    if (!window.frames[iframeId]) return;
    var head = window.frames[iframeId].document.getElementsByTagName('head').item(0);
    var fileref = window.frames[iframeId].document.createElement("link");
    if (!fileref) return;
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);
    head.appendChild(fileref);
}
function getLinkPrevHref(iframeId) {
    if (!window.frames[iframeId]) return;
    var head = window.frames[iframeId].document.getElementsByTagName('head').item(0);
    var links = $("link:first", head);
    for (var i = 0; links[i]; i++) {
        var href = $(links[i]).attr("href");
        if (href && href.toLowerCase().indexOf("ligerui") > 0) {
            return href.substring(0, href.toLowerCase().indexOf("lib"));
        }
    }
}

function menus_init() {
    $.getJSON("/menus", function (data) {
        $.each(data, function (i, menuGroup) {
            var topMenu = menuGroup.topMenu;
            var subMenus = menuGroup.subMenus;
            var div = $("<div/>");
            div.attr("title", topMenu.name);
            div.attr("id", "menu-" + topMenu.code);
            if (i == 0) {
                div.attr("class", "l-scroll");
            }

            var divider = $("<div/>").attr("style", "height:7px").appendTo(div);

            $.each(subMenus, function (i, subMenu) {
                var menuId = "menu-" + subMenu.code;
                var subMenuDiv = $("<a/>").attr("id", menuId).attr("class", "l-link").text(subMenu.name);
                var link = null;
                if (subMenu.parent.code == 'xinxiguanli' && subMenu.code !== 'renyuanliebiao' && subMenu.code !== 'zonghechaxun') {
                    subMenuDiv.attr("class", "l-link xinxiguanliSubMenu");
                    link = "javascript:f_addTab('" + menuId + "','" + subMenu.name + "','" + subMenu.url + "/'+wei.selectedCriminal)";
                } else {
                    subMenuDiv.attr("class", "l-link");
                    link = "javascript:f_addTab('" + menuId + "','" + subMenu.name + "','" + subMenu.url + "')";
                }
                subMenuDiv.attr("href", link);
                subMenuDiv.appendTo(div);
            });

            div.appendTo("#accordion1");
            wei.deselectCriminal();
        });

        dataReady = true;
    });
}
