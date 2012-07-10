/* imgRotate
 * 图片旋转
 */
imgRotate=function(img){
	if(!img)return;
	this.img=img;
	this.setup();
}
imgRotate.prototype={
	setup:function(){
		this.canvas=document.createElement('canvas');
		this.DOM=!!this.canvas.getContext;
		this.deg=0;
		this.width=this.img.width;
		this.height=this.img.height;
	},
	rotate:function(deg){
		this.deg=deg%4;
		if(this.deg<0)this.deg+=4;
		if(this.DOM){
			if(!this.canvas.parentNode){
				this.img.parentNode.replaceChild(this.canvas,this.img);
			}
			var ctx=this.canvas.getContext('2d'),
				pos=[0,0];
			switch(this.deg){
				case 1: pos=[0,-this.height];
				case 3: this.canvas.width=this.height;
						this.canvas.height=this.width;
						this.deg==3?pos[0]=-this.width:null;
						break;
				case 2: pos=[-this.width,-this.height];
				case 0:
				default:this.canvas.width=this.width;
						this.canvas.height=this.height;
						break;
			}
			ctx.rotate(90*this.deg*Math.PI/180);
			ctx.drawImage(this.img,pos[0],pos[1]);
		}else{
			this.img.style.filter='progid:DXImageTransform.Microsoft.BasicImage(rotation='+this.deg+')';	
		}
	},
	turnLeft:function(){
		this.rotate(--this.deg);
	},
	turnRight:function(){
		this.rotate(++this.deg);
	},
	clear:function(){
		this.deg=0;	
		this.canvas.parentNode.replaceChild(this.img,this.canvas);
	}
}