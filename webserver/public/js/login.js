// 登录
const loginApi = (username,password) => {
    $.post(`${BaseURL}/api/sign-in`,
    {
        username,
        password
    },
    res => {
        if(res.code === 0){
            sessionStorage.setItem("userInfo",JSON.stringify(res.data));
            alert("登录成功,欢迎光临");
            location.href = "/index.html";
        }else{
            alert(res.msg);
        }
    }
    )
}

$(function(){
    $(".denglu").click(function(){
        let username = $('input[name="username"]').val();
        let password = $('input[name="password"]').val();

        if(!username || !password){
            alert("请输入相关信息");
            return;
        }
        // 登录操作
        loginApi(username,password);
    })
})
