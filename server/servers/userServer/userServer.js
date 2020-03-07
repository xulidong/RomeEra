//引入express模块
var express = require('express');
var crypto = require("../../utils/crypto");
//引入userLogic
var userLogic = require("../../logic/userLogic");
//创建一个express对象
var app = express();

//监听7777端口
//app.listen("7777");

var userRedis = require("../../redis/userRedis");

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
    console.log("myaccount server is listening on "+config.CLIENT_PORT);
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



//获取建筑信息
app.get('/getBuildInfo',function(req,res){
    userLogic.getBuildingIF(function(rows){
        if(rows){
            send(res,{code : 0,msg : "ok",rows : rows});
        }else{
            send(res,{code : 1 ,msg :"getBuildInfo is err"});
        }
    });
});


//获取版本号响应
app.get('/getVersion',function(req,res){
    var verNumber = config.VERSION_NUMBER;
    send(res,{version : verNumber});
});


//创建角色
app.get('/createRole',function(req,res){
    var account = req.query.account;
    var sign = req.query.sign;
    var sex = req.query.sex;
    var username = req.query.username;
    //判断是否为空
    if(account == "" || sign == ""||sex == "" || username == ""){
        send(res,{code : 1 ,msg :"some params is null"});
        return;
    }
    //验证用户秘钥
    var mysign = crypto.md5(account + req.ip + config.ACCOUNT_KEY);
    if(mysign!=sign){
        send(res,{code : 1 ,msg :"the sign is error"});
        return;
    }
    //验证昵称是否存在
    userLogic.judgeUsername(username,function(has){
        console.log("hsa:",has);
        if(has){
            send(res,{code:1,msg : "the username is exist"});
        }else{
            //没有的话，就更新用户的昵称和性别信息
            userLogic.updateInfo(sex,username,account,function(suc){
                if(suc){
                    send(res,{code : 0, msg : "ok",username : username, sex : sex});
                }else{
                    send(res,{code : 1, msg : "update userinfo happened error"});
                }
            });
            
        }
    });
});

//登录响应
app.get('/loginGame',function(req,res){
    var account = req.query.account;
    var password = req.query.password;
    //判断是否为空
    if(account == "" || password == ""){
        send(res,{code : 1 ,msg :"account or password is null"});
    }
   
    //验证账号密码是否正确
    userLogic.vercifyPassword(account,password,function(data){
        if(data){
            //密码正确
            var sign = crypto.md5(data[1].userid + req.ip + config.ACCOUNT_KEY);
            send(res,{code : 0, msg : "ok", sign : sign,userInfo:data[1]});
            //把用户信息写入redis
            userRedis.setUser(data[1]);
        }else{
            send(res,{code:1,msg : "the password or account is wrong"});
        }
    });
});






//注册响应
app.get('/register',function(req,res){
    var account = req.query.account;
    var password = req.query.password;
    //判断是否为空
    if(account == "" || password == ""){
        send(res,{code : 1 ,msg :"account or password is null"});
    }

    userLogic.judgeAccount(account,function(has){
        console.log("hsa:",has);
        if(has){
            send(res,{code:1,msg : "the account is used"});
        }else{
            //没有的话，就创建一个账号
            userLogic.createAccount(account,password,function(suc){
                if(suc){
                    var sign = crypto.md5(account + req.ip + config.ACCOUNT_KEY);
                    send(res,{code : 0, msg : "ok",account : account, sign : sign});
                }else{
                    send(res,{code : 1, msg : "create account happened error"});
                }
            });
            
        }
    });
});




