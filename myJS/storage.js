var storeLocalData=function(key, value) {
    try {
        //�����Ż�ȡ��localStorage������
        var storage=window.localStorage || window.globalStorage && window.globalStorage[location.hostname];
        if (storage){//�����ȡlocalStorage����ɹ���˵�������֧��localStorage
            if (value !== undefined)//�������value����ʾ��Ҫ���ô洢����
                value == "" ? storage.removeItem(key) : storage[key] = value;
            else if (key !== undefined)//����keyֵ���ͷ�����Ӧ�Ĵ洢ֵ
                return storage[key] || "";
            else throw new Error();//�׳��쳣��ʹ�����������������洢����
        }else if (/MSIE/i.test(navigator.userAgent)) {//ȷ����IE��IE����ʹ��userData�洢
            var userData = document.getElementById('userData') || document.createElement('input');//���Ų��ҡ�userData������ڵ㣬û�оͿ�ʼ����
            if (!userData.id) {//û��IDֵ��˵��ҳ�����޴˽ڵ�
                userData.id="userData";
                userData.style.display='none';
                userData.style.behavior='url(#default#userData)';//behavior:url(#default#userData)'��ʾ����user Data�洢
                document.body.appendChild(userData);//���ص�ҳ����
            }
            try {
                userData.load("oXMLBranch")//��������洢������
            } catch(e) {}
            if (value !== undefined) {//����ͬ���棬��ʵҲ��ͨ��value�ж���������ֵ���Ƿ��ش洢��ֵ
                value == "" ? userData.removeAttribute(key) : userData.setAttribute(key, value);
                userData.save("oXMLBranch");//����
            }else if (key !== undefined)//����keyֵ���ͷ�����Ӧ�Ĵ洢ֵ
               return userData.getAttribute(key) || "";
           else throw new Error();//�׳��쳣��ʹ�����������������洢����
        } else return false;//����ʧ��
        return true;//���óɹ�
    } catch(e) {//���������׳��Ĵ���
       if(storage){
            storage.clear();//ʹ��W3C�ķ�������洢
        } else if (userData) {
            var attrs = userData.xmlDocument.firstChild.attributes, i;
            while(i = attrs.length){//ѭ�����xml�ļ����ÿ�������ﱣ���ֵ
                var j = attrs[--i].nodeName;
                userData.removeAttribute(j);
            }
            userData.save("oXMLBranch");
        }
    }
}