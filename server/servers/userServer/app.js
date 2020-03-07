var cfg = require(process.argv[2]);
var config = cfg.userServer();

var db = require("../../utils/db");
db.init(cfg.mysql());

var redisConfig = cfg.redis();
var userRedis = require("../../redis/userRedis");
userRedis.connect(redisConfig);

var us = require("./userServer");
us.start(config);