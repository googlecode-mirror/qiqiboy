/**
 * TouchSlider v1.2.1
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2012/12/01
 */
eval(function(B,D,A,G,E,F){function C(A){return A<62?String.fromCharCode(A+=A<26?65:A<52?71:-4):A<63?'_':A<64?'$':C(A>>6)+C(A&63)}while(A>0)E[C(G--)]=D[--A];return B.replace(/[\w\$]+/g,function(A){return E[A]==F[A]?A:E[A]})}('(1(K,N){Z G=("createTouch"V 3)||("ontouchstart"V K),I=3.createElement("div").o,E=(1(){Z T={OTransform:["-Cc-","otransitionend"],WebkitTransform:["-webkit-","webkitTransitionEnd"],MozTransform:["-moz-","BD"],msTransform:["-BO-","MSTransitionEnd"],transform:["","BD"]},S;c(S V T){U(S V I){s T[S];}}s m;})(),J=[["BZ","l","BT"],["height","top","bottom"]],O=E&&E[Q],B=1(T){s(T+"").B2(/^-BO-/,"BO-").B2(/-([Cb-Cd]|[Q-Cf])/ig,1(S,T){s(T+"").toUpperCase();});},C=1(T){Z S=B(O+T);s(T V I)&&T||(S V I)&&S;},H=1(S,T){c(Z A V T){U(u S[A]=="6"){S[A]=T[A];}}s S;},F=1(T){Z A=T.children||T.childNodes,S=[],B=Q;c(;B<A.t;B++){U(A[B].BI===R){S.push(A[B]);}}s S;},P=1(T,S){Z B=Q,A=T.t;c(;B<A;B++){U(S.Bk(T[B],B,T[B])===m){BA;}}},T=1(T){T=S.X.8(T);T.$();},M=G?"touchstart":"mousedown",D=G?"touchmove":"mousemove",L=G?"touchend":"mouseup",A=E[R]||"",S=1(T,A){U(!(f instanceof S)){s d S(T,A);}U(u T!="B5"&&!T.BI){A=T;T=A.CV;}U(!T.BI){T=3.getElementById(T);}f.Y=H(A||{},f.CX);f.y=T;f.BM=f.y.CG||3.B8;U(f.y){f.CW();}};S.X=S.prototype={CX:{CV:"slider",p:Q,BN:Q,q:600,0:5000,5:"l",CU:k,Bc:m,Bz:d B1(),CA:d B1()},a:1(T,D){U(u D=="B5"){Z S=3.CK&&3.CK.CI&&CI(T,null)||T.currentStyle||T.o||{};s S[B(D)];}j{Z A,C;c(A V D){U(A=="Bs"){C=("CL"V I)?"CL":"styleFloat";}j{C=B(A);}T.o[C]=D[A];}}},9:1(S,A,B,T){U(S.BU){S.BU(A,B,T);s k;}j{U(S.Bf){S.Bf("CN"+A,B);s k;}}s m;},CZ:1(S,A,B,T){U(S.BU){S.removeEventListener(A,B,T);s k;}j{U(S.Bf){S.detachEvent("CN"+A,B);s k;}}s m;},8:1(B){Z S={},C="changedTouches touches Bl x view which Bv Bu fromElement offsetX offsetY r BL toElement".split(" ");B=B||K.event;P(C,1(){S[f]=B[f];});S.x=B.x||B.srcElement||3;U(S.x.BI===Ce){S.x=S.x.CG;}S.$=1(){B.$&&B.$();S.B_=B.B_=m;};S.Bm=1(){B.Bm&&B.Bm();S.Bw=B.Bw=k;};U(u B.r=="6"){Z A=3.documentElement,T=3.B8;S.r=B.Bv+(A&&A.B6||T&&T.B6||Q)-(A&&A.B4||T&&T.B4||Q);S.BL=B.Bu+(A&&A.CY||T&&T.CY||Q)-(A&&A.Bt||T&&T.Bt||Q);}S.B0=B;s S;},i:1(S,T){s 1(){s S.apply(T,arguments);};},CW:1(){f.v=F(f.y);f.t=f.v.t;U(f.t<R){s m;}f.Y.0=BK(f.Y.0);f.Y.q=BK(f.Y.q);f.Y.p=BK(f.Y.p);f.Y.BN=!!f.Y.BN;f.Y.0=g.BV(f.Y.0,f.Y.q);f.CJ=!!G;f.css3transition=!!E;f.n=f.Y.p<Q||f.Y.p>=f.t?Q:f.Y.p;switch(f.Y.5){Bb"BW":f.5="BW";f.2=R;BA;Bb"B7":f.5="B7";f.2=R;BA;Bb"BT":f.5="BT";f.2=Q;BA;default:f.5="l";f.2=Q;BA;}f.9(f.y,M,f.i(f.CD,f),m);f.9(3,D,f.i(f.CQ,f),m);f.9(3,L,f.i(f.BS,f),m);f.9(3,"touchcancel",f.i(f.BS,f),m);f.9(f.y,A,f.i(f.BD,f),m);f.9(K,"BP",f.i(1(){_(f.CF);f.CF=BX(f.i(f.BP,f),100);},f),m);U(f.Y.Bc){f.9(f.y,"mousewheel",f.i(f.Bn,f),m);f.9(f.y,"DOMMouseScroll",f.i(f.Bn,f),m);}f.BP();},w:1(C,S,D){Z A=Q,E=S,T=B("-"+C);c(;E<D;E++){A+=f["Bi"+T](f.v[E]);}s A;},Bj:1(A,S){Z T=B("-"+A);s(f[A]-f["Bi"+T](f.v[S]))/BF-f.w(A,Q,S);},BP:1(){Z S=f,C,A=J[f.2][Q],T=B("-"+A);f.a(f.BM,{CE:"Bp",Br:"Bp",listStyle:"CS",CO:"CT"});f[A]=f["CC"+T](f.BM);C={Bs:f.2?"CS":"l",display:"block"};P(f.v,1(){U(S.Y.CU){C[A]=S[A]-S["Be"+T](f)-S["BY"+T](f)-S["BB"+T](f)+"W";}S.a(f,C);});f.Bq=f.w(A,Q,f.t);C={CO:"CT",CE:"Bp"};C[O+"Bo-Ca"]="Bx";C[A]=f.Bq+"W";C[J[f.2][R]]=f.Bj(A,f.n)+"W";f.a(f.y,C);f.a(f.BM,{Br:"visible"});U(f.Y.BN){f.BR();}s f;},BH:1(T,A){Z B=J[f.2][R],G=J[f.2][Q],E=C("Bo"),L=BJ(f.a(f.y,B))||Q,N,O={},D,H=f.w(G,T,T+R);T=g.CR(g.BV(Q,T),f.t-R);A=u A=="6"?f.Y.q:BK(A);N=f.Bj(G,T);D=N-L,A=g.b(D)<H?g.By(g.b(D)/H*A):A;U(E){O[E]=B+" ease-out "+A+"BO";O[B]=N+"W";f.a(f.y,O);}j{Z M=f,I=Q,K=A/B3,S=1(S,A,B,T){s-B*((S=S/T-R)*S*S*S-R)+A;},F=1(){U(I<K){I++;M.y.o[B]=g.By(S(I,L,D,K))+"W";f.Bh=BX(F,B3);}j{M.y.o[B]=N+"W";M.BD({CB:B});}};_(f.Bh);F();}f.Y.Bz.Bk(f,T,f.v[f.n]);f.n=T;s f;},BR:1(){_(f.BG);f.BG=BX(f.i(1(){f.5=="l"||f.5=="BW"?f.h():f.BE();f.BQ=k;},f),f.Y.0);s f;},B$:1(){_(f.BG);f.BQ=m;s f;},stop:1(){f.B$();s f.BH(Q);},BE:1(A,S){Z T=f.n;A=u A=="6"?A=R:A%f.t;T-=A;U(S===m){T=g.BV(T,Q);}j{T=T<Q?f.t+T:T;}s f.BH(T);},h:1(A,S){Z T=f.n;U(u A=="6"){A=R;}T+=A;U(S===m){T=g.CR(T,f.t-R);}j{T%=f.t;}s f.BH(T);},CD:1(S){S=f.8(S);U(!f.CJ){S.$();}f.CZ(f.y,"CP",T);f.4=[S.r,S.BL];f.y.o[B(O+"Bo-Ca")]="Bx";f.Bd=+d CM;f.Ba=BJ(f.a(f.y,J[f.2][R]))||Q;},CQ:1(S){U(!f.4||S.Bl&&S.Bl!==R){s;}S=f.8(S);f.z=[S.r,S.BL];Z T=J[f.2][R],B=J[f.2][Q],A=f.z[f.2]-f.4[f.2];U(f.7||u f.7=="6"&&g.b(A)>=g.b(f.z[R-f.2]-f.4[R-f.2])){S.$();A=A/((!f.n&&A>Q||f.n==f.t-R&&A<Q)?(g.b(A)/f[B]+R):R);f.y.o[T]=f.Ba+A+"W";U(A&&u f.7=="6"){f.7=k;_(f.BG);_(f.Bh);}}j{f.7=m;}},BS:1(S){U(f.z){U(f.z){Z C=J[f.2][Q],B=f.z[f.2]-f.4[f.2],A=g.b(B);Bg=f.w(C,f.n,f.n+R),h=f.n,e=Q;U(A>20){U(A>Bg){while((h-=A/B)&&h>=Q&&h<f.t&&f.w(C,B<Q?f.n:h,B>Q?f.n:h)+f.w(C,h,h+R)/BF<A){}e=g.b(h-f.n);}j{U(+d CM-f.Bd<250||A>Bg/BF){e=R;}}}B>Q?f.BE(e,m):f.h(e,m);U(f.7){f.9(f.y,"CP",T);U(f.BQ){f.BR();}}}BC f.7;BC f.4;BC f.z;BC f.Ba;BC f.Bd;}},Bn:1(S){U(f.Y.Bc){S=f.8(S);S.$();Z B=S.B0,A=B.wheelDelta||B.B9&&B.B9*-R||Q,T=A/g.b(A);A>Q?f.BE(R,m):f.h(R,m);}},BD:1(T){U(T.CB==J[f.2][R]){f.Y.CA.Bk(f,f.n,f.v[f.n]);U(f.BQ){f.BR();}}}};P(["Width","Height"],1(B,A){Z T=A.toLowerCase();P(["Be","BY","BB"],1(C,T){S.X[T+A]=1(S){s BJ(f.a(S,T+"-"+J[B][R]+(T=="BB"?"-BZ":"")))+BJ(f.a(S,T+"-"+J[B][BF]+(T=="BB"?"-BZ":"")));};});S.X["CC"+A]=1(T){s T["CH"+A]-f["BY"+A](T)-f["BB"+A](T);};S.X["Bi"+A]=1(T){s T["CH"+A]+f["Be"+A](T);};});K.TouchSlider=S;})(window);','0|1|_|$|if|in|px|fn|cfg|var|css|abs|for|new|off|this|Math|next|bind|else|true|left|false|index|style|begin|speed|pageX|return|length|typeof|slides|getSum|target|element|stopPos|timeout|function|vertical|document|startPos|direction|undefined|scrolling|eventHook|addListener|clearTimeout|preventDefault|break|border|delete|transitionend|prev|2|timer|slide|nodeType|parseFloat|parseInt|pageY|container|auto|ms|resize|playing|play|_end|right|addEventListener|max|up|setTimeout|padding|width|_pos|case|mouseWheel|startTime|margin|attachEvent|myWidth|aniTimer|getOuter|getPos|call|scale|stopPropagation|mouseScroll|transition|hidden|total|visibility|float|clientTop|clientY|clientX|cancelBubble|0ms|ceil|before|origEvent|Function|replace|10|clientLeft|string|scrollLeft|down|body|detail|returnValue|pause|after|propertyName|get|_start|overflow|resizeTimer|parentNode|offset|getComputedStyle|touching|defaultView|cssFloat|Date|on|position|click|_move|min|none|relative|fixWidth|id|setup|_default|scrollTop|removeListener|duration|a|o|z|3|9'.split('|'),144,159,{},{}))