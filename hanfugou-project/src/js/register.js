/* 注册页面 */
require(["./requirejs.config"],function(){
	//引入需要依赖的模块
	require(["jquery"],function($){
		$(function(){
			class Register{
				constructor() {
				    this.regname=/^\w\w*$/g;
				    this.regpass=/^.{6,}$/g;
				    this.regtel=/^[1]\d{10}$/g;
				    this.regemal=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
				    this.objzc={};//定义一个空的对象
				    this.flag="";//定义一个空字符串
					this.testt();
				}
				testt(){
					let _this=this;
					$("button").on("click",function(e){
						e.preventDefault();
						if(_this.regname.test($("#username").val())){
							//获取注册用户名,加入到对象里面
							_this.objzc.name=$("#username").val();
							_this.flag+=1;//如果获取成功就在字符串后面加一个
						}
						//验证密码
						if(_this.regpass.test($("#passw").val())){
							//获取密码,加入到objzc
							_this.objzc.passa=$("#passw").val();
							_this.flag+=2;//获取成功就拼接字符2
						}
						//验证第二次输入密码跟第一次一样
						if($("#passw").val()===$("#repass").val()){
							_this.flag+=3;//如果一样就拼接一个字符3
						}
						//验证电话号码
						if(_this.regtel.test($("#tel").val())){
							//获取电话号码到objzc
							_this.objzc.tellt=$("#tel").val();
							_this.flag+=4;//验证成功就拼接字符4
						}
						//验证邮箱
						if(_this.regemal.test($("#eml").val())){
							//将电话号码放入objzcd对象里面
							_this.objzc.mail=$("#eml").val();
							_this.flag+=5;//验证成功就拼接字符5
						}
						//判断注册信息是否全部获取
						if(_this.flag==="12345"){
							/* 后台提交数据 */
							$.ajax({
								type:"POST",
								url:"http://localhost/api/v1/register.php",
								data:{
									"username":$("#username").val(),
									"tel":$("#tel").val(),
									"password":$("#passw").val(),
									"email":$("#eml").val()
								},
								success:function(res){
									if(res.res_code){
										if(confirm("注册成功")){
											window.location.href="/html/login.html";
										}
									}
								},
								dataType:"json"
							});
							//将objzc对象转换为字符串
							/* var strr=JSON.stringify(_this.objzc); */
							//存入到cookie
							/* $.cookie("cart",strr); */
							/* alert(234345); */
							
							/* window.location.href="/index.html"; */
							
						}else{
							alert("请检查注册信息是否有误");
							location.reload();//刷新页面
						}
					})
				}
				
			}
			new Register();
		}) 
	}) 
})
	