//写头部的js
define(["jquery","cookie"],()=>{
	//写header的功能
	class Header{
		constructor() {
		    this.init();
		}
		init(){//初始化 加载header.html
		/* $("header").load("/html/component/header.html",()=>{
			
		}) */
		new Promise((resolve,reject)=>{
			//引入header.html
			$("header").load("/html/component/header.html",()=>{
				resolve();
			})
		}).then(()=>{
				this.login();
				this.nav();
				this.exit();
			});
			
		}
		nav(){
				/* alert($(this).html()); */
				$("#nav-li").on("click","a",function(e){
					$("#nav-li li a").each(function(i,item){
						let a=$(item).removeClass("a-hov").css("href");
						/* console.log(a); */
					})
					$(this).addClass("a-hov");
					/* e.preventDefault(); */
				})
		}
		/* 判断是否登录 */
		login(){
			if($.cookie("username")){
				$("#name").html("您好:"+$.cookie("username"));
				$("#tuic").html("退出");
				$("#tuic")[0].href="/";
				
			}
		}
		//退出
		exit(){
			$("#tuic").on("click",function(){
				if(confirm("确定退出？")){
					$.cookie("username","",{expires:-1,path: "/"});
					location.href="/";
				}
			})
		}
	}
	return new Header;//返回到
})