
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        //穿透button事件
        var sonNodes = this.node.children;
        for (var i = 0 ; i < sonNodes.length; i ++){
            var sond = sonNodes[i];
            sond.on(cc.Node.EventType.TOUCH_START,function(e){
                //cc.log("start");
            },this);
            sond.on(cc.Node.EventType.TOUCH_MOVE,function(e){
                e.stopPropagationImmediate();
                //cc.log("move");
            },this);
            sond.on(cc.Node.EventType.TOUCH_END,function(e){
                //cc.log("end");
            },this);
            sond.on(cc.Node.EventType.TOUCH_CANCEL,function(e){
                //cc.log("cancel");
            },this);
        }

    },

    //start () {},

    // update (dt) {},
});
