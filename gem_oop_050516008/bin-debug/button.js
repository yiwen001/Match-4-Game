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
var bbutton = (function (_super) {
    __extends(bbutton, _super);
    function bbutton() {
        //  private lable:string="开始";
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.horizontalCenter = -100;
        _this.verticalCenter = -100;
        return _this;
    }
    return bbutton;
}(eui.Button));
__reflect(bbutton.prototype, "bbutton");
//# sourceMappingURL=button.js.map