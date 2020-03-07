
cc.Class({
    extends: cc.Component,

    properties: {
       
        buildingLvFab : {           //建筑等级预载入资源
            default : null,
            type : cc.Prefab,
        },
        buildNameFlagFab : {           //建筑名称预载入资源
            default : null,
            type : cc.Prefab,
        },
        showBudLv : {              //建筑信息显示层
            default : null,
            type : cc.Node,
        },
    },

    onLoad () {
        var self = this;
        //请求服务器，取建筑信息
        cc.vv.http.sendRequest("/getBuildInfo",null,function(data){
            if(data.code == 0){
                for(var i = 0;i < data.rows.length; i++){
                    var temName = data.rows[i].buildName;
                    if(temName == "城堡"){
                        cc.vv.buildings.castle = {};
                        cc.vv.buildings.castle.buildId = data.rows[i].buildId;
                        cc.vv.buildings.castle.buildName = data.rows[i].buildName;
                        cc.vv.buildings.castle.buildLv = data.rows[i].buildLv;
                    }else if(temName == "商城"){
                        cc.vv.buildings.shop = {};
                        cc.vv.buildings.shop.buildId = data.rows[i].buildId;
                        cc.vv.buildings.shop.buildName = data.rows[i].buildName;
                        cc.vv.buildings.shop.buildLv = data.rows[i].buildLv;
                    }else if(temName == "训练营"){
                        cc.vv.buildings.trainning = {};
                        cc.vv.buildings.trainning.buildId = data.rows[i].buildId;
                        cc.vv.buildings.trainning.buildName = data.rows[i].buildName;
                        cc.vv.buildings.trainning.buildLv = data.rows[i].buildLv;
                    }else if(temName == "兵营1"){
                        cc.vv.buildings.barracks_one = {};
                        cc.vv.buildings.barracks_one.buildId = data.rows[i].buildId;
                        cc.vv.buildings.barracks_one.buildName = data.rows[i].buildName;
                        cc.vv.buildings.barracks_one.buildLv = data.rows[i].buildLv;
                    }else if(temName == "书院"){
                        cc.vv.buildings.school = {};
                        cc.vv.buildings.school.buildId = data.rows[i].buildId;
                        cc.vv.buildings.school.buildName = data.rows[i].buildName;
                        cc.vv.buildings.school.buildLv = data.rows[i].buildLv;
                    }else if(temName == "仓库1"){
                        cc.vv.buildings.warehouse_one = {};
                        cc.vv.buildings.warehouse_one.buildId = data.rows[i].buildId;
                        cc.vv.buildings.warehouse_one.buildName = data.rows[i].buildName;
                        cc.vv.buildings.warehouse_one.buildLv = data.rows[i].buildLv;
                    }else if(temName == "战俘营"){
                        cc.vv.buildings.prisoner = {};
                        cc.vv.buildings.prisoner.buildId = data.rows[i].buildId;
                        cc.vv.buildings.prisoner.buildName = data.rows[i].buildName;
                        cc.vv.buildings.prisoner.buildLv = data.rows[i].buildLv;
                    }else if(temName == "民居"){
                        cc.vv.buildings.house = {};
                        cc.vv.buildings.house.buildId = data.rows[i].buildId;
                        cc.vv.buildings.house.buildName = data.rows[i].buildName;
                        cc.vv.buildings.house.buildLv = data.rows[i].buildLv;
                    }else if(temName == "农田"){
                        cc.vv.buildings.field = {};
                        cc.vv.buildings.field.buildId = data.rows[i].buildId;
                        cc.vv.buildings.field.buildName = data.rows[i].buildName;
                        cc.vv.buildings.field.buildLv = data.rows[i].buildLv;
                    }else if(temName == "伐木场"){
                        cc.vv.buildings.hood = {};
                        cc.vv.buildings.hood.buildId = data.rows[i].buildId;
                        cc.vv.buildings.hood.buildName = data.rows[i].buildName;
                        cc.vv.buildings.hood.buildLv = data.rows[i].buildLv;
                    }else if(temName == "石材厂"){  //暂时未做
                        cc.vv.buildings.stone = {};
                        cc.vv.buildings.stone.buildId = data.rows[i].buildId;
                        cc.vv.buildings.stone.buildName = data.rows[i].buildName;
                        cc.vv.buildings.stone.buildLv = data.rows[i].buildLv;
                    }else if(temName == "炼铁厂"){
                        cc.vv.buildings.iron = {};
                        cc.vv.buildings.iron.buildId = data.rows[i].buildId;
                        cc.vv.buildings.iron.buildName = data.rows[i].buildName;
                        cc.vv.buildings.iron.buildLv = data.rows[i].buildLv;
                    }else if(temName == "酒馆"){
                        cc.vv.buildings.tavern = {};
                        cc.vv.buildings.tavern.buildId = data.rows[i].buildId;
                        cc.vv.buildings.tavern.buildName = data.rows[i].buildName;
                        cc.vv.buildings.tavern.buildLv = data.rows[i].buildLv;
                    }else if(temName == "符文室"){
                        cc.vv.buildings.rune = {};
                        cc.vv.buildings.rune.buildId = data.rows[i].buildId;
                        cc.vv.buildings.rune.buildName = data.rows[i].buildName;
                        cc.vv.buildings.rune.buildLv = data.rows[i].buildLv;
                    }else if(temName == "军团"){
                        cc.vv.buildings.corps = {};
                        cc.vv.buildings.corps.buildId = data.rows[i].buildId;
                        cc.vv.buildings.corps.buildName = data.rows[i].buildName;
                        cc.vv.buildings.corps.buildLv = data.rows[i].buildLv;
                    }else if(temName == "铁匠铺"){
                        cc.vv.buildings.smithy = {};
                        cc.vv.buildings.smithy.buildId = data.rows[i].buildId;
                        cc.vv.buildings.smithy.buildName = data.rows[i].buildName;
                        cc.vv.buildings.smithy.buildLv = data.rows[i].buildLv;
                    }else if(temName == "竞技场"){
                        cc.vv.buildings.arena = {};
                        cc.vv.buildings.arena.buildId = data.rows[i].buildId;
                        cc.vv.buildings.arena.buildName = data.rows[i].buildName;
                        cc.vv.buildings.arena.buildLv = data.rows[i].buildLv;
                    }else if(temName == "战争学院"){
                        cc.vv.buildings.war = {};
                        cc.vv.buildings.war.buildId = data.rows[i].buildId;
                        cc.vv.buildings.war.buildName = data.rows[i].buildName;
                        cc.vv.buildings.war.buildLv = data.rows[i].buildLv;
                    }else if(temName == "奇迹"){
                        cc.vv.buildings.wonder = {};
                        cc.vv.buildings.wonder.buildId = data.rows[i].buildId;
                        cc.vv.buildings.wonder.buildName = data.rows[i].buildName;
                        cc.vv.buildings.wonder.buildLv = data.rows[i].buildLv;
                    }else if(temName == "作坊"){
                        cc.vv.buildings.workshop = {};
                        cc.vv.buildings.workshop.buildId = data.rows[i].buildId;
                        cc.vv.buildings.workshop.buildName = data.rows[i].buildName;
                        cc.vv.buildings.workshop.buildLv = data.rows[i].buildLv;
                    }else if(temName == "烽火台"){
                        cc.vv.buildings.tower = {};
                        cc.vv.buildings.tower.buildId = data.rows[i].buildId;
                        cc.vv.buildings.tower.buildName = data.rows[i].buildName;
                        cc.vv.buildings.tower.buildLv = data.rows[i].buildLv;
                    }else if(temName == "军营"){
                        cc.vv.buildings.army = {};
                        cc.vv.buildings.army.buildId = data.rows[i].buildId;
                        cc.vv.buildings.army.buildName = data.rows[i].buildName;
                        cc.vv.buildings.army.buildLv = data.rows[i].buildLv;
                    }else if(temName == "兵营2"){
                        cc.vv.buildings.barracks_two = {};
                        cc.vv.buildings.barracks_two.buildId = data.rows[i].buildId;
                        cc.vv.buildings.barracks_two.buildName = data.rows[i].buildName;
                        cc.vv.buildings.barracks_two.buildLv = data.rows[i].buildLv;
                    }else if(temName == "仓库2"){
                        cc.vv.buildings.warehouse_two = {};
                        cc.vv.buildings.warehouse_two.buildId = data.rows[i].buildId;
                        cc.vv.buildings.warehouse_two.buildName = data.rows[i].buildName;
                        cc.vv.buildings.warehouse_two.buildLv = data.rows[i].buildLv;
                    } 
                }
                self.setInfo();
            }else{
                cc.log("errmsg:",data.msg);
            }
        })

    },

    //设置建筑等级和名称
    setInfo(){
        var self = this;
        var showBudLv = this.showBudLv;
        var childNodes = this.node.children;
        for(var i = 0 ; i < childNodes.length ; i ++){

            var cld = childNodes[i];
            var lvNode = null;
            var p = null;
            var nodeTem = null;
            var bNameNode = null;
            var bLvNode = null;
            var showNameAndLv = function(){
                lvNode = cc.instantiate(self.buildingLvFab);
                showBudLv.addChild(lvNode);
                p = showBudLv.convertToWorldSpaceAR(cc.p(cld.x,cld.y));
                nodeTem = showBudLv.convertToNodeSpaceAR(p);
                //得到等级和名称对象
                bNameNode = lvNode.getChildByName("ID_16").getChildByName("budName").getComponent(cc.Label);
                bLvNode = lvNode.getChildByName("ID_153").getChildByName("budLv").getComponent(cc.Label);
                //设置位置
                lvNode.x = nodeTem.x;
                lvNode.y = nodeTem.y + cld.height/2 + 20;
            };
            var onlyShowName = function(){
                lvNode = cc.instantiate(self.buildNameFlagFab);
                showBudLv.addChild(lvNode);
                p = showBudLv.convertToWorldSpaceAR(cc.p(cld.x,cld.y));
                nodeTem = showBudLv.convertToNodeSpaceAR(p);
                //得到等级和名称对象
                bNameNode = lvNode.getChildByName("budName").getComponent(cc.Label);
                //bLvNode = lvNode.getChildByName("ID_153").getChildByName("budLv").getComponent(cc.Label);
                //设置位置
                lvNode.x = nodeTem.x;
                lvNode.y = nodeTem.y + cld.height/2 + 20;
            };

            //根据建筑name设置等级和名称
            switch(cld.name){
                case "castle" :
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.castle.buildName;
                            bLvNode.string = cc.vv.buildings.castle.buildLv; 
                            break;
                case "shop" :
                            onlyShowName();
                            bNameNode.string = cc.vv.buildings.shop.buildName;
                            break;
                case "trainning" :  //训练营
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.trainning.buildName;
                            bLvNode.string = cc.vv.buildings.trainning.buildLv; 
                            break;
                case "barracks_one" : //兵营1
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.barracks_one.buildName;
                            bLvNode.string = cc.vv.buildings.barracks_one.buildLv; 
                            break;
                case "school" :     //书院
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.school.buildName;
                            bLvNode.string = cc.vv.buildings.school.buildLv; 
                            break;
                case "warehouse_one" :  //仓库1
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.warehouse_one.buildName;
                            bLvNode.string = cc.vv.buildings.warehouse_one.buildLv; 
                            break;
                case "prisoner" :   //战俘营
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.prisoner.buildName;
                            bLvNode.string = cc.vv.buildings.prisoner.buildLv; 
                            break;
                case "house" :   //民居
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.house.buildName;
                            bLvNode.string = cc.vv.buildings.house.buildLv; 
                            break;
                case "field" :  //农田
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.field.buildName;
                            bLvNode.string = cc.vv.buildings.field.buildLv; 
                            break;
                case "hood" :       //伐木场
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.hood.buildName;
                            bLvNode.string = cc.vv.buildings.hood.buildLv; 
                            break;
                case "stone" :      //石材场
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.stone.buildName;
                            bLvNode.string = cc.vv.buildings.stone.buildLv; 
                            break;
                case "iron" :       //炼铁厂
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.iron.buildName;
                            bLvNode.string = cc.vv.buildings.iron.buildLv; 
                            break;
                case "tavern" :     //酒馆
                            onlyShowName();
                            bNameNode.string = cc.vv.buildings.tavern.buildName;
                            break;
                case "rune" :       //符文室
                            onlyShowName();
                            bNameNode.string = cc.vv.buildings.rune.buildName;
                            break;
                case "corps" :      //军团
                            onlyShowName();
                            bNameNode.string = cc.vv.buildings.corps.buildName;
                            break;
                case "smithy" :     //铁匠铺
                            onlyShowName();
                            bNameNode.string = cc.vv.buildings.smithy.buildName;
                            break;
                case "arena" :      //竞技场
                            //onlyShowName();
                            //bNameNode.string = cc.vv.buildings.arena.buildName;
                            break;
                case "war" :       //战争学院
                            onlyShowName();
                            bNameNode.string = cc.vv.buildings.war.buildName;
                            break;
                case "wonder" :     //奇迹
                            onlyShowName();
                            bNameNode.string = cc.vv.buildings.wonder.buildName;
                            break;
                case "workshop" :   //作坊
                            onlyShowName();
                            bNameNode.string = cc.vv.buildings.workshop.buildName;
                            break;
                case "tower" :      //烽火台
                            onlyShowName();
                            bNameNode.string = cc.vv.buildings.tower.buildName;
                            break;
                case "army" :       //军营
                            onlyShowName();
                            bNameNode.string = cc.vv.buildings.army.buildName;
                            break;
                case "barracks_two" :   //兵营2
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.barracks_two.buildName;
                            bLvNode.string = cc.vv.buildings.barracks_two.buildLv;
                            break;
                case "warehouse_two" :    //仓库2
                            showNameAndLv();
                            bNameNode.string = cc.vv.buildings.warehouse_two.buildName;
                            bLvNode.string = cc.vv.buildings.warehouse_two.buildLv; 
                            break;
                default :       
                                cc.log("build name null");
            }
        }
    },

    //start () {},

    // update (dt) {},
});
