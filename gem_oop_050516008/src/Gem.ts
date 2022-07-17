class Gem extends egret.DisplayObjectContainer{
    private ttype:number;
    private pic:egret.Bitmap;
    private row:number;
    private col:number;
    private final:number;
    private temptype:number;
 
    //生成图片
    public add(i:number,j:number) {
      
        this.ttype=tools.random_num(0,4);
        this.temptype=this.ttype+1;
        this.pic=tools.createBitmapByName('gem_'+this.temptype+'_png');
        this.pic.x=j*85+515;
        this.pic.y=5;
        this.row=i;
        this.col=j;  
        this.final=0;
        ////////////动画//////////
        egret.Tween.get(this.pic).to({y:i*85+400},400).to({y:i*85+600},600,egret.Ease.backOut);
        /* let time= setInterval(()=>{
             
            if(this.pic.y>=i*85+600)
            {
               clearInterval(time);
                
            }
             this.pic.y+=5;
            },1) */
    }
    public MarkInit(){
        this.final=0;
        return this.final;

    }
    public GetType(){
       return this.ttype;
    }
    public MarkDelete(){
        this.final=1;
        return this.final;
    }

   
    public MarkCheck(){
  
    return this.final==1;

    }
    public ShowPic(){
        this.addChild(this.pic);

    }
    public DeletePic(){
        this.removeChild(this.pic);
    }
    public GetX(){
        return this.x;
    }
    public GetY(){
        return this.y;
    }

    public ChangeXY(c:number,d:number){
        this.pic.x-=c;
        this.pic.y-=d;
    }

    public GemDrop(count:number)
    {
         let a=this.pic.y; 
        
       // this.pic.x=0;
        let time= setInterval(()=>{
         
          console.log(a);                 
        if(this.pic.y>=a+count*85)
            {
               clearInterval(time);
                
            }
             this.pic.y+=1;
            },1 )
          
       console.log(this.pic.y);


    }



 
}