
cc.Class({
    extends: cc.Component,

    properties: {
        progressBar : {         //进度条节点
            default : null,
            type : cc.Node,     
        },
        progressData : {        //进度百分比
            default : null,
            type : cc.Label,
        },
        status : {              //加载资源进度
            default : null,
            type : cc.Label,
        },
        infoNode : {         //登录弹窗节点
            default : null,
            type : cc.Node,     
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.proBar = this.progressBar.getComponent(cc.ProgressBar);  //得到组件
        this.initTime();
        this.loadSources();
        this.compDegress = 0; //完成度
        this.comFlag = false; //完成标志
    },

    loadSources(){
        this.status.string = "正在载入游戏资源";
        var self = this;
        cc.loader.loadResDir("textures",function(compCount,totalCount,item){
            //cc.log("compCount:",compCount);
            //cc.log("totalCount:",totalCount);
            self.compDegress = compCount / totalCount;
        },function(err,assets){
            if(err){
                cc.log("load sources is error");
            }
            self.comFlag = true;
            self.status.string = "已经完成载入资源";
            self.node.active = false;
            self.infoNode.active = true;
        });

    },


    initTime(){
     
        this.nowTime = 0;  //当前已经过去的时间
        this.allTime = 10; //总时间

    },

    start () {

    },

    //刷新函数
    update (dt) {


        if(this.comFlag){
            this.status.string = "即将开始游戏，请稍后";
        }else {
            this.proBar.progress = this.compDegress;
            this.progressData.string = parseInt(this.compDegress * 100) + "%";
        }
       
        /** 
        this.nowTime += dt;
        var timePer = this.nowTime / this.allTime;
        if (timePer > 1) {
            timePer = 1;
        }
        this.proBar.progress = timePer;
        this.progressData.string = parseInt(timePer * 100) + "%";

        */


    },
});
