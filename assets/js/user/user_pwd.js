$(function () {
  const form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    onePwd: (val) => {
      if (val !== localStorage.getItem("pwd")) {
        return "不是原密码";
      }
    },
    samePwd: (val) => {
      if (val === $("[name=oldPwd]").val()) {
        return "不能与原密码一致";
      }
    },
    rePwd: (val) => {
      if (val !== $("[name=newPwd]").val()) {
        return "两次密码不一致";
      }
    },
  });

  
  // 发送请求，重置密码
  const layer = layui.layer;
  $(".layui-form").on("submit", (e) => {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(".layui-form").serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("更新密码失败！");
        layer.msg("更新密码成功！");
        // 重置表单
        // $(".layui-form")[0].reset();
        // 强制清空 token 和 pwd
        localStorage.removeItem("token");
        localStorage.removeItem("pwd");
        // 强制跳转到登录页面
        window.parent.location.href = "/login.html";
      },
    });
  });
});
