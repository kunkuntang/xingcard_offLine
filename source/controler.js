xcard.controler = (function  (argument) {
	'use strict'

	//封装JS原装Ajax方法
	function ajaxLoader(options){
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data);

        //创建 - 非IE6 - 第一步
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else { //IE6及其以下版本浏览器
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //接收 - 第三步
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.error && options.error(status);
                }
            }
        }

        //连接 和 发送 - 第二步
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            //设置表单提交时的内容类型
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
    
	    //格式化参数
	    function formatParams(data) {
	        var arr = [];
	        for (var name in data) {
	            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
	        }
	        arr.push(("v=" + Math.random()).replace(".",""));
	        return arr.join("&");
	    }
	}

	//添加事件监听方法
	function addEvent(obj, type, cb){
		if(obj.addEventListener){
			obj.addEventListener(type,cb,false);
		}else if(obj.attachEvent){
			obj.attachEvent('on' + type, cb);
		}
	}
	
	//取消事件监听方法
	function disableEvent(obj, type, cb){
		if(obj.removeEventListener){
			obj.removeEventListener(type, cb);
		}else if(obj.detach){
			obj.detachEvent('on' + type, cb);
		}
	}
	
	//联系人板块模拟滚动触控方法
	function contactBodyWiper(obj, viewH){
		var startY;
		var offsetY;
		var statusY = 0;
		function startHandler(e){
			startY = e.touches[0].pageY;
			//startY = e.changedTouches[0].pageY;
			offsetY = 0;
		}
		
		function moveHandler(e){
			e.preventDefault();
			offsetY = e.targetTouches[0].pageY - startY;
			//offsetY = e.changedTouches[0].pageY - startY;
			obj.style.webkitTransform = 'translate3d(0, '+ (statusY + offsetY) +'px, 0)';
		}
		
		function endHandler(e){
			//e.preventDefault();
			statusY += offsetY;
			if(statusY > 0 || viewH > 0){
				statusY = 0;
			}else if(statusY < viewH){
				statusY = viewH;
			}
			console.log(viewH)
			obj.style.webkitTransform = 'translate3d(0, '+ statusY +'px, 0)';
		}
		
		xcard.controler.addEvent(obj,'touchstart',startHandler);
		xcard.controler.addEvent(obj,'touchmove',moveHandler);
		xcard.controler.addEvent(obj,'touchend',endHandler);
	}

	//组别板块模拟滚动触控方法
	function contactGroupWiper(sideBar, groupView, groupMask, viewH){
	
		var startX, startY, offsetX, offsetY;
		var statusX,statusY;
		statusX = statusY = 0;
		var startTime, endTime;
		var departments = document.getElementById('departments');
		//console.log(viewH)
		
		function startHandler(e){
			startX = e.touches[0].pageX;
			startY = e.touches[0].pageY;
			offsetX = offsetY = 0;
			startTime = new Date();
		}
		
		function moveHandler(e){
			//e.preventDefault();
			offsetX = e.targetTouches[0].pageX - startX;
			offsetY = e.targetTouches[0].pageY - startY;
			groupView.style.webkitTransform = 'translate3d(0, '+ (statusY + offsetY) +'px, 0)';
		}
		
		function endHandler(e){
			//e.preventDefault();
			statusY += offsetY;
			if(offsetY > 0){
				statusY = 0;
			}else if(statusY < viewH){
				statusY = viewH;
			}
			groupView.style.webkitTransform = 'translate3d(0, '+ statusY +'px, 0)';
			console.log(offsetX);
			endTime = new Date() - startTime;
			console.log(endTime)
			if(endTime < 500 && offsetX < 0 && offsetX < -35){
				sideBar.style.left = "-100%";
				sideBar.setAttribute('data','hidden');
				groupView.style.webkitTransform = 'translate3d(0, 0, 0)';
				groupMask.style.display = 'none';
			}
		}
		xcard.controler.addEvent(groupView, 'touchstart', startHandler);
		xcard.controler.addEvent(groupView, 'touchmove', moveHandler);
		xcard.controler.addEvent(groupView, 'touchend', endHandler);
	}
	
	
	function addDepartmentsClick(departments, switchDepartment, data, sideBar, groupView, groupMask){
		for(var i = 0; i < departments.length; i++){
			xcard.controler.addEvent(departments[i], 'click', function(){
				switchDepartment(data, this.getAttribute('groupIdx'), sideBar, groupView, groupMask);
			});
		}
	}
	
	function switchDepartment(data, index, sideBar, groupView, groupMask){
		xcard.controler.refreshContactBody('contactBodyView', data, index);
		xcard.controler.hiddeContactGroup(sideBar, groupView, groupMask);
	}
	
	//登陆出错提醒方法
	function loginError(){
		try{
			var contactData = JSON.parse(localStorage.contactData);
			xcard.controler.initContactPage(contactData);
		}catch(e){
			alert('login failed!! you are offLine, please try later');
			console.log('locate at loginError width error: ' + e );	
		}
	}
	
	//判断是否正确登陆方法
	function judgeLogin (data){
		var loginName = document.getElementById('login').value;
		var sendData = {
			url: 'api/index.php',
			type: 'post',
			dataType: 'json',
			data: {key: loginName},
			success: xcard.controler.initContactPage,
			error: xcard.controler.loginError
		}
		xcard.controler.ajaxLoader(sendData);
	}
	
	//初始化页面方法
	function initContactPage(data){
		//console.log(data)
		var container = document.getElementById('container');
		var loginCon = document.getElementById('loginCon');
		var sideBar = document.getElementById('sideBar');
		var groupMask = document.getElementById('contactGroupMask');
		loginCon.remove()
		
		//container.removeChild(container.lastChild);
		xcard.controler.renderContactHead(container);
		xcard.controler.refreshContactBody('contactBodyView',data, 0);
		xcard.controler.renderContactGrop(sideBar, data, groupMask);
		
		var groupBtn = document.getElementById('groupBtn');
		
		xcard.controler.addEvent(groupBtn,'click',function(){
			xcard.controler.showContactGroup(sideBar, groupMask);
		});
		
		var groupView = document.getElementById('contactGroupView');
		xcard.controler.contactGroupWiper(sideBar, groupView);
		
		var departments = document.getElementById('departments');
		var groupViewH = departments.clientHeight - groupView.clientHeight;
		xcard.controler.contactGroupWiper(sideBar, groupView, groupMask, groupViewH);
		xcard.controler.addEvent(contactGroupMask, 'click', function(){
			xcard.controler.hiddeContactGroup(sideBar, groupView, groupMask);
		});
		var departments = groupView.getElementsByTagName('li');
		xcard.controler.addDepartmentsClick(departments, xcard.controler.switchDepartment, data, sideBar, groupView, groupMask);
		
		//添加本地缓存
		localStorage.contactData = JSON.stringify(data);
	}

	function refreshContactBody (obj, data, idx) {
		var contactBody = document.getElementById('contactBody');
		contactBody.innerHTML = '<div id="contactBodyView"></div>';
		var conView = document.getElementById(obj);
		
		var jsonData = JSON.parse(data);
		try{
			conView.innerHTML = xcard.template.contactBody(jsonData, idx);
			//一定要在ContactBody渲染后才计算ViewH的值
			var viewH = contactBody.offsetHeight - conView.offsetHeight;
			xcard.controler.contactBodyWiper(conView,viewH);
		}catch(e){
			contactBody.innerHTML = xcard.template.contactBodyError();
		}
	}

	function renderContactGrop (sideBar, data, groupMask) {
		var jsonData = JSON.parse(data);
		sideBar.innerHTML = xcard.template.contactGroup(jsonData);
		var logoutBtn = document.getElementById('logout');
		xcard.controler.addEvent(logoutBtn, 'click', function(){
			xcard.controler.logout();
			xcard.controler.logoutContactGroup(sideBar, groupMask);
		});
	}
	
	function showContactGroup(sideBar, groupMask){
		sideBar.style.left = 0;
		sideBar.setAttribute('data','show');
		groupMask.style.display = 'block';
	}
	
	function hiddeContactGroup(sideBar, groupView, groupMask){
		if(sideBar.getAttribute('data') == 'show'){
			sideBar.style.left = "-100%";
			sideBar.setAttribute('data','hidden');
			groupView.style.webkitTransform = 'translate3d(0, 0, 0)';
			groupMask.style.display = 'none';
		}
	}
	
	function logoutContactGroup(sideBar, groupMask){
		sideBar.innerHTML = '';
		sideBar.style.left = '-100%';
		groupMask.style.display = 'none';
	}
	
	function renderContactHead (obj) {
		obj.innerHTML = xcard.template.contactHead();
	}
		
	//页面初始化：渲染页面和空间事件绑定
	function initPage(resources, storeResources, isLogin){
		//init
		var container = document.getElementById('container');
		container.innerHTML = xcard.template.login();
		var loginBtn = document.getElementById('submit');
		var loginInput = document.getElementById('login');
		xcard.controler.addEvent(loginBtn, 'click', xcard.controler.judgeLogin);
		xcard.controler.addEvent(loginInput, 'click', function(){
			console.log('onfocus')
			setTimeout(function(){
				window.scrollTo(0,100);
			}, 500);
		});

		if(isLogin){
			var cssNode = document.createElement('style');
			cssNode.innerHTML = resources.css;
			document.head.appendChild(cssNode);
		}

		if(storeResources){
			localStorage.resources = JSON.stringify(resources);
		}
	}

	function logout(){
		xcard.controler.initPage(null, false, false);
	}

	return {
		logout: logout,
		initPage: initPage,
		addEvent: addEvent,
		disableEvent: disableEvent,
		loginError: loginError,
		judgeLogin: judgeLogin,
		ajaxLoader: ajaxLoader,
		initContactPage: initContactPage,
		contactBodyWiper: contactBodyWiper,
		contactGroupWiper: contactGroupWiper,
		showContactGroup: showContactGroup,
		hiddeContactGroup: hiddeContactGroup,
		logoutContactGroup: logoutContactGroup,
		addDepartmentsClick: addDepartmentsClick,
		switchDepartment: switchDepartment,
		renderContactGrop: renderContactGrop,
		renderContactHead: renderContactHead,
		refreshContactBody: refreshContactBody
		
	}
})();