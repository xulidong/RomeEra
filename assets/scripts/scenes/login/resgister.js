
cc.Class({
    extends: cc.Component,

    properties: {

        accountTextInfo_two : {              //infotwo账号
            default : null,
            type : cc.EditBox,
        },
        passwordTextInfo_two : {            //infotwo密码
            default : null,
            type : cc.EditBox,
        },
        accountTextInfo_one : {              //info账号
            default : null,
            type : cc.EditBox,
        },
        passwordTextInfo_one : {            //info密码
            default : null,
            type : cc.EditBox,
        },
        entryGameNode : {           //游戏选服节点
            default : null,
            type : cc.Node,
        },
        infoNode : {            //直接账号密码登录节点
            default : null,
            type : cc.Node,
        },
        info_twoNode : {        //快速注册节点
            default : null,
            type : cc.Node,
        },
    },


    onLoad () {
        
    },
//登录游戏
   loginGame(){
       var self = this;
        var account = this.accountTextInfo_one.string;
        var password = this.passwordTextInfo_one.string;
        cc.log("account:",account);
        var params = {
            account : account,
            password : password,
        };
        cc.vv.http.sendRequest("/loginGame",params,function(data){
            if(data.code == 1){
                cc.log("errmsg:",data.msg);
                return;
            }
            //设置我们的用户信息
            
            cc.vv.userMgr.sign = data.sign;

            if(data.userInfo.username){
                cc.vv.userMgr.username = data.userInfo.username;
            }
            cc.vv.userMgr.account = data.userInfo.account;
            cc.vv.userMgr.userid = data.userInfo.userid;
            cc.vv.userMgr.sex = data.userInfo.sex;
            cc.vv.userMgr.lv = data.userInfo.lv;
            cc.vv.userMgr.exp = data.userInfo.exp;
            cc.vv.userMgr.expAll = data.userInfo.expAll;
            cc.vv.userMgr.coins = data.userInfo.coins;
            cc.vv.userMgr.gems = data.userInfo.gems;
            cc.vv.userMgr.vip = data.userInfo.vip;
            cc.vv.userMgr.power = data.userInfo.power;
            cc.vv.userMgr.x = data.userInfo.x;  //世界坐标x
            cc.vv.userMgr.y = data.userInfo.y;  //世界坐标y

            //设置响应后的页面
            self.infoNode.active = false;
            self.entryGameNode.active = true;
        });
   },

    onRegster(){
        var self = this;
        var account = this.accountTextInfo_two.string;
        var password = this.passwordTextInfo_two.string;
        var data = {
            account : account,
            password : password,
        };
        cc.vv.http.sendRequest("/register",data,function(resData){
            if(resData.code == 0){
                cc.log("account is allowed");
                cc.log("account:",resData.account);
                cc.log("sign:",resData.sign);
                //设置用户信息
                cc.vv.userMgr.account = resData.account;
                cc.vv.userMgr.sign = resData.sign;
                //进入游戏选服页面
                self.entryGameNode.active = true;
                self.info_twoNode.active = false;
            }else{
                cc.log("msg:",resData.msg);
            }
        })
    },

    //登录游戏大厅
    loginGameHall(){
        if(cc.vv.userMgr.username){
            cc.director.loadScene("city");
        }else{
            cc.director.loadScene("nickName");
        }
    },

    start () {

    },

    // update (dt) {},
});
