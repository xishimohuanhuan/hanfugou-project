//写头部的js
define(["jquery"],()=>{
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
				this.nav();
			});
			
		}
		nav(){
				/* alert($(this).html()); */
				$("#nav-li").on("click","a",function(e){
					$("#nav-li li a").each(function(i,item){
						$(item).removeClass("a-hov");
					})
					$(this).addClass("a-hov");
					e.preventDefault();
				})
		}
	}
	return new Header;//返回到
})