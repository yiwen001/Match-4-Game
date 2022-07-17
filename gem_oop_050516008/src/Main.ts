//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
    
  
    //these variable need to be cancelled. no global variable in this file 2021.12.02
   
    //main函数里只能有一个 map.inidisplay();
    var reset=new mybutton();
    var detect=new mybutton();
    var recover=new mybutton();
    var auto=new guajibutton();
    var turnoff=new cancelbutton();
    var AutoIng=new autoingbutton();

    var map=new GemMap();
    
    var flag:number=0;
    var iniflag:number;
    var guajiflag:number=0;
    var bombflash=new bomb();
 
    
class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();
        this.stage.scaleMode=egret.StageScaleMode.FIXED_NARROW;

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
   
   //this part is where the codes can run 2021.12.02

   //初始化，显示
      //var ini: mybutton=new mybutton();
     //this.addChild(ini);
     var bg=new BgSkin();
     
     var detect:mybutton=new mybutton();
    this.addChild(bg);
    this.addChild(map);
  
    map.inidisplay();  
    //only leave this line on this page!!
   //other codes should be converted into this function 2021.12.02
///////////////////delay///////////
            let dd=0;  
            let delay= setInterval(()=>{
            if(dd>0){
               clearInterval(delay);
               this.onDetectClick();
               
            }
               dd=dd+1;
            },600)  
            
         //2021.12.02 
         //do not use to make animations, use egret.Tween instead, just like the line below  
         //egret.Tween.get(this.pic).to({y:i*85+400},400).to({y:i*85+600},600,egret.Ease.backOut); 
              
    
  
    //this.onDetectClick();


        //////动画///////
     //let change = () => {
          

             
          //  let tw = egret.Tween.get(map.inidisplay());
           // tw.to({ "alpha": 1 }, 200);
           // tw.wait(2000);
          //  tw.to(this.onDetectClick(),0);
          //  tw.call(change, this);
         
    //change();


    //this.onDetectClick();
  //  this.addChild(detect);
    
   // detect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
    //this.onDetectClick();
      
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    public onDetectClick()
     {  
  //    var detect=new mybutton();
   //   this.removeChild(detect);
     flag=0;
     flag=map.ddetect(flag); 
   //  map.CountNum();

    // var bombflash=new bomb();
     
        if(flag==1)//说明有删除
        {        
            // map.FallGem();
 
     //  this.addChild(bombflash);
      //bombflash.timeout()
       map.FallGem();
      // var recover=new mybutton();  
      //  this.addChild(recover);
      //  recover.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddClick, this);
       this.onAddClick();
        }

        else{
        if(guajiflag==1){
            this.onResetClick();
         
        }
       else{
       var reset=new mybutton(); 
        this.addChild(reset);
        var auto=new guajibutton();
         this.addChild(auto);
         auto.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAutoClick,this)
       reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResetClick, this);}
        }
       


     }

     private onResetClick()
     {
        
       
          map.inidisplay();
         
         
          this.addChild(map);
           
       // var detect=new mybutton();
         // this.addChild(detect);
          //detect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
         //////////////////delay///////////
            let dd=0;  
            let delay= setInterval(()=>{
            if(dd>0){
               clearInterval(delay);
               this.onDetectClick();
               
            }
               dd=dd+1;
            },600)  




          
     }





         private onAddClick()
     {
      
        //map.FallGem();
      
         map.add(); 
         //////////////////delay///////////
            let dd=0;  
            let delay= setInterval(()=>{
            if(dd>0){
               clearInterval(delay);
               this.onDetectClick();
               
            }
               dd=dd+1;
            },600)  
        //var detect=new mybutton();
         //this.addChild(detect);
         //detect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);

     }




     public onAutoClick(e: egret.TouchEvent){
         guajiflag=1;
         map.inidisplay();
      //   this.removeChild(reset);
         var turnoff=new cancelbutton();
         var AutoIng=new autoingbutton();
         this.addChild(turnoff);
         this.addChild(AutoIng);

         turnoff.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelAuto, this);

         
         this.addChild(map);
           
       // var detect=new mybutton();
         // this.addChild(detect);
          //detect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
         //////////////////delay///////////
            let dd=0;  
            let delay= setInterval(()=>{
            if(dd>0){
               clearInterval(delay);
               this.onDetectClick();
               
            }
               dd=dd+1;
            },600)  


     }

     public onCancelAuto(){
           guajiflag=0;
         this.addChild(auto);
        //   this.removeChild(turnoff);
          //  this.removeChild(AutoIng);
           this.addChild(map);
           
       // var detect=new mybutton();
         // this.addChild(detect);
          //detect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
         //////////////////delay///////////
            let dd=0;  
            let delay= setInterval(()=>{
            if(dd>0){
               clearInterval(delay);
               this.onDetectClick();
               
            }
               dd=dd+1;
            },600)  
     }
}
