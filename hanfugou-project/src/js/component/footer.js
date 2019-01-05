/* 写尾部的js代码 */
define(["jquery"],function(){
	//写footer的功能
	class Footer{
		constructor() {
		    this.init();
		}
		init(){
			$("footer").load("/html/component/footer.html",()=>{
				
			})
		}
	}
	return new Footer;
})