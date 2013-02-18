<?php require "functions.php"; ?>
<!DOCTYPE html><head>
	<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
	<meta name="viewport" content="width=device-width, user-scalable=no" />
	<link href="css/tbstyle.css" rel="stylesheet" media="all" type="text/css" />
    <script id="ccc" type="text/javascript" src="js/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="js/duopao.js"></script>
    <script type="text/javascript">
		Duopao(function(){
			
			Duopao('#ttt,#yyy').ready(function(){
				console.log(this.id+'+image ready')
			}).load(function(){
				console.log(this.id+'+image load')
				//$(this).remove();
			}).error(function(){
				console.log(this.id+'+image error')
			})

			rotate();
			function rotate(){
				Duopao('.uu').animate({left:'400px'},{speed:3000,complete:function(){
					Duopao('.uu').animate({left:'0px'},{speed:3000,complete:rotate}).animate({'rotate':'0deg'});
				}}).animate({'rotate':'360deg'});
			}
			
			console.log('ready-'+(+new Date));
			window.a=D('#dptb'),window.b=D('#tbdown');
			window.c=D('.test');
			var now=a.offset();
			Duopao('#topbar').drag(function(e){
				if(!e.status)now=a.offset();
				a.offset({top:now.top+e.distance.y,left:now.left+e.distance.x})
				return false;
			}).drag(function(e){
				console.log(this.id)
			});
			a.drag(function(e){
				console.log(this.id)
				Duopao(this).offset(e.offset);return false
			}).slip(function(e){
				console.log(e.direction)
			});
			Duopao('#yyy').drag(function(e){$(this).offset(e.offset);return false});
			function fn(e){
				console.dir(e)
				return false;
			}
			Duopao(document).load(function(){console.log('loaded-'+(+new Date))});//.load(function(){alert(8)}).load(function(){alert(9)});
			Duopao(document).ready(function(){Duopao(document).ready(function(){console.log(7777777)});console.log('windowReady-'+(+new Date))}).ready(function(){console.log('windowReady1-'+(+new Date))}).ready(function(){console.log('windowReady2-'+(+new Date))}).ready(function(){console.log('windowReady3-'+(+new Date))}).load(function(){console.log('windowloaded-'+(+new Date))});
			
			//自定义动画
			D({num:0}).animate({num:100},{step:function(){
				a.css('marginTop',this.num+'px')
			}})
		})
    </script>
	
<title>多泡js test</title>
</head>
<body style="background:#aaa;">
	<div id="dptb" style="-webkit-transform:translateY(-8px) rotate(0deg)">
    	<div id="topbar">
        	<h1 class="dplogo"><a href="#33">多泡游戏</a></h1>
            <div class="dploginarea">
                <a href="#" class="dplogin">登录</a>
                <a href="#" class="dpsign">注册</a>
                <a href="javascript:;" class="dpgame" id="dpgamebtn">多泡游戏<span></span></a>
            </div>
        </div>
        <div id="tbdown">
        	<div class="dpuc">
            	<a href="#">用户中心》</a>
            </div>
            <ul class="dpgamelist">
            	<li>
                	<a href="#" title="游戏名字">
                    	<section>
                        	<img src="tbimg/icon.jpg" />
                            <div class="dpcontent">
                            	<h3>光辉战纪</h3>
                                <div class="dpcat">战争策略</div>
                            </div>
                        </section>
                    </a>
                </li>
                <li>
                	<a href="#" title="游戏名字">
                    	<section>
                        	<img src="tbimg/icon.jpg" />
                            <div class="dpcontent">
                            	<h3>光辉战纪</h3>
                                <div class="dpcat">战争策略</div>
                            </div>
                        </section>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="a"><div class="a"></div></div>
    <input test="5" />
    <div class="test"><span>1</span></div>
    <div class="test uu"><span>2</span></div>
    <br/><br/><br/>
    <form id="form" action="">
    	<p><label>下拉选择</label>
            <select name="select">
                <option value="1">一</option>
                <option value="2">二</option>
                <option value="3">三</option>
                <option value="4">四</option>
            </select>
        </p>
        <p><input name="input1" value="434" /></p>
        <p><input name="input2" disabled value="434" /></p>
        <p><input value="434" /></p>
        <p><input name="input4" value="434" /></p>
        <p><label>单选</label>
        	<input type="radio" name="radio" value="1" />一
            <input type="radio" name="radio" value="2" />二
            <input type="radio" name="radio" value="3" />三
            <input type="radio" name="radio" value="4" />四
        </p>
        <p><label>多选</label>
        	<input type="checkbox" name="checkbox" value="1" />一
            <input type="checkbox" name="checkbox" value="2" />二
            <input type="checkbox" name="checkbox" value="3" />三
            <input type="checkbox" name="checkbox" value="4" />四
        </p>
        <p><input type="submit" value="提交" /></p>
    </form>
    <img id="ttt" src="http://www.planeart.cn/demo/imgReady/vistas24.jpg?s=<?php echo rand(10000,99999); ?>" />
    <img id="yyy" width="100" src="http://www.planeart.cn/demo/imgReady/vistas24.jpg?s=<?php echo rand(10000,99999); ?>" />
</body>
</html>