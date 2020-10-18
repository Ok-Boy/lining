var $login_href = $(".login_href");
var $register_href = $(".register_href");
var $loginout = $(".loginout");
var $nav_l_li = $(".nav_l_li");
$(function(){
    var whoIs = $.cookie("username");
    if(whoIs !== undefined){
        $login_href.css("display", "none");
        $register_href.css("display", "none");
        $login_href.parent().append(`<span class="welcome">欢迎您，` + whoIs + `</span>`);
        $register_href.parent().append(` | <a href="" οnclick="location.reload() class="loginout">注销</a>`);
    }
    // 点击注销按钮
    $nav_l_li.on("click", function(){
        $login_href.css("display", "block");
        $register_href.css("display", "block");
        $.removeCookie("username", {path: "/"});
    })

    // 获取购物车列表有几种商品
    var username = $.cookie("username");
    function showcartInfo(){
        $.ajax({
            url: "http://47.115.92.110/lining/php/showcartInfo.php",
            data: {
                username: username
            },
            type: 'get',
            dataType: 'json',
            success(data){
                if(data.error === 0){
                    var goodslist = data.data;
                    $(".cart_items").text(goodslist.length)
                }else{
                    console.log(data.data);
                }
            },
            error(data){
                console.log(data);
            },
            complete(){
                console.log("请求结束");
            }
        })
    }
    showcartInfo();

        // 导航栏鼠标移入事件
        var li_arr = [];
        var li_arr = $(".dropdown");
        $.each(li_arr, function(index, value){
            $(this).on("mouseenter", function(){
                $(this).addClass("open");
            })
            $(this).on("mouseleave", function(){
                $(this).removeClass("open");
            })
        })
    
        var ico_weixin_arr = [];
        var ico_weixin_arr = $(".ico_weixin");
        $.each(ico_weixin_arr, function(index, value){
            $(this).on("mouseenter", function(){
                $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-weixin-active.png");
            })
            $(this).on("mouseleave", function(){
                $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-weixin-normal.png");
            })
        })
    
        var ico_weibo_arr = [];
        var ico_weibo_arr = $(".ico_weibo");
        $.each(ico_weibo_arr, function(index, value){
            $(this).on("mouseenter", function(){
                $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-weibo-active.png");
            })
            $(this).on("mouseleave", function(){
                $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-weibo-normal.png");
            })
        })

    // 鼠标移入
    // 品牌历史
    $(".brand_history").on("mouseover", function(){
        $(".brand_history img").attr("src", "http://47.115.92.110/lining/resource/images/nav-hover-brand-history.png");
    })
    // 品牌与赛事
    $(".brand_event").on("mouseover", function(){
        $(".brand_event img").attr("src", "http://47.115.92.110/lining/resource/images/nav-hover-brand-event.png");
    })
    // 品牌与明星
    $(".brand_star").on("mouseover", function(){
        $(".brand_star img").attr("src", "http://47.115.92.110/lining/resource/images/nav-hover-brand-star.png");
    })
    // 产品科技
    $(".brand_tech").on("mouseover", function(){
        $(".brand_tech img").attr("src", "http://47.115.92.110/lining/resource/images/nav-hover-brand-tech.png");
    })
    // wade
    $(".li_wade").on("mouseover", function(){
        $(".li_wade img").attr("src", "http://47.115.92.110/lining/resource/images/ico-wade-hover.png");
    })
    // position
    $(".li_position").on("mouseover", function(){
        $(".li_position img").attr("src", "http://47.115.92.110/lining/resource/images/ico-position-hover.png");
    })
    // 李宁篮球
    $(".list_baskgetball").on("mouseover", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-baskget-active.png");
    })
    // 李宁跑步
    $(".list_running").on("mouseover", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-running-active.png");
    })
    // 李宁训练
    $(".list_training").on("mouseover", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-training-active.png");
    })
    // 李宁运动生活
    $(".list_sportslife").on("mouseover", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-sportslife-active.png");
    })
    // 李宁羽毛球
    $(".list_badmintion").on("mouseover", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-badminton-active.png");
    })
    // 李宁探索
    $(".list_search").on("mouseover", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-search-active.png");
    })
    // 李宁青少年
    $(".list_young").on("mouseover", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-young-active.png");
    })
    // 客服热线
    $(".hotline").on("mouseover", function(){
        $(this).html("客服热线 400-610-0011");
    })
    // 鼠标移出
    // 品牌历史
    $(".brand_history").on("mouseout", function(){
        $(".brand_history img").attr("src", "http://47.115.92.110/lining/resource/images/nav-normal-brand-history.png");
    })
    // 品牌与赛事
    $(".brand_event").on("mouseout", function(){
        $(".brand_event img").attr("src", "http://47.115.92.110/lining/resource/images/nav-normal-brand-event.png");
    })
    // 品牌与明星
    $(".brand_star").on("mouseout", function(){
        $(".brand_star img").attr("src", "http://47.115.92.110/lining/resource/images/nav-normal-brand-star.png");
    })
    // 产品科技
    $(".brand_tech").on("mouseout", function(){
        $(".brand_tech img").attr("src", "http://47.115.92.110/lining/resource/images/nav-normal-brand-tech.png");
    })
    // wade
    $(".li_wade").on("mouseout", function(){
        $(".li_wade img").attr("src", "http://47.115.92.110/lining/resource/images/ico-wade-normal.png");
    })
    // position
    $(".li_position").on("mouseout", function(){
        $(".li_position img").attr("src", "http://47.115.92.110/lining/resource/images/ico-position.png");
    })
    // 李宁篮球
    $(".list_baskgetball").on("mouseout", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-baskgetball-normal.png");
    })
    // 李宁跑步
    $(".list_running").on("mouseout", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-running-normal.png");
    })
    // 李宁训练
    $(".list_training").on("mouseout", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-training-normal.png");
    })
    // 李宁运动生活
    $(".list_sportslife").on("mouseout", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-sportslife-normal.png");
    })
    // 李宁羽毛球
    $(".list_badmintion").on("mouseout", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-badmintion-normal.png");
    })
    // 李宁探索
    $(".list_search").on("mouseout", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-search-normal.png");
    })
    // 李宁青少年
    $(".list_young").on("mouseout", function(){
        $(this).attr("src", "http://47.115.92.110/lining/resource/images/list-young-normal.png");
    })
    // 客服热线
    $(".hotline").on("mouseout", function(){
        $(this).html("客服热线");
    })

    // 获取元素
    var $men_shoes = $(".men_shoes");
    var $men_clothing = $(".men_clothing");
    var $men_accessories = $(".men_accessories");
    var $women_shoes = $(".women_shoes");
    var $women_clothing = $(".women_clothing");
    var $women_accessories = $(".women_accessories");
    var $boys_shoes = $(".boys_shoes");
    var $boys_clothing = $(".boys_clothing");
    var $girls_shoes = $(".girls_shoes");
    var $girls_clothing = $(".girls_clothing");
    // 点击事件
    $men_shoes.on("click", function(){
        location.href = "http://47.115.92.110/lining/html/productlist.html?classification=men_shoes";
    })
    $men_clothing.on("click", function(){
        location.href = "http://47.115.92.110/lining/html/productlist.html?classification=men_clothing";
    })
    $men_accessories.on("click", function(){
        location.href = "http://47.115.92.110/lining/html/productlist.html?classification=men_accessories";
    })
    $women_shoes.on("click", function(){
        location.href = "http://47.115.92.110/lining/html/productlist.html?classification=women_shoes";
    })
    $women_clothing.on("click", function(){
        location.href = "http://47.115.92.110/lining/html/productlist.html?classification=women_chothing";
    })
    $women_accessories.on("click", function(){
        location.href = "http://47.115.92.110/lining/html/productlist.html?classification=women_accessories";
    })
    $boys_shoes.on("click", function(){
        location.href = "http://47.115.92.110/lining/html/productlist.html?classification=boys_shoes";
    })
    $boys_clothing.on("click", function(){
        location.href = "http://47.115.92.110/lining/html/productlist.html?classification=boys_clothing";
    })
    $girls_shoes.on("click", function(){
        location.href = "http://47.115.92.110/lining/html/productlist.html?classification=girls_shoes";
    })
    $girls_clothing.on("click", function(){
        location.href = "http://47.115.92.110/lining/html/productlist.html?classification=girls_clothing";
    })

    // 搜索
    $searchBtn = $(".searchBtn");
    $searchInp = $(".searchInp");
    $searchBtn.on("click", function(){
        // 判断输入的搜索内容是否为空
        if($searchInp.val() === ""){
            alert("搜索内容不能为空！");
        }else{
            // 获取搜索内容
            searchStr = $searchInp.val();
            window.location.href = `http://47.115.92.110/lining/html/search.html?search=${searchStr}`;
        }
    })
})
