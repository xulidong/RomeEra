
cc.Class({
    extends: cc.Component,

    properties: {
        worldNode : {
            default : null,
            type : cc.Node,
        },
        cityNode : {
            default : null,
            type : cc.Node,
        },
        worldMap : {
            default : null,
            type : cc.Node,
        },
        cityMap : {
            default : null,
            type : cc.Node,
        },
        cameraNode : {
            default : null,
            type : cc.Node,
        },
        topshow : {
            default : null,
            type : cc.Node,
        },
    },



    onLoad () {
        this.cameraWFlag = false;
        this.cameraCFlag = false;
    },

    changeWorld(){
        this.cameraCx = this.cameraNode.x;
        this.cameraCy = this.cameraNode.y;
        this.cameraCFlag = true;

        //清空小按钮
        this.topshow.removeAllChildren();

        this.worldNode.active = true;
        this.cityNode.active = false;
        this.worldMap.active = true;
        this.cityMap.active = false;

        if(this.cameraWFlag){
            this.cameraNode.x = this.cameraWx;
            this.cameraNode.y = this.cameraWy;
        }
    },

    changeCity(){
    
        this.worldNode.active = false;
        this.cityNode.active = true;
        this.worldMap.active = false;
        this.cityMap.active = true;

        this.cameraWx = this.cameraNode.x;
        this.cameraWy = this.cameraNode.y;
        this.cameraWFlag = true;

        if(this.cameraCFlag){
            this.cameraNode.x = this.cameraCx;
            this.cameraNode.y = this.cameraCy;
        }
    },

    start () {

    },

    // update (dt) {},
});
