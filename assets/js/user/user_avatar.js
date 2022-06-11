$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 上传图片
  $("#btnChooseImage").on("click", function () {
    $("#file").click();
  });

  // 文件选择后的事件
  $("#file").on("change", function (e) {
    console.log(e);
    const fileList = e.target.files.length;
    if (fileList === 0) return;
    //  获取图片url
    const file = e.target.files[0];
    const imgURL = URL.createObjectURL(file);
    //  替换裁剪区域的图片
    $image.cropper("destroy").attr("src", imgURL).cropper(options);
  });
  // const layer = layui.layer;

  //  为确定按钮绑定点击事件
  $("#btnUpload").click(() => {
    console.log(11);
    // 1、拿到用户裁切之后的头像
    // 直接复制代码即可
    const dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png");
    // 2、发送 ajax 请求，发送到服务器
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg("更换头像失败！");
        }
        layer.msg("更换头像成功！");
        window.parent.getUserInfo();
      },
    });
  });
});
