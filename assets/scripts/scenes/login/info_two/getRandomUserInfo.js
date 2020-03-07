

cc.Class({
    extends: cc.Component,

    properties: {
        accoutText : {              //账号
            default : null,
            type : cc.EditBox,
        },
        passwordText : {            //密码
            default : null,
            type : cc.EditBox,
        },
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.accoutText.string = this.getsomeText(8);
        this.passwordText.string = this.getsomeText(8);
    },


    //得到n个随机字串、
    getsomeText : function(n){
        var chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c',
                     'd','e','f','g','h','i','j','k','l','m','n','o','p',
                     'q','r','s','t','u','v','w','x','y','z'];
        var res = "";
        for(var i = 0; i < n; i ++){
            var id = Math.ceil(Math.random() * 35);
            res += chars[id];
        }
        return res;
    },

    start () {
        
    },

    // update (dt) {},
});
