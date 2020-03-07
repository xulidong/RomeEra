var redis = require("redis");

var client = null;

exports.connect = function(config){
    client = redis.createClient({
        host : config.host,
        port : config.port,
        db : config.db,
    });
    console.log("userRedis is running");
    client.on("error",function(err){
        console.log(err);
    });
}


exports.setUser = function(userInfo){
    if(client === null){
        console.log("userRedis client is null");
        return;
    }
    var key = "t_users" + "_" + userInfo.userid;
    client.hmset(key, userInfo, function (err, res) {
        if(err){
            console.log("userRedis hmset is err");
        }
    });
    client.hgetall(key, function (err, obj) {
        console.log("redisPrintStart");
        console.dir(obj);
        console.log("redisPrintEnd");
    });
}