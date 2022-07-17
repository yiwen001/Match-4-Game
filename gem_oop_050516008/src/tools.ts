const enum gemtype {
    "gem_1_png",
    "gem_2_png",
    "gem_3_png",
    "gem_4_png",
    "gem_5_png"
}
class tools {

    //不用初始化tools，也能直接调用createBitmapByName 
    public static createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

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
    public static random_num(min: number, max: number) {
        let Range = max - min;
        let Rand = Math.random();
        return (min + Math.round(Rand * Range));
    }

    /*
        public static detect(){
        for(let i=0;i<4;i++){
                 final[i]=[0];
                for(let j=0;j<4;j++){
                    final[i][j]=0;
                }
            }
    
            search=[[0,0]];//临时数组，用来存储和具体某一位置图片相同的坐标
               
            for(let i=0;i<4;i++){///////////////////////////////////////
                for(let j=0;j<4;j++){
                    search=[[i,j]];
                    this.check();
                  
                    if(search.length>=4)
                    {
                      
    
                        for(let i=0;i<search.length;i++)
                        {
                              final[search[i][0]][search[i][1]]=1;//将search中保存的坐标，置为1                         
                        }
    
                    }  
                    
                }
            }      
            
      }*/


}


