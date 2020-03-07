

/** 2017\11\11 0011
*功能: 初始化管理器  把所有需要引入的文件放在一起
*/
function initManager(){
    cc.vv = {};
    cc.vv.http = require("HTTP");
    cc.vv.net = require("Net");  
 
}

    
cc.Class({
    extends: cc.Component,

    properties: {
        loadingProgess:cc.Label,  //正在连接服务器。。。
    },

    // use this for initialization
    onLoad: function () {
        if(!cc.sys.isNative && cc.sys.isMobile){    //判断设备，进行适配
            var cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }
        initManager();   //调用初始化管理器
        this._mainScene = 'login';   //将loading场景复制给_mainScene，以便下面调用

        //连接服务器获取版本号

        var url = cc.url.raw('resources/ver/cv.txt');  //资源文本地址赋值给Url
        cc.loader.load(url,function(err,data){ //载入url，读出版本信息赋值给VERSION,方便与服务器版本作对比
            cc.VERSION = data;
            cc.log('current core version:' + cc.VERSION); //输出当前版本信息
            this.getServerInfo(); //连接服务器，获取服务器数据
        }.bind(this));  //绑定当前对象
 
        
    },

 
/** 
*功能:连接服务器，更新版本
*/
    onBtnDownloadClicked:function(){
        cc.sys.openURL(cc.vv.SI.appweb);
    },

    /** 
    *功能:显示开场图片
    */
    showSplash:function(callback){
        var self = this;
        var SHOW_TIME = 3000;
        var FADE_TIME = 1000;
        this._splash = cc.find("Canvas/q");
        if(true || cc.sys.os != cc.sys.OS_IOS || !cc.sys.isNative){
            this._splash.active = true;
            if(this._splash.getComponent(cc.Sprite).spriteFrame == null){//查找节点下面有没有开场图片
                callback();
                return;
            }
            var t = Date.now();
            var fn = function(){
                var dt = Date.now() - t;
                if(dt < SHOW_TIME){
                    setTimeout(fn,33);  //每过33ms调用一下fn函数
                }
                else {
                    var op = (1 - ((dt - SHOW_TIME) / FADE_TIME)) * 255;
                    if(op < 0){
                        self._splash.opacity = 0; //设置透明度
                        callback();   
                    }
                    else{
                        self._splash.opacity = op;
                        setTimeout(fn,33);   
                    }
                }
            };
            setTimeout(fn,33);
        }
        else{
            this._splash.active = false;
            callback();
        }
    },


    /** 
    *功能:连接服务器，获取版本信息
    */
    getServerInfo:function(){
        var self = this;
        var onGetVersion = function(ret){
            if(ret.version == null){
                console.log("error.");
            }
            else{
                cc.vv.SI = ret;
                if(ret.version != cc.VERSION){
                    //版本号不同处理
                    //cc.find("Canvas/alert").active = true;
                    cc.log("the version is old!");
                }
                else{
                    //版本号相同处理
                    cc.log("The same version number");
                    self.loadingProgess.string = "连接成功";
                    self.showSplash(function(){
                        cc.director.loadScene(self._mainScene);
                    });
                }
            }
        };
        
        var xhr = null;
        var complete = false;
        var fnRequest = function(){
            self.loadingProgess.string = "正在连接服务器";
            xhr = cc.vv.http.sendRequest("/get_serverinfo",null,function(ret){
                xhr = null;
                complete = true;
                onGetVersion(ret);
            });
            setTimeout(fn,5000);            
        }
        
        var fn = function(){
            if(!complete){
                if(xhr){
                    xhr.abort();
                    self.loadingProgess.string = "连接失败，即将重试";
                    setTimeout(function(){
                        fnRequest();
                    },5000);
                }
                else{
                    fnRequest();
                }
            }
        };
        fn();
    },
});
