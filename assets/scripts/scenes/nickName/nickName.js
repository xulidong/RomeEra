
cc.Class({
    extends: cc.Component,

    properties: {

        nickNameNode : {       //昵称节点
            default : null,
            type : cc.Label,
        },
    },

    onLoad () {
        this.setName();
        this.sex = 1;
    },

    //创建角色点击事件
    createRole(){
        cc.log("sex:",this.sex);
        var account = cc.vv.userMgr.account;
        var sign = cc.vv.userMgr.sign;
        var params = {
            account : account,
            sign : sign,
            sex : this.sex,
            username : this.nickNameNode.string,
        };
        cc.vv.http.sendRequest("/createRole",params,function(data){
            if(data.code == 1){
                cc.log("errmsg:",data.msg);
            }
            //设置用户信息
            cc.vv.userMgr.sex = data.sex;
            cc.vv.userMgr.username = data.username;
            //载入游戏大厅场景
            cc.director.loadScene("city");
        });
    },
    //改变图片样式
    changePic(event,customData){
        var tag = event.target;
        if(tag.name == "women"){
            this.sex = 2;
        }else{
            this.sex = 1;
        }
        tag.scaleX = 1.1;
        tag.scaleY = 1.1;
        tag.color = new cc.Color(255,255,255);
        var othNode = cc.find("Canvas/bg/" + customData);
        othNode.scaleX = 0.8;
        othNode.scaleY = 0.8;
        othNode.color = new cc.Color(109,255,255);
        this.setName();
    },

    //设置昵称
    setName(){
        this.nickNameNode.string = this.getName(); 
    },
    // 生成随机姓名
    getName(){
        var familyNames = new Array(
                "赵",    "钱",    "孙",    "李",    "周",    "吴",    "郑",    "王",    "冯",    "陈",    
                "褚",    "卫",    "蒋",    "沈",    "韩",    "杨",    "朱",    "秦",    "尤",    "许",
                "何",    "吕",    "施",    "张",    "孔",    "曹",    "严",    "华",    "金",    "魏",    
                "陶",    "姜",    "戚",    "谢",    "邹",    "喻",    "柏",    "水",    "窦",    "章",
                "云",    "苏",    "潘",    "葛",    "奚",    "范",    "彭",    "郎",    "鲁",    "韦",    
                "昌",    "马",    "苗",    "凤",    "花",    "方",    "俞",    "任",    "袁",    "柳",
                "酆",    "鲍",    "史",    "唐",    "费",    "廉",    "岑",    "薛",    "雷",    "贺",    
                "倪",    "汤",    "滕",    "殷",    "罗",    "毕",    "郝",    "邬",    "安",    "常",
                "乐",    "于",    "时",    "傅",    "皮",    "卞",    "齐",    "康",    "伍",    "余",    
                "元",    "卜",    "顾",    "孟",    "平",    "黄",    "和",    "穆",    "萧",    "尹"
                );
        var givenNames =  new Array(
                "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", 
                "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊", 
                "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政", 
                "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建", 
                "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋", 
                "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅", 
                "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", 
                "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕", 
                "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵", 
                "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
                );
        
        var i = parseInt(10 * Math.random())*10 + parseInt(10 * Math.random());
        var familyName = familyNames[i];
        
        var j = parseInt(10 * Math.random())*10 + parseInt(10 * Math.random());
        var givenName = givenNames[i];
        
        var name = familyName + givenName;
        return name;
        
    },

    start () {

    },

    // update (dt) {},
});
