// 定义数据
let curPageNum = 1; // 当前的页码数
let curPageSize = 10; // 当前的每页显示条数

const setUserInfo = () => {
    let userInfo = sessionStorage.getItem("userInfo");
    if(userInfo){
        userInfo = JSON.parse(userInfo);
        $(".menu img").attr("src",userInfo.avatar);
        $(".menu span").html(userInfo.username);
    }else{
        location.href = "/login.html"
    }
}

// 查询
const getList = () => {
    $.get(
        `${BaseURL}/api/student`,
        {
            pageNum: curPageNum,
            pageSize: curPageSize,
            // name: $("#searchName").val()
        },
        res => {
            let html = "";
            let SEX = "";
            res.data.list.forEach((item,index) => {
            html += `
            <tr>
                <td>${index+1}</td>
                <td>${item.name}</td>
                <td>${item.age}</td>
                <td>${item.sex === 1 ? "男" : "女"}</td>
                <td>
                    <span class="edit" data-id="${item._id}">修改</span>
                    <span class="del" data-id="${item._id}">删除</span>
                </td>
            </tr>
            `;
            });
            $("#myTbody").html(html);

            let totalPage = res.data.totalPage;
            let pagehtml = "";
            let prevPage = curPageNum - 1 > 1 ? curPageNum - 1 : 1; 
            let nextPage = curPageNum + 1 < totalPage ? curPageNum + 1 : totalPage;
            pagehtml += `<span data-page="${prevPage}">上一页</span>`;
            for(let i = 1; i <= totalPage; i++){
                pagehtml += `<span data-page="${i}" class="${ curPageNum === i ? "act" : ""}">${i}</span>`
            }
            pagehtml += `<span data-page="${nextPage}">下一页</span>`;
            $('.fenye').html(pagehtml);

        }
    )
}

// 删除
const delstu = studentId => {
    $.post(
        `${BaseURL}/api/delstu`,
        {sid:studentId},
        res => {
            if(res.code === 0){
                alert("删除成功");
                getList();
            }else{
                alert("删除失败")
            }
        }
    )
}

// 修改
const editstu = (eid,name,age,sex) => {
    $.post(
        `${BaseURL}/api/editstu`,
        {
            eid:eid,
            name:name,
            age:age,
            sex:sex
        },
        res => {
            if(res.code === 0){
                alert("修改成功");
            }else{
                alert("修改失败")
            }
            
        }
    )
}

$(function(){
    setUserInfo();
    getList();

    // 点击分页
    $('.fenye').on('click','span',function(){
        let page = $(this).data("page");
        curPageNum = page;
        getList();
    })

    // 修改模板层
    $("#myTbody").on('click','tr td span.edit',function(){
        $('.mask').show();
        $('.edit_open').show();
        $('#editHid').val($(this).data("id"));
        $('#nid').text()
        let tr = $(this).parent("td").parent("tr").children();
        let id = tr.eq(0).text();
        let na = tr.eq(1).text();
        let age = tr.eq(2).text();
        let sex = tr.eq(3).text() == "男" ? 1 : 2;
        console.log(sex);
        $('#nid').text(id);
        $('.ming').val(na);
        $('.nian').val(age);
        $('.xing').val(sex);
    });

    // 修改按钮
    $(".edit_btn").click(function(){
        let eid = $('#editHid').val();
        let na = $('.ming').val();
        let age = parseInt($('.nian').val());
        let sex = parseInt($('.xing').val());
        console.log(eid,na,age,sex);
        editstu(eid,na,age,sex);
        getList();
        $('.mask,.edit_open,.del_open').hide();
    })

     // 删除模板层
     $("#myTbody").on('click','tr td span.del',function(){
        $('.mask').show();
        $('.del_open').show();
        $('#delHid').val($(this).data("id"));
    });

    // 删除按钮
    $('.del_btn').click(function(){
        delstu($('#delHid').val());
        $('.mask,.edit_open,.del_open').hide();
    })

    // 关闭模板层
    $('.close').click(function(){
        $('.mask,.edit_open,.del_open').hide();
    })



})