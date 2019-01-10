/* 列表页的接口 */
define(["jquery","template"],($,template)=>{
	function Item(){
		
	}
	Item.prototype.init=function(url){
		/* init不能直接在这里调，他没有写死后面需要渲染要请求了后才调 */
		/* console.log(url); */
		//load
		new Promise((resolve,reject)=>{
			$("#xuanrqan-tem").load("/html/component/item1.html",()=>{
				resolve();
			});
		}).then(()=>{
			$.ajax({
				url:url,
				type:"get",
				success:function(res){
					if(res.res_code===1){
						let list =res.res_body.data;
						let html=template("list-template",{list:list});
						$("#xuanrqan-tem").html(html);
						$("#xuanrqan-tem2").html(html);
						$("#xuanrqan-tem3").html(html);
					}
				}
			})
		})
		
		
	}
	return new Item();
})