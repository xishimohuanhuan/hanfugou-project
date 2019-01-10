/* 写主页的js主入口  首页的业务逻辑 */
require(["./requirejs.config"],()=>{//首先引入模块的配置文件
	//引入index需要依赖的模块
	require(["ind-item","url","jquery","header","footer"],(item,url)=>{
		
		$(function(){
			//轮播图
			class Banner{
				constructor() {
					this.img=$("#banner-img li");
					this.btn=$("#btm-but li");
					this.index=0;
				    this.prev();
					this.next();
					this.Btn();
					this.timer();
				}
				//点击按钮切换
				Btn(){
					var _this=this;
					$("#btm-but").on("click","li",function(){
						$(this).addClass("ac").siblings().removeClass("ac");
						_this.img.eq(_this.index).removeClass("ac").stop().animate({opacity: 0});
						_this.img.eq($(this).index()).addClass("ac").stop().animate({opacity: 1});
						_this.index = $(this).index();
					})
				}
				prev(){//左边按钮
					$("#banner-prev").on("click",()=>{
						//移除上一个按钮的样式
						this.btn.eq(this.index).removeClass("ac");
						//切换图片
						this.img.eq(this.index).removeClass("ac").stop().animate({opacity: 0});
						//判断是否是第一个
						if(--this.index<0) this.index=this.btn.length-1;
						//给上一个按钮加上样式
						this.btn.eq(this.index).addClass("ac");
						this.img.eq(this.index).addClass("ac").stop().animate({opacity: 1});
					})
				}
				next(){//右边按钮
					$("#banner-next").on("click",()=>{
						//移除上一个按钮的样式
						this.btn.eq(this.index).removeClass("ac");
						//切换图片
						this.img.eq(this.index).removeClass("ac").stop().animate({opacity: 0});
						//判断是否是第一个
						if(++this.index > this.btn.length-1) this.index=0;
						//给上一个按钮加上样式
						this.btn.eq(this.index).addClass("ac");
						this.img.eq(this.index).addClass("ac").stop().animate({opacity: 1});
					})
				}
				//开个定时器
				timer(){
					let timer = null;
						$("#banner-wrap").hover(function(){
							clearInterval(timer);
						}, (function autoPlay(){
							timer = setInterval(() => {
								$("#banner-next").trigger("click");
							},2000);
							return autoPlay;
						})());
				}
			}
			new Banner();
			
			
			/* item1.init(); */
			
		/* 本周热卖 */
		item.init(url.baseUrlRap+"/ind-ite");
		
		$.ajax({
			url:url.baseUrlRap+"/detail-item",
			type:"get",
			success:function(res){
				if(res.res_code===1){
					let list =res.res_body.data;
					$(".main-wrap-hot-brand li img").attr("src",list.img);
					
				}
			}
		})
		
		
	});
	
});
})



