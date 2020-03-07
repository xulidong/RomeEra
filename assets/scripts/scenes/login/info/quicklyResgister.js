
cc.Class({
    extends: cc.Component,

    properties: {

        showNode : {
            default : null,
            type : cc.Node,
        },

    },



    onLoad () {},

    quickRegister(){
        this.node.active = false;
        this.showNode.active = true;
    },

    start () {

    },

    // update (dt) {},
});
