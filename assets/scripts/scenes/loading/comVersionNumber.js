function initManager(){
    cc.vv = {};
    cc.vv.http = require("HTTP");
    cc.vv.url = {};
    cc.vv.url.cityServer = "http://127.0.0.1:9000";
    var UserMgr = require("UserManager");
    cc.vv.userMgr = new UserMgr();

    //建筑信息初始化
    cc.vv.buildings = {};
    //资源信息初始化
    cc.vv.resources = {};
    //配置
    cc.vv.config = {};
    cc.vv.config.resourceUpdateTime = 5; //资源更新时间 单位秒
    
}


cc.Class({
    extends: cc.Component,

    properties: {

        status : {
            default : null,
            type : cc.Label,
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        initManager();

        //读取客户端版本号
        var url = cc.url.raw("resources/version/versionNmber.txt");
        cc.loader.load(url, function (err, data) {
            if (err) {
                cc.log("load version file is error!");
                return;
            }
            //cc.localVersion = data;
            cc.log('data: ',data);
            this.getVersion(data);
        }.bind(this));
    },

    getVersion : function(localVersion){

    var self = this;
    //请求成功后的业务处理函数
    var onSuccess = function(serverVersion){
        cc.log("versionServer:",serverVersion.version);
        cc.log("localVersion:",localVersion);
        //比较版本号
        if(serverVersion.version != localVersion){
            cc.log("The version is older!");
        }else{
            self.status.string = "连接成功";
            cc.log("The same game version!");
            //场景淡出
            self.picFadeOut(function(){
                cc.director.loadScene("login");
            });
        }
    };

    var xhr = null;
    var comp = false;
    //请求连接函数
    var connectServ = function(){
        //取服务器上的版本号
        self.status.string = "正在连接服务器...";
        var xhr = cc.vv.http.sendRequest("/getVersion",null,function(serverVersion){
            xhr = null;
            comp = true;
            onSuccess(serverVersion);
        });
        if(!comp){
            setTimeout(conn,3000);
        }
    };
        
    //请求启动函数
    var conn = function(){
        if(!comp){
            if(xhr){
                xhr.abort(); 
            } 
            self.status.string = "连接失败，即将重新尝试！"; 
            setTimeout(connectServ,4000);
        }
    };
    connectServ();
 
    },

    //场景淡出
    picFadeOut(callback){
        var picN = cc.find("Canvas/q");
        var fadeTiem = 3000; //淡出总时间
        var nowTime = Date.now(); //开始淡出的时间
        var timePercent = 0; //淡出百分比

        //精灵帧如果不存在就返回
        if(picN.getComponent(cc.Sprite).spriteFrame == null){
            callback();
            return;
        }

        var changeFade = function() {
            //cc.log("changFade");
            
            //每过一段时间就减少一点透明度
            var duringTime = Date.now() - nowTime; //已经过去的时间
            timePercent = duringTime / fadeTiem; //已经过去的时间所占的百分比
            if(timePercent > 1){
                timePercent = 1;
            }
            //cc.log("timePercent:",timePercent);
            picN.opacity = 255 - timePercent * 255; //设置为他剩余的透明度
            if(timePercent == 1){
                picN.active = false;
                cc.log("active is  false");
                callback();
                return;
            }else{
                setTimeout(changeFade,30);
            }
       }
       setTimeout(changeFade,30);
    },

    start () {

    },

    // update (dt) {},
});
