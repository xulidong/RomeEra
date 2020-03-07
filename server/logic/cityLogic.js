//引入cityDao
var cityDao = require("../dao/cityDao");
var crypto = require("../utils/crypto");
var cityRedis = require("../redis/cityRedis");

function nop(a,b,c,d,e){}

//得到周围block数据
//得到资源信息
exports.getBlockData = function(x,y,callback){
    callback = callback == null ? nop :callback;
    cityDao.getBlockData(x,y,function(rows){
        if(rows){
            callback(rows);
        }else{
            callback(false);
        }
    })
}


//得到资源信息
exports.getResourcesIF = function(userid,callback){
    callback = callback == null ? nop :callback;
    cityDao.getResourcesIF(userid,function(rows){
        if(rows){
            //业务逻辑处理
            for(var i=0 ; i< rows.length; i++){
                var timestamp = Date.parse(new Date())/1000;
                var timeDistance = (timestamp - rows[i].updateTime) / (60 * 60);
                //计算累计数量
                var cumulativeFood = parseFloat(rows[i].count) + parseFloat(rows[i].addRate) * timeDistance;

                //计算当前库存
                var nowCount = 0;
                var  biggestCount = rows[i].allCount;
                if(cumulativeFood <= biggestCount){
                    nowCount = cumulativeFood;
                }else{
                    nowCount = biggestCount;
                }
                rows[i].nowCount = nowCount;

                //写入内存数据库
                var key = "t_resources" + "_" + userid + "_" + rows[i].type;
                cityRedis.setResources(key,rows[i],function(flag){
                    if(flag){
                        console.log("flag is  true");
                    }
                })
            }

            callback(rows);
        }else{
            callback(false);
        }
    })
}