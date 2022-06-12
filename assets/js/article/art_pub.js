$(function () {
  const form = layui.form;
  const layer = layui.layer;

  // 一、获取文章分类
  const initCate = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("初始化文章分类失败！");
        }
        // 调用模板引擎，渲染分类的下拉菜单
        var htmlStr = template("tpl-cate", res);
        $("[name=cate_id]").html(htmlStr);
        // 一定要记得调用 form.render() 方法 否则看不到页面的变化
        form.render();
      },
    });
  };
  // 二、文章封面
  // 点击选择封面按钮，模拟文件上传
  $("#btnChooseImage").on("click", function () {
    $("#coverFile").click();
  });
  // 获取到上传的图片
  $("#coverFile").change((e) => {
    const filelen = e.target.files.length;
    if (filelen === 0) return;
    // 1.获取图片
    const file = e.target.files[0];
    // 2.将图片转为路径
    const imgUrl = URL.createObjectURL(file);
    // 为裁剪区域重新设置图片
    $image.cropper("destroy").attr("src", imgUrl).cropper(options);
  });
  // 定义文章的发布状态
  let art_state = "已发布";
  // 为存为草稿按钮，绑定点击事件处理函数
  $("#btnSave2").on("click", function () {
    art_state = "草稿";
  });

  // 1. 初始化图片裁剪器
  var $image = $("#image");
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };
  // 3. 初始化裁剪区域
  $image.cropper(options);

  // 调用initCate函数，文章分类
  initCate();
  // 初始化富文本编辑器
  initEditor();
});
