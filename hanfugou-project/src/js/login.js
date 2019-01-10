/* 登录页面 */
require(["./requirejs.config"],function(){
	require(["jquery","cookie"],function(){
		$(function(){
			$("#but-sub").on("click",function(){
				if($("#inputUsername").val().trim() && $("#inputPassword3").val()){
					$.ajax({
						type:"POST",
						url:"http://localhost/api/v1/login.php",
						data:{
							"username":$("#inputUsername").val(),
							"password":$("#inputPassword3").val()
						},
						success:function(res){
							if(res.res_code){
								console.log(res.res_body);
								if(confirm("登录成功")){
									if($("#remember")[0].checked){
										$.cookie("username",res.res_body.username,{path:"/",expires:3})
									}else{
										$.cookie("username",res.res_body.username,{path:"/"})
									}
									window.location.href="/";
								}
							}
						},
						dataType:"json"
					});
					
					
					
				}else{
					alert("不为空");
				}
			})
		})
		
	})
})
