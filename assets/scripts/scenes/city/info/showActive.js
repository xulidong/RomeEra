
cc.Class({
    extends: cc.Component,

    properties: {
        upIco : {               //向上按钮
            default : null,
            type  : cc.Node,
        },
        downIco : {              //向下按钮
            default : null,
            type : cc.Node,
        },
        hideVentical  : {          //垂直列表
            default : null,
            type : cc.Node,
        },
    },

    // onLoad () {},


    hideList(){
        this.upIco.active = true;
        this.downIco.active = false;
        this.hideVentical.active = false;
    },

    showList(){
        this.upIco.active = false;
        this.downIco.active = true;
        this.hideVentical.active = true;
    },

    //start () {},

    // update (dt) {},
});
