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
						/* $("#ind-itep2").html(html);
						$("#ind-itep3").html(html); */
					}
				}
			})
		})
	}
	return new Item();
})

/* lemonLee 13:30:41
let smallBox=$("#smallBox"),
           Fdj=$("#imgFdj"),
           bigBox=$("#bigBox"),
           bigImg=$("#bigImg");

       smallBox.on("mouseenter",function(){ //进入盒子，放大镜显示
          Fdj.show();
          bigBox.show();

       })

       smallBox.on("mousemove",function(e){  //移动鼠标
           var left = e.clientX - smallBox.offset().left-Fdj.outerWidth()/2;
           var top = e.clientY - smallBox.offset().top-Fdj.outerHeight()/2+$(window).scrollTop();
             //console.log($(window).scrollTop());
           
           if(left<0) left=0;
           if(top<0) top=0;
           if(left>smallBox.outerWidth()-Fdj.outerWidth())
           	left=smallBox.outerWidth()-Fdj.outerWidth();
           if(top>smallBox.outerHeight()-Fdj.outerHeight())
           	top=smallBox.outerHeight()-Fdj.outerHeight();
           //console.log(left,top);
           Fdj.css({"left":left,"top":top});
           bigImg.css({"left":-1.5*left,"top":-1.5*top});

       })

       smallBox.on("mouseleave",function(){  //离开盒子
            Fdj.hide();
            bigBox.hide();
       })
 */