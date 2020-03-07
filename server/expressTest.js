//引入express模块
var express = require('express');

//创建一个express对象
var app = express();

//监听7777端口
app.listen("7777");

console.log("myaccount server is listening on 7777");

//响应json数据
function send(res,ret){
	var str = JSON.stringify(ret);
	res.send(str)
}

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//响应某个特定请求
app.get('/aaa',function(req,res){
    console.log("aaa进入");
    //res.send("欢迎你进入aaa！");
    send(res,"aaaa");
});

//响应某个特定请求
app.get('/bbb',function(req,res){
    console.log("bbb进入");
    res.send("欢迎你进入bbb！");
});