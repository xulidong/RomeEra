var redis = require("redis");

var client = null;

exports.connect = function(config){
    client = redis.createClient({
        host : config.host,
        port : config.port,
        db : config.db,
    });
    console.log("cityRedis is running");
    client.on("error",function(err){
        console.log(err);
    });
}

//存储用户资源
exports.setResources = function(key,resourcesInfo,callback){
    if(client === null){
        console.log("client is null from cityRedis");
        return;
    }
    client.hmset(key,resourcesInfo,function(err){
        if(err){
            console.log(err);
            callback(false);
        }else{
            callback(true);
        }
    });
    client.hgetall(key,function(err,obj){
        console.log("type:",obj.type);
    });
}
