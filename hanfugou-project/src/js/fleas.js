require(["./requirejs.config"],function(){
	//引入需要依赖的模块
	require(["item1","url","jquery","header","footer"],function(item,url){
		 item.init(url.baseUrlRap+"/ind-list");
	})
})
