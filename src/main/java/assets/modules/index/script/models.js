define([], function(){
    return {
        index:{
            "主页":{

            }
        },
        applications: {
            "客户端管理": {
                "客户端列表": "assets/html/applications/list.html",
                "添加客户端": "assets/html/applications/add.html"
            }
        },
        members: {
            "用户管理": {
                "用户列表": "assets/html/members/list.html",
                "添加用户": "assets/html/members/add.html"
            }
        },
        groups: {
            "用户组管理": {
                "用户组列表": "assets/html/groups/list.html",
                "添加用户组": "assets/html/groups/add.html"
            }
        },
        roles: {
            "角色管理": {
                "角色列表": "assets/html/roles/list.html",
                "添加角色": "assets/html/roles/add.html"
            }
        },
        authorization:{
            "授权管理": {
                "授权管理": "assets/html/authorization/manage.html"
            }
        },
        setting:{
            "系统配置": {
                "基础配置": "assets/html/setting/basic.html",
                "修改密码": "assets/html/setting/security.html",
                "退出系统": "assets/html/setting/logout.html"
            }
        }
    };
});
