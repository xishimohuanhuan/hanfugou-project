//写头部的js
define(["jquery","cookie"],()=>{
	//写header的功能
	class Header{
		constructor() {
			
		    this.init();
		}
		init(){//初始化 加载header.html
		new Promise((resolve,reject)=>{
			//引入header.html
			$("header").load("/html/component/header.html",()=>{
				resolve();
			})
		}).then(()=>{
				this.login();
				this.nav();
				/* this.exit(); */
			});
		}
		nav(){
				
				/* if(n){
					console.log(n); */
						/* $("#nav-li li a").each(function(i,item){
							$(item).removeClass("a-hov").css("href");
						}) */
					/* $("#nav-li li").eq(n).children().addClass("a-hov"); */
					/* console.log($("#nav-li")[0]); */
				/* }else{
					console.log(3); */
					$("#nav-li").on("click","a",function(e){
						$("#nav-li li a").each(function(i,item){
							let a=$(item).removeClass("a-hov").css("href");
						})
						$(this).addClass("a-hov");
					})
				/* } */
				
		}
		/* 判断是否登录 */
		login(){
			if($.cookie("username")){
				$("#name").html("您好:"+$.cookie("username"));
				$("#tuic").html("退出").addClass("exi");
				$("#tuic")[0].href="/";
				this.exit();
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