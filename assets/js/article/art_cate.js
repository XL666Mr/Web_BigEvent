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
// 点击按钮，弹出添加列表弹框
let indexAdd = null
  $("#btnAddCate").click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });

  // 添加文章分类
  $('body').on('submit','#form-add',function(e){
    // console.log(11);
    e.preventDefault();
    $.ajax({
      type:'POST',
      url:'/my/article/addcates',
      data:$(this).serialize(),
      success:res=>{
        if(res.status !== 0) return layer.msg('新增分类失败')
        layer.msg('新增分类成功')
        initArtCateList()
        layer.close(indexAdd)
      }
    })
  })
  initArtCateList();

});
