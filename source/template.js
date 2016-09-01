xcard.template = (function() {
	'use strict';

	//登陆界面模版
	function login() {
		/*
		<div class="bg"></div>
			<div class="mask"></div>
			<section>
				<div class="image">
					<img src="image/xingCardLogo.png">
				</div>
				<div class="titleCon">
					<div class="line leftLine"></div>
					<div class="line rightLine"></div>
					<span>星名片v2.0</span>
				</div>
				<div class="formCon">
					<form>
						<div>
							<div class="title" id="title">社团/组织ID</div>
							<input type="text" id="login" placeholder="输入你的社团/组织ID">
							<div class="textLine"></div>
						</div>
						<div>
							<!--<input type="submit" value="登陆" id="submit" style="background-color:#1E90FF;width:71%;color:#fff">-->
								<img src="image/loginBtn.png" id="submit"/>
						</div>
					</form>
				</div>
			</section>
		</div>
		*/
		var loginHTML = '<section id="loginCon">'+
							'<div class="image">'+
								'<img src="image/xingCardLogo.png">'+
							'</div>'+
							'<div class="titleCon">'+
								'<div class="line leftLine"></div>'+
								'<div class="line rightLine"></div>'+
								'<span>星名片v2.0</span>'+
							'</div>'+
							'<div class="formCon">'+
								'<form action="api/index.php" method="post">'+
									'<div>'+
										'<div class="title" id="title">社团/组织ID</div>'+
										'<input type="text" id="login" placeholder="输入你的社团/组织ID">'+
										'<div class="textLine"></div>'+
									'</div>'+
									'<div>'+
										'<img src="image/loginBtn.png" id="submit"/>'+
									'</div>'+
								'</form>'+
							'</div>'+
						'</section>';
						
		return	loginHTML;
	}

	//侧边栏模版
	function contactGroup(groupData){
		console.log(groupData);
		var	contactGroupHTML = '<div class="icon">' +
									'<img src="image/xingCardLogo.png"/>' +
								'</div>' +
								'<ul class="departments" id="departments"><div id="contactGroupView">';
		for(var i = 0; i < groupData.departments.length; i++){
			contactGroupHTML += '<li class="department" groupIdx="' + i + '">' + groupData.departments[i].name + '</li>';
		}
		contactGroupHTML += '</div></ul><div class="logout" id="logout">注销</div>';
		return contactGroupHTML;
	}

	//联系人标题模版
	function contactHead () {
		var headHTML = 	'<div class="header">' +
							'<img src="image/button.png" id="groupBtn"/>' +
							'<span id="title">星空</span>' +
						'</div>' +
						'<div class="contactHeader">' +
							'<div class="contactNameIcon"></div>' +
							'<div class="contactNumIcon"></div>' +
							'<div class="contactMesIcon"></div>' +
						'</div>' +
						'<div class="contactBody" id="contactBody"><div id="contactBodyView"></div></div>';
		return headHTML;
	}

	//联系人主要内容模版
	function contactBody (groupData, groupIdx) {
		/*console.log(groupData)
		console.log(groupIdx)
		console.log(groupData.departments[groupIdx])*/
		var bodyHTML =  '';
			for(var i = 0; i < groupData.departments[groupIdx].members.length; i++){
				var phoneNum = groupData.departments[groupIdx].members[i].tel ? groupData.departments[groupIdx].members[i].tel : groupData.departments[groupIdx].members[i].phone;
				bodyHTML +=	'<div class="contactRow">';
				bodyHTML +=	'<div class="contactName">';
				bodyHTML +=	groupData.departments[groupIdx].members[i].username;
				bodyHTML +=	'</div>';
				bodyHTML +=	'<a class="contactNum" href="tel:'
				bodyHTML +=	phoneNum;
				bodyHTML +=	'">';
				bodyHTML +=	phoneNum;
				bodyHTML +=	'</a>';
				bodyHTML +=	'<a class="contactMes" href="sms:'
				bodyHTML +=	phoneNum;
				bodyHTML +=	'"><img src="image/message.png"></a></div>';
			}
		return bodyHTML;
	}
	
	function contactBodyError(){
		return '<div id="contactBodyView"></div>内部数据出错，请联系管理员处理，谢谢~~';
	}

	return {
		login: login,
		contactGroup: contactGroup,
		contactHead: contactHead,
		contactBodyError: contactBodyError,
		contactBody: contactBody
	};

})();