//working for userLogic

//引入mysql
var db = require("../utils/db");
var crypto = require("../utils/crypto");


function nop(a,b,c,d,e){}


//获取周围block数据
exports.getBlockData = function(x,y,callback){
    callback = callback == null ? nop : callback;
    var x = parseInt(x);
    var y = parseInt(y);
    var xMin = x - 10;
    var xMax = x + 10;
    var yMin = y - 10;
    var yMax = y + 10;
    var sql = 'select * from t_block where "'+xMin+'" <= x && x <= "'+xMax+'" && "'+yMin+'" <= y && y <= "'+yMax+'" ';
    console.log("sql:",sql);
    db.query(sql,function(err,rows,fields){
        if(err){
            callback(false);
            return;
        }else{
            if(rows == ""){
                callback(false);
                return;
            }else{
                callback(rows);
            }
        }
    })
};


//查询资源信息
 exports.getResourcesIF = function(userid,callback){
    callback = callback == null ? nop : callback;
    var sql = 'select * from t_resources where userid = "'+userid+'"';
    db.query(sql,function(err,rows,fields){
        if(err){
            console.log("query sql is err from getResourcesIF");
            callback(false);
            return;
        }else{
            if(rows == ""){
                callback(false);
                return;
            }else{
                callback(rows);
            }
        }
    });
 } 


//initBlock();
//初始化资源表

function initBlock(){

    var sql = null;
    var type = null;
    var name = null;
    var lv = 1;
    var x =  1;
    var y = 0;
    var blockNum = 660;
    doA();

    function doA(){
        type = getType(1)
        lv = rnd(1,100);
        setXY();
        if(type == "player"){
            getName();
        }else{
            name = null;
        }

        sql = 'insert into t_block (type,name,lv,x,y) values("'+type+'","'+name+'","'+lv+'","'+x+'","'+y+'")';

        console.log(sql);
        insertData(sql,function(flag){
            if(flag){
                if(x==blockNum&&y==blockNum){
                    return;
                }else{
                    doA();
                }
            }
        });
    }


    //写入数据库
    function insertData(sql,callback){
        db.query(sql,function(err,rows,fieds){
            if(err){
                callback(false);
                throw err;
            }else{
                callback(true);
            }
        });
    }

    //取xy
    function setXY(){
        if(y<blockNum){
            y = y + 1;
        }else if (y == blockNum){
            if(x<blockNum){
                x = x + 1;
                y = 1;
            }
        }
    }

    //获取1到100之间的数字
    function rnd(n,m){
        var random = Math.floor(Math.random()*(m-n+1)+n);
        return random;
    }

    //获取type
    //player food stone hood iron  silver blank
    function getType(n){
        var chars = ['player','food','stone','hood','iron','silver','blank','blank','blank','player'];
        var res = '';
        for(var i = 0; i < n ; i ++){
            var id = Math.ceil(Math.random()*9);
            res += chars[id];
        }
        return res;
    }

    //获取name
    // 生成随机姓名
    function getName(){
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
        
        name = familyName + givenName;
 
        }
        
    
}