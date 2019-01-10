//配置require模块
require.config({
	baseUrl: "/",//根路径
	paths:{//配置各模块的路径  不要写后缀名
		"jquery":"libs/jquery/jquery-1.11.3.min",
		"cookie":"libs/jquery/jquery-plugins/jquery.cookie",
		"header":"js/component/header",
		"footer":"js/component/footer",
		"item1":"js/component/item1",
		"url":"js/component/url",
		"template":"libs/template-web",
		"ind-item":"js/component/ind-item",
		"detail-item":"js/component/detail-item",
		"product-item":"js/component/product-item"
	},
	//不符合AMD规范的模块要垫片
	shim:{
		/* "cookie":{
			deps:["jquery"]
		} */
	}
})