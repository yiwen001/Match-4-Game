class bomb extends egret.DisplayObjectContainer{
timeout(){
    setTimeout(()=>{
        let img=new egret.Bitmap();
        for(let k=0;k<9;k++){

        img.texture=RES.getRes('elem_eli_1_'+k+'_png');
        img.x=600;
        img.y=680;
        this.addChild(img);
           this.timeout();

        }
      
     
    },1000/60);
}
}