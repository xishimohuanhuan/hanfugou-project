/* 主页的接口 */
define(["jquery","template"],($,template)=>{
	function Item(){
		
	}
	Item.prototype.init=function(url){
		/* init不能直接在这里调，他没有写死后面需要渲染要请求了后才调 */
		console.log(url);
		//load
		new Promise((resolve,reject)=>{
			$("#main-wrap-ite").load("/html/component/detail-item.html",()=>{
				resolve();
			});
		}).then(()=>{
			$.ajax({
				url:url,
				type:"get",
				success:function(res){
					if(res.res_code===1){
						let list =res.res_body.data;
						console.log(list);
						let html=template("dlist-template",{list:list});
						$("#main-wrap-ite").html(html);
					}
				}
			})
		})
	}
	return new Item();
})
