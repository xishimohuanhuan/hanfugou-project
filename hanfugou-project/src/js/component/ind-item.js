/* 主页的接口 */
define(["jquery","template"],($,template)=>{
	function Item(){
		
	}
	Item.prototype.init=function(url){
		/* init不能直接在这里调，他没有写死后面需要渲染要请求了后才调 */
		console.log(url);
		//load
		new Promise((resolve,reject)=>{
			$("#ind-itep").load("/html/component/ind-item.html",()=>{
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
						$("#ind-itep").html(html);
						$("#ind-itep2").html(html);
						$("#ind-itep3").html(html);
					}
				}
			})
		})
	}
	return new Item();
})