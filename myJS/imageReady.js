var imageReady=(function(){
	var list=[],
		timer=null,
		prop=[['width','height'],['naturalWidth','naturalHeight']],
		natural=Number(typeof document.createElement('img').naturalHeight==='number'),//是否支持HTML5新增的 naturalHeight
		tick=function(){
			for(var i=0;i<list.length;i++){
				list[i].end?list.splice(i--,1):check.call(list[i],null);
			}
			list.length && (timer=setTimeout(tick,50)) || (timer=null);
		},
		/** overflow: 检测图片尺寸的改变
		  *  img.__width,img.__height: 初载入时的尺寸
		  */
		check=function(){
			if(this[prop[natural][0]]!==this.__width || this[prop[natural][1]]!==this.__height || this[prop[natural][0]]*this[prop[natural][1]]>1024){
				this.onready.call(this,null);
				this.end=true;
			}
		};
		return function(_img, onready, onload, onerror){
			onready=onready || new Function();
			onload=onload || new Function();
			onerror=onerror || new Function();
			var img=typeof _img=='string'?new Image():_img;
			img.onerror=function(){// ie && ie<=8 的浏览器必须在src赋予前定义onerror
				onerror.call(img,null);
				img.end=true;
				img=img.onload=img.onerror=img.onreadystatechange=null;
			}
			if(typeof _img=='string') img.src=_img;
			if(!img)return;
			if(img.complete){
				onready.call(img,null);
				onload.call(img,null);
				return;
			}
			img.__width=img[prop[natural][0]];
			img.__height=img[prop[natural][1]];
			img.onready=onready;
			check.call(img,null);
			img.onload=img.onreadystatechange=function(){
				if(img&&img.readyState&&img.readyState!='loaded'&&img.readyState!='complete'){return;}
				!img.end && check.call(img,null);
				onload.call(img,null);
				img=img.onload=img.onerror=img.onreadystatechange=null;
			}
			if(!img.end){
				list.push(img);
				if(timer===null) timer=setTimeout(tick,50);
			}
		}
})();