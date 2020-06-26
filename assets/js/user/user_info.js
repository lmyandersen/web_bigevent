$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 8) {
                return '昵称长度必须在1-8个字符之间'
            }
        }
    })
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                form.val('formUserInfo', res.data); //调用form.val()为表单赋值
            }
        })
    }
    //重置表单数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败');
                }
                layer.msg('更新用户信息成功');
                window.parent.getUserInfo();
            }
        })
    })

})