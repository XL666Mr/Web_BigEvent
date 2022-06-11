$(function () {
  // 渲染列表
  const initArtCateList = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: (res) => {
        // console.log(res);
        if (res.status !== 0) return layer.msg("获取列表失败");
        layer.msg("获取列表成功");
        const htmlStr = template("tpl-table", res);
        $("tbody").empty().html(htmlStr);
      },
    });
  };
  initArtCateList();
});
