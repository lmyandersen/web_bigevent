$(function() {
    var layer = layui.layer;
    var $image = $('#image'); //获取裁剪区域DOM元素
    const options = { aspectRatio: 1, preview: '.img-preview' } //纵横比以及指定区域
    $image.cropper(options); //创建裁剪区域
    $('#btnChooseImage').on('click', function() {
            $('#file').click();
        })
        //为文件框绑定change事件
    $('#file').on('change', function(e) {
        console.log(e);
        var filelist = e.target.files;
        console.log(filelist);
        if (filelist.length === 0) {
            return layer.msg('请选择照片');
        }
        var file = e.target.files[0]; //用户选择文件
        var newImgURL = URL.createObjectURL(file); //将文件转化为路径
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) //重新初始化裁剪区域
    })
    $('#btnUpload').on('click', function() {
        //拿到用户裁剪之后的头像
        var dataURL = $image.cropper('getCroppedCanvas', { //创建canvas画布
            width: 100,
            height: 100
        }).toDataURL('image/png,image/jpeg');
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功');
                window.parent.getUserInfo();
            }
        })
    })
})