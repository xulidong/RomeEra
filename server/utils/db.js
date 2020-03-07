
var mysql = require("mysql");
var pool = null;


//执行sql
exports.query = function(sql,callback){
        pool.getConnection(function(err,conn){
            if(err){
                callback(err,null,null);
            }else{
                conn.query(sql,function(qerr,vals,fields){
                    conn.release();
                    callback(qerr,vals,fields);
                });
            }
        });
    }

exports.init = function(config){
    pool = mysql.createPool({
        host : config.HOST,
        user : config.USER,
        password : config.PASSWORD,
        database : config.DBNAME,
        port : config.PORT,
    });
};
