class GemMap extends egret.DisplayObjectContainer {



    private newrecord: Gem[][] = [[], [], [], []];
    private search = new Array;



    //初始化地图
    public init(row: number, col: number, gem) {

        this.newrecord[row][col] = gem;
    }

    public inidisplay() {
        this.removeChildren();

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
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


    }
    public compare(row: number, col: number, rowcompare: number, colcompare: number) {
        if (this.newrecord[row][col].GetType() == this.newrecord[rowcompare][colcompare].GetType())//////这里要private
        {
            return true;
        }
        else {
            return false;
        }

    }
    //检测是否需要消除
    public ddetect(z: number) {


        this.search = [[0, 0]];
        for (let i = 0; i < 4; i++) {///////////////////////////////////////
            for (let j = 0; j < 4; j++) {
                this.search = [[i, j]];
                this.check();

                if (this.search.length >= 4) {
                    for (let i = 0; i < this.search.length; i++) {
                        let x = this.search[i][0];//横坐标
                        let y = this.search[i][1];//竖坐标

                        this.newrecord[x][y].MarkDelete();//将search中保存的坐标，置为1  这里要private                       
                    }

                }

            }
        }

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.newrecord[i][j].MarkCheck()) { /////privtae
                    z = 1;    //标记是否有需要消除的




                    /////////////remove////////////             

                    ///////////////////////加动画



                    // map.newrecord[i][j].DeletePic();////private 


                    let k = 0;
                    let img = new egret.Bitmap();
                    let bombb = setInterval(() => {

                        if (k > 8) {
                            clearInterval(bombb);
                            this.removeChild(img);
                        }
                        k = k + 1;
                        img.texture = RES.getRes('elem_eli_1_' + k + '_png');
                        img.x = j * 85 + 470;
                        img.y = i * 85 + 540;
                        this.addChild(img);
                    }, 50)

                    this.removeChild(this.newrecord[i][j]);


                }

            }
        }
        return z;

    }
    ////////统计
    public CountNum() {
        let count = [0, 0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.newrecord[i][j].MarkCheck()) {
                    count[this.newrecord[i][j].GetType()] += 1;

                }
                if (count[this.newrecord[i][j].GetType()] >= 4) {


                    let move = setInterval(() => {
                        if (this.newrecord[i][j].GetX() < 50) {
                            clearInterval(move);
                        }

                        this.newrecord[i][j].ChangeXY(10, 0);
                        this.addChild(this.newrecord[i][j]);
                        this.newrecord[i][j].ShowPic();
                    }, 500)

                }
            }
        }





    }


    /////自动落下+动画，重新mark final
    public FallGem() {
        for (let j = 0; j < 4; j++) {
            let count = 0;
            for (let i = 3; i >= 0; i--) {         //一列一列的检查，从下往上
                if (this.newrecord[i][j].MarkCheck()) {//检查是不是有空位，被删除
                    count += 1;
                }
                else {
                    if (count > 0) {
                        this.newrecord[i + count][j] = this.newrecord[i][j];//赋值给下一个宝石
                        // this.newrecord[i][j].MarkDelete();//再次给被移动的位置标1，后面好添加
                        this.removeChild(this.newrecord[i][j]);//删除当前可以移除的宝石




                        this.newrecord[i][j] = null;



                        this.newrecord[i + count][j].GemDrop(count);

                        this.addChild(this.newrecord[i + count][j]);
                        this.newrecord[i + count][j].MarkInit();//标记要不要删/////////////////////////////////////这里要private

                        this.newrecord[i][j] = new Gem();
                        this.newrecord[i][j].MarkDelete();


                    }

                }
            }

        }


    }



    /////////补全
    public add() {

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {

                if (map.newrecord[i][j].MarkCheck()) {        /////////这里要private
                    var gem = new Gem();
                    gem = new Gem();
                    gem.add(i, j);
                    this.init(i, j, gem);
                    this.addChild(map.newrecord[i][j]);
                    map.newrecord[i][j].ShowPic();   /////////这里要private   +动画
                }
            }
        }

    }


    public check() {
        let len = this.search.length;
        for (let i = 0; i < this.search.length; i++) {

            let a = this.search[i][0];
            let b = this.search[i][1];//search[i][1]数组里的列数，search[i][0]是行

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
                if (map.compare(a, b, a, b + 1)) {//nums存储对应坐标的图片信息

                    this.search.push([a, b + 1]);
                }
            }
            /* if(search.length>len)
             {    
              this.check(search);
          }*/

        }
    }


    public pare(a: number, b: number) {
        for (let i = 0; i < this.search.length; i++) {
            if (this.search[i][0] == a && this.search[i][1] == b) {
                return false;
            }
        }
        return true;

    }








}