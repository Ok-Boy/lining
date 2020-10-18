$(function(){
    // 获取url
    var urlArr = location.search.slice(1).split("&");
    // 商品编号
    var sku = "";
    // 商品信息
    let item = "";
    // 同类型商品编号
    var sukSame = "";
    // 同类型商品信息
    var itemSame = [];
    // 获取元素
    var $mainPic = $(".mainPic");
    var $right_one = $(".right_one");
    // var $sw = $(".swiper-wrapper");
    var $color_list = $(".color_list");
    // 展品展示模块
    var $product_show = $(".product_show");
    // 尺码对照表模块
    var $footage_one = $(".footage_one");
    var classification = "";
    var $footage_module = $(".footage_module");
    var $sz_jtq_module = $(".sz_jtq_module");
    // 获取用户名
    var username = $.cookie("username");
    // 获取当前商品需要加入购物车的数量
    var buy_count = $(".buy_count").val();
    // 遍历
    urlArr.forEach(function(value){
        if(value.split("=")[0] === "sku"){
            sku = value.split("=")[1];
            sukSame = value.split("=")[1].slice(0,-2);
        }else if(value.split("=")[0] === "classification"){
            classification = value.split("=")[1];
        }
    })
    // 发送请求，获取对应商品编号的信息
    $.ajaxSettings.async = false; // 异步变同步
    $.get("http://47.115.92.110/lining/php/details.php", {sku: sukSame}, function({error, data}){
        if(!error){
            // 获取到同类型商品信息
            itemSame = data;
            // 页面渲染
            renderData(itemSame);
        }else{
            console.log("数据加载失败！");
        }
    }, "json")
    $.ajaxSettings.async = true; // 同步变异步

    // 页面渲染
    function renderData(itemSame){
        // 获取到当前商品信息
        item = itemSame.find(function(value){
            return value.sku === sku;
        })
        // 重新排列同类型商品在数组里面的顺序
        var itemArr = [];
        itemArr[0] = item;
        itemSame.forEach(function(value){
            if(value.sku !== itemArr[0].sku){
                itemArr.push(value);
            }
        })
        
        // var mainPicStr = `<img src="${item.mainPic}">`;
        // $mainPic.html(mainPicStr);
        var sw = "";
        itemArr.forEach(function(value){
            sw += `<div class="swiper-slide"><img src="${value.mainPic}"></div>`
        })
        $(".swiper-wrapper").html(sw)

        var right_one_str = `
            <h4>${item.goodsName.slice(0, -9)}</h4>
            <div class="item_price">
                <p><span class="price_title text-left">商品编码：</span><span>${item.sku}</span></p>
                <p><span class="price_title text-left">吊牌价：</span><span><del>￥${item.marketPrice}</del></span></p>
                <p><span class="price_title text-left">销售价：</span><span>￥${item.salePrice}</span></p>
                <p><span class="price_title text-left">特价：</span><span class="special_offer">￥${item.price}</span></p>
            </div>
        `;
        $right_one.html(right_one_str);

        var color_list_str = "";
        itemArr.forEach(function(value){
            color_list_str += `<li><a href="http://47.115.92.110/lining/html/details.html?classification=${classification}&sku=${value.sku}"><img src="${value.mainPic}"></a></li>`
        })
        $color_list.html(color_list_str)

        // 渲染展品展示部分
        var product_show_str = "";
        itemArr.forEach(function(value){
            product_show_str += `<img src="${value.mainPic}" alt="" style="width: 100%">`;
        })
        $product_show.html(product_show_str);

        // 尺码对照表部分
        var footage_str = "";
        switch(classification){
            case "men_shoes":
            case "women_shoes":
            case "boys_shoes":
            case "girls_shoes":
                footage_str = `
                    <p>*您可根据该商品页面显示的尺码作为购物参考，页面显示尺码与美码及商品实际尺码的对应关系见下表</p>
                    <img src="http://47.115.92.110/lining/resource/images/尺码对照表.png" alt="">
                    <p>尺码说明：中码采用毫米数，即测量脚长的长度。如：220mm，对应的页面显示码是36，鞋盒尺码是4.5。</p>
                `;
                $(".foot_sizeway_img").attr("src", "http://47.115.92.110/lining/resource/images/foot_sizeway.jpg");
                $(".sz_jtq img").attr("src", "http://47.115.92.110/lining/resource/images/sz_jtq.jpg");
                $footage_one.html(footage_str);
            break;
            case "men_clothing":
            case "women_chothing":
            case "boys_clothing":
            case "girls_clothing":
                footage_str = `
                    <p>男生尺码对照表</p>
                    <img src="http://47.115.92.110/lining/resource/images/men_cm.png" alt="">
                    <p>女生尺码对照表</p>
                    <img src="http://47.115.92.110/lining/resource/images/women_cm.png" alt="">
                    <p>温馨提示：如果您身高、体重、净胸围在重叠区域，平时穿着喜欢合身点选小一个尺码；如果您身高、体重、净胸围不在对应范围，请以体重、净胸围选择尺码。</p>
                `;
                $(".foot_sizeway_img").attr("src", "http://47.115.92.110/lining/resource/images/close_sizeway.jpg");
                $(".sz_jtq img").attr("src", "http://47.115.92.110/lining/resource/images/ctl_sz.jpg");
                $footage_one.html(footage_str);
            break;
            default:
                $footage_module.addClass("hidden");
                $sz_jtq_module.addClass("hidden");
            break;
        }
    }

    // 购买数量
    $(".minus").on("click", function(){
        var buy_count = $(".buy_count").val();
        buy_count--;
        if(buy_count < 1){
            buy_count = 1;
        }
        $(".buy_count").val(buy_count);
    })
    $(".plus").on("click", function(){
        var buy_count = $(".buy_count").val();
        buy_count++;
        $(".buy_count").val(buy_count);
    })

    // 封装一个请求，用于添加新商品
    function addToCart(){
        $.ajax({
            url: 'http://47.115.92.110/lining/php/addToCart.php',
            data: {
                username: username,
                sku: item.sku,
                price: item.price,
                buy_count: buy_count,
                goodsName: item.goodsName,
                mainPic: item.mainPic,
                preferential: (item.salePrice - item.price),
                classification: classification
            },
            type: 'post',
            dataType: 'json',
            success(data){
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
                if(data.error === 0){
                    alert(data.msg);
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
    }
    // 封装一个请求，用于增加购物车某件商品数量
    function addBuyCount(username, sku, num){
        $.ajax({
            url: 'http://47.115.92.110/lining/php/addBuyCount.php',
            data: {
                username: username,
                sku: sku,
                buy_count: num,
            },
            type: 'post',
            dataType: 'json',
            success(data){
                if(data.error === 0){
                    alert(data.msg);
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
    }

    // 点击加入购物车
    $(".to_cart").on("click", function(){
        // 获取当前商品需要加入购物车的数量
        buy_count = $(".buy_count").val();
        // 判断当前是否登录
        if($.cookie("username") === undefined){
            alert("抱歉，您未登录！");
        }else{
            // 发送请求，检查当前用户购物车里面是否有当前商品
            $.ajax({
                url: "http://47.115.92.110/lining/php/selectShopCart.php",
                data: {
                    username: username,
                    sku: item.sku
                },
                type: 'post',
                dataType: "json",
                success(data){
                    // 如果购物车里面没有该商品，则添加该商品
                    if(data.data.length === 0){
                        addToCart();
                    }else{
                        var item = data.data;
                        var username = item[0].username;
                        var sku = item[0].sku;
                        var num = Number(item[0].buy_count) + Number(buy_count);
                        addBuyCount(username, sku, num);
                    }
                },
                error(){
                    console.log("数据加载失败！");
                },
                complete(){
                    console.log("请求结束");
                }
            })

        }
    })

 

    // 尺码对照表模块
    var $foot_sizeway = $(".foot_sizeway em");
    var $foot_sizeway_img = $(".foot_sizeway_img");
    $foot_sizeway.on("click", function(){
        if($(this).attr("class") === "glyphicon glyphicon-plus-sign"){
            $(this).removeClass("glyphicon-plus-sign");
            $(this).addClass("glyphicon-minus-sign");
            $foot_sizeway_img.removeClass("hidden");
        }else if($(this).attr("class") === "glyphicon glyphicon-minus-sign"){
            $(this).removeClass("glyphicon-minus-sign");
            $(this).addClass("glyphicon-plus-sign");
            $foot_sizeway_img.addClass("hidden");
        }
    })

    // 轮播图
    function swiperfun(){
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
              el: '.swiper-pagination',
              dynamicBullets: true,
            },
        });
        swiper.el.onmouseover = function (){
            swiper.autoplay.stop();
        }
        swiper.el.onmouseout = function (){
            swiper.autoplay.start();
        }
    }
    swiperfun();
})