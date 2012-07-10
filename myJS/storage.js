var storeLocalData=function(key, value) {
    try {
        //先试着获取对localStorage的引用
        var storage=window.localStorage || window.globalStorage && window.globalStorage[location.hostname];
        if (storage){//如果获取localStorage对象成功，说明浏览器支持localStorage
            if (value !== undefined)//如果存在value，表示是要设置存储操作
                value == "" ? storage.removeItem(key) : storage[key] = value;
            else if (key !== undefined)//存在key值，就返回相应的存储值
                return storage[key] || "";
            else throw new Error();//抛出异常，使代码流跳到最后清除存储部分
        }else if (/MSIE/i.test(navigator.userAgent)) {//确保是IE，IE才能使用userData存储
            var userData = document.getElementById('userData') || document.createElement('input');//试着查找‘userData’这个节点，没有就开始创建
            if (!userData.id) {//没有ID值就说明页面上无此节点
                userData.id="userData";
                userData.style.display='none';
                userData.style.behavior='url(#default#userData)';//behavior:url(#default#userData)'表示开启user Data存储
                document.body.appendChild(userData);//加载到页面中
            }
            try {
                userData.load("oXMLBranch")//尝试载入存储的数据
            } catch(e) {}
            if (value !== undefined) {//这里同上面，其实也是通过value判断是设置新值还是返回存储的值
                value == "" ? userData.removeAttribute(key) : userData.setAttribute(key, value);
                userData.save("oXMLBranch");//保存
            }else if (key !== undefined)//存在key值，就返回相应的存储值
               return userData.getAttribute(key) || "";
           else throw new Error();//抛出异常，使代码流跳到最后清除存储部分
        } else return false;//操作失败
        return true;//设置成功
    } catch(e) {//捕获到上面抛出的错误
       if(storage){
            storage.clear();//使用W3C的方法清除存储
        } else if (userData) {
            var attrs = userData.xmlDocument.firstChild.attributes, i;
            while(i = attrs.length){//循环清除xml文件里的每个属性里保存的值
                var j = attrs[--i].nodeName;
                userData.removeAttribute(j);
            }
            userData.save("oXMLBranch");
        }
    }
}