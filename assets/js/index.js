function getUserinfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    success: (res) => {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message);
      } else {
        layer.msg("获取用户信息成功！");
        renderAvatar(res.data);
      }
    },
  });
}
// 渲染头像和用户名
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  // console.log(name);
  // 渲染头像
  $("#welcome").html (`欢迎 ${name}`) 
  // 渲染用户名
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").attr("src", user.user_pic).hide();
    let firstName = name[0].toUpperCase();
    $(".text-avatar").html(firstName);
  }
};
// 获取用户信息
getUserinfo();
// 实现退出功能
$('.back').on('click',e=>{
    console.log(11);
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
})