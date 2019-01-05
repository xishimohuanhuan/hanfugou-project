/* 写萌物库 */
require(["./requirejs.config"],function(){
	//引入需要依赖的模块
	require(["jquery","header","footer"],function(){
		
	})
})


$(function(){
	
	
	/* 价格或其他排序 */
	function Sort(){
		this.index=1;
		this.change();
	}
	Sort.prototype.change=function(){
		let _this=this;
		$("#pri-sort-wrap .pri-sort-left").on("click","a",function(){
			//换a标签的颜色样式
			$(this).addClass("ac").siblings().removeClass("ac");
		})
		$("#pri-sort-wrap .pri-sort-center").on("click","a",function(){
			//换a标签的颜色样式
			$(this).addClass("ac").siblings().removeClass("ac");
		})
		$("#pri-sort-wrap .pri-sort-right").on("click",".xian",function(){
			//换a标签的颜色样式
			if(++_this.index%2===0){
				$(this).children().addClass("ac");
			}else{
				$(this).children().removeClass("ac");
			}
		})
		$("#pri-sort-wrap .pri-sort-right").on("click",".zhe",function(){
			//换a标签的颜色样式
			if(++_this.index%2===0){
				$(this).children().addClass("ac");
			}else{
				$(this).children().removeClass("ac");
			}
		})
		
		
	}
	new Sort();
})