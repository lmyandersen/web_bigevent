$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6-12位，不包含空格'],
            repwd: function(value) {
                var pwd = $('.reg-box [name=password]').val();
                if (pwd !== value) {
                    return '两次密码不一致';
                }
            }
        })
        //为注册表单添加提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $('#form_reg [name = username]').val(),
            password: $('#form_reg [name = password]').val()
        }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录');
            $('#link_login').click();
        })
    })
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})