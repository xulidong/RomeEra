var CLIENT_PORT = "8889";
var CLIENT_IP = "localhost";
var ACCOUNT_KEY = "@#*&^*&@$asdAA";

exports.userServer = function(){

    return {
        CLIENT_PORT : CLIENT_PORT,
        CLIENT_IP : CLIENT_IP,
        VERSION_NUMBER : "20171202",
    }

}

exports.cityServer = function(){
    
        return {
            CLIENT_PORT : "9000",
            CLIENT_IP : CLIENT_IP,
            VERSION_NUMBER : "20171202",
        }
    
    }
    

exports.mysql = function(){
    return {
        HOST : "127.0.0.1",
        USER : "root",
        PASSWORD : "123456",
        DBNAME : "a_study_lmsd",
        PORT : 3306,
    }
}

exports.redis = function(){
    return {
        host : "127.0.0.1",
        port : 6379,
        db: 0,
    }
}