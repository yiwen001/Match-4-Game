var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GemMap = (function (_super) {
    __extends(GemMap, _super);
    function GemMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.newrecord = [[], [], [], []];
        _this.search = new Array;
        return _this;
    }
    //初始化地图
    GemMap.prototype.init = function (row, col, gem) {
        this.newrecord[row][col] = gem;
    };
    GemMap.prototype.inidisplay = function () {
        this.removeChildren();
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var gem = new Gem();
                //  gem=new Gem();
                gem.add(i, j);
                this.init(i, j, gem);
                this.addChild(this.newrecord[i][j]);
                // this.newrecord[i][j].MarkInit();//标记要不要删/////////////////////////////////////这里要private
                this.newrecord[i][j].ShowPic();
            }
        }
        // this.addChild(detect);
    };
    GemMap.prototype.compare = function (row, col, rowcompare, colcompare) {
        if (this.newrecord[row][col].GetType() == this.newrecord[rowcompare][colcompare].GetType()) {
            return true;
        }
        else {
            return false;
        }
    };
    //检测是否需要消除
    GemMap.prototype.ddetect = function (z) {
        var _this = this;
        this.search = [[0, 0]];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                this.search = [[i, j]];
                this.check();
                if (this.search.length >= 4) {
                    for (var i_1 = 0; i_1 < this.search.length; i_1++) {
                        var x = this.search[i_1][0]; //横坐标
                        var y = this.search[i_1][1]; //竖坐标
                        this.newrecord[x][y].MarkDelete(); //将search中保存的坐标，置为1  这里要private                       
                    }
                }
            }
        }
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                if (this_1.newrecord[i][j].MarkCheck()) {
                    z = 1; //标记是否有需要消除的
                    /////////////remove////////////             
                    ///////////////////////加动画
                    // map.newrecord[i][j].DeletePic();////private 
                    var k_1 = 0;
                    var img_1 = new egret.Bitmap();
                    var bombb_1 = setInterval(function () {
                        if (k_1 > 8) {
                            clearInterval(bombb_1);
                            _this.removeChild(img_1);
                        }
                        k_1 = k_1 + 1;
                        img_1.texture = RES.getRes('elem_eli_1_' + k_1 + '_png');
                        img_1.x = j * 85 + 470;
                        img_1.y = i * 85 + 540;
                        _this.addChild(img_1);
                    }, 50);
                    this_1.removeChild(this_1.newrecord[i][j]);
                }
            };
            for (var j = 0; j < 4; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this;
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
        return z;
    };
    ////////统计
    GemMap.prototype.CountNum = function () {
        var _this = this;
        var count = [0, 0, 0, 0, 0];
        var _loop_3 = function (i) {
            var _loop_4 = function (j) {
                if (this_2.newrecord[i][j].MarkCheck()) {
                    count[this_2.newrecord[i][j].GetType()] += 1;
                }
                if (count[this_2.newrecord[i][j].GetType()] >= 4) {
                    var move_1 = setInterval(function () {
                        if (_this.newrecord[i][j].GetX() < 50) {
                            clearInterval(move_1);
                        }
                        _this.newrecord[i][j].ChangeXY(10, 0);
                        _this.addChild(_this.newrecord[i][j]);
                        _this.newrecord[i][j].ShowPic();
                    }, 500);
                }
            };
            for (var j = 0; j < 4; j++) {
                _loop_4(j);
            }
        };
        var this_2 = this;
        for (var i = 0; i < 4; i++) {
            _loop_3(i);
        }
    };
    /////自动落下+动画，重新mark final
    GemMap.prototype.FallGem = function () {
        for (var j = 0; j < 4; j++) {
            var count = 0;
            for (var i = 3; i >= 0; i--) {
                if (this.newrecord[i][j].MarkCheck()) {
                    count += 1;
                }
                else {
                    if (count > 0) {
                        this.newrecord[i + count][j] = this.newrecord[i][j]; //赋值给下一个宝石
                        // this.newrecord[i][j].MarkDelete();//再次给被移动的位置标1，后面好添加
                        this.removeChild(this.newrecord[i][j]); //删除当前可以移除的宝石
                        this.newrecord[i][j] = null;
                        this.newrecord[i + count][j].GemDrop(count);
                        this.addChild(this.newrecord[i + count][j]);
                        this.newrecord[i + count][j].MarkInit(); //标记要不要删/////////////////////////////////////这里要private
                        this.newrecord[i][j] = new Gem();
                        this.newrecord[i][j].MarkDelete();
                    }
                }
            }
        }
    };
    /////////补全
    GemMap.prototype.add = function () {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (map.newrecord[i][j].MarkCheck()) {
                    var gem = new Gem();
                    gem = new Gem();
                    gem.add(i, j);
                    this.init(i, j, gem);
                    this.addChild(map.newrecord[i][j]);
                    map.newrecord[i][j].ShowPic(); /////////这里要private   +动画
                }
            }
        }
    };
    GemMap.prototype.check = function () {
        var len = this.search.length;
        for (var i = 0; i < this.search.length; i++) {
            var a = this.search[i][0];
            var b = this.search[i][1]; //search[i][1]数组里的列数，search[i][0]是行
            //上
            if (this.pare(a - 1, b) && a - 1 >= 0) {
                if (map.compare(a, b, a - 1, b)) {
                    this.search.push([a - 1, b]);
                }
            }
            //下
            if (this.pare(a + 1, b) && a + 1 < 4) {
                if (map.compare(a, b, a + 1, b)) {
                    this.search.push([a + 1, b]);
                }
            }
            //左
            if (this.pare(a, b - 1) && b - 1 >= 0) {
                if (map.compare(a, b, a, b - 1)) {
                    this.search.push([a, b - 1]);
                }
            }
            //右
            if (this.pare(a, b + 1) && b + 1 < 4) {
                if (map.compare(a, b, a, b + 1)) {
                    this.search.push([a, b + 1]);
                }
            }
            /* if(search.length>len)
             {
              this.check(search);
          }*/
        }
    };
    GemMap.prototype.pare = function (a, b) {
        for (var i = 0; i < this.search.length; i++) {
            if (this.search[i][0] == a && this.search[i][1] == b) {
                return false;
            }
        }
        return true;
    };
    return GemMap;
}(egret.DisplayObjectContainer));
__reflect(GemMap.prototype, "GemMap");
//# sourceMappingURL=map.js.map