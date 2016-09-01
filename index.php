
	<!DOCTYPE html>
	<html manifest="offline.manifest.php">

	<head>
		<meta charset="utf-8">
		<title>
			星名片
		</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-touch-fullscreen" content="yes">
		<link rel="apple-touch-icon-precomposed" href="image/xingCardLogo.png">
		<link rel="apple-touch-icon" href="image/xingCardLogo.png">
		<!-- <link rel="stylesheet" href="css/index.css"> -->
		<script type="text/javascript">
			var xcard = {};
			window.onload = function(){
				//var container = document.getElementById('container');
				//xcard.controler.initPage(container,xcard.template.login());

				var APP_START_FAILED = "error, can't lauch right now";

				if(navigator && navigator.onLine === false){
					startWithOfflineResources();
				}else{
					ajaxLoader({
						url: 'api/init.php',
						type: 'post',
						dataType: 'json',
						success: startWithOnlineResources,
						error: startWithOfflineResources
					})
				}
				
				function startWithResources(resources, storeResources){
					
					try{
						//eval(resources.js);	
						insertScript(resources.js);
						setTimeout(function(){
							var isLogin = true;
							xcard.controler.initPage(resources, storeResources, isLogin);
						},100);
					}catch(e){
						alert(APP_START_FAILED);
						console.log('%o',e);
					}
				}

				function startWithOnlineResources(resources){
					console.log('startWithOnline')
					console.log(resources.js)
					startWithResources(resources, true);
				}

				function startWithOfflineResources(){
					var resources;

					if(localStorage && localStorage.resources){
						resources = JSON.parse(localStorage.resources);
						startWithResources(resources);
					}else{
						alert(APP_START_FAILED);
					}
				}

				function insertScript(script){
					var scriptNode = document.createElement('script');
					scriptNode.innerHTML = script;
					document.head.appendChild(scriptNode);
				}

				function ajaxLoader(options){
			        options = options || {};
			        options.type = (options.type || "GET").toUpperCase();
			        options.dataType = options.dataType.toLowerCase() || "json";
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
			                	var responseData = null;
			                	if(options.dataType === 'json'){
			                		responseData = JSON.parse(xhr.responseText);
			                	}else if(options.dataType === 'xml'){
			                		responseData = xhr.responseXML;
			                		console.log('response data type was xml, please add the xml reader, now return the original datatype');
			                	}else{
			                		 responseData = xhr.responseText;
			                	}
			                    //options.success && options.success(xhr.responseText, xhr.responseXML);
			                    options.success && options.success(responseData);
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
			}

			
		</script>
		<!--
		<script src="source/template.js"></script>
		<script src="source/animation.js"></script>
		<script src="source/controler.js"></script>
		<script src="source/contacts.js"></script>
		-->
	</head>
	<body id="body">
		<div class="bg" id="bg"></div>
		<div class="mask" id="mask"></div>
		<div class="container" id="container">
			<!--<a href="tel:10086">10086</a>-->
			<!--
			<div class="header">
				<img src="image/button.png" id="groupBtn"/>
				<span id="title">星空</span>
			</div>
			<div class="contactHeader">
				<div class="contactNameIcon"></div>
				<div class="contactNumIcon"></div>
				<div class="contactMesIcon"></div>
			</div>
			<div class="contactBody" id="contactBody">
				<div id="contactBodyView">
					<div class="contactRow">
						<div class="contactName">秒卡看</div>
						<div class="contactNum">13527057366</div>
						<div class="contactMes"><img src="image/message.png"></div>
					</div>
				</div>
			</div>
			-->
		</div>
		
		<div id="contactGroupMask"></div>
		<div class="sideBar" id="sideBar" data="show">
				<!--<div class="icon">
					<img src="image/xingCardLogo.png"/>
				</div>
				<ul class="departments" id="departments">
					<div id="contactGroupView">
						<li class="department">星空常委</li>
						<li class="department">运营策划中心</li>
						<li class="department">文化传媒中心技术研研</li>
						<li class="department">技术研发中心</li>
						<li class="department">技术研发中心</li>
						<li class="department">技术研发中心</li>
						<li class="department">技术研发中心</li>
						<li class="department">技术研发中心</li>
					</div>
				</ul>
				<div class="logout">注销</div>
				-->
		</div>
		
	</body>
	<!-- 
	<script type="text/javascript">
		var login = document.getElementById('login');
		var submit = document.getElementById('submit');
		var date = new Date();
		var expireDays = 30;

		setTimeout(function(){
			var container = document.getElementById('container');
			container.style.height = window.innerHeight + 'px';
			
		}, 1000)
		var title = document.getElementById('title');

		login.onfocus = function(){
			title.style.top = 0;
		}
		login.onblur = function(){
			title.style.top = 10 + 'px';	
		}
		
		if (getCookieValue() != "") {
			window.location.href = "./Xingcard.php";
		} 
		 
		//将date设置为10天以后的时间
		date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000);
		 //将userId和userName两个cookie设置为10天后过期
		submit.onclick = function() {
			var pw = "www.xingkong.us=" + login.value + "; expires=" + date.toGMTString();
			document.cookie = pw;
			window.location.href = "./Xingcard.php";
			return false;
		}

		function getCookieValue() {
			var strCookie = document.cookie;
			var arrCookie = strCookie.split("; ");
			for (var i = 0; i < arrCookie.length; i++) {
				var arr = arrCookie[i].split("=");
				if ("www.xingkong.us" == arr[0]) {
					return arr[1];
				}
			}
			return "";
		}
	</script>
 -->
<!--
 <script type="text/javascript">
 	var con = document.getElementById('view');
 	var contactBody = document.getElementById('contactBody');
 	var view = document.getElementById('view');
	var viewH = contactBody.offsetHeight - view.offsetHeight;
 	console.log(viewH)
	
	
	

	
	con.addEventListener('touchstart', startHandler,false);
	con.addEventListener('touchmove', moveHandler,false);
	con.addEventListener('touchend', endHandler,false);
 </script>
-->
<!--
<script>
	var b = document.getElementById('sideBar');
	var a = document.getElementById('contactGroupMask');
	var groupView = document.getElementById('contactGroupView');
	a.onclick = function(){
		if(b.getAttribute('data') == 'show'){
			b.style.left = "-100%";
			b.setAttribute('data','hidden');
			groupView.style.webkitTransform = 'translate3d(0, 0, 0)';
		}else{
			b.style.left = "0";
			b.setAttribute('data','show');
		}
	}
	
	var startX, startY, offsetX, offsetY;
	var statusX = statusY = 0;
	var startTime, endTime;
	
	var departments = document.getElementById('departments');
	console.log(groupView.clientHeight)
	console.log(departments)
	var viewH = departments.clientHeight - groupView.clientHeight;
	console.log(viewH)
	
	function startHandler(e){
		startX = e.touches[0].pageX;
		startY = e.touches[0].pageY;
		offsetX = offsetY = 0;
		startTime = new Date();
	}
	
	function moveHandler(e){
		e.preventDefault();
		offsetX = e.targetTouches[0].pageX - startX;
		offsetY = e.targetTouches[0].pageY - startY;
		groupView.style.webkitTransform = 'translate3d(0, '+ (statusY + offsetY) +'px, 0)';
	}
	
	function endHandler(e){
		e.preventDefault();
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
			b.style.left = "-100%";
			b.setAttribute('data','hidden');
			groupView.style.webkitTransform = 'translate3d(0, 0, 0)';
		}
	}
	
	groupView.addEventListener('touchstart', startHandler,false);
	groupView.addEventListener('touchmove', moveHandler,false);
	groupView.addEventListener('touchend', endHandler,false);
</script>-->

	</html>