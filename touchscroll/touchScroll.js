/*
 * TouchScroll v1.0.1
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2012/04/06
 */
eval(function(B,D,A,G,E,F){function C(A){return A<62?String.fromCharCode(A+=A<26?65:A<52?71:-4):A<63?'_':A<64?'$':C(A>>6)+C(A&63)}while(A>0)E[C(G--)]=D[--A];return B.replace(/[\w\$]+/g,function(A){return E[A]==F[A]?A:E[A]})}('y B8(P){d.X=d.Cz(P);d.2=BD d.X.Bm=="Bb"?d.Q(d.X.Bm):d.X.Bm;try{R(!d.2)Cg Z Cm("Can\'DB find u");BA(V B=L,A=d.BZ.s;B<A;B++)R(d.BZ[B]==d.2)Cg Z Cm("An instance has being running!");d.BZ.CB(d.2);d.C_()}catch(Q){d.error=Q.message}}B8.B1={BV:{Bm:"slider",o:BL,Ci:CR,v:L.DC,CV:Z Ba(),C5:Z Ba(),B0:"black",CK:M},BZ:[],Q:y(Q){q 1.getElementById(Q)},U:y(P,A){V Q=1.createElement(P)||k;A=Bj.B1.C8.BI(A)=="[CA Bj]"?A:{};R(Q)BA(V B T A)R(B=="n")Q.n.cssText+=A[B];f Q.setAttribute(B,A[B]);q Q},W:(y(){V Q=y(P){B5(P){BQ"float":q("Cq"T 1.Bw.n)?"Cq":"styleFloat";BB;BQ"v":q("v"T 1.Bw.n)?"v":{CZ:y(P,Q){V A=Q.B$;q A&&A.indexOf("v")>=L&&Cc(A.match(/v=([^)]*)/C$)[M])/c+""||"M"},Ce:y(Q,P){Q.n.B$="Cj(v="+P*c+")";Q.n.zoom=M}};BB;B_:V Q=P.split("-");BA(V A=M;A<Q.s;A++)Q[A]=Q[A].CG(L,M).toUpperCase()+Q[A].CG(M);P=Q.join("");q P;BB}},A=y(A,C){C=Q(C);V B=A.n[C];R(!B){V P=1.Cp&&1.Cp.Cl&&Cl(A,k)||A.currentStyle||A.n;R(BD C=="Bb")B=P[C];f B=C.CZ(A,P)}q B=="Bg"?"":B},P=y(P,C){V A;BA(V B T C){A=Q(B);R(BD A=="Bb")P.n[A]=C[B];f A.Ce(P,C[B])}};q y(Q,B){q BD B=="Bb"?A(Q,B):P(Q,B)}})(),Cz:y(Q){V A={},P=Bj.B1.C8;R(Q&&P.BI(Q)=="[CA Bj]")BA(V B T d.BV)A[B]=BD Q[B]==="Ch"?d.BV[B]:P.BI(d.BV[B])=="[CA Number]"?0(Cc(Q[B])*c)/c:Q[B];f A=d.BV;q A},3:y(P,A,B,Q){R(P.CP){P.CP(A,B,Q);q l}f R(P.Cs){P.Cs("on"+A,B);q l}q p},B9:y(P){P=P||r.BE;V C=K=L,A=d.$&&P.Bf.s?P.Bf[L]:P,B=1.CI,Q=1.Bw;R(r.CH){C=r.CH;K=r.pageYOffset}f{C=(B&&B.Bc||Q&&Q.Bc||L)-(B&&B.CT||Q&&Q.CT||L);K=(B&&B.Bo||Q&&Q.Bo||L)-(B&&B.CF||Q&&Q.CF||L)}C+=A.clientX;K+=A.clientY;q{BN:C,K:K}},BT:y(Q){R(r.BE)r.BE.returnValue=p;f Q.BT()},BU:y(P,Q){q P.BU?P!=Q&&P.BU(Q):!!(P.compareDocumentPosition(Q)&16)},i:y(P,Q){q y(){q P.apply(Q,BM)}},Bz:y(){BA(V Q=L;Q<BM.s;Q++)delete d[BM[Q]]},CL:y(Q,P){V B,A=Q.C6.toLowerCase();R(A=="C4")B=Q.Ck||Q.fromElement;f R(A="C2")B=Q.Ck||Q.toElement;f q l;q!B||B.prefix!="xul"&&!d.BU(P,B)&&B!==P},C_:y(){V Q=1.CI||1.getElementsByTagName("html")[L];d.$=("createTouch"T 1)||("ontouchstart"T r);d.supportsTransition=("WebkitTransition"T Q.n)||("MsTransition"T Q.n)||("MozTransition"T Q.n)||("OTransition"T Q.n)||("BK"T Q.n);d.Cw=d.$?"Cr":"mousedown";d.Cu=d.$?"touchmove":"mousemove";d.C3=d.$?"Cb":"mouseup";d.Bu=d.$?"Cr":"C4";d.Bt=d.$?"Cb":"C2";d.z=[["j","BX","o","4","5","_","Bi"],["a","BY","BP","8","9","6","Bd"]];d.BF=[k,k];d.Bk();d.3(r,"Bk",d.i(y(){Be(d.Cd);d.Cd=CU(d.i(d.Bk,d),c)},d),p);d.3(1,d.Cu,d.i(d.Ct,d),p);d.3(1,d.C3,d.i(d.B6,d),p);d.3(d.2,"touchcancel",d.i(d.B6,d),p);d.3(d.2,d.Bu,d.i(d.B7,d),p);d.3(d.2,d.Bt,d.i(d.B7,d),p);d.3(d.2,"mousewheel",d.i(d.CD,d),p);d.3(d.2,"DOMMouseScroll",d.i(d.CD,d),p)},C1:y(){R(d.u){d.W(d.2,{CE:"Bp"});CC(d.u.C0.s)d.2.7(d.u.Cf);d.2.removeChild(d.w);d.2.Bc=-d.ratio0*(d.2.5-d.2.4);d.2.Bo=-d.ratio1*(d.2.9-d.2.8);d.w=d.u=d._=d.6=d.Bi=d.Bd=k;d.W(d.2,{CE:"visible"})}},Bk:y(){d.C1();V P=0(d.W(d.2,"BO-j"))+0(d.W(d.2,"BO-BX")),B=0(d.W(d.2,"BO-a"))+0(d.W(d.2,"BO-BY")),C=d.2.offsetWidth-(0(d.W(d.2,"BC-j-o"))||L)-(0(d.W(d.2,"BC-BX-o"))||L)-d.2.4,D=d.2.offsetHeight-(0(d.W(d.2,"BC-a-o"))||L)-(0(d.W(d.2,"BC-BY-o"))||L)-d.2.8;d.4=d.2.4-P+C;d.8=d.2.8-B+D;d.5=d.2.5-P;d.9=d.2.9-B;d.u=d.U("BJ",{"BH":"touchscrollelement",n:";Bx:Bp;o:"+d.5+"S;BO:"+0(D/N)+"S "+0(C/N)+"S;Bh:Bs;a:-"+d.2.Bo+"S;j:-"+d.2.Bc+"S;"});d.w=d.U("BJ",{"BH":"touchscrollwrapper",n:";Bx:Bp;Bh:relative;o:c%;BP:"+d.8+"S;"});CC(d.2.C0.s)d.u.7(d.2.Cf);d.w.7(d.u);V A=";v:L;B$:Cj(v=L);Bh:Bs;Bx:Bp;-CX-BK:v BR m-b;-CO-BK:v BR m-b;-DA-BK:v BR m-b;-ms-BK:v BR m-b;BK:v BR m-b;",Q=";Bh:Bs;o:c%;BP:c%;a:L;j:L;background-B0:"+d.X.B0+";-CX-BC-B3:"+d.X.o+"S;-CO-BC-B3:"+d.X.o+"S;BC-B3:"+d.X.o+"S;";d._=d.U("BJ",{"BH":"touchscrollhorizontal",n:A});d.6=d.U("BJ",{"BH":"touchscrollvertical",n:A});d.Bi=d.U("BJ",{"BH":"CY horizontal",n:Q});d.Bd=d.U("BJ",{"BH":"CY vertical",n:Q});d._.7(d.Bi);d.6.7(d.Bd);d.w.7(d._);d.w.7(d.6);d.W(d._,{Ca:d.5>d.4?"Cy":"C7",o:d.4+"S",j:L,BY:L,BP:d.X.o+"S"});d.W(d.6,{Ca:d.9>d.8?"Cy":"C7",BP:d.8+"S",BX:L,a:L,o:d.X.o+"S"});d.2.7(d.w);d.9=g.BG(d.9,d.u.8);d.5=g.BG(d.5,d.u.4);d.x(L);d.x(M);d.3(d.w,d.Cw,d.i(d.Cv,d),p)},x:y(E,C){E=!!0(E)*M;V Q,F,H,P,D,I,A,J,B,G;J=d[d.z[E][CM]];Q=d[d.z[E][BL]];F=d[d.z[E][O]];H=g.BG(d.X.o,d.X.Ci);B=0(d.W(d.u,d.z[E][L]));G=Q==F?L:0(B/(Q-F)*Cx)/Cx;P=g.BG(0(F*F/Q),H);R(B>L){D=g.BG(d.X.o,P-B/F*P);I=L;A="Bg"}f R(B<=F-Q){D=g.BG(d.X.o,(Q+B)/F*P);I="Bg";A=L}f{D=P;I=-B/((Q-F)||M)*(F-D)+"S";A="Bg"}J.n[d.z[E][N]]=D+"S";J.n[d.z[E][L]]=I;J.n[d.z[E][M]]=A;d["ratio"+E]=G;R(C){d.W(d[d.z[E][CN]],{v:d.X.v});d.W(d[d.z[M-E][CN]],{v:L})}d.X.CV.BI(d,k)},B7:y(Q){Q=Q||r.BE;R(d.w&&(d.CL(Q,d.2)||d.$)){V A=Q.C6,P=L;B5(A){BQ d.Bu:P=d.X.v;d.B4=l;BB;BQ d.Bt:d.B4=p;BB;B_:q p}R(!d.Bn){d.W(d._,{v:P});d.W(d.6,{v:P})}}},Bl:y(P,Q){V H,G=40,E,B,F,C,A,D;F=L;H=0(d.W(d.u,d.z[P][L]));B=d[d.z[P][BL]]-d[d.z[P][O]];E=H+Q;R(E>L){R(E>G){Q=G-H;F=-G}f F=-E}f R(E<-B)R(E<-B-G){Q=-B-G-H;F=G}f F=-B-E;C=Bq*g.Y(Q)/(g.Y(Q)+g.Y(F));D=y(){d.Bv(P,F,Bq-C,"m-T-b")};d.Bv(P,Q,C,A,D)},scroll:y(P,Q){BA(V A=L;A<BM.s;A++)d.Bl(A,BM[A])},scrollTo:y(P,Q){d.W(d.u,{j:-P+"S",a:-Q+"S"});d.x(L);d.x(M)},Bv:y(F,D,H,B,I){V J=d,CQ=I||Z Ba(),Br=0(d.W(d.u,d.z[F][L])),Q=D,G=L,P=H||Bq,E=B||"m-b";y A(P,A,B,Q,C){V D;B5(C){BQ"m-T-b":R((P/=Q/N)<M)D=B/N*P*P*P+A;f D=B/N*((P-=N)*P*P+N)+A;BB;B_:D=-B*((P=P/Q-M)*P*P*P-M)+A;BB}q D}y C(){R(D&&G<P){G+=CS;J.u.n[J.z[F][L]]=A(G,Br,Q,P,E)+"S";J.BF[F]=CU(C,CS);J.x(F,l)}f{J.Bn=p;J.u.n[J.z[F][L]]=Br+D+"S";R(!J.B4&&!I){J.W(J._,{v:L});J.W(J.6,{v:L})}J.x(F);CQ.BI(J,k)}J.Bz("BF"+F)}d.Bn=l;Be(d.BF[F]);C()},Cv:y(Q){Be(d.BF[L]);Be(d.BF[M]);R(!d.$)d.BT(Q);d.u.Cn=k;V P=Q&&Q.BW||r.BE.srcElement;R(P.nodeType==O)P=P.parentNode;d.BW=P==d.w||P==d.u||d.BU(d.u,P)?L:M;d.BS=d.B9(Q);d.By=[0(d.W(d.u,"j")),0(d.W(d.u,"a"))];d.h=[[Z B2()],[d.BS]]},Ct:y(P){R(!d.h||P.Bf&&P.Bf.s>M||P.C9&&P.C9!==M)q;d.t=d.B9(P);V D=[d.t.BN-d.BS.BN,d.t.K-d.BS.K],C,B,A=M;R(BD d.e=="Ch")R(d.5>d.4&&g.Y(D[L])>=g.Y(D[M]))d.e=L;f R(d.9>d.8&&g.Y(D[M])>=g.Y(D[L]))d.e=M;f d.e=p;R(d.e===p)q;d.BT(P);d.Bn=l;B=d[d.z[d.e][BL]]-d[d.z[d.e][O]];R(d.BW){V Q=0(d.W(d[d.z[d.e][CM]],d.z[d.e][N]));A=-B/(d[d.z[d.e][O]]-Q)}C=d.By[d.e]+D[d.e]*A;R(C>L)C=C/(C/d[d.z[d.e][O]]+M);f R(C<-B){C=C+B;C=C/(g.Y(C)/d[d.z[d.e][O]]+M)-B}d.u.n[d.z[d.e][L]]=C+"S";d.x(d.e,l);d.h[L].CB(Z B2());d.h[M].CB(d.t)},B6:y(A){R(!d.h)q;R(BD d.e==="number"){V P,E,B,D,F,Q,C;P=L;C=d[d.z[d.e][BL]]-d[d.z[d.e][O]];E=0(d.W(d.u,d.z[d.e][L]));R(E>L)P=-E;f R(E<-C)P=-C-E;f R(!d.BW){B=Z B2();CC(d.h[L].s&&B-d.h[L][L]>CJ){d.h[L].Co();d.h[M].Co()}R(d.h[L].s){Q=B-d.h[L][L];D=[d.t.BN-d.h[M][L].BN,d.t.K-d.h[M][L].K];F=D[d.e];R(g.Y(F)>CR)P=(N-Q/CJ)*F}}R(d.X.C5.BI(d,d.e,P)!==p)d.Bl(d.e,P);d.u.Cn=Z Ba("q p;")}d.Bz("BS","t","h","e","BW","By")},CD:y(P){d.BT(P);P=P||r.BE;V C=P.wheelDelta||P.CW&&P.CW*-M||L,A=120,B=d.X.CK,Q;R(d.w&&C){Q=C/g.Y(C);d.Bl(B,Q*A)}}};r.TouchScroll=B8','y|0|1|2|3|_|$|if|px|in|$C|var|css|cfg|abs|new|top|out|100|this|flag|else|Math|disc|bind|left|null|true|ease|style|width|false|return|window|length|endPos|element|opacity|wrapper|refresh|function|property|parseInt|document|container|addListener|clientWidth|scrollWidth|verticalBar|appendChild|clientHeight|scrollHeight|horizontalBar|supportsTouches|for|break|border|typeof|event|timer|max|class|call|div|transition|4|arguments|x|padding|height|case|400ms|startPos|preventDefault|contains|_default|target|right|bottom|instances|Function|string|scrollLeft|verticalScrollBar|clearTimeout|touches|auto|position|horizontalScrollBar|Object|resize|_scroll|id|during|scrollTop|hidden|400|K|absolute|outEvent|overEvent|slide|body|overflow|elementRect|deleteAll|color|prototype|Date|radius|mouseEnter|switch|end|toggleShow|_$0|getPoint|default|filter|object|push|while|mouseScroll|visibility|clientTop|substring|pageXOffset|documentElement|200|mouseAlign|fixedMouse|6|5|moz|addEventListener|L|20|10|clientLeft|setTimeout|onscroll|detail|webkit|touchscrollbar|get|display|touchend|parseFloat|resizeTimer|set|firstChild|throw|undefined|minLength|alpha|relatedTarget|getComputedStyle|Error|onclick|shift|defaultView|cssFloat|touchstart|attachEvent|move|moveEvent|start|startEvent|1000|block|parseArgs|childNodes|clear|mouseout|endEvent|mouseover|ondrag|type|none|toString|scale|setup|i|o|t|8'.split('|'),185,194,{},{}))