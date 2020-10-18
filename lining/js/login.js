// 获取元素
var $username = $("#username");
var $password = $("#password");
var $code1 = $("#code1");
var $code2 = $("#code2");
var $loginBtn = $(".loginBtn");
var $usernamePrompt = $(".usernamePrompt");
var $passwordPrompt = $(".passwordPrompt");
var $codePrompt = $(".codePrompt");
// 策略模式
let Strategy = (function(){
    let _S = {
        checkRegOne(value){
            let checkRegOne = /^[a-zA-Z0-9_\u4e00-\u9fa5]{4,40}$/;
            return checkRegOne.test(value) ? "" : "4-40位字符，支持汉字、字母、数字及下划线组合";
        },
        checkRegTwo(value){
            let checkRegTwo = /^[a-zA-Z0-9]{6,20}$/;
            return checkRegTwo.test(value) ? "" : "密码是由6-20位字符组成，建议由字母，数字和符合两种以上组合";
        },
        checkRegThree(value){
            let checkRegThree = /^1[34578]\d{9}$/;
            return checkRegThree.test(value) ? "" : "手机号码输入错误";
        },
        checkRegFour(value){
            let checkRegFour = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            return checkRegFour.test(value) ? "" : "只允许英文字母、数字、下划线、英文句号、以及中划线组成";
        }
    }
    return {
        add(name, fn){
            _S[name] = fn;
        },
        use(name, value){
            return _S[name](value);
        }
    }
})();
// 添加事件
$(function(){
    // 设置锁
    let username_lock = false;
    let password_lock = false;
    let code_lock = false;
    // 用户名输入框失去焦点事件
    $username.on("blur", function(){
        // 获取用户名
        let usernameVal = $(this).val();
        let str = Strategy.use("checkRegOne", usernameVal);
        if(str){
            username_lock = false;
            $usernamePrompt.html(str);
            $usernamePrompt.css("color", "red");
            $usernamePrompt.parent().removeClass("has-success");
            $usernamePrompt.parent().addClass("has-error");
            return;
        }
        $.ajax({
            url: 'http://47.115.92.110/lining/php/checkusername.php',
            data: {
                username: $username.val(),
            },
            type: 'post',
            dataType: 'json',
            success(data){
                if(data.error === 0){
                    username_lock = false;
                    $usernamePrompt.html("用户名不存在！");
                    $usernamePrompt.css("color", "red");
                    $usernamePrompt.parent().removeClass("has-success");
                    $usernamePrompt.parent().addClass("has-error");
                    return;
                }
                username_lock = true;
                $usernamePrompt.html("用户名通过！");
                $usernamePrompt.css("color", "green");
                $usernamePrompt.parent().removeClass("has-error");
                $usernamePrompt.parent().addClass("has-success");
            },
            error(){
                alert("请求发生错误！")
            },
            complete(){
                console.log("请求结束！");
            }
        })
    }) 
    // 密码输入框失去焦点事件
    $password.on("blur", function(){
        // 获取密码
        let passwordVal = $(this).val();
        let str = Strategy.use("checkRegTwo", passwordVal);
        if(str){
            password_lock = false;
            $passwordPrompt.html(str);
            $passwordPrompt.css("color", "red");
            $passwordPrompt.parent().removeClass("has-success");
            $passwordPrompt.parent().addClass("has-error");
            return;
        }
        password_lock = true;
        $passwordPrompt.html("密码通过！");
        $passwordPrompt.css("color", "green");
        $passwordPrompt.parent().removeClass("has-error");
        $passwordPrompt.parent().addClass("has-success");
    })
    // 验证码输入框失去焦点事件
    $code1.on("blur", function(){
        // 获取验证码
        let codeVal1 = $(this).val();
        let codeVal2 = $code2.val();
        // 判断验证码是否正确
        let isSame = codeVal1 === codeVal2;
        if(!isSame){
            code_lock = false;
            $codePrompt.html("验证码错误");
            $codePrompt.css("color", "red");
            $codePrompt.parent().removeClass("has-success");
            $codePrompt.parent().addClass("has-error");
        }else{
            code_lock = true;
            $codePrompt.html("验证码通过！");
            $codePrompt.css("color", "green");
            $codePrompt.parent().removeClass("has-error");
            $codePrompt.parent().addClass("has-success");
        }
    })
    // 调用函数产生随机验证码
    $code2.val(rand(6));
    // 验证码点击事件
    $code2.on("click", function(){
        // 调用函数
        let num = rand(6);
        $(this).val(num);
    })
    // 生成验证码函数
    function rand(number){
        // 存储验证码
        let codeNum = "";
        // 循环生成验证吗
        for (let i = 0; i < number; i++ ){
            // 验证码随机颜色
            let r = Math.floor(Math.random()*256);
            let g = Math.floor(Math.random()*256);
            let b = Math.floor(Math.random()*256);
            let codeColor = "rgb" + "(" + r + "," + g + "," + b + ")";
            $code2.css("color", codeColor);
            // 验证码
            codeNum += Math.floor(Math.random() * 10);
        }
        return codeNum;
    }
    // 登录按钮点击事件
    $loginBtn.on("click", function(){
        // 判断锁
        if(!(username_lock && password_lock && code_lock)){
            alert("登录信息有误，请重新检查！");
            return;
        }
        $.ajax({
            url: 'http://47.115.92.110/lining/php/login.php',
            data: {
                username: $username.val(),
                password: $password.val(),
            },
            type: 'post',
            dataType: 'json',
            success(data){
                if(data.error === 0){
                    alert(data.msg);
                    $.cookie("username", $username.val(), {expires: 7, path: "/"});
                    location.href = "http://47.115.92.110/lining/index.html";
                }else{
                    alert(data.msg);
                }
            },
            error(data){
                console.log(data.msg);
            },
            complete(){
                console.log("请求结束");
            }
        })
    })
})