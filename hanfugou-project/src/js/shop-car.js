/* 购物车 */
require(["./requirejs.config"],()=>{//首先引入模块的配置文件
	//引入index需要依赖的模块
	require(["jquery","header","footer"],()=>{
		$(function(){
			/* 获取cookie */
			class Caradd{
				constructor() {
				    this.cookIe=JSON.parse($.cookie("dataname"));
					this.init();
					this.addsub();
					this.deletesh();
					this.mintotal();
					this.addzong();
					this.clear();
					
				}
				init(){
					let str="";
					/* 拼接 */
					$(this.cookIe).each((i,item)=>{
						if(item.flag){
							str +=`<div class="car-wrap">
									<div class="car-box1"></div>
									<div class="car-box2">
										<img src=${item.imgsrc} alt="">
										<span class="car-title"><a href="##">${item.name}</a></span>
										<div class="car-siz"><span>size:</span><span>${item.size}</span></div>
									</div>
									<div class="car-box3">
										<i>￥</i>
										<span>${item.pric}</span>
									</div>
									<div class="car-box4">
										<div class="aa-inp" data-idd=${item.id}>
											<a href="##" class="aa1" >-</a>
											<input class="updainp" data-idd=${item.id} type="text" value="${item.num}"/>
											<a href="##" class="aa2">+</a>
										</div>
									</div>
									<div class="car-box5">
										<i>￥</i>
										<span data-idd=${item.id}>123</span>
									</div>
									<div class="car-box6">
										<a href="##"  class="car-det" data-idd=${item.id}>删除</a>
									</div>
								</div>`;
						}
					})
					$("#car-shop").html(str);
					this.update();
				}
				/* 加加减减 */
				addsub(){
					let _this=this;
					let objj={};
					$("#car-shop").on("click",".aa1",function(){
						let inpval=$(this).siblings("input").val();
						let aid=$(this).parent().attr("data-idd");
						--inpval;
						if(inpval<=0){
							$(this).siblings("input").val("1");
							inpval=1;
						}else{
							$(this).siblings("input").val(inpval);
						}
						addcookie(aid,inpval,this);
					})
					$("#car-shop").on("click",".aa2",function(){
						let inpval=$(this).siblings("input").val();
						let aid=$(this).parent().attr("data-idd");
						++inpval;
						$(this).siblings("input").val(inpval);
						addcookie(aid,inpval,this);
					})
					var addcookie=function(idd,numm,nan){
						let _thi=nan;
						let bbj={};
						bbj.id=idd;
						bbj.num=numm;
						for(let j=0;j<_this.cookIe.length;j++){
							if(_this.cookIe[j].id==bbj.id){
								_this.cookIe[j].id=bbj.id;
								_this.cookIe[j].num=bbj.num;
								_this.cookIe[j].mintot=(bbj.num * _this.cookIe[j].pric).toFixed(2);
								var spann=$(_thi).parent().parent().parent().children(".car-box5").children("span");
								spann.html(_this.cookIe[j].mintot);
							}
						}
						$.cookie("dataname",JSON.stringify(_this.cookIe),{path:"/"});
						_this.addzong();
					}
				}
				/* 当手动输入数量的时候 */
				update(){
					let _this=this;
					/* input框失去焦点 */
					$("#car-shop .updainp").on("blur",function(){
						/* 判断输入的内容 */
						if(parseInt($(this).val()) && parseInt($(this).val())==$(this).val()){
							
							let idd=$(this).attr("data-idd")
							let num=$(this).val();
							/* 存 cookie*/
							let inpcook=JSON.parse($.cookie("dataname"));
							$(inpcook).each((i,item)=>{
								if(item.id==idd){
									item.num=num;
								}
							})
							$.cookie("dataname",JSON.stringify(inpcook),{path:"/"});
							_this.mintotal();
							_this.addzong();
						}else{
							window.location.href="/html/shop-car.html";
						}
					})
					
				}
				/* 小计 */
				mintotal(){
					let coohi=JSON.parse($.cookie("dataname"));
					for(let j=0;j<coohi.length;j++){
						$("#car-shop .car-box5 span").each((i,item)=>{
							$(item).html(function(){
								if($(item).attr("data-idd")==coohi[j].id){
									coohi[j].mintot=(coohi[j].num * coohi[j].pric).toFixed(2);
									return (coohi[j].num * coohi[j].pric).toFixed(2);
								}
							});
						})
					} 
					$.cookie("dataname",JSON.stringify(coohi),{path:"/"});
					
				}
				
				/* 价格汇总 */
				addzong(){
					let jcookie=JSON.parse($.cookie("dataname"));
					let nuum=0;
					$(jcookie).each(function(i,item){
						
						if(item.flag){
							nuum +=Number(item.mintot);
						}
					})
					
					$(".car-close .total-price").html(nuum.toFixed(2));
				}
				/* 删除商品 */
				deletesh(){
					let _this=this;
					$("#car-shop").on("click",".car-det",function(){
						if(confirm("是否删除？")){
							var iid=$(this).attr("data-idd");
							for(let j=0;j<_this.cookIe.length;j++){
								if(_this.cookIe[j].id==iid){
									_this.cookIe[j].id=iid;
									_this.cookIe.splice(j,1);
									$(this).parent().parent().remove();
									break;
								}
							}
							$.cookie("dataname",JSON.stringify(_this.cookIe),{path:"/"});
							_this.addzong();
						}
						
					})
				}
				/* 结算 判断是否登录 */
				clear(){
					$("#add-price-clear").on("click",function(){
						/* 判断是否有登录 */
						if($.cookie("username")){
							if(confirm("是否去付款？")){
								window.location.href="/html/payment.html";
							}
						}else{
							if(confirm("没有登录，是否进入登录页面？")){
								window.location.href="/html/login.html";
							}
						}
					})
				}
			}
			new Caradd();
			
		})
	})
})