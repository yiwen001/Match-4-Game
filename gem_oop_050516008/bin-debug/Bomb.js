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
var bomb = (function (_super) {
    __extends(bomb, _super);
    function bomb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bomb.prototype.timeout = function () {
        var _this = this;
        setTimeout(function () {
            var img = new egret.Bitmap();
            for (var k = 0; k < 9; k++) {
                img.texture = RES.getRes('elem_eli_1_' + k + '_png');
                img.x = 600;
                img.y = 680;
                _this.addChild(img);
                _this.timeout();
            }
        }, 1000 / 60);
    };
    return bomb;
}(egret.DisplayObjectContainer));
__reflect(bomb.prototype, "bomb");
//# sourceMappingURL=Bomb.js.map