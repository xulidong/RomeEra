//引入express模块
var express = require('express');
var crypto = require("../../utils/crypto");
//引入userLogic
var cityLogic = require("../../logic/cityLogic");
//创建一个express对象
var app = express();

//监听7777端口
//app.listen("7777");

//响应json数据
function send(res,ret){
	var str = JSON.stringify(ret);
	res.send(str)
}

var config = null;
exports.start = function(cfg){
    config = cfg;
    //监听7777端口
    app.listen(config.CLIENT_PORT);
    console.log("city server is listening on "+config.CLIENT_PORT);
}

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");

    var userid = req.query.userid;
    var sign = req.query.sign;
    if(userid == null || sign == null){
        send(res,{code : 1, msg : "params sign is null"});
        return;
    }
    var mysign = crypto.md5(userid + req.ip + config.ACCOUNT_KEY);
    if(sign != mysign){
        send(res,{code : 1, msg : "this sign is error"});
        return;
    }

    next();
});


//获取周围block数据
app.get('/getBlockData',function(req,res){
    var x = req.query.m;
    var y = req.query.n;
    if(x==null||y==null){
        send(res,{code : 1, msg : "m ro n is null"});
        return;
    }
    cityLogic.getBlockData(x,y,function(rows){
        if(rows){
            send(res,{code : 0,msg : "ok",rows : rows});
        }else{
            send(res,{code : 1, msg : "getBlockData is error"});
        }
    })
});


//获取资源信息
app.get('/getResourcesInfo',function(req,res){
    var userid = req.query.userid;
    cityLogic.getResourcesIF(userid,function(rows){
        if(rows){
            send(res,{code : 0,msg : "ok",rows : rows});
        }else{
            send(res,{code : 1, msg : "getResourcesInfo is error"});
        }
    })
});


