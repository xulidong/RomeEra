
cc.Class({
    extends: cc.Component,

    properties: {
        userid : null,      //用户id
        account : null,     //用户账号
        username : null,       //用户昵称
        sex  : 1,       //1: 男 ;  2 : 女
        lv : 1,         //等级从1开始
        exp : 0,        //经验从0开始
        coins : 0,      //金币从0开始
        gems : 0,       //宝石从0开始
        sign : null,    //用户安全秘钥
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //start () { },

    // update (dt) {},
});
