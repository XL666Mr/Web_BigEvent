function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    // // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: (res) => {
    //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     //  强制清空 token
    //     localStorage.removeItem("token");
    //     // 强制跳转到登录页面
    //     location.href = "/login.html";
    //   }
    // },
    success: (res) => {
      // console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message);
      } else {
        // layer.msg("获取用户信息成功！");
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
  $("#welcome").html(`欢迎 ${name}`);
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
getUserInfo();
// 实现退出功能
$(".back").on("click", (e) => {
  console.log(11);
  layui.layer.confirm(
    "确定退出登录？",
    { icon: 3, title: "" },
    function (index) {
      // 清空本地存储里面的 token
      localStorage.removeItem("token");
      localStorage.removeItem("pwd");
      // 重新跳转到登录页面
      location.href = "/login.html";
    }
  );
});
function change(){
  $('#change').addClass('layui-this').next().removeClass('layui-this')
}
