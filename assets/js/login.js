$(function () {
  $("#link_reg").on("click", () => {
    $(".reg-box").show();
    $(".login-box").hide();
  });
  $("#link_login").on("click", () => {
    $(".reg-box").hide();
    $(".login-box").show();
  });
  // 从 LayUI 中获取 form 对象
  const form = layui.form;
  form.verify({
    //数组检验方式
    password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 函数检验方式
    repwd: (val) => {
      const pwd = $(".reg-box [name=password]").val();
      if (pwd !== val) return "两次密码不一致";
    },
  });
  // 根目录
  // const bassUrl = "http://www.liulongbin.top:3007";
  //注册事件
  $("#form_reg").on("submit", (e) => {
    e.preventDefault(); //阻止默认提交
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }else{
            layer.msg("注册成功");
            // 模拟点击事件，跳转到登录
            $("#link_login").click();
        }
      },
    });
  });
  //登录事件
  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      type:'POST',
      url:'/api/login',
      data:$(this).serialize(),
      success:res=>{
        if(res.status !==0) return layer.msg(res.message)
        layer.msg('登录成功')
        localStorage.setItem('token',res.token)
        localStorage.setItem('pwd',$("[name=password]").val())
        // 跳转到首页
        location.href = '/index.html'
      }
      
    })
  })

});
