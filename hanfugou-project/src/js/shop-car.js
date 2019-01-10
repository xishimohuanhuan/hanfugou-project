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
				}
				init(){
					let str="";
					/* 拼接 */
					$(this.cookIe).each((i,item)=>{
						if(item.flag){
							str +=`<div class="car-wrap">
									<div class="car-box1">
										<input type="checkbox" class="car-dan"/>
									</div>
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
											<input type="text" value="${item.num}"/>
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
								_this.cookIe[j].mintot=bbj.num * _this.cookIe[j].pric;
								var spann=$(_thi).parent().parent().parent().children(".car-box5").children("span");
								spann.html(_this.cookIe[j].mintot);
							}
						}
						$.cookie("dataname",JSON.stringify(_this.cookIe),{path:"/"});
						console.log($.cookie("dataname"));
					}
				}
				/* 小计 */
				mintotal(){
					/* JSON.parse($.cookie("dataname")) */
					let asd=[];
					let abj={};
					for(let i=0;i<this.cookIe;i++){
						abj.id=this.cookIe.id;
						
					}
					$("#car-shop .car-box5 span").each((i,item)=>{
						
					})
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
						}
						
					})
				}
			}
			new Caradd();
			
		})
	})
})