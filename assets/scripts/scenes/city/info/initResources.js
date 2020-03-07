
cc.Class({
    extends: cc.Component,

    properties: {
        foodBar : {             //粮食progressBar
            default : null,
            type : cc.ProgressBar,
        },
        foodCount : {           //粮食数量
            default : null,
            type : cc.Label,
        },
        hoodBar : {             //木材progressBar
            default : null,
            type : cc.ProgressBar,
        },
        hoodCount : {           //木材数量
            default : null,
            type : cc.Label,
        },
        ironBar : {             //铁矿progressBar
            default : null,
            type : cc.ProgressBar,
        },
        ironCount : {           //铁矿数量
            default : null,
            type : cc.Label,
        },
        stoneBar : {             //石头progressBar
            default : null,
            type : cc.ProgressBar,
        },
        stoneCount : {           //石头数量
            default : null,
            type : cc.Label,
        },
        silverBar : {             //银币progressBar
            default : null,
            type : cc.ProgressBar,
        },
        silverCount : {           //银币数量
            default : null,
            type : cc.Label,
        },
        peopleBar : {             //人口progressBar
            default : null,
            type : cc.ProgressBar,
        },
        peopleCount : {           //人口数量
            default : null,
            type : cc.Label,
        },
        orderBar : {             //军令progressBar
            default : null,
            type : cc.ProgressBar,
        },

    },

    // LIFE-CYCLE CALLBACKS:

    
    onLoad () {
        
        //请求资源信息
        var self = this;
        var params = {
            sign : cc.vv.userMgr.sign,
            userid : cc.vv.userMgr.userid,
        };
        cc.vv.http.sendRequest("/getResourcesInfo",params,function(data){
            if(data.code == 1){
                cc.log("errmsg:",data.msg);
                return;
            }
            self.initResources(data.rows);
            self.setResources();
        },cc.vv.url.cityServer);

        //按时更新
        this.updateInit();
    },

    setResources(){
        //如果资源数量大于1M，就用M，否则用K
        var resources = cc.vv.resources;

        var foodNowCount = resources.food.nowCount;
        if(foodNowCount>1){
            this.foodCount.string = this.stringToNum(foodNowCount)+"M";
        }else{
            this.foodCount.string = this.stringToNum(foodNowCount*1000)+"K";
        }
        this.foodBar.progress = resources.food.nowCount / resources.food.allCount;

        var hoodNowCount = resources.hood.nowCount;
        if(hoodNowCount>1){
            this.hoodCount.string = this.stringToNum(hoodNowCount)+"M";
        }else{
            this.hoodCount.string = this.stringToNum(hoodNowCount*1000)+"K";
        }
        this.hoodBar.progress = resources.hood.nowCount / resources.hood.allCount;

        var ironNowCount = resources.iron.nowCount;
        if(ironNowCount>1){
            this.ironCount.string = this.stringToNum(ironNowCount)+"M";
        }else{
            this.ironCount.string = this.stringToNum(ironNowCount*1000)+"K";
        }
        this.ironBar.progress = resources.iron.nowCount / resources.iron.allCount;

        var stoneNowCount = resources.stone.nowCount;
        if(stoneNowCount>1){
            this.stoneCount.string = this.stringToNum(stoneNowCount)+"M";
        }else{
            this.stoneCount.string = this.stringToNum(stoneNowCount*1000)+"K";
        }
        this.stoneBar.progress = resources.stone.nowCount / resources.stone.allCount;

        var silverNowCount = resources.silver.nowCount;
        if(silverNowCount>1){
            this.silverCount.string = this.stringToNum(silverNowCount)+"M";
        }else{
            this.silverCount.string = this.stringToNum(silverNowCount*1000)+"K";
        }
        this.silverBar.progress = resources.silver.nowCount / resources.silver.allCount;

        this.peopleCount.string = this.stringToNum(resources.people.nowCount);
        this.peopleBar.progress = resources.people.nowCount / resources.people.allCount;

        this.orderBar.progress = resources.order.nowCount / resources.order.allCount;
    },

    initResources(rows){
        for(var i=0; i<rows.length; i++){
            var nowCount = this.stringToNum(rows[i].nowCount);
            var allCount = this.stringToNum(rows[i].allCount);
            var addRate = this.stringToNum(rows[i].addRate);
            switch(rows[i].type){
                case "food":
                    cc.vv.resources.food = {};
                    cc.vv.resources.food.nowCount = nowCount;
                    cc.vv.resources.food.allCount = allCount;
                    cc.vv.resources.food.addRate = addRate;
                    break;
                case "hood":
                    cc.vv.resources.hood = {};
                    cc.vv.resources.hood.nowCount = nowCount;
                    cc.vv.resources.hood.allCount = allCount;
                    cc.vv.resources.hood.addRate = addRate;
                    break;
                case "stone":
                    cc.vv.resources.stone = {};
                    cc.vv.resources.stone.nowCount = nowCount;
                    cc.vv.resources.stone.allCount = allCount;
                    cc.vv.resources.stone.addRate = addRate;
                    break;
                case "iron":
                    cc.vv.resources.iron = {};
                    cc.vv.resources.iron.nowCount = nowCount;
                    cc.vv.resources.iron.allCount = allCount;
                    cc.vv.resources.iron.addRate = addRate;
                    break;
                case "silver":
                    cc.vv.resources.silver = {};
                    cc.vv.resources.silver.nowCount = nowCount;
                    cc.vv.resources.silver.allCount = allCount;
                    cc.vv.resources.silver.addRate = addRate;
                    break;
                case "people":
                    cc.vv.resources.people = {};
                    cc.vv.resources.people.nowCount = nowCount;
                    cc.vv.resources.people.allCount = allCount;
                    cc.vv.resources.people.addRate = addRate;
                    break;
                case "order":
                    cc.vv.resources.order = {};
                    cc.vv.resources.order.nowCount = nowCount;
                    cc.vv.resources.order.allCount = allCount;
                    cc.vv.resources.order.addRate = addRate;
                    break;
                default : 
                    cc.log("initResources switch is default");
            }
        }
    },

    stringToNum(str){
        return Math.floor(str * 100)/100;
    },
    strToN(str){
        return Math.floor(str * 100000)/100000;
    },

    updateInit(){
        this.upTime = cc.vv.config.resourceUpdateTime;
        this.gTime = 0;
    },

    updateResources(time){ //更新资源当前数量
        var t = time/3600;
        var res = cc.vv.resources;
        var foodNowCount = this.strToN(res.food.nowCount + t * res.food.addRate);
        if(foodNowCount <= res.food.allCount){
            res.food.nowCount = foodNowCount;
        }
        var hoodNowCount = this.strToN(res.hood.nowCount + t * res.hood.addRate);
        if(hoodNowCount <= res.hood.allCount){
            res.hood.nowCount = hoodNowCount;
        }
        var stoneNowCount = this.strToN(res.stone.nowCount + t * res.stone.addRate);
        if(stoneNowCount <= res.stone.allCount){
            res.stone.nowCount = stoneNowCount;
        }
        var ironNowCount = this.strToN(res.iron.nowCount + t * res.iron.addRate);
        if(ironNowCount <= res.iron.allCount){
            res.iron.nowCount = ironNowCount;
        }
        var silverNowCount = this.strToN(res.silver.nowCount + t * res.silver.addRate);
        if(silverNowCount <= res.silver.allCount){
            res.silver.nowCount = silverNowCount;
        }
        var peopleNowCount = this.strToN(res.people.nowCount + t * res.people.addRate);
        if(peopleNowCount <= res.people.allCount){
            res.people.nowCount = peopleNowCount;
        }
        var orderNowCount = this.strToN(res.order.nowCount + t * res.order.addRate);
        if(orderNowCount <= res.order.allCount){
            res.order.nowCount = orderNowCount;
        }
    },

   // start () {},

    update (dt) {
        this.gTime += dt;
        if(this.gTime>this.upTime){ //每过一段时间更新资源
            //更新资源
            this.updateResources(this.gTime);
            this.setResources();
            this.gTime = 0;
        }
    },
});
