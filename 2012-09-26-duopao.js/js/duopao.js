;
(function(window,undefined){
	
	"use strict";//使用严格模式
	
	var document = window.document,
		navigator = window.navigator,
		location = window.location,
		testStyle=document.createElement('div').style,
		input=document.createElement('input'),
		toString=Object.prototype.toString,
		hasOwn=Object.prototype.hasOwnProperty,
		push=Array.prototype.push,
		slice=Array.prototype.slice,
		trim=String.prototype.trim,
		indexOf=Array.prototype.indexOf,
		JSON=window.JSON,
		class2type=[],
		nextFrame,cancelFrame,
		
		testVendor=(function(){
			var cases={
				'OTransform':['-o-','otransitionend'],
				'WebkitTransform':['-webkit-','webkitTransitionEnd'],
				'MozTransform':['-moz-','transitionend'],
				'msTransform':['-ms-','MSTransitionEnd transitionend'],
				'transform':['','transitionend']
			},prop;
			for(prop in cases){
				if(prop in testStyle)return cases[prop];
			}
			return false;
		})(),
		cssVendor=testVendor[0]||'',
		transitionend=testVendor[1]||'',
		
		hasTouch=('createTouch' in document) || ('ontouchstart' in window),//是否支持触摸
		ua=(window.navigator.userAgent||'').toLowerCase(),
		
		console=window.console||{log:new Function,dir:new Function};
	
	var Duopao=(function(){
		
		var Duopao=function(selector,context){
				return new Duopao.fn.init(selector,context,rootDuopao);
			},
			rootDuopao
			
		
		Duopao.fn=Duopao.prototype={
			constructor:Duopao,
			version:'1.0.1',
			length:0,
			selector:'',
			init:function(selector,context,rootDuopao){
				var match,ret,elms,
					Duopao=this.constructor;
				//不存在selector，直接返回空的Duopao对象
				if(!selector)
					return this;

				//如果有nodeType，即是DOMElement
				if(selector.nodeType){
					this.context=this[0]=selector;
					this.length=1;
					return this;
				}
				
				if(selector==='body' && !context && document.body){
					this.context=document;
					this[0]=document.body;
					this.selector=selector;
					this.length=1;
					return this;
				}
				
				/** 节点选择器 ，支持部分css选择器
				 * #id
				*/
				if(typeof selector === 'string'){
					if(/^<.+>$/.test(selector)){
						match=[null,selector,null];
					}else{
						match=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/.exec(selector);
					}
					
					if(match && (match[1] || !context)){
						elms=[];
						if(match[1]){//匹配出了html
							ret=/^<(\w+)\s*\/?>(?:<\/\1>)?$/.exec(selector);
							if(ret){
								elms=[document.createElement(ret[1])];
								if(Duopao.isPlainObject(context)){
									Duopao(elms).attr(context);
								}
							}else{
								elms=Duopao.strToElm(match[1]);
							}
						}else{
							var el=document.getElementById(match[2]);
							if(el){
								elms=[el];
							}
						}
						this.context=document;
						this.selector=selector;
						return Duopao.merge(this,elms);
					}else if(!context || context instanceof Duopao){
						return (context || rootDuopao).find(selector);
					}else{
						return Duopao(context).find(selector);
					}
				}else if(Duopao.isFunction(selector)){
					return rootDuopao.ready(selector);
				}
				
				if(typeof selector!=='undefined'){
					this.selector=selector.selector;
					this.context=selector.context;
				}

				return Duopao.makeArray(selector,this);
			},
			
			toArray:function(){
				return slice.call(this, 0);
			},
			
			pushStack:function(elms,name,selector){
				var ret=this.constructor();
				if(Duopao.isArray(elms)){
					push.apply(ret,elms);
				}else{
					Duopao.merge(ret,elms);
				}
				ret.oldObject=this;
				ret.context=this.context;
				if(name==="find"){
					ret.selector=this.selector+(this.selector?" ":"")+selector;
				}else if(name){
					ret.selector=this.selector+"."+name+"("+selector+")";
				}
				return ret;
			},
			
			eq:function(i){
				i=+i;//toNumber
				return i===-1 ?
					this.slice(i) :
					this.slice(i, i+1);
			},
			
			slice:function(){
				return this.pushStack(slice.apply(this,arguments),"slice",slice.call(arguments).join(","));
			},
			
			end:function(){
				return this.oldObject || this.constructor();	
			},
			
			extend:function(obj){
				return Duopao.extend(obj,this);
			},
			
			each:function(func,args){
				return Duopao.each(this,func,args);
			},
			
			push:push,
			sort:[].sort,
			splice:[].splice
		}
		
		Duopao.fn.init.prototype=Duopao.fn;
		
		Duopao.extend=function(obj,target){
			target=target?target:this;
			for(var key in obj){
				target[key]=obj[key];
			}
			return target;
		}
		
		Duopao.each=function(obj,func,args){
			var key,i=0;
			if(typeof obj.length !== 'undefined'){
				if(typeof args == 'undefined'){
					for(;i<obj.length;i++){
						if(func.call(obj[i],i,obj[i])===false)
							break;
					}
				}else{
					for(;i<obj.length;i++){
						if(func.apply(obj[i],args)===false)
							break;
					}
				}
			}else{
				if(typeof args == 'undefined'){
					for(key in obj){
						if(func.call(obj[key],key,obj[key])===false)
							break;
					}
				}else{
					for(key in obj){
						if(func.apply(obj[key],args)===false)
							break;
					}
				}
			}
			return obj;
		}
		
		Duopao.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
			class2type[ "[object " + name + "]" ] = name.toLowerCase();
		});

		Duopao.extend({
			cssVendor:cssVendor,//css3前缀,-webkit-,-moz-......
			hasTouch:hasTouch,//是否支持触摸
			hasPlaceholder:"placeholder" in input,//是否支持表单域的placeholder属性
			hasCanvas:!!document.createElement('canvas').getContext,//是否支持canvas
			
			resizeEvent:'onorientationchange' in window ? 'orientationchange':'resize',
			startEvent:hasTouch?"touchstart":"mousedown",
			moveEvent:hasTouch?"touchmove":"mousemove",
			endEvent:hasTouch?"touchend":"mouseup",
			overEvent:hasTouch?"touchstart":"mouseover",
			outEvent:hasTouch?"touchend":"mouseout",
			cancelEvent:hasTouch?'touchcancel':'mouseup',
			wheelEvent:cssVendor=='-moz-'?'DOMMouseScroll':'mousewheel',
			transitionend:transitionend,
			
			is_iphone:hasTouch&&/iphone|ipod/.test(ua),
			is_ipad:hasTouch&&/ipad/.test(ua),
			is_android:hasTouch&&/android/.test(ua)
		});
		
		Duopao.fn.extend({
			html:function(str){
				return typeof str === 'undefined' ?
						this[0]?this[0].innerHTML:null :
						this.find('*').stop().off().end().each(function(){
							this.innerHTML=str;
						});	
			},
			text:function(str){
				return typeof str === 'undefined' ?
					this[0]?Duopao.text(this):null :
					this.empty().append(document.createTextNode(str));
			},
			val:function(str){
				var elem=this[0],
					filter,ret;
				if(typeof str === 'undefined'){
					if(elem){
						filter=Duopao.valFilters[this.nodeName()]||Duopao.valFilters[elem.type];
						if(filter && "get" in filter && typeof (ret=filter.get(elem))!=='undefined'){}
						else ret=elem.value;
						return ret;
					}else return null;
				}
				if(str===null)str='';
				else if(typeof str==='number')str+='';
				else if(Duopao.isArray(str)){
					Duopao.each(str,function(i,v){
						str[i]=v===null?'':v+'';
					});
				}
				return this.each(function(){
					elem=this;
					filter=Duopao.valFilters[elem.nodeName.toLowerCase()]||Duopao.valFilters[elem.type];
					if(filter && "set" in filter && typeof filter.set(elem,str)!=='undefined'){}
					else elem.value=str;
				});	
			},
			append:function(elem){
				return this.each(function(){
						this.appendChild(Duopao(elem)[0]);
						return typeof elem==='string';	
					});
			},
			prepend:function(elem){
				return this.each(function(){
						this.insertBefore(Duopao(elem)[0],this.firstChild);
						return typeof elem==='string';
					});
			},
			before:function(elem){
				return this.each(function(){
						this.parentNode.insertBefore(Duopao(elem)[0],this);
						return typeof elem==='string';
					});
			},
			after:function(elem){
				return this.each(function(){
						this.parentNode.insertBefore(Duopao(elem)[0],this.nextSibling);
						return typeof elem==='string';
					});
			},
			remove:function(selector){
				selector=typeof selector==='undefined'?'*':selector;
				return this.filter(selector).each(function(){
						try{
							Duopao(this).find('*').stop().off();
							this.parentNode.removeChild(this);
						}catch(e){}
					}).stop().off().end().not(selector);
			},
			empty:function(){
				return this.html('');
			},
			attr:function(name,value){
				var _this=this;
				return Duopao.isPlainObject(name) ? 
						Duopao.each(name,function(_name,_value){
							_this.attr(_name,_value);
						}) && _this :
						(typeof value==='undefined' ?
							_this[0]?(name?Duopao.attrFilter(_this[0],name):_this):null :
							_this.each(function(){
								Duopao.attrFilter(this,name,value);
							})
						);
			},
			removeAttr:function(name){
				return this.each(function(){
					Duopao.removeAttrFilter(this,name);
				});
			},
			css:function(name,value){
				var ret=null,_this=this;
				this.each(function(){
					if((ret=Duopao.css(this,name,value))!=='set'){
						return false;
					}else ret=_this;
				});
				return ret;	
			},
			cssDue:function(name, type){
				if(!this[0])return 0;
				var cssW=['Left','Right'],
					cssH=['Top','Bottom'],
					which,val=0,extra;
				which=name==='width'?cssW:cssH;
				extra=type==='border'?'Width':'';
				val+=(parseFloat(this.css(type+which[0]+extra))||0) + (parseFloat(this.css(type+which[1]+extra))||0);
				return val;
			},
			hasClass:function(cn){
				return this[0] && new RegExp("(?:^|\\s+)" + cn + "(?:\\s+|$)").test(this[0].className);
			},
			addClass:function(cn){
				return this.each(function(){
					if(!Duopao.fn.hasClass.call([this],cn)){
						this.className=this.className?[this.className, cn].join(" "):cn;
					}
				});
			},
			removeClass:function(cn){
				return this.each(function(){
					if(Duopao.fn.hasClass.call([this],cn)){
						this.className=this.className.replace(new RegExp("(?:^|\\s+)" + cn + "(?:\\s+|$)", "g"), " ");
					}
				});
			},
			toggleClass:function(cn){
				return this.each(function(){
					if(Duopao.fn.hasClass.call([this],cn)){
						this.className=this.className.replace(new RegExp("(?:^|\\s+)" + cn + "(?:\\s+|$)", "g"), " ");
					}else this.className=[this.className, cn].join(" ");
				});
			},
			nodeName:function(){
				return this[0] && this[0].nodeName && this[0].nodeName.toLowerCase() || "";
			},
			serialize:function(){
				var ret=[],
					elems=[];
				this.each(function(){
					Duopao.makeArray(this.elements?this.elements:this,elems);
				});
				Duopao.each(elems,function(){
					if(this.name&&!this.disabled&&(this.type!='checkbox'&&this.type!='radio'||this.checked)){
						ret.push(encodeURIComponent(this.name)+'='+encodeURIComponent(this.value));
					}
				});
				return ret.join('&');
			}
		});
		
		Duopao.each({
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after"
		}, function(name, orig){
			Duopao.fn[name]=function(elem){
				return this.each(function(){
						Duopao(elem)[orig](this);
					});
			}
		});
		
		Duopao.extend({
			type:function(obj){
				return obj == null ?
					String(obj) :
					class2type[toString.call(obj)] || "object";
			},
			merge:function(first, second){
				var i=first.length,
					j=0;
		
				if(typeof second.length==="number"){
					for(var l=second.length;j<l;j++){
						first[i++]=second[j];
					}
				}else{
					while(second[j]!==undefined){
						first[i++]=second[j++];
					}
				}
				first.length=i;
				return first;
			},
			makeArray:function(array, results){
				var ret=results||[];
				if(array != null){
					var type=Duopao.type(array);
					if(array.length==null || type==="string" || type==="function" || type==="regexp" || Duopao.isWindow(array)){
						push.call(ret,array);
					}else{
						Duopao.merge(ret,array);
					}
				}		
				return ret;
			},
			inArray:function(tar,els){
				if(indexOf){
					return indexOf.call(els,tar);
				}
				for(var i=0;i<els.length;i++){
					if(els[i]===tar){
						return i;
					}
				}
				return -1;
			},
			isCSS:function(property){
				var name=Duopao.style.toUpper(property),
					_name=Duopao.style.toUpper(cssVendor+property);
				return (name in testStyle) && name || (_name in testStyle) && _name;
			},
			isPlainObject: function(obj){
				if(!obj || Duopao.type(obj)!=="object" || obj.nodeType || Duopao.isWindow(obj)){
					return false;
				}
		
				try{
					// Not own constructor property must be Object
					if ( obj.constructor &&
						!hasOwn.call(obj, "constructor") &&
						!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
						return false;
					}
				}catch(e){
					return false;
				}

				var key;
				for(key in obj){}
		
				return key===undefined || hasOwn.call(obj, key);
			},
			isEmptyObject:function(obj){
				for(var name in obj){
					return false;
				}
				return true;
			},
			isEmail:function(str){
				return (/^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/).test(str.toLowerCase())||!str;
			},
			isWindow:function(obj){
				return obj && typeof obj==="object" && "setInterval" in obj;
			},
			isFunction:function(obj){
				return Duopao.type(obj)==="function";
			},
			isArray:Array.isArray||function(obj){
				return Duopao.type(obj)==="array";
			},		
			isNumeric:function(obj){
				return isFinite(parseFloat(obj));
			},
			trim:function(str){
				return trim ?
					trim.call(str) :
					String(str).replace(/^\s+|\s+$/,"")
			},
			strip_tags:function(str){
				return str.replace(/<[^>]*>/gi,"");
			},
			filter:function(expr,elems,not){
				if(not){
					expr=":not("+expr+")";
				}
				return elems.length===1 ?
					Duopao.find.matchesSelector(elems[0],expr)?[elems[0]]:[] :
					Duopao.find.matches(expr,elems);
			},
			dir:function(elem,dir,until){
				var matched=[],
					cur=elem[dir];
				while(cur && cur.nodeType!==9 && (typeof until=='undefined' || cur.nodeType!==1 || !Duopao(cur).is(until))){
					if(cur.nodeType===1){
						matched.push(cur);
					}
					cur=cur[dir];
				}
				return matched;
			},
			nth:function(cur,result,dir,elem){
				result=result||1;
				var num=0;
		
				for(;cur;cur=cur[dir]){
					if(cur.nodeType===1 && ++num===result ) {
						break;
					}
				}
				return cur;
			},
			sibling:function(n,elem){
				var r=[];
				for(;n;n=n.nextSibling){
					if(n.nodeType===1 && n!==elem){
						r.push(n);
					}
				}
				return r;
			},
			strToElm:function(str){
				return Duopao('<div>').html(str).children();
			},
			getRoot:function(elem){
				var doc;
				if(Duopao.isWindow(elem)){
					doc=elem.document;
				}else{
					while(elem&&elem.nodeType!=9){
						elem=elem.ownerDocument;
					}
					doc=elem;
				}
				return doc||document;
			},
			getRootWin:function(elem){
				var frames=window.frames,win=window,
					root=Duopao.getRoot(elem);
				Duopao.each(frames,function(){
					try{
						if(root==this.document){
							win=this;
							return false;
						}
					}catch(e){}
				});
				return win;
			}
		});
		
		rootDuopao=Duopao(document);
		return Duopao;
	})();

	(function(){
	/*
	 * Sizzle
	 */
	var _$6=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,_$A="sizcache"+(Math.random()+"").replace(".",""),_$7=0,_$C=Object.prototype.toString,_$1=false,_$0=true,_$D=/\\/g,_$J=/\r\n/g,_$2=/\W/;[0,0].sort(function(){_$0=false;return 0});var _$8=function($,M,K,B){K=K||[];M=M||document;var O=M;if(M.nodeType!==1&&M.nodeType!==9)return[];if(!$||typeof $!=="string")return K;var G,C,J,D,_,N,F,H,A=true,L=_$8.isXML(M),E=[],I=$;do{_$6.exec("");G=_$6.exec(I);if(G){I=G[3];E.push(G[1]);if(G[2]){D=G[3];break}}}while(G)if(E.length>1&&_$$.exec($)){if(E.length===2&&_$I.relative[E[0]])C=_$B(E[0]+E[1],M,B);else{C=_$I.relative[E[0]]?[M]:_$8(E.shift(),M);while(E.length){$=E.shift();if(_$I.relative[$])$+=E.shift();C=_$B($,C,B)}}}else{if(!B&&E.length>1&&M.nodeType===9&&!L&&_$I.match.ID.test(E[0])&&!_$I.match.ID.test(E[E.length-1])){_=_$8.find(E.shift(),M,L);M=_.expr?_$8.filter(_.expr,_.set)[0]:_.set[0]}if(M){_=B?{expr:E.pop(),set:_$H(B)}:_$8.find(E.pop(),E.length===1&&(E[0]==="~"||E[0]==="+")&&M.parentNode?M.parentNode:M,L);C=_.expr?_$8.filter(_.expr,_.set):_.set;if(E.length>0)J=_$H(C);else A=false;while(E.length){N=E.pop();F=N;if(!_$I.relative[N])N="";else F=E.pop();if(F==null)F=M;_$I.relative[N](J,F,L)}}else J=E=[]}if(!J)J=C;if(!J)_$8.error(N||$);if(_$C.call(J)==="[object Array]"){if(!A)K.push.apply(K,J);else if(M&&M.nodeType===1)for(H=0;J[H]!=null;H++)if(J[H]&&(J[H]===true||J[H].nodeType===1&&_$8.contains(M,J[H])))K.push(C[H]);else for(H=0;J[H]!=null;H++)if(J[H]&&J[H].nodeType===1)K.push(C[H])}else _$H(J,K);if(D){_$8(D,O,K,B);_$8.uniqueSort(K)}return K};_$8.uniqueSort=function($){if(_$5){_$1=_$0;$.sort(_$5);if(_$1)for(var _=1;_<$.length;_++)if($[_]===$[_-1])$.splice(_--,1)}return $};_$8.matches=function(_,$){return _$8(_,null,null,$)};_$8.matchesSelector=function($,_){return _$8(_,null,null,[$]).length>0};_$8.find=function(C,A,$){var _,G,E,D,F,B;if(!C)return[];for(G=0,E=_$I.order.length;G<E;G++){F=_$I.order[G];if((D=_$I.leftMatch[F].exec(C))){B=D[1];D.splice(1,1);if(B.substr(B.length-1)!=="\\"){D[1]=(D[1]||"").replace(_$D,"");_=_$I.find[F](D,A,$);if(_!=null){C=C.replace(_$I.match[F],"");break}}}}if(!_)_=typeof A.getElementsByTagName!=="undefined"?A.getElementsByTagName("*"):[];return{set:_,expr:C}};_$8.filter=function(E,C,B,I){var M,D,F,O,K,N,L,H,G,_=E,$=[],A=C,J=C&&C[0]&&_$8.isXML(C[0]);while(E&&C.length){for(F in _$I.filter)if((M=_$I.leftMatch[F].exec(E))!=null&&M[2]){N=_$I.filter[F];L=M[1];D=false;M.splice(1,1);if(L.substr(L.length-1)==="\\")continue;if(A===$)$=[];if(_$I.preFilter[F]){M=_$I.preFilter[F](M,A,B,$,I,J);if(!M)D=O=true;else if(M===true)continue}if(M)for(H=0;(K=A[H])!=null;H++)if(K){O=N(K,M,H,A);G=I^O;if(B&&O!=null){if(G)D=true;else A[H]=false}else if(G){$.push(K);D=true}}if(O!==undefined){if(!B)A=$;E=E.replace(_$I.match[F],"");if(!D)return[];break}}if(E===_)if(D==null)_$8.error(E);else break;_=E}return A};_$8.error=function($){throw"Syntax error, unrecognized expression: "+$};var _$_=_$8.getText=function(_){var C,A,B=_.nodeType,$="";if(B){if(B===1){if(typeof _.textContent==="string")return _.textContent;else if(typeof _.innerText==="string")return _.innerText.replace(_$J,"");else for(_=_.firstChild;_;_=_.nextSibling)$+=_$_(_)}else if(B===3||B===4)return _.nodeValue}else for(C=0;(A=_[C]);C++)if(A.nodeType!==8)$+=_$_(A);return $},_$I=_$8.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function($){return $.getAttribute("href")},type:function($){return $.getAttribute("type")}},relative:{"+":function(A,C){var _=typeof C==="string",E=_&&!_$2.test(C),D=_&&!E;if(E)C=C.toLowerCase();for(var F=0,B=A.length,$;F<B;F++)if(($=A[F])){while(($=$.previousSibling)&&$.nodeType!==1);A[F]=D||$&&$.nodeName.toLowerCase()===C?$||false:$===C}if(D)_$8.filter(C,A,true)},">":function(A,D){var $,_=typeof D==="string",E=0,C=A.length;if(_&&!_$2.test(D)){D=D.toLowerCase();for(;E<C;E++){$=A[E];if($){var B=$.parentNode;A[E]=B.nodeName.toLowerCase()===D?B:false}}}else{for(;E<C;E++){$=A[E];if($)A[E]=_?$.parentNode:$.parentNode===D}if(_)_$8.filter(D,A,true)}},"":function(A,C,_){var $,D=_$7++,B=_$G;if(typeof C==="string"&&!_$2.test(C)){C=C.toLowerCase();$=C;B=_$E}B("parentNode",C,D,A,$,_)},"~":function(A,C,_){var $,D=_$7++,B=_$G;if(typeof C==="string"&&!_$2.test(C)){C=C.toLowerCase();$=C;B=_$E}B("previousSibling",C,D,A,$,_)}},find:{ID:function(B,_,$){if(typeof _.getElementById!=="undefined"&&!$){var A=_.getElementById(B[1]);return A&&A.parentNode?[A]:[]}},NAME:function(C,A){if(typeof A.getElementsByName!=="undefined"){var $=[],_=A.getElementsByName(C[1]);for(var D=0,B=_.length;D<B;D++)if(_[D].getAttribute("name")===C[1])$.push(_[D]);return $.length===0?null:$}},TAG:function(_,$){if(typeof $.getElementsByTagName!=="undefined")return $.getElementsByTagName(_[1])}},preFilter:{CLASS:function(E,C,D,A,_,B){E=" "+E[1].replace(_$D,"")+" ";if(B)return E;for(var F=0,$;($=C[F])!=null;F++)if($)if(_^($.className&&(" "+$.className+" ").replace(/[\t\n\r]/g," ").indexOf(E)>=0)){if(!D)A.push($)}else if(D)C[F]=false;return false},ID:function($){return $[1].replace(_$D,"")},TAG:function(_,$){return _[1].replace(_$D,"").toLowerCase()},CHILD:function(_){if(_[1]==="nth"){if(!_[2])_$8.error(_[0]);_[2]=_[2].replace(/^\+|\s*/g,"");var $=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(_[2]==="even"&&"2n"||_[2]==="odd"&&"2n+1"||!/\D/.test(_[2])&&"0n+"+_[2]||_[2]);_[2]=($[1]+($[2]||1))-0;_[3]=$[3]-0}else if(_[2])_$8.error(_[0]);_[0]=_$7++;return _},ATTR:function(E,B,C,_,$,A){var D=E[1]=E[1].replace(_$D,"");if(!A&&_$I.attrMap[D])E[1]=_$I.attrMap[D];E[4]=(E[4]||E[5]||"").replace(_$D,"");if(E[2]==="~=")E[4]=" "+E[4]+" ";return E},PSEUDO:function(D,B,C,A,_){if(D[1]==="not"){if((_$6.exec(D[3])||"").length>1||/^\w/.test(D[3]))D[3]=_$8(D[3],null,null,B);else{var $=_$8.filter(D[3],B,C,true^_);if(!C)A.push.apply(A,$);return false}}else if(_$I.match.POS.test(D[0])||_$I.match.CHILD.test(D[0]))return true;return D},POS:function($){$.unshift(true);return $}},filters:{enabled:function($){return $.disabled===false&&$.type!=="hidden"},disabled:function($){return $.disabled===true},checked:function($){return $.checked===true},selected:function($){if($.parentNode)$.parentNode.selectedIndex;return $.selected===true},parent:function($){return!!$.firstChild},empty:function($){return!$.firstChild},has:function($,A,_){return!!_$8(_[3],$).length},header:function($){return(/h\d/i).test($.nodeName)},text:function($){var _=$.getAttribute("type"),A=$.type;return $.nodeName.toLowerCase()==="input"&&"text"===A&&(_===A||_===null)},radio:function($){return $.nodeName.toLowerCase()==="input"&&"radio"===$.type},checkbox:function($){return $.nodeName.toLowerCase()==="input"&&"checkbox"===$.type},file:function($){return $.nodeName.toLowerCase()==="input"&&"file"===$.type},password:function($){return $.nodeName.toLowerCase()==="input"&&"password"===$.type},submit:function($){var _=$.nodeName.toLowerCase();return(_==="input"||_==="button")&&"submit"===$.type},image:function($){return $.nodeName.toLowerCase()==="input"&&"image"===$.type},reset:function($){var _=$.nodeName.toLowerCase();return(_==="input"||_==="button")&&"reset"===$.type},button:function($){var _=$.nodeName.toLowerCase();return _==="input"&&"button"===$.type||_==="button"},input:function($){return(/input|select|textarea|button/i).test($.nodeName)},focus:function($){return $===$.ownerDocument.activeElement}},setFilters:{first:function($,_){return _===0},last:function($,B,_,A){return B===A.length-1},even:function($,_){return _%2===0},odd:function($,_){return _%2===1},lt:function($,A,_){return A<_[3]-0},gt:function($,A,_){return A>_[3]-0},nth:function($,A,_){return _[3]-0===A},eq:function($,A,_){return _[3]-0===A}},filter:{PSEUDO:function(_,C,G,F){var A=C[1],E=_$I.filters[A];if(E)return E(_,G,C,F);else if(A==="contains")return(_.textContent||_.innerText||_$_([_])||"").indexOf(C[3])>=0;else if(A==="not"){var $=C[3];for(var D=0,B=$.length;D<B;D++)if($[D]===_)return false;return true}else _$8.error(A)},CHILD:function($,F){var H,C,I,E,B,A,D,G=F[1],_=$;switch(G){case"only":case"first":while((_=_.previousSibling))if(_.nodeType===1)return false;if(G==="first")return true;_=$;case"last":while((_=_.nextSibling))if(_.nodeType===1)return false;return true;case"nth":H=F[2];C=F[3];if(H===1&&C===0)return true;I=F[0];E=$.parentNode;if(E&&(E[_$A]!==I||!$.nodeIndex)){A=0;for(_=E.firstChild;_;_=_.nextSibling)if(_.nodeType===1)_.nodeIndex=++A;E[_$A]=I}D=$.nodeIndex-C;if(H===0)return D===0;else return(D%H===0&&D/H>=0)}},ID:function($,_){return $.nodeType===1&&$.getAttribute("id")===_},TAG:function($,_){return(_==="*"&&$.nodeType===1)||!!$.nodeName&&$.nodeName.toLowerCase()===_},CLASS:function($,_){return(" "+($.className||$.getAttribute("class"))+" ").indexOf(_)>-1},ATTR:function($,D){var B=D[1],_=_$8.attr?_$8.attr($,B):_$I.attrHandle[B]?_$I.attrHandle[B]($):$[B]!=null?$[B]:$.getAttribute(B),C=_+"",E=D[2],A=D[4];return _==null?E==="!=":!E&&_$8.attr?_!=null:E==="="?C===A:E==="*="?C.indexOf(A)>=0:E==="~="?(" "+C+" ").indexOf(A)>=0:!A?C&&_!==false:E==="!="?C!==A:E==="^="?C.indexOf(A)===0:E==="$="?C.substr(C.length-A.length)===A:E==="|="?C===A||C.substr(0,A.length+1)===A+"-":false},POS:function($,A,D,C){var _=A[2],B=_$I.setFilters[_];if(B)return B($,D,A,C)}}},_$$=_$I.match.POS,_$4=function(_,$){return"\\"+($-0+1)};for(var _$9 in _$I.match){_$I.match[_$9]=new RegExp(_$I.match[_$9].source+(/(?![^\[]*\])(?![^\(]*\))/.source));_$I.leftMatch[_$9]=new RegExp(/(^(?:.|\r|\n)*?)/.source+_$I.match[_$9].source.replace(/\\(\d+)/g,_$4))}var _$H=function(_,$){_=Array.prototype.slice.call(_,0);if($){$.push.apply($,_);return $}return _};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType}catch(_$3){_$H=function(C,_){var B=0,$=_||[];if(_$C.call(C)==="[object Array]")Array.prototype.push.apply($,C);else if(typeof C.length==="number")for(var A=C.length;B<A;B++)$.push(C[B]);else for(;C[B];B++)$.push(C[B]);return $}}var _$5,_$F;if(document.documentElement.compareDocumentPosition)_$5=function(_,$){if(_===$){_$1=true;return 0}if(!_.compareDocumentPosition||!$.compareDocumentPosition)return _.compareDocumentPosition?-1:1;return _.compareDocumentPosition($)&4?-1:1};else{_$5=function(F,C){if(F===C){_$1=true;return 0}else if(F.sourceIndex&&C.sourceIndex)return F.sourceIndex-C.sourceIndex;var _,E,D=[],A=[],B=F.parentNode,$=C.parentNode,G=B;if(B===$)return _$F(F,C);else if(!B)return-1;else if(!$)return 1;while(G){D.unshift(G);G=G.parentNode}G=$;while(G){A.unshift(G);G=G.parentNode}_=D.length;E=A.length;for(var H=0;H<_&&H<E;H++)if(D[H]!==A[H])return _$F(D[H],A[H]);return H===_?_$F(F,A[H],-1):_$F(D[H],C,1)};_$F=function(A,_,$){if(A===_)return $;var B=A.nextSibling;while(B){if(B===_)return-1;B=B.nextSibling}return 1}}(function(){var _=document.createElement("div"),$="script"+(new Date()).getTime(),A=document.documentElement;_.innerHTML="<a name='"+$+"'/>";A.insertBefore(_,A.firstChild);if(document.getElementById($)){_$I.find.ID=function(B,_,$){if(typeof _.getElementById!=="undefined"&&!$){var A=_.getElementById(B[1]);return A?A.id===B[1]||typeof A.getAttributeNode!=="undefined"&&A.getAttributeNode("id").nodeValue===B[1]?[A]:undefined:[]}};_$I.filter.ID=function($,A){var _=typeof $.getAttributeNode!=="undefined"&&$.getAttributeNode("id");return $.nodeType===1&&_&&_.nodeValue===A}}A.removeChild(_);A=_=null})();(function(){var $=document.createElement("div");$.appendChild(document.createComment(""));if($.getElementsByTagName("*").length>0)_$I.find.TAG=function(B,_){var $=_.getElementsByTagName(B[1]);if(B[1]==="*"){var A=[];for(var C=0;$[C];C++)if($[C].nodeType===1)A.push($[C]);$=A}return $};$.innerHTML="<a href='#'></a>";if($.firstChild&&typeof $.firstChild.getAttribute!=="undefined"&&$.firstChild.getAttribute("href")!=="#")_$I.attrHandle.href=function($){return $.getAttribute("href",2)};$=null})();if(document.querySelectorAll)(function(){var B=_$8,A=document.createElement("div"),$="__sizzle__";A.innerHTML="<p class='TEST'></p>";if(A.querySelectorAll&&A.querySelectorAll(".TEST").length===0)return;_$8=function(C,J,D,E){J=J||document;if(!E&&!_$8.isXML(J)){var L=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(C);if(L&&(J.nodeType===1||J.nodeType===9))if(L[1])return _$H(J.getElementsByTagName(C),D);else if(L[2]&&_$I.find.CLASS&&J.getElementsByClassName)return _$H(J.getElementsByClassName(L[2]),D);if(J.nodeType===9){if(C==="body"&&J.body)return _$H([J.body],D);else if(L&&L[3]){var H=J.getElementById(L[3]);if(H&&H.parentNode){if(H.id===L[3])return _$H([H],D)}else return _$H([],D)}try{return _$H(J.querySelectorAll(C),D)}catch(M){}}else if(J.nodeType===1&&J.nodeName.toLowerCase()!=="object"){var A=J,_=J.getAttribute("id"),F=_||$,I=J.parentNode,K=/^\s*[+~]/.test(C);if(!_)J.setAttribute("id",F);else F=F.replace(/'/g,"\\$&");if(K&&I)J=J.parentNode;try{if(!K||I)return _$H(J.querySelectorAll("[id='"+F+"'] "+C),D)}catch(G){}finally{if(!_)A.removeAttribute("id")}}}return B(C,J,D,E)};for(var _ in B)_$8[_]=B[_];A=null})();(function(){var B=document.documentElement,$=B.matchesSelector||B.mozMatchesSelector||B.webkitMatchesSelector||B.msMatchesSelector;if($){var A=!$.call(document.createElement("div"),"div"),_=false;try{$.call(document.documentElement,"[test!='']:sizzle")}catch(C){_=true}_$8.matchesSelector=function(C,E){E=E.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!_$8.isXML(C)){try{if(_||!_$I.match.PSEUDO.test(E)&&!/!=/.test(E)){var B=$.call(C,E);if(B||!A||C.document&&C.document.nodeType!==11)return B}}catch(D){}}return _$8(E,null,null,[C]).length>0}}})();(function(){var $=document.createElement("div");$.innerHTML="<div class='test e'></div><div class='test'></div>";if(!$.getElementsByClassName||$.getElementsByClassName("e").length===0)return;$.lastChild.className="e";if($.getElementsByClassName("e").length===1)return;_$I.order.splice(1,0,"CLASS");_$I.find.CLASS=function(A,_,$){if(typeof _.getElementsByClassName!=="undefined"&&!$)return _.getElementsByClassName(A[1])};$=null})();function _$E(C,D,H,B,_,A){for(var G=0,E=B.length;G<E;G++){var $=B[G];if($){var F=false;$=$[C];while($){if($[_$A]===H){F=B[$.sizset];break}if($.nodeType===1&&!A){$[_$A]=H;$.sizset=G}if($.nodeName.toLowerCase()===D){F=$;break}$=$[C]}B[G]=F}}}function _$G(C,D,H,B,_,A){for(var G=0,E=B.length;G<E;G++){var $=B[G];if($){var F=false;$=$[C];while($){if($[_$A]===H){F=B[$.sizset];break}if($.nodeType===1){if(!A){$[_$A]=H;$.sizset=G}if(typeof D!=="string"){if($===D){F=true;break}}else if(_$8.filter(D,[$]).length>0){F=$;break}}$=$[C]}B[G]=F}}}if(document.documentElement.contains)_$8.contains=function(_,$){return _!==$&&(_.contains?_.contains($):true)};else if(document.documentElement.compareDocumentPosition)_$8.contains=function(_,$){return!!(_.compareDocumentPosition($)&16)};else _$8.contains=function(){return false};_$8.isXML=function($){var _=($?$.ownerDocument||$:0).documentElement;return _?_.nodeName!=="HTML":false};var _$B=function($,D,B){var F,C=[],A="",_=D.nodeType?[D]:D;while((F=_$I.match.PSEUDO.exec($))){A+=F[0];$=$.replace(_$I.match.PSEUDO,"")}$=_$I.relative[$]?$+"*":$;for(var G=0,E=_.length;G<E;G++)_$8($,_[G],C,B);return _$8.filter(A,C)};Duopao.Sizzle=_$8;
	
	// EXPOSE
	Duopao.find = Duopao.Sizzle;
	Duopao.text = Duopao.Sizzle.getText;
	Duopao.expr = Duopao.Sizzle.selectors;
	Duopao.unique = Duopao.Sizzle.uniqueSort;
	Duopao.contains = Duopao.Sizzle.contains;
	
	if(Duopao.expr && Duopao.expr.filters){
		Duopao.expr.filters.hidden=function(elem){
			var width=elem.offsetWidth,
				height=elem.offsetHeight;
			return (width===0&&height===0) || (Duopao.css(elem,"display")==="none");
		};
	
		Duopao.expr.filters.visible=function(elem){
			return !Duopao.expr.filters.hidden(elem);
		};
		
		Duopao.expr.filters.animated=function(elem){
			return !!(elem.fx && elem.fx.queue && !Duopao.isEmptyObject(elem.fx.queue));
		}
	}
	
	})();

	Duopao.fn.extend({
		find:function(selector){
			var ret=[];
			this.each(function(){
				Duopao.find(selector,this,ret);
			});
			return this.pushStack(Duopao.unique(ret),"find",selector);
		},
		index:function(selector){
			if(typeof selector==='undefined'){
				return (this[0] && this[0].parentNode) ? this.prevAll().length : -1;
			}
			
			if(typeof selector==='string'){
				return Duopao.inArray(this[0],Duopao(selector));
			}
			
			return Duopao.inArray(selector.constructor===Duopao?selector[0]:selector,this);
		},
		not:function(selector){
			var ret=Duopao.filter(selector,this,true)
			return this.pushStack(ret,"not",selector);
		},
		filter:function(selector){
			var ret=Duopao.filter(selector,this)
			return this.pushStack(ret,"filter",selector);
		},
		is:function(selector){
			return !!selector && ( 
				typeof selector==="string" ?
					// If this is a positional selector, check membership in the returned set
					// so $("p:first").is("p:last") won't return true for a doc with two "p".
					/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/.test(selector) ? 
						Duopao(selector,this.context).index(this[0])>=0 :
						Duopao.filter(selector,this).length>0 :
					this.filter(selector).length>0);
		},
		add:function(selector,context){
			var set=typeof selector==="string" ?
					Duopao(selector,context) :
					Duopao.makeArray(selector&&selector.nodeType ? [selector] : selector),
				all=Duopao.merge(this.toArray(), set);
	
			return this.pushStack(Duopao.unique(all),"add",selector);
		}
	});
	
	Duopao.each({
		parent:function(elem){
			var parent=elem.parentNode;
			return parent&&parent.nodeType!==11 ? parent : null;
		},
		parents:function(elem){
			return Duopao.dir(elem,"parentNode");
		},
		parentsUntil:function(elem,i,until){
			return Duopao.dir(elem,"parentNode",until);
		},
		next:function(elem){
			return Duopao.nth(elem,2,"nextSibling");
		},
		prev:function(elem){
			return Duopao.nth(elem,2,"previousSibling");
		},
		nextAll:function(elem){
			return Duopao.dir(elem,"nextSibling");
		},
		prevAll:function(elem){
			return Duopao.dir(elem,"previousSibling");
		},
		nextUntil:function(elem,i,until){
			return Duopao.dir(elem,"nextSibling",until);
		},
		prevUntil:function(elem,i,until){
			return Duopao.dir(elem,"previousSibling",until);
		},
		siblings:function(elem){
			return Duopao.sibling(elem.parentNode.firstChild,elem);
		},
		children:function(elem) {
			return Duopao.sibling(elem.firstChild);
		}
	}, function(name,fn){
		Duopao.fn[name]=function(until,selector){
			var ret=[],res;
			Duopao.each(this,function(i,elem){
				res=fn(elem,i,until);
				if(res)ret.push(res);
			});
			ret=ret.concat.apply([],ret);
			if(!/Until$/.test(name)){
				selector=until;
			}
			if(selector && typeof selector==="string"){
				ret=Duopao.filter(selector,ret);
			}
			ret=this.length>1&&Duopao.inArray(name,"children,next,prev".split(","))===-1 ? Duopao.unique(ret) : ret;
			if((this.length>1 || /,/.test(selector)) && /^(?:parents|prevUntil|prevAll)/.test(name)){
				ret=ret.reverse();
			}
			return this.pushStack(ret,name,selector);
		};
	});
	
	Duopao.extend({
		COOKIE:(function(){
			var cookie=document.cookie||'',
				subs=cookie.split(';'),
				cks={},
				trim=function(str){
					return str.replace(/^\s+|\s+$/g,'');
				},
				getDateString=function(offset){
					var date=new Date();
					date.setTime(+date+offset*1000);
					return date.toGMTString();
				}
			for(var i=0;i<subs.length;i++){
				var _sub=subs[i];
				var pos=_sub.indexOf("=");
				var key,value;
				if(pos>=0){
					key=trim(_sub.substring(0,pos));
					value=_sub.substring(pos+1);
					cks[unescape(key)]=unescape(value);
				}
			}
		 
			return {
				has:function(key){
					return typeof cks[key]!='undefined';
				},
				set:function(key,value,expire,path,domain){
					cks[key]=value;
					var myck=escape(key)+'='+escape(value);
					if(typeof expire!='undefined')
						myck+=';expires='+getDateString(expire);
					if(typeof path!='undefined')
						myck+=';path='+path;
					if(typeof domain!='undefined')
						myck+=';domain='+domain;
					document.cookie=myck;
				},
				remove:function(key){
					delete cks[key];
					document.cookie=escape(key)+'=;path=/;expires='+getDateString(-10000);
				},
				get:function(key){
					return cks[key];
				},
				clear:function(){
					for(var key in cks){
						this.remove(key);
					}
				},
				cookies:cks
			}
		})(),
		css:function(elem,name,value){
			if(!elem.nodeType||elem.style==null){
				return null;
			}
			if(Duopao.isPlainObject(name)){
				Duopao.each(name,function(_name,_value){
					Duopao.css(elem,_name,_value)
				});
			}else if(typeof value==='undefined'){
				return Duopao.style.getStyle(elem,name);
			}else Duopao.style.setStyle(elem,name,value);
			return 'set';
		},
		style:{
			cssNum:function(prop){
				prop=Duopao.style.toUpper(prop);
				switch(prop){
					case 'opacity':
					case 'scale':
					case 'scaleX':
					case 'scaleY':
					case 'zIndex':
						return '';
					case 'rotate':
					case 'skewX':
					case 'skewY':
						return 'deg';
					default:return 'px';
				}
			},
			toUpper:function(prop){
				var arr=prop.split('-');
				for(var i=1;i<arr.length;i++){
					if(arr[i]=='ms')continue;
					arr[i]=arr[i].substring(0,1).toUpperCase()+arr[i].substring(1);
				}
				return arr.join('');
			},
			toLower:function(prop){
				return prop.replace(/([A-Z]|^ms)/g,"-$1").toLowerCase();
			},
			styleFilter:function(property){
					if(!property)return '';
					property=Duopao.style.toUpper(property);
					switch(property){
						case 'float':
							return ("cssFloat" in testStyle) ? 'cssFloat' : 'styleFloat';
							break;
						case 'opacity':
							return ("opacity" in testStyle) ? 'opacity' : {
									get:function(el,style){
										var ft=style.filter;
										return ft&&ft.indexOf('opacity')>=0&&parseFloat(ft.match(/opacity=([^)]*)/i)[1])/100+''||'1';
									},
									set:function(el,va){
										if(va===''){
											el.style.filter='';
										}else{
											el.style.filter='alpha(opacity='+va*100+')';
											el.style.zoom=1;
										}
									}
								} ;
							break;
						case 'rotate':
						case 'scale':
						case 'scaleX':
						case 'scaleY':
						case 'skew':
						case 'skewX':
						case 'skewY':
						case 'translate':
						case 'translateX':
						case 'translateY':
						case 'translateZ':
							return {
								get:function(el,style){
									if(!Duopao.transform)return '';
									var g={'X':3,'Y':4},
										prop=property.replace(/[XYZ]$/,''),
										reg=new RegExp(prop+'([XYZ]?)\\((\\s*([^,)]*)\\s*(?:,\\s*([^,)]*)[^)]*)*)\\)','gi').exec(Duopao.css(el,Duopao.transform)||'')||[];
									if(prop==property){
										return reg[2]||'';
									}
									if(reg[1]){
										return property.substr(-1)==reg[1]?reg[3]:'';
									}
									return reg[g[property.substr(-1)]]||'';
								},
								set:function(el,va){
									if(!Duopao.transform)return;
									var g={'X':'Y','Y':'X'},
										prop=property.replace(/[XYZ]$/,''),
										ft=Duopao.css(el,Duopao.transform)||'';
									ft=ft=='none'?'':ft.replace(new RegExp("(?:matrix|"+prop+"[XYZ]?)\\(\[^)]*\\)","gi"),'');
									if(prop==property){
										return Duopao.css(el,Duopao.transform,ft+' '+property+'('+va+')');
									}
									var _prop=prop+g[property.substr(-1)],
										_val=Duopao.css(el,_prop);
									if(_val){
										return Duopao.css(el,prop,_prop==prop+'X'?_val+', '+va:va+', '+_val);
									}
									return Duopao.css(el,Duopao.transform,ft+' '+property+'('+va+')');
								}
							}
							break;
						default:return property;
					}
			},
			getStyle:function(el,property){
				return Duopao.style._getStyle(el,property)||Duopao.style.curCss(el,property);
			},
			_getStyle:function(el,property){
				var value;
				property=Duopao.style.styleFilter(property);
				if(typeof property=='string'){
					value=el.style[property];
				}else{
					value=property.get(el,el.style);
				}
				return value=='auto' ? '' : value;
			},
			setStyle:function(el,property,value){
				property=Duopao.style.styleFilter(property);
				if(typeof property=='string'){
					el.style[property]=value;
				}else{
					property.set(el,value);
				}
			},
			swap:function(elem,options,callback){
				var old={},name;

				for(name in options){
					old[name]=elem.style[name];
					elem.style[name]=options[name];
				}
				callback.call(elem);

				for(name in options){
					elem.style[name]=old[name];
				}
			},
			curCss:function(elem,property){
				var value,doc=Duopao.getRoot(elem),
					style=doc.defaultView && doc.defaultView.getComputedStyle && Duopao.getRootWin(doc).getComputedStyle(elem, null) || elem.currentStyle || {};
				if(typeof property=='string'){
					property=Duopao.style.styleFilter(property);
				}
				if(typeof property=='string'){
					value=style[property];
				}else value=property.get(elem,style);
				return value=='auto' ? '' : value;
			}
		},
		offset:{
			getOffset:function(elem){	
				var x=0,y=0,
					dc=Duopao(Duopao.getRoot(elem)),
					off;
				while(elem){
					if("getBoundingClientRect" in elem){
						off=elem.getBoundingClientRect();
						x+=off.left;
						y+=off.top;
						elem=null;
					}else{
						x+=elem.offsetLeft||0;
						y+=elem.offsetTop||0;
						elem=elem.offsetParent;
					}
				}
				return {top:y+dc.scrollTop()-dc.clientTop(),left:x+dc.scrollLeft()-dc.clientLeft()};
			},
			setOffset:function(elem,cfg,isTS){
				var css={},
					pt=Duopao.css(elem,'position'),
					tsf=isTS!==false&&Duopao.transform,
					curOff,
					cssTop=parseFloat(Duopao.css(elem,'top'))||0,
					cssLeft=parseFloat(Duopao.css(elem,'left'))||0,
					curTop,curLeft,tarTop,tarLeft;
				pt==='static' && (pt='relative');
				!tsf && Duopao.css(elem,'position',pt);
				curOff=Duopao.offset.getOffset(elem);
				if(pt==='relative'){
					curTop=cssTop;
					curLeft=cssLeft;
				}else{
					var tp=Duopao.offset.position(elem);
					curTop=tp.top;
					curLeft=tp.left;
				}
				
				tarTop=parseFloat(cfg.top);
				tarLeft=parseFloat(cfg.left);
				/* 支持css3的浏览器使用transform */
				if(tsf){
					var reg,tlTop,tlLeft;
					/* absolute fixed定位的元素，其tanslateX和tanslateY值做0处理，relative和static的元素得到translate的X Y值 */
					if(pt==='relative'){
						tlLeft=Duopao.css(elem,'translateX');
						tlTop=Duopao.css(elem,'translateY');
						if(!tlTop){
							tlTop=0;
						}
						if(!tlLeft){
							tlLeft=0;
						}
						tlLeft=parseFloat(tlLeft)||0;
						tlTop=parseFloat(tlTop)||0;//console.log(cfg.top+'-'+curOff.top+'+'+tlTop+'+'+curTop+'-'+cssTop);
					}else{
						tlTop=tlLeft=0;
						/* absolute和fixed定位的元素，如果其top或left为auto，则将curTop或curLeft设为0 */
						if(Duopao.css(elem,'top')==="")curTop=0;
						if(Duopao.css(elem,'left')==="")curLeft=0;
					}
					if(!isNaN(tarTop)){
						tarTop=tarTop-curOff.top+tlTop+curTop-cssTop||0;
						css['translateY']=tarTop+'px';
					}
					if(!isNaN(tarLeft)){
						tarLeft=tarLeft-curOff.left+tlLeft+curLeft-cssLeft||0;
						css['translateX']=tarLeft+'px';
					}
				}else{
					if(!isNaN(tarTop)){
						css.top=tarTop-curOff.top+curTop+'px';
					}
					if(!isNaN(tarLeft)){
						css.left=tarLeft-curOff.left+curLeft+'px';
					}
				}
				Duopao.css(elem,css);//a.offset({top:100})
			},
			position:function(elem){
				var offsetParent,
					offset=Duopao.offset.getOffset(elem),
					parentOffset;
				offsetParent=elem.offsetParent||Duopao.getRoot(elem).body;
				while(Duopao.css(offsetParent,'position')==='static' && !/body|html/gi.test(offsetParent.nodeName)){
					offsetParent=offsetParent.offsetParent;
				}
				
				offset.top-=parseFloat(Duopao.css(elem,'marginTop')) || 0;
				offset.left-= parseFloat(Duopao.css(elem,'marginLeft')) || 0;
				
				parentOffset=/body|html/gi.test(offsetParent.nodeName)?{top:0,left:0}:Duopao.offset.getOffset(offsetParent);
				parentOffset.top+=parseFloat(Duopao.css(offsetParent,'borderTopWidth')) || 0;
				parentOffset.left+=parseFloat(Duopao.css(offsetParent,'borderLeftWidth')) || 0;
				
				return {
					top:offset.top-parentOffset.top,
					left:offset.left-parentOffset.left
				}
			}
		},
		valFilters:{
			select:{
				set:function(elem,value){
					var values=Duopao.makeArray(value);
					if(values.length){
						Duopao.each(elem.options,function(i,option){
							option.selected=Duopao.inArray(option.value,values)>-1;
						});
					}else{
						elem.selectedIndex=-1;
					}
					return values;
				}
			}
		},
		attrFilter:function(el,name,value){
			var f=typeof value==='undefined';
			switch(name){
				case 'style':
					return f?el.style.cssText.toLowerCase():el.style.cssText=value;
				case 'class':
					return f?el.className:el.className=value;
				case 'checked':
				case 'selected':
					return f?!!el[name]:el[name]=!!value;
				default:return f?el.getAttribute(name):el.setAttribute(name,value);
			}
		},
		removeAttrFilter:function(el,name){
			switch(name){
				case 'style':
					return el.style.cssText='';
				case 'class':
					return el.className='';
				case 'checked':
				case 'selected':
					return el[name]=false;
				default:return el.removeAttribute(name);
			}
		},
		getWH:function(elem,name){
			var val;
			if(elem.offsetWidth!==0){
				val=Duopao(elem)[name]();
			}else{
				Duopao.style.swap(elem,{position:"absolute",visibility:"hidden",display:"block"},function(){
					val=Duopao(elem)[name]();
				});
			}
			return val;
		},
		animate:function(elem,params,options,ts){
			if(!elem)return;
			var speed,fx,complete,step;
			params=params||{};
			options=options||{};
			speed=options.speed||options.duration;
			fx=options.fx||options.easing;
			complete=options.complete;
			step=options.step;
			if(Duopao.isFunction(speed)){
				complete=speed;
			}
			Duopao.fx.add(elem,params,speed,fx,{ts:ts,complete:complete,step:step});
		},
		stop:function(elem,prop,callback){
			Duopao.fx.stop(elem,prop,callback);
		}
	});
	
	Duopao.each("radio checkbox".split(" "), function(i,name){
		Duopao.valFilters[name]={
			set:function(elem,value){
				if(Duopao.isArray(value)){
					return (elem.checked=Duopao.inArray(elem.value,value)>-1);
				}
			}
		}
	});
	
	Duopao.each("check select".split(" "), function(i,name){
		Duopao.fn[name]=Duopao.fn[name+'ed']=function(val){
			return typeof val==='undefined' ? 
				this.attr(name+'ed',true) :
				this.val(Duopao.makeArray(val));
		}
	});

	Duopao.fn.extend({
		offset:function(cfg,isTS){
			return Duopao.isPlainObject(cfg) ?
				this.each(function(){
					Duopao.offset.setOffset(this,cfg,isTS);
				}) : this[0]?Duopao.offset.getOffset(this[0]):null;
				
		},
		position:function(){
			return this[0]?Duopao.offset.position(this[0]):null;
		},
		//支持css3的浏览器默认使用css3动画，但是如果设置了step或者将第三个参数设置为false则会使用js动画
		animate:function(params,options,ts){
			return this.each(function(){
				Duopao.animate(this,params,options,ts);
			});
		},
		stop:function(prop,callback){
			return this.each(function(){
				Duopao.stop(this,prop,callback);
			});
		},
		show:function(speed,complete){
			if(speed||speed===0){
				return this.animate({height:'show',width:'show','margin-top':'show','margin-bottom':'show','padding-top':'show','padding-bottom':'show'},{speed:speed,complete:complete});
			}else{
				var dis,old;
				return this.each(function(){
					dis=Duopao.css(this,'display');
					old=this.fx && this.fx.old && this.fx.old['display'];
					if(dis=='none')this.style.display=!old||old=='none'?'block':old;
				});
			}
		},
		hide:function(speed,complete){
			if(speed||speed===0){
				return this.animate({height:'hide',width:'hide','margin-top':'hide','margin-bottom':'hide','padding-top':'hide','padding-bottom':'hide'},{speed:speed,complete:complete});
			}else{
				var dis;
				return this.each(function(){
					dis=Duopao.css(this,'display');
					if(dis!='none'){
						if(!this.fx){
							this.fx={queue:{},old:{}};
						}
						this.fx.old['display']=dis;
					}
					this.style.display='none';
				});
			}
		},
		toggle:function(speed,complete){
			var hider=this.filter(':hidden'),
				shower=this.not(':hidden');
			hider.show(speed,complete);
			shower.hide(speed,complete);
			return this;
		},
		slideDown:function(speed,complete){
			return this.animate({height:'show','margin-top':'show','margin-bottom':'show','padding-top':'show','padding-bottom':'show'},{speed:speed,complete:complete});
		},
		slideUp:function(speed,complete){
			return this.animate({height:'hide','margin-top':'hide','margin-bottom':'hide','padding-top':'hide','padding-bottom':'hide'},{speed:speed,complete:complete});
		},
		slideToggle:function(speed,complete){
			return this.not(':hidden').slideUp(speed,complete).end().filter(':hidden').slideDown(speed,complete).end();
		},
		fadeIn:function(speed,complete){
			return this.animate({opacity:'show'},{speed:speed,complete:complete});
		}, 
		fadeOut:function(speed,complete){
			return this.animate({opacity:'hide'},{speed:speed,complete:complete});
		},
		fadeToggle:function(speed,complete){
			return this.not(':hidden').fadeOut(speed,complete).end().filter(':hidden').fadeIn(speed,complete).end();
		}
	});
	
	Duopao.each("clientTop clientLeft clientWidth clientHeight scrollLeft scrollTop scrollWidth scrollHeight offsetTop offsetLeft offsetWidth offsetHeight".split(" "), function(i, name) {
		Duopao.fn[name]=function(){
			var elem=this[0],doc,
				docElem,
				body;
			if(Duopao.isWindow(elem) || elem && elem.nodeType && elem.nodeType===9){
				doc=Duopao.getRoot(elem); docElem=doc.documentElement; body=doc.body;
				return doc.compatMode==="CSS1Compat"&&docElem&&docElem[name] || body&&body[name] || docElem&&docElem[name] || 0;
			}
			return elem?elem[name]||0:null;
		}
	});
	
	Duopao.each("Width Height".split(" "), function(i, name){
		var type=name.toLowerCase();
		Duopao.fn[type]=function(val){
			if(typeof val==='undefined'){
				if(!this[0])return null;
				if(Duopao.isWindow(this[0])){
					return this[0]['inner'+name]||Duopao(this[0].document)['client'+name]();
				}
				if(this[0].nodeType&&this[0].nodeType===9){
					var doc=Duopao(this[0]);
					return Math.max(doc['client'+name](),doc['scroll'+name](),doc['offset'+name]());
				}
				return Math.max(this['offset'+name]()-this['border'+name]()-this['padding'+name](),0);
			}
			return this.css(type,parseFloat(val)+'px');
		}
		Duopao.fn['inner'+name]=function(val){
			return typeof val==='undefined' ?
				this[0]?this['offset'+name]()-this['border'+name]():null :
				this[type](Math.max(0,parseFloat(val)-this['padding'+name]()));
		}
		Duopao.fn['outer'+name]=function(val){
			return typeof val==='undefined' ? 
				this[0]?this['offset'+name]()+this['margin'+name]():null :
				this[type](Math.max(0,parseFloat(val)-this['margin'+name]()-this['border'+name]()-this['padding'+name]()));
		}
		Duopao.each("border margin padding".split(" "), function(i, _type){
			Duopao.fn[_type+name]=function(){
				return this[0]?this.cssDue(type,_type):null;
			}
		});
	});
	
	/**
	 * 多泡框架的animate动画组件
	 * by qiqiboy 2012/11/8 
	 *
	 * 该组件支持动画队列，对于支持transition的浏览器，默认使用css3的动画机制transition（支持ie9 ie10 chrome firefox，opera由于某个bug暂不支持），其它浏览器则使用js动画
	 * 提供fadeIn fadeOut show hide slideDown slideUp默认效果
	 * 支持transform的rotate translate skew scale等变换效果（不支持transform的浏览器上无效果）
	 * Duopao(selector).animate({rotate:'360deg'}); 该行代码即可让节点对象以默认的效果和速度旋转360度
	 */
	//a.animate({height:'100px',width:'200px'},{speed:800,complete:function(e){console.log(7)}});setTimeout(function(){Duopao.fx.stop(a[0],'height')},200)
	Duopao.fx={
		guid:1,
		fx:"linear ease ease-in ease-out ease-in-out".split(" "),
		props:"rotate scale scale-x scale-y skew skew-x skew-y translate translate-x translate-y translate-z".split(" "),
		add:function(elem,prop,speed,fx,cfg){
			var isTs=Duopao.transition,easing,props,
				cfg=cfg||{},
				isDOM=elem.nodeType===1,
				callback,data,guid,
				step=cfg.step,old,extra,
				orig={},css={},del={},cur,_prop={},
				hidden,show=false,hide=false,isWH=false;
			if(!elem.fx){
				elem.fx={old:{},queue:{}};
			}
			guid=Duopao.fx.guid++;
			elem.fx.queue[guid]=data={timer:null,props:{}};
			props=data.props;
			old=elem.fx.old;
			speed=Duopao.fx.getSpeed(speed);
			fx=Duopao.fx.getFx(fx);
			data.speed=speed;
			data.fx=fx=Duopao.style.toLower(fx);
			data.isTs=isDOM&&cfg.ts!==false&&!step&&isTs;
			hidden=isDOM&&Duopao.expr.filters.hidden(elem);
			Duopao.each(prop,process);
			
			function process(attr,val){
				if(val!='show' && val!='hide' && !Duopao.isNumeric(val)){
					orig[attr]=val;
					delete prop[attr];
					return;
				}
				if(!isDOM||elem[attr]!=null&&(!elem.style||elem.style[attr]==null)){
					_prop[attr]=val;
					props[attr]=[parseFloat(elem[attr])||0,parseFloat(val)||0];
					return;
				}
				attr=Duopao.style.toLower(attr);
				if(Duopao.fx.filter[attr]){
					Duopao.each(Duopao.fx.filter[attr](prop,val),process);
					return false;
				}
				cur=Duopao.css(elem,attr);
				if(typeof old[attr]=='undefined'){
					old[attr]=Duopao.style._getStyle(elem,attr);
				}
				if(val=='show'){
					show=true;
					del[attr]=old[attr];
					val=attr=='height'||attr=='width'?Duopao.getWH(elem,attr)+'px':old[attr]||cur;
				}else if(val=='hide'){
					val=0;
					del[attr]='';
					hide=true;
				}
				if(hidden)orig[attr]=0;
				else{
					orig[attr]=attr=='height'||attr=='width'?Duopao.getWH(elem,attr)+'px':cur;
				}
				css[attr]=val;
				props[attr]=[parseFloat(orig[attr])||0,parseFloat(css[attr])||0];
				isWH=isWH||attr=='height'||attr=='width';
			}

			if(typeof old.overflow=='undefined'){
				old.overflow=elem.style && elem.style.overflow;
			}
			if(typeof old.display=='undefined'){
				old.display=Duopao.css(elem,'display');
			}
			if(show){
				orig.display=old.display=='none'?'block':old.display;
			}
			if(hide){
				del.display='none';
			}
			if(isWH){
				del.overflow=old.overflow;
				orig.overflow='hidden';
			}
			callback=function(){
				Duopao.css(this,del);
				cfg.complete && cfg.complete.call(this);
			}
			Duopao.css(elem,orig);
			if(data.isTs){
				if(!Duopao.isEmptyObject(_prop)){
					Duopao.fx.add(elem,_prop,speed,fx,{ts:false});
					Duopao.each(_prop,function(attr){
						delete props[attr];
					});
				}
				data.once=function(evt){
					var prop=evt.propertyName;
					if(typeof css[prop]!='undefined'){
						Duopao.fx.stop(elem,callback,guid);
					}
					return false;
				}
				setTimeout(function(){
					Duopao.event.add(elem,'transitionEnd',data.once);
					elem.style[isTs]=Duopao.fx.getTs(elem);
					Duopao.css(elem,css);
				},10);
				//定时器用来处理节点被隐藏或者属性值未变等情况下transitionend事件未触发
				hidden=Duopao.expr.filters.hidden(elem);
				data.timer=setTimeout(function(){
					if(Duopao.fx.checkTs(css,props)||hidden||Duopao.expr.filters.hidden(elem)){
						Duopao.fx.stop(elem,callback,guid);
					}
				},speed+50);
			}else{
				easing=Duopao.fx.getEasing(fx);
				var begin=0,start=+new Date,
					run=function(){
						var _css={};
						if(begin<speed){
							begin=Math.min(speed,+new Date-start);
							Duopao.each(props,function(prop,ret){
								if(_prop[prop]==null){
									_css[prop]=easing(begin,ret[0],ret[1]-ret[0],speed)+Duopao.style.cssNum(prop);
								}else{
									elem[prop]=easing(begin,ret[0],ret[1]-ret[0],speed);
								}
							});
							Duopao.css(elem,_css);
							step && step.call(elem);
							data.timer=nextFrame(run);
						}else{
							Duopao.each(props,function(prop,ret){
								if(_prop[prop]==null){
									_css[prop]=css[prop];
								}else{
									elem[prop]=_prop[prop];
								}
							});
							Duopao.css(elem,css);
							Duopao.fx.stop(elem,callback,guid);
						}
					}
				run();
			}
		},
		stop:function(elem,prop,callback){
			var queue=elem.fx && elem.fx.queue,
				guid,cur;
			if(Duopao.isFunction(prop)){
				guid=callback;
				callback=prop;
				prop='';
			}
			if(queue){
				if(!prop){
					if(guid){
						if(queue[guid]){
							Duopao.each(queue[guid].props,function(prop,val){
								Duopao.fx.stop(elem,prop);
							});
						}
					}else{
						Duopao.each(queue,function(guid,data){
							Duopao.fx.stop(elem,new Function,guid);
						});
					}
				}else{
					Duopao.each(queue,function(guid,data){
						Duopao.each(data.props,function(_prop,val){
							if(prop==_prop){
								delete data.props[_prop];
								if(Duopao.isEmptyObject(data.props)){
									if(data.once)Duopao.event.remove(elem,'transitionEnd',data.once);
									cancelFrame(data.timer);
									clearTimeout(data.timer);
									delete queue[guid];
								}
								if(elem.nodeType===1){
									if(elem[prop]!=null&&(!elem.style||elem.style[prop]==null)){}
									else{
										cur=Duopao.style.curCss(elem,_prop);
										cur && Duopao.css(elem,_prop,cur);
										data.isTs && Duopao.css(elem,Duopao.transition,Duopao.fx.getTs(elem));
									}
								}
							}
						});
					});
				}
				if(Duopao.isEmptyObject(queue)){
					Duopao.event.remove(elem,'transitionEnd');
				}
			}
			callback && callback.call(elem);
		},
		getSpeed:function(ret){
			switch(ret){
				case 'slow':
					return 800;
				case 'fast':
					return 200;
				default:ret=parseInt(ret);
					return isNaN(ret) ? 400 : ret;
			}
		},
		getTs:function(elem){
			var ts=[],
				extra,
				props;
			if(elem.fx && elem.fx.queue){
				Duopao.each(elem.fx.queue,function(guid,data){
					Duopao.each(data.props,function(attr,val){
						if(Duopao.inArray(attr,Duopao.fx.props)>-1){
							extra=Duopao.style.toLower(Duopao.transform)+' '+data.speed+'ms'+' '+data.fx+' 0ms';
						}else if(elem.style && elem.style[attr]!=null){
							ts.push(attr+' '+data.speed+'ms'+' '+data.fx+' 0ms');
						}
					});
				});
				extra && ts.push(extra);
			}
			return ts.join(', ');
		},
		checkTs:function(css,props){
			for(var prop in css){
				if(props[prop] && Duopao.inArray(prop,Duopao.fx.props)<0 && Math.round(props[prop][0]*100)/100!=Math.round(props[prop][1]*100)/100){
					return false;
				}
			}
			return true;
		},
		getFx:function(fx){
			if(Duopao.inArray(fx,Duopao.fx.fx)>0)
				return fx;
			return 'ease';
		},
		getEasing:function(fx){
			fx=Duopao.style.toUpper(fx);
			return Duopao.fx.easing[fx]?Duopao.fx.easing[fx]:Duopao.fx.easing[Duopao.fx.getFx()];
		},
		easing:{
			linear:function(t,b,c,d){ return c*t/d + b; },
			ease:function(t,b,c,d){
				return c*(t/=d)*t + b;
			},
			easeIn:function(t,b,c,d){
				return c*(t/=d)*t*t + b;
			},
			easeOut:function(t,b,c,d){
				return c*((t=t/d-1)*t*t + 1) + b;
			},
			easeInOut:function(t,b,c,d){
				if ((t/=d/2) < 1) return c/2*t*t*t + b;
				return c/2*((t-=2)*t*t + 2) + b;
			}
		},
		filter:{}
	}
	
	Duopao.each("translate skew scale".split(" "),function(i,name){
		Duopao.fx.filter[name]=function(prop,val){
			delete prop[name];
			var ret=String(val).split(/\s*,\s*/);
			ret[0] && (prop[name+'X']=ret[0]);
			ret[1] && (prop[name+'Y']=ret[1]);
			ret[2] && (prop[name+'Z']=ret[2]);
			return prop;
		}
	});
	
	Duopao.each((cssVendor+"border**-radius margin* padding* border*-width border**-radius").split(" "),function(i,_name){
		var name=_name.replace(/\*/g,'');
		Duopao.fx.filter[name]=function(prop,val){
			delete prop[name];
			delete prop[Duopao.style.toUpper(name)];
			var arr=String(val).split(/\s+/),
				four=['top','right','bottom','left'],
				opt=[[0,3],[0,1],[2,1],[2,3]],
				cfg=[[0,0,0,0],[0,1,0,1],[0,1,2,1],[0,1,2,3]],
				ret;
			cfg[arr.length-1] && Duopao.each(four,function(i,type){
				ret=opt[i];
				prop[_name.replace('**','-'+four[ret[0]]+'-'+four[ret[1]]).replace('*','-'+type)]=arr[cfg[arr.length-1][i]];
			});
			return prop;
		}
	});
	
	Duopao.each("border".split(" "),function(i,name){
		Duopao.fx.filter[name]=function(prop,val){
			delete prop[name];
			var arr=String(val).split(/\s*,\s*/),
				cfg=[[0,0,0,0],[0,1,0,1],[0,1,2,1],[0,1,2,3]];
			cfg[arr.length-1] && Duopao.each(['Top','Right','Bottom','Left'],function(i,type){
				prop[name+type]=arr[cfg[arr.length-1][i]];
			});
			return prop;
		}
	});
	
	/**
	 * 获取远程图片真实宽高
	 * 不必等图片完全加载出来就可以获取到真实的宽高
	 * by qiqiboy 2012/10/28
	 */
	Duopao.imgReady=(function(){
		var list=[],
			timer=null,
			prop=[['width','height'],['naturalWidth','naturalHeight']],
			natural=Number(typeof document.createElement('img').naturalHeight==='number'),//是否支持HTML5新增的 naturalHeight
			tick=function(){
				for(var i=0;i<list.length;i++){
					list[i].end?list.splice(i--,1):check.call(list[i],null);
				}
				list.length && (timer=nextFrame(tick)) || (timer=null);
			},
			check=function(){
				if(this[prop[natural][0]]!==this.__width || this[prop[natural][1]]!==this.__height || this[prop[natural][0]]*this[prop[natural][1]]>1024){
					this._onready.call(this,null);
					this.end=true;
				}
			};
			return function(_img, onready, onload, onerror){
				onready=onready || new Function();
				onload=onload || new Function();
				onerror=onerror || new Function();
				var img=typeof _img=='string'?new Image():_img;
				img.onerror=function(){// ie && ie<=8 的浏览器必须在src赋予前定义onerror
					img.end=true;
					img=img.onload=img.onerror=img.onreadystatechange=null;
					onerror.call(img,null);
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
				img._onready=onready;
				check.call(img,null);
				img.onload=img.onreadystatechange=function(){
					if(img&&img.readyState&&img.readyState!='loaded'&&img.readyState!='complete'){return;}
					!img.end && check.call(img,null);
					img=img.onload=img.onerror=img.onreadystatechange=null;
					onload.call(img,null);
				}
				if(!img.end){
					list.push(img);
					if(timer===null) timer=nextFrame(tick);
				}
			}
	})();
	
	/**
	 * 对象加载的ready load error组件
	 * DOM树载入完成后立即触发的事件,可以像jquery那样使用 Duopao(document).ready(fn) 或者Duopao(fn)
	 * load事件，则可以Duopao(document).load(fn)，结合ready可以连写为以Duopao(document).ready(fn).load(fn)
	 * 其它img js等，则使用方式为 Duopao(selector).ready(fn).load(fn).error(fn)
	 * by qiqiboy 2012/10/25
	 */
	Duopao.ready=function(elem){
		var _this,ready,_elem,
			doScrollCheck=function(){
				try{
					document.documentElement.doScroll("left");
					ready();
				}catch(e){
					nextFrame(doScrollCheck);
				}
			}
		
		if(!elem)return;
		_elem=elem;
		_this=Duopao(elem);
		ready=function(){
			Duopao.isReady=true;
			_this.ready().off('ready');
		}
		
		if(Duopao.isWindow(elem) || elem.nodeType&&elem.nodeType===9){
			if(Duopao.isReady){
				ready();
			}else{
				_this.DOMContentLoaded(function(){
					ready();
					_this.off("DOMContentLoaded");
				});
	
				var toplevel=false;
				try{
					toplevel=window.frameElement==null;
				}catch(e){}
				if(document.documentElement && document.documentElement.doScroll && toplevel){
					doScrollCheck();
				}
			}
			_elem=Duopao.getRoot(elem);
			elem=Duopao.getRootWin(_elem);
		}else if(_this.nodeName()==='img'){
			return Duopao.imgReady(elem,function(){
				_this.ready.call(_this);
			},function(){
				_this.load.call(_this);
			},function(){
				_this.error.call(_this);
			});
		}
		try{
			if(elem.complete || elem.readyState==="complete" || elem.readyState==="loaded"){
				_this.ready().load().off('ready').off('load');
				return;
			}
		}catch(e){}
		elem.onload=_elem.onreadystatechange=function(){
			if(this && this.readyState && this.readyState!='loaded' && this.readyState!='complete'){return}
			this.onload=this.onreadystatechange=null;
			_this.ready().load().off('ready').off('load');
		}
		elem.onerror=_elem.onerror=function(){
			this.onerror=null;
			_this.error().off('error');
		}
	}
	
	Duopao.each({
		on:'add',
		bind:'add',
		off:'remove',
		unbind:'remove',
		fire:'fireEvent',
		trigger:'fireEvent'
	}, function(type, name){
		Duopao.fn[type]=function(types,handler){
			return this.each(function(){
				Duopao.event[name](this,types,handler);
			});
		}
	});
	
	/* Duopao框架的addEvent组件
	 * by qiqiboy 2012/10/20
	 *
	 * 实现了简单的类似jquery的bind unbind等机制，不支持live，live其实就是将事件绑定到对象节点的父一级节点，然后通过事件触发的target节点的element contains检测来判断是否触发了目标节点。
	 * 如果有live的需求，可以自己写出来，这里未添加到组件支持中。
	 * 
	 * 该组件支持扩展自定义事件，例如click3（三鼠标击），未来会扩展触屏上的多指触摸操作，例如左滑 右滑等
	 */
	Duopao.event={
		guid:1,
		canAddEvent:true,
		add:function(elem,types,handler){
			var handlers,eventHandle,custom;
			
			if(!Duopao.isArray(types)){
				types=Duopao.trim(types).split(" ");
			}
			if(!handler.guid){
				handler.guid=Duopao.event.guid++;
			}
			if(!elem.events){
				elem.events={};
			}
			Duopao.each(types,function(i,type){
				if(Duopao.isArray(type)){
					return Duopao.event.add(type[0],type[1],handler);
				}
				handlers=elem.events[type];
				if(!handlers){
					handlers=elem.events[type]={fn:{}};
					if(elem['on'+type]){
						handlers.fn[0]=elem['on'+type];
					}
				}
				handlers.fn[handler.guid]=handler;
				eventHandle=handlers.handle;
				if(!eventHandle){
					custom=Duopao.event.custom[type];
					if(custom){
						if(custom.bindType){
							Duopao.event.add(elem,custom.bindType,custom.init);
						}else{
							custom.init(elem);
						}
						return;
					}

					eventHandle=handlers.handle=function(evt){
						evt=Duopao.event.fixEvent(evt);
						if(Duopao.event.handleEvent.call(elem,evt)===false){
							evt.preventDefault();
							evt.stopPropagation();
							return false;
						}
					}
					
					if(elem.addEventListener){
						elem.addEventListener(type,eventHandle,false);
					}else if(elem.attachEvent){
						elem.attachEvent('on'+type,eventHandle);
					}else{
						Duopao.event.canAddEvent=false;
					}
				}
				if(!Duopao.event.canAddEvent){
					elem['on'+type]=eventHandle;
				}
			});
		},
		remove:function(elem,types,handler){
			if(!elem.events)return;
			if(typeof types=='undefined'){
				return Duopao.each(elem.events,function(type){
					Duopao.event.remove(elem,type);
				});
			}
			if(!Duopao.isArray(types)){
				types=Duopao.trim(types).split(" ");
			}
			var custom,eventHandle;
			Duopao.each(types,function(i,type){
				if(Duopao.isArray(type)){
					return false;
				}
				if(elem.events[type]){
					if(handler){
						delete elem.events[type]['fn'][handler.guid];
					}else{
						elem.events[type]['fn']={};
					}
					if(Duopao.isEmptyObject(elem.events[type]['fn'])){//console.log(elem.events[type].handle)
						custom=Duopao.event.custom[type];
						if(custom&&custom.bindType){
							Duopao.event.remove(elem,custom.bindType,custom.init);
						}
						if(eventHandle=elem.events[type].handle){
							if(elem.addEventListener){
								elem.removeEventListener(type,eventHandle,false);
							}else if(elem.attachEvent){
								elem.detachEvent('on'+type,eventHandle);
							}
						}
						if(!Duopao.event.canAddEvent){
							elem['on'+type]=null;
						}
						delete elem.events[type];
					}
				}
			});
		},
		fixEvent:function(origEvt){
			if(origEvt.fixed)return origEvt;
			var evt,i,copy,prop,fixFilter;
			origEvt=origEvt||window.event;
			evt=Duopao.Event(origEvt);
			fixFilter=Duopao.event.fixFilter[evt.type.toLowerCase()]||{};
			copy=fixFilter.props?Duopao.event.props.concat(fixFilter.props):Duopao.event.props;
			for(i=copy.length;i;){
				prop=copy[--i];
				evt[prop]=origEvt[prop];
			}
			if(!evt.target){
				evt.target=origEvt.srcElement||document;
			}
			if(evt.target.nodeType===3){
				evt.target=evt.target.parentNode;
			}
			if(typeof evt.metaKey==='undefined'){
				evt.metaKey=evt.ctrlKey;
			}
			return fixFilter.filter?fixFilter.filter(evt,origEvt):evt;
		},
		handleEvent:function(evt){
			var ret=true,call,elem,
				handlers,i,once;
			evt=Duopao.event.fixEvent(evt);
			handlers=this.events&&this.events[evt.type]||{fn:{}};
			if(Duopao.event.canAddEvent){
				delete handlers.fn[0];
			}
			once=Duopao.inArray(evt.type,"ready load error".split(" "))>-1;
			for(i in handlers.fn){
				call=handlers.fn[i];
				if(once)delete handlers.fn[i];
				if(call){
					elem=call.context||this;
					if(call.call(elem,evt)===false){
						ret=false;
					}
				}
			}
			return ret;
		},
		fireEvent:function(elem,type){
			var evt={};
			if(Duopao.type(type)=='object'){
				evt=Duopao.extend(type,evt);
			}else{
				evt.type=type;
			}
			if(elem.nodeType && Duopao.inArray(type,"click focus blur submit".split(" "))>-1){
				try{
					elem[type]();
				}catch(e){
					try{
						elem['on'+type]();
					}catch(e){
						Duopao.event.handleEvent.call(elem,evt);
					}
				}
			}else{
				if(Duopao.event.canAddEvent && Duopao.type(elem['on'+evt.type])=='function'){
					elem['on'+evt.type]();
				}
				Duopao.event.handleEvent.call(elem,evt);
			}
		},
		props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target view which".split(" "),
		fixFilter:{},
		fixMouse:{
			props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter:function(evt,origEvt){
				var dc=Duopao(Duopao.getRoot(origEvt.target)),
					win=Duopao.getRootWin(dc[0]);
				if(Duopao.hasTouch && origEvt.changedTouches){
					evt.touches=origEvt.changedTouches;
					evt.pageX=origEvt.pageX||(evt.touches.length?evt.touches.item(0).pageX:0);
					evt.pageY=origEvt.pageY||(evt.touches.length?evt.touches.item(0).pageY:0);
				}else if(typeof evt.pageX==='undefined'){
					evt.pageX=evt.clientX+(win.pageXOffset||(dc.scrollLeft()-dc.clientLeft())||0);
					evt.pageY=evt.clientY+(win.pageYOffset||(dc.scrollTop()-dc.clientTop())||0);
				}
				if(!evt.relatedTarget){
					evt.relatedTarget=evt.fromElement===evt.target ? evt.toElement : evt.fromElement;
				}
				if(!evt.which) {
					evt.which=(evt.button&1 ? 1 : (evt.button&2 ? 3 : (evt.button&4 ? 2 : 0)));
				}
				return evt;
			}
		},
		fixKey:{
			props:"char charCode key keyCode".split(" "),
			filter:function(evt){
				if(evt.which==null){
					evt.which=evt.charCode!=null ? evt.charCode : evt.keyCode;
				}
				return evt;
			}
		},
		fixTransition:{
			props:"propertyName elapsedTime".split(" ")
		},
		custom:{
			click3:{//连点三次
				bindType:'click',
				handle:function(evt){
					var ret=this.events[evt.type];
					if(!ret.clickonce||(evt.timeStamp-ret.startTime)>500){
						ret.clickonce=1;
						ret.startTime=evt.timeStamp;
					}else{
						ret.clickonce++;
						if(ret.clickonce>=3){
							ret.clickonce=0;
							ret.startTime=null;
							return true;
						}
					}
					return false;
				}
			},
			slip:{//滑动
				bindType:[Duopao.startEvent,[document,Duopao.endEvent]],
				handle:function(evt){
					var type=evt.type,
						init=Duopao.event.custom.slip.init,
						ret=this.events.slip;//console.log(this)
					if(!ret)return;
					!ret.RF&&(ret.RF=function(e){
						Duopao.event.remove(this,'click',ret.RF);
						return false;
					});
					switch(type){
						case Duopao.startEvent:
							ret.startTime=+new Date;
							ret.startPos={top:evt.pageY,left:evt.pageX};
							Duopao.event.remove(this,'click',ret.RF);
							init.context=this;
							break;
						default:
							if(ret.startTime && (+new Date)-ret.startTime<600){
								var offX=evt.pageX-ret.startPos.left,
									offY=evt.pageY-ret.startPos.top,
									off=Math.max(Math.abs(offX),Math.abs(offY));
								if(off>50){
									Duopao.event.add(this,'click',ret.RF);
									if(Math.abs(offX)>Math.abs(offY)){
										evt.direction=offX>0?'right':'left';
									}else{
										evt.direction=offY>0?'bottom':'top';
									}
									ret.startTime=null;
									init.context=null;
									return true;
								}
							}
							ret.startTime=null;
							init.context=null;
							break;
					}
				}
			},
			ready:{
				init:Duopao.ready
			},
			load:{
				init:Duopao.ready
			},
			error:{
				init:Duopao.ready
			},
			transitionEnd:{
				bindType:Duopao.transitionend,
				handle:function(evt){
					return true;
				}
			},
			drag:{//拖动
				bindType:[Duopao.startEvent,[document,Duopao.moveEvent],[document,Duopao.endEvent+' canceltouch']],
				handle:function(evt){
					var init=Duopao.event.custom.drag.init,
						ret=this.events.drag,
						offX,offY;
					if(!ret)return;
					ret.RF=ret.RF||function(e){
						Duopao.event.remove(this,'click',ret.RF);
						return false;
					};
					ret.startPos=ret.startPos||{x:evt.pageX,y:evt.pageY};
					offX=evt.pageX-ret.startPos.x;
					offY=evt.pageY-ret.startPos.y;
					switch(evt.type){
						case Duopao.startEvent:
							ret.drag=false;
							if(evt.touches&&evt.touches.length>1){
								return;
							}
							Duopao.event.remove(this,'click',ret.RF);
							ret.now=Duopao.offset.getOffset(this);
							evt.status=0;
							init.context=this;
							break;
						case Duopao.moveEvent:
							if(!ret.startPos||!ret.direction&&!offX&&!offY)return;//该情况下不阻止默认行为
							if(ret.timer)return false;//已经开始拖动了，阻止默认行为
							ret.drag=true;
							ret.timer=setTimeout(function(){
								ret.timer=null;
							},50);
							ret.direction=ret.direction||(Math.abs(offX)>Math.abs(offY)?'x':'y');
							evt.status=1;
							break;
						case Duopao.endEvent:
						case 'canceltouch':
							if(!ret.startPos)return;
							if(ret.drag){
								Duopao.event.add(this,'click',ret.RF);
								ret.drag=false;
							}
							evt.status=2;
							break;
					}
					evt.offset={left:ret.now.left+offX,top:ret.now.top+offY};
					evt.distance={x:offX,y:offY};
					evt.direction=ret.direction;
					if(evt.status===2){
						ret.startPos=ret.now=ret.direction=ret.timer=init.context=undefined;
					}
					return true;
				}
			}
		}
	}
	
	Duopao.Event=function(orig,props){
		if(!(this instanceof Duopao.Event)){
			return new Duopao.Event(orig,props);
		}
		if(orig&&orig.type){
			this.oldEvent=orig;
			this.type=orig.type;
		}else this.type=orig;
		if(props){
			Duopao.extend(props,this);
		}
		this.timeStamp=orig&&orig.timeStamp||+new Date;
		this.fixed=true;
	}
	Duopao.Event.prototype={
		preventDefault:function(){
			var evt=this.oldEvent;
			if(evt){
				evt.preventDefault && evt.preventDefault();
				this.returnValue=evt.returnValue=false;
			}
		},
		stopPropagation:function(){
			var evt=this.oldEvent;
			if(evt){
				evt.stopPropagation && evt.stopPropagation();
				this.cancelBubble=evt.cancelBubble=true;
			}
		}
	}
	
	Duopao.each({mouseenter:Duopao.overEvent,mouseleave:Duopao.outEvent}, function(type, bindType){
		Duopao.event.custom[type]={
			bindType:bindType,
			handle:function(evt){
				if(!evt.fixed)evt=Duopao.event.fixEvent(evt);
				var target=this,
					related=evt.relatedTarget;
				if(!related || (related!==target && !Duopao.contains(target,related))){
					return true;
				}
			}
		}
	});
		
	Duopao.each({slip:"top right bottom left".split(" ")},function(name, types){
		Duopao.each(types,function(i, type){
			Duopao.event.custom[name+type]={
				bindType:name,
				handle:function(evt){
					if(evt.direction==type)
						return true;
				}
			}
			Duopao.fn[name+type]=function(fn){
				return Duopao.isFunction(fn) ?
					this.on(name+type,fn) :
					this.fire(name+type);
			}
		})
		
	});
	
	Duopao.each(Duopao.event.custom, function(type, obj){
		!obj.init&&(obj.init=function(evt){
			var custom=Duopao.event.custom[type],
				ret=custom.handle.call(this,evt);
			if(ret===true){
				evt=Duopao.extend(evt,{});
				evt.type=type;
				return Duopao.event.handleEvent.call(this,evt);
			}
			return ret;
		});
	});
	
	Duopao.each(("blur focus focusin focusout load ready resize scroll unload beforeunload readystatechange DOMContentLoaded click dblclick click3 " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"touchstart touchmove touchend canceltouch orientationchange transitionEnd " + Duopao.transitionend + " slip drag " +
	"change submit keydown keypress keyup error").split(" "), function(i, name){
		Duopao.fn[name]=function(fn){
			return Duopao.isFunction(fn) ?
				this.on(name,fn) :
				this.fire(name);
		}
		var _name=name.toLowerCase();
		if(/^key/.test(_name)){
			Duopao.event.fixFilter[_name]=Duopao.event.fixKey;
		}

		if(/^mouse|touch|click/.test(_name)){
			Duopao.event.fixFilter[_name]=Duopao.event.fixMouse;
		}
		
		if(/transition/.test(_name)){
			Duopao.event.fixFilter[_name]=Duopao.event.fixTransition;
		}

	});
	
		
	Duopao.fn.extend({
		hover:function(fn1,fn2){
			return this.mouseenter(fn1).mouseleave(fn2);
		}
	});

	
	Duopao.extend({
		getXHR:function(){
			var xmlHttp;
			try {
				xmlHttp = new XMLHttpRequest()
			} catch(e) {
				try {
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP")
				} catch(e) {
					try {
						xmlHttp = new ActiveXObject("Msxml2.XMLHTTP")
					} catch(e) {
						alert("Your browser does not support ajax!");
						return false
					}
				}
			}
			return xmlHttp
		},
		ajax:function(url,cfg){
			var xhr=Duopao.getXHR(),
				cfg=typeof url!=='string'?url:cfg||{},
				url=(typeof url==='string'?url:cfg.url)||window.location.href,
				method=(cfg.method||'GET').toUpperCase(),
				before=cfg.before||new Function,
				dataType=cfg.dataType||'html',
				send=cfg.send||null,
				after=cfg.after||new Function,
				delay=parseInt(cfg.delay||30),
				success=cfg.success||new Function,
				error=cfg.error||new Function,
				timer,timeout=false,xhrStatus=0,
				sendData=null;
			url=url.replace(/#.*/g,"");
			if(send!==null){
				if(Duopao.isArray(send)||Duopao.isPlainObject(send)){
					sendData=[];
					for(var key in send){
						sendData.push(encodeURIComponent(key)+'='+encodeURIComponent(send[key]));
					}
					sendData=sendData.join('&');
				}else sendData=send;
				if(method=='GET'){
					url+=(/\?/.test(url)?'&':'?')+sendData;
				}
			}
			xhr.open(method,url,true);
			send!==null&&method=='POST' ? 
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded') : 
				xhr.setRequestHeader('Content-type', 'charset=UTF-8');
			before();
			
			timer=setTimeout(function(){
				if(xhrStatus!==4){
					timeout=true;
					xhr.abort();
				}
			},delay*1000);
			
			xhr.onreadystatechange=function(){
				switch(xhr.readyState){
					case 'loaded':
					case 'complete':
					case 4:xhrStatus=4;
						clearTimeout(timer);
						try{
							var status,resText,data;
							status=xhr.status;
							resText=Duopao.trim(xhr.responseText);
							if(status!==200){
								if(timeout)throw new Error('请求超时('+delay+'s)！');
								else throw new Error(resText||'请求失败！');
							}
							if(!resText){
								throw new Error('返回结果为空！');
							}
							switch(dataType){
								case 'json':
									try{
										data=JSON.parse(resText);
									}catch(e){
										throw new Error('JSON数据解析错误（'+e.message+'）');
									}
									break;
								case 'text':
									data=Duopao.strip_tag(resText);
									break;
								case 'xml':
									data=xhr.responseXML;
									break;		
								case 'javascript':
									data=true;
									eval(resText);
									break;
								case 'html':		
								default:data=resText;break;
							}
							success(data);
						}catch(e){
							error(e.message);
						}finally{
							setTimeout(function(){
								xhr.onreadystatechange=null;
							},0);
							after();
						}
						break;
					default:break;
				}
			}
			
			xhr.send(sendData);
		}
	});
	
	if(!JSON){
		JSON={
			parse:function(resText){
				return eval("("+resText+")");
			}
		}
	}

	nextFrame=window[Duopao.style.toUpper(cssVendor.substring(1).toLowerCase()+'request-animation-frame')] || function(callback){return setTimeout(callback,16)};
	cancelFrame=window.webkitCancelAnimationFrame || window[Duopao.style.toUpper(cssVendor.substring(1).toLowerCase()+'cancel-request-animation-frame')] || clearTimeout;

	Duopao.getScript=function(src,func){
		Duopao('<script>',{async:true,src:src||'javascript:;'}).load(function(){
			(func||new Function)();
			$(this).remove();
		}).appendTo('head');
	}
	
	Duopao(document).ready(function(){
		var noCSS3=[];
		Duopao.each("transform transition perspective border-image border-radius box-shadow background-size text-shadow min-height".split(" "), function(i, name) {
			if(!Duopao.isCSS(name))noCSS3.push(name);
		});
		if(noCSS3.length) Duopao('body').addClass("no-"+noCSS3.join(" no-"));
	});
	
	Duopao.extend({
		transform:Duopao.isCSS('transform'),
		transition:Duopao.isCSS('transition')
	});
	

	window.Duopao=window.D=Duopao;
	
})(window);
