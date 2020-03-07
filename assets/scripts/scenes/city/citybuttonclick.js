cc.Class({
    extends: cc.Component,

    properties: {
        
        barrackPrefab : {           //募兵
            default : null,
            type : cc.Prefab,
        },
        detailPrefab : {            //详情
            default : null,
            type : cc.Prefab,
        },
        upgradePrefab : {           //升级
            default : null,
            type : cc.Prefab,
        },
        trainPrefab : {             //训练
            default : null,
            type : cc.Prefab,
        },
        getMoneyPrefab : {          //征税
            default : null,
            type : cc.Prefab,
        },
        studyPrefab : {             //研究
            default : null,
            type : cc.Prefab,
        },
        topshow : {             //显示层
            default : null,
            type : cc.Node,
        },
    
    },

    citybuttonclick : function(event,customeventdata){
        
        var tgnode = event.target;
        var tgnodename = tgnode.name;
        var topshow = this.topshow;

        topshow.zIndex = 1000;

           //临时图标数组
           var  icoArray = new Array();

        //清除之前的小图标
        if(topshow.childrenCount>0){
            var tgchildArry = topshow.children;
            for(var i = 0; i < tgchildArry.length; i++){
              tgchildArry[i].destroy();
            }
         }

     

        //筛选建筑
        switch(tgnodename){
            case "barracks_one" : 
                            cc.aa[0] = "aaatest";
                            cc.log("aa",cc.aa[0]);
                            cc.log("barracks_one");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.barrackPrefab;
                            icoArray[2] = this.upgradePrefab;
                            break;
            case "barracks_two" :
                            cc.log("barracks_two");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.barrackPrefab;
                            icoArray[2] = this.upgradePrefab;
                            break;
            case "trainning"    :
                            cc.log("trainning");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.trainPrefab;
                            icoArray[2] = this.upgradePrefab;
                            break;
            case "castle"    :   //城堡
                            cc.log("castle");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.getMoneyPrefab;
                            icoArray[2] = this.upgradePrefab;
                            break;
            case "school"    :   //书院
                            cc.log("school");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.studyPrefab;
                            icoArray[2] = this.upgradePrefab;
                            break;
            case "warehouse_one"    :   //仓库1
                            cc.log("warehouse_one");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.upgradePrefab;
                            break;
            case "warehouse_two"    :   //仓库2
                            cc.log("warehouse_two");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.upgradePrefab;
                            break;
            case "warehouse_four"    :   //仓库4
                            cc.log("warehouse_four");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.upgradePrefab;
                            break;
            case "house"    :   //民居
                            cc.log("house");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.upgradePrefab;
                            break;
            case "hood"    :   //伐木场
                            cc.log("hood");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.upgradePrefab;
                            break;
            case "stone"    :   //石材厂
                            cc.log("stone");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.upgradePrefab;
                            break;
            case "field"    :   //农田
                            cc.log("field");
                            icoArray[0] = this.detailPrefab;
                            icoArray[1] = this.upgradePrefab;
                            break;
            default             :
                            cc.log("default");
        }


        var tx = event.getLocationX();
        var ty = event.getLocationY();
        var pnode2 = topshow.convertToNodeSpaceAR(cc.p(tx,ty));
        
        if(icoArray[2]){
            var node1 = cc.instantiate(icoArray[0]);
            var node2 = cc.instantiate(icoArray[1]);
            var node3 = cc.instantiate(icoArray[2]);
            topshow.addChild(node1);
            topshow.addChild(node2);
            topshow.addChild(node3);
            node2.y = pnode2.y - 80;
            node2.x = pnode2.x;
            node1.x = node2.x - 70;
            node1.y = node2.y + 30;
            node3.x = node2.x + 70;
            node3.y = node2.y + 30;
        }else{
            var node1 = cc.instantiate(icoArray[0]);
            var node2 = cc.instantiate(icoArray[1]);
            topshow.addChild(node1);
            topshow.addChild(node2);
            node1.x = pnode2.x - 36;
            node1.y = pnode2.y - 70;
            node2.x = pnode2.x + 36;
            node2.y = pnode2.y - 70;
            
        }
       

    },


    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
