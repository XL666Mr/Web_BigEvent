$(function () {
  // 渲染列表
  const initArtCateList = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg("获取列表失败");
        layer.msg("获取列表成功");
        const htmlStr = template("tpl-table", res);
        $("tbody").empty().html(htmlStr);
      },
    });
  };
  // 点击按钮，弹出添加列表弹框
  let indexAdd = null;
  $("#btnAddCate").click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });

  // 添加文章分类
  $("body").on("submit", "#form-add", function (e) {
    console.log(11);
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
  // 编辑修改文章分类
  // let indexEdit = null;
  // $("tbody").on("click",".btn-edit", function (e) {
  //   // console.log(11);
  //   indexEdit = layer.open = ({
  //       type: 1,
  //       area: ["500px", "250px"],
  //       title: "修改文章分类",
  //       content: $("#dialog-edit").html(),
  //     })
  // });
  let indexEdit = null;
  // 通过代理方式，为 btn-edit 按钮绑定点击事件
  $("tbody").on("click", ".btn-edit", function (e) {
    const form = layer.form;
    const id = $(this).attr("data-id");
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    // console.log(id);
    // 发起请求获取对应分类的数据
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        // layer.msg(11)
        layer.form.val("form-edit", res.data);
      },
    });
    // 更新文章分类
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
  // 删除
  $("tbody").on("click", ".btn-delete", function () {
    // console.log(11);
    const id = $(this).attr("data-id");
    console.log(id);
    layer.confrim("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
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
