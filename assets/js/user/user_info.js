$(function () {
  const form = layui.form;
  form.verify({
    nickname: (val) => {
      if (val.length > 6) {
        return "昵称长度不能超过6位";
      }
    },
  });
  // 获取用户信息
  const initUserinfo = () => {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg('获取用户信息成功！');
        console.log(res);
        form.val('formUserInfo', res.data);
      }
    })
  }
  $('.btnReset').on('click', function (e) {
    e.preventDefault();
    initUserinfo();
  })
  initUserinfo();
  // 修改用户信息
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: (res) => {
        // console.log(11);
        window.parent.getUserinfo();
      }
    })
  })
});
