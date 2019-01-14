/* 详情页 */
require(["./requirejs.config"],function(){
	//引入需要依赖的模块
	require(["url","jquery","header","footer","cookie"],function(url){
		$(function(){
			/* 写放大镜 */
			class Glass{
				constructor() {
				    this.init();
					this.move();
				}
				init(){
					let _this=this;
					/* 进入就出来放大镜 */
					$("#img-left").on("mouseenter",function(e){
						$("#fangda").show();
						$("#img-left span").show();
					})
					$("#img-left").on("mouseleave",function(){
						$("#fangda").hide();
						$("#img-left span").hide();
					})
				}
				move(){
					$("#img-left").on("mousemove",function(e){
						e=e||window.event;
						let gudBox=$("#img-left"),
							 Fdj=$("#img-left span"),
							 bigImg=$("#fangda img");
						var left = e.clientX - gudBox.offset().left-Fdj.outerWidth()/2;
						var top = e.clientY - gudBox.offset().top-Fdj.outerHeight()/2+$(window).scrollTop();
						/* 判断边界 */
						if(left<0) left=0;
						if(top<0) top=0;
						if(left>gudBox.outerWidth()-Fdj.outerWidth()) left=gudBox.outerWidth()-Fdj.outerWidth();
						if(top>gudBox.outerHeight()-Fdj.outerHeight()) top=gudBox.outerHeight()-Fdj.outerHeight();
						
						Fdj.css({"left":left,"top":top});
						bigImg.css({"left":-2.5*left,"top":-2.5*top});
					})
				}
			}
			new Glass();
			
			/* 商品详情 */
			$("#xia-na").on("click","li",function(){
				$(this).addClass("ac").siblings().removeClass("ac");
				$("#xia-none").children().hide();
				$("#xia-none div").eq($(this).index()).show();
			})
			/* 加入购物车 */
			class Tab{
				constructor() {
					this.obj={};
					this.init();
					this.much();
					this.arr=[];
					this.addcar();
				}
				init(){
					let _this=this;
					var flag=true;
					let aar=[];
					/* 获取尺码 */
					$("#box-size").on("click","li",function(){
						$(this).addClass("ac").siblings().removeClass("ac");
						_this.obj["size"]=$(this).html();
						_this.obj["pric"]=$("#data-pira").html();
						_this.obj.name=$("#deta-ri-title").html();
						_this.obj.num=1;
						let arrsearch = location.search.slice(1).split("="); //得到location中search的id值 返回数组
						_this.obj[arrsearch[0]]=arrsearch[1]; 
						_this.obj.imgsrc=$("#img-left img").attr("src");
						/* 加入cookie */
						addcookie(_this.obj);
					})
					let addcookie=function(obj){
						if($.cookie("dataname")){
							aar=JSON.parse($.cookie("dataname"));
						}else{
							aar=[];
						}
						for(let i=0;i<aar.length;i++){
							if(aar[i].id==obj.id){
								aar[i]=obj;
								flag=false;
							}
						}
						if((flag===true)){
							aar.push(obj);
						}
						$.cookie("dataname",JSON.stringify(aar),{path:"/"});
						/* console.log($.cookie("dataname")); */
					}
				}
				much(){
					let _this=this;
					let flag=true;
					let aarr=[];
					this.inpval=$("#aa-inp input").val();
					$("#aaja").on("click",()=>{
						--this.inpval;
						if(this.inpval<=0){
							$("#aa-inp input").val("1");
							this.inpval=1;
						}else{
							$("#aa-inp input").val(this.inpval);
						}
						let arrsearch = location.search.slice(1).split("=");
						_this.obj[arrsearch[0]]=arrsearch[1]; 
						addcookie(_this.obj.id,Number($("#aa-inp input").val()));
					})
					
					$("#aajia").on("click",()=>{
						++this.inpval;
						$("#aa-inp input").val(this.inpval);
						let arrsearch = location.search.slice(1).split("=");
						addcookie(arrsearch[1],Number($("#aa-inp input").val()));
					})
					/* 封装的存cookie 方法*/
					var addcookie=function(idd,numm){
						let bbj={};
						bbj.id=idd;
						bbj.num=numm;
						/* console.log(bbj); */
						if($.cookie("dataname")){
							aarr=JSON.parse($.cookie("dataname"));
						}else{
							aarr=[];
						}
						/* console.log(bbj,aarr); */
						for(let j=0;j<aarr.length;j++){
							if(aarr[j].id==bbj.id){
								aarr[j].id=bbj.id;
								aarr[j].num=bbj.num;
								flag=false;
							}
						}
						if((flag===true)){
							aarr.push(bbj);
						}
						$.cookie("dataname",JSON.stringify(aarr),{path:"/"});
						/* console.log($.cookie("dataname")); */
					}
				}
				
				/* 加入购物车 */
				addcar(){
					var aab=[];
					var ojj={};
					
					$("#addta").on("click",()=>{
						if(confirm("是否加入购物车")){
							var flagt=true;
							/* console.log($.cookie("dataname")); */
							if($.cookie("dataname")){
								aab=JSON.parse($.cookie("dataname"));
							}else{
								confirm("请选择size");
								flagt=false;
							}
							for(let j=0;j<aab.length;j++){
								let arrsearch = location.search.slice(1).split("="); //得到location中search的id值 返回数组
								if(arrsearch[1]==aab[j].id && aab[j].size){
									/* if() */
									aab[j].flag=true;
									flagt=false;
								}
							}
							if(flagt){
								confirm("加size");
							}
							$.cookie("dataname",JSON.stringify(aab),{path:"/"});
							/* console.log($.cookie("dataname")); */
							new Numshop();
						}
					})
				}
			}
			new Tab();
			/* 请求数据 */
			$.ajax({
				url:url.baseUrlRap+"/detail-item",
				type:"get",
				success:function(res){
					if(res.res_code===1){
						let list =res.res_body.data;
						$("#img-left img").attr("src",list.img);
						$("#fangda img").attr("src",list.img);
						$("#deta-ri-title").html(list.title);
						$("#bos-xiaot").attr("src",list.img);
						$("#data-pira").html(list.price);
						$("#deta-num").html(list.num);
						$("#sanxaia").attr("src",list.img);
					}
				}
			})
		
			/* 判断购物车的商品数量 */
			class Numshop{
				constructor() {
				    this.init();
				}
				init(){
					/* console.log($("#tab-car-nu")); */
					let inde=0;
					if($.cookie("dataname")){
						var datat=JSON.parse($.cookie("dataname"));
						/* console.log(datat); */
						$(datat).each(function(i,item){
							if(item.flag){
								inde++;
							}
						})
					}
					/* console.log(inde); */
					$("#tab-car-nu").html(inde);
				}
			}
			new Numshop();
			
			/* 吸顶效果 */
			class Topshow{
				constructor(){
				    this.init();
					
				}
				init(){
					
				}
			}
			new Topshow();
			
		})
		})
		})