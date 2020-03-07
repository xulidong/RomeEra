//working for userLogic

//引入mysql
var db = require("../utils/db");
var crypto = require("../utils/crypto");


function nop(a,b,c,d,e){}

//获取建筑信息
exports.getBuildingIF = function(callback){
    callback = callback == null ? nop : callback;
    var sql = "select * from t_builds";
    db.query(sql,function(err,rows,fields){
        if(err){
            console.log("query sql is error from getBuildingIF");
            callback(false);
            return;
        }else{
            if(rows == ""){
                console.log("query sql is null from getBuildingIF");
                callback(false);
                return;
            }else{
                callback(rows);
            }
        }

    })
};


//更新昵称和性别
exports.updateInfo = function(sex,username,account, callback){
    callback = callback == null ? nop : callback;
    if(account == null || username == null || sex == null){
        callback(null);
        return;
    }
    var sql = 'update t_users set  username = "'+username+'",sex = "'+sex+'" where account = "'+account+'"';
    console.log("sql:",sql);
    db.query(sql,function(err,rows,fields){
        if(err){
                if(err.code == 'ER_DUP_ENTRY'){
                    callback(false);
                    return;
                }
                callback(null);
                throw err;
        }else{
            callback(true);
        }
       
    })
};

//创建一个用户
exports.createAccount = function(account,password, callback){
    callback = callback == null ? nop : callback;
    if(account == null || password == null){
        callback(null);
        return;
    }
    var psd = crypto.md5(password);
    console.log("password:",password);
    console.log("psd:",psd);
    var sql = 'insert into t_users  (account,password) values("'+account+'","'+psd+'")';
    console.log("sql:",sql);
    db.query(sql,function(err,rows,fields){
        if(err){
                if(err.code == 'ER_DUP_ENTRY'){
                    callback(false);
                    return;
                }
                callback(null);
                throw err;
        }else{
            callback(true);
        }
       
    })
};

//判断密码是否正确
exports.vercifyPassword = function(account,password, callback){
    callback = callback == null ? nop : callback;
    if(account == null || password == null){
        callback(null);
        return;
    }
    var sql = 'select * from t_users where account = "'+account+'"';
    console.log("sql:",sql);
    db.query(sql,function(err,rows,fields){
        if(err){
            callback(null);
            throw err;
        }
        var psd = crypto.md5(password);
        
        if(rows[0].password == psd){
            var temArray = new Array();
            temArray[0] = true;
            temArray[1] = rows[0];
            callback(temArray);
            return;
        }
        //不存在返回false
        callback(false);
    })
};



//判断昵称是否被使用了
exports.judgeUsername = function(username, callback){
    callback = callback == null ? nop : callback;
    if(username == null){
        callback(null);
        return;
    }
    var sql = 'select * from t_users where username = "'+username+'"';
    console.log("sql:",sql);
    db.query(sql,function(err,rows,fields){
        if(err){
            callback(null);
            throw err;
        }
        if(rows[0]){
            callback(true);
            return;
        }
        //不存在返回false
        callback(false);
    })
};


//判断用户是否存在
exports.judgeAccount = function(account, callback){
    callback = callback == null ? nop : callback;
    if(account == null){
        callback(null);
        return;
    }
    var sql = 'select * from t_users where account = "'+account+'"';
    console.log("sql:",sql);
    db.query(sql,function(err,rows,fields){
        if(err){
            callback(null);
            throw err;
        }
        if(rows[0]){
            callback(true);
            return;
        }
        //不存在返回false
        callback(false);
    })
};



//根据用户id取用户昵称
exports.getNameByUserid = function(userid, callback){
    callback = callback == null ? nop : callback;
    if(userid == null){
        callback(null);
        return;
    }
    var sql = 'select name from t_users where userid = "'+userid+'"';
    console.log("sql:",sql);
    db.query(sql,function(err,rows,fields){
        if(err){
            callback(null);
            throw err;
        }
        if(rows[0].name){
            callback(rows[0].name);
            return;
        }
        callback(null);
    })
};


