var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var tools = (function () {
    function tools() {
    }
    //不用初始化tools，也能直接调用createBitmapByName 
    tools.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /*
        public static check() {
            let len = search.length;
            for (let i = 0; i < search.length; i++) {
    
                let a = search[i][0];
                let b = search[i][1];//search[i][1]数组里的列数，search[i][0]是行
    
                //上
                if (this.pare(a - 1, b) && a - 1 >= 0) {
                    if (map.compare(a, b, a - 1, b)) {
                        search.push([a - 1, b]);
    
                    }
                }
                //下
                if (this.pare(a + 1, b) && a + 1 < 4) {
                    if (map.compare(a, b, a + 1, b)) {
                        search.push([a + 1, b]);
                    }
                }
                //左
                if (this.pare(a, b - 1) && b - 1 >= 0) {
    
                    if (map.compare(a, b, a, b - 1)) {
                        search.push([a, b - 1]);
    
                    }
                }
    
                //右
    
                if (this.pare(a, b + 1) && b + 1 < 4) {
                    if (map.compare(a, b, a, b + 1)) {//nums存储对应坐标的图片信息
    
                        search.push([a, b + 1]);
                    }
                }
                 if(search.length>len)
                 {
                  this.check(search);
              }
    
            }
        }
    
        
        public static pare(a: number, b: number) {
            for (let i = 0; i < search.length; i++) {
                if (search[i][0] == a && search[i][1] == b) {
                    return false;
                }
            }
            return true;
    
        }
    */
    tools.random_num = function (min, max) {
        var Range = max - min;
        var Rand = Math.random();
        return (min + Math.round(Rand * Range));
    };
    return tools;
}());
__reflect(tools.prototype, "tools");
//# sourceMappingURL=tools.js.map