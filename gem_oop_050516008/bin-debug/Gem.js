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
var Gem = (function (_super) {
    __extends(Gem, _super);
    function Gem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //生成图片
    Gem.prototype.add = function (i, j) {
        this.ttype = tools.random_num(0, 4);
        this.temptype = this.ttype + 1;
        this.pic = tools.createBitmapByName('gem_' + this.temptype + '_png');
        this.pic.x = j * 85 + 515;
        this.pic.y = 5;
        this.row = i;
        this.col = j;
        this.final = 0;
        ////////////动画//////////
        egret.Tween.get(this.pic).to({ y: i * 85 + 400 }, 400).to({ y: i * 85 + 600 }, 600, egret.Ease.backOut);
        /* let time= setInterval(()=>{
             
            if(this.pic.y>=i*85+600)
            {
               clearInterval(time);
                
            }
             this.pic.y+=5;
            },1) */
    };
    Gem.prototype.MarkInit = function () {
        this.final = 0;
        return this.final;
    };
    Gem.prototype.GetType = function () {
        return this.ttype;
    };
    Gem.prototype.MarkDelete = function () {
        this.final = 1;
        return this.final;
    };
    Gem.prototype.MarkCheck = function () {
        return this.final == 1;
    };
    Gem.prototype.ShowPic = function () {
        this.addChild(this.pic);
    };
    Gem.prototype.DeletePic = function () {
        this.removeChild(this.pic);
    };
    Gem.prototype.GetX = function () {
        return this.x;
    };
    Gem.prototype.GetY = function () {
        return this.y;
    };
    Gem.prototype.ChangeXY = function (c, d) {
        this.pic.x -= c;
        this.pic.y -= d;
    };
    Gem.prototype.GemDrop = function (count) {
        var _this = this;
        var a = this.pic.y;
        // this.pic.x=0;
        var time = setInterval(function () {
            console.log(a);
            if (_this.pic.y >= a + count * 85) {
                clearInterval(time);
            }
            _this.pic.y += 1;
        }, 1);
        console.log(this.pic.y);
    };
    return Gem;
}(egret.DisplayObjectContainer));
__reflect(Gem.prototype, "Gem");
//# sourceMappingURL=Gem.js.map