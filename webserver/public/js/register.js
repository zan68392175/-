// 注册
const registerApi = (username,password) => {
    $.post(`${BaseURL}/api/sign-up`,
        {
            username,
            password
        },
        res => {
            if(res.code === 0){
                alert("注册成功,欢迎光临");
                location.href = "/login.html";
            }else{
                alert(res.msg);
            }
        }
    )
}

$(function(){

    $(".zhuche").click(function(){
        let username = $('input[name="username"]').val();
        let password = $('input[name="password"]').val();
        let repassword = $('input[name="repassword"]').val();
        
        if(!username || !repassword || !password){
            alert("请输入相关信息");
            return;
        }
        if(password != repassword){
            alert("两次密码不一致");
            return;
        }

        // 注册
        registerApi(username,password);
    
    })

})