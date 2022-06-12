$(function () {
  const layer = layui.layer;

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
  // 一、点击添加按钮
  let indexAdd = null;
  $("#btnAddCate").click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
    // 确认添加
    $("body").on("submit", "#form-add", function (e) {
      // console.log(11);
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "/my/article/addcates",
        data: $(this).serialize(),
        success: (res) => {
          if (res.status !== 0) return layer.msg("新增分类失败");
          layer.msg("新增分类成功");
          initArtCateList();
          layer.close(indexAdd);
        },
      });
    });
  });

  // 二、点击编辑按钮
  let indexEdit = null;
  $("tbody").on("click", ".btn-edit", function (e) {
    const form = layui.form;
    const id = $(this).attr("data-id");
    // 1.弹出弹窗
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    // 2.发起请求获取对应分类的数据
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
    // 3.更新文章分类
    $("body").on("submit", "#form-edit", function (e) {
      e.preventDefault();
      $.ajax({
        method: "POST",
        url: "/my/article/updatecate",
        data: $(this).serialize(),
        success: (res) => {
          if (res.status !== 0) {
            return layer.msg("更新分类数据失败！");
          }
          layer.msg("更新分类数据成功！");
          layer.close(indexEdit);
          initArtCateList();
        },
      });
    });
  });

  // 三、点击删除按钮
  $("tbody").on("click", ".btn-delete", function () {
    const id = $(this).attr("data-id");
    // console.log(id);
    layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        type: "GET",
        url: "/my/article/deletecate/" + id,
        success: (res) => {
          if (res.status !== 0) {
            return layer.msg("删除分类失败！");
          }
          layer.msg("删除分类成功！");
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
  initArtCateList();
});
