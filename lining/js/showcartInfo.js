$(function(){
    // 初始化弹出框
    $('[data-toggle="popover"]').popover()
    var $cartlist = $(".cartlist");
    var $cartfooter = $(".cartfooter");
    var username = $.cookie("username");

    // 获取url
    var urlArr = location.search.slice(1).split("&");
    var classification = "";
    // 遍历
    urlArr.forEach(function(value){
        if(value.split("=")[0] === "classification"){
            classification = value.split("=")[1];
        }
    })
    // 请求所有数据
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
                    if(goodslist.length === 0){
                        cartNull();
                    }else{
                        renderData(goodslist);
                    }
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

    // 请求操作的商品数据
    function selectGood(data_sku){
        $.get("http://47.115.92.110/lining/php/selectGood.php", {username: username, sku: data_sku}, function({error, data}){
            if(!error){
                item = data;
            }else{
                console.log("查询不到该商品数据");
            }
        }, 'json')
    }

    // 改变商品数量
    function buyCount(data_sku, updateCount){
        $.post("http://47.115.92.110/lining/php/buyCount.php", {username: username, sku: data_sku, buy_count: updateCount}, function({error, data}){
            if(!error){
                item = data;
            }else{
                console.log("操作失败");
            }
        }, 'json')
    }

    // 删除数据
    function romoveCart(data_sku){
        $.post("http://47.115.92.110/lining/php/removeCart.php", {username: username, sku: data_sku}, function({error, msg}){
            if(!error){
                console.log(msg)
            }else{
                console.log(msg);
            }
        }, 'json')
    }

    // 批量删除
    function removeMany(){
        $.post("http://47.115.92.110/lining/php/removeMany.php", {username: username}, function({error, msg}){
            if(!error){
                console.log(msg)
            }else{
                console.log(msg);
            }
        }, 'json')
    }

    // 改变商品选择情况
    function ischeck(data_sku, ischecked){
        $.post("http://47.115.92.110/lining/php/ischeck.php", {username: username, sku: data_sku, ischecked: ischecked}, function({error, msg}){
            if(!error){
                console.log(msg)
            }else{
                console.log(msg);
            }
        }, 'json')
    }
    
    // 查询选择的商品
    function hascheck(){
        $.get("http://47.115.92.110/lining/php/hascheck.php", {username: username}, function({error, data}){
            if(!error){
                hascheckarr = data;
                totalfun(hascheckarr);
            }else{
                console.log(data);
            }
        }, 'json')
    }
    hascheck();

    // 遍历选中的商品，计算价格
    function totalfun(hascheckarr){
        var total = 0;
        hascheckarr.forEach((value) => {
            total += value.price * value.buy_count;
        })
        $(".total").text("￥"+total);
    }

    if(username === undefined){
        notLogin();
    }else{
        showcartInfo();
    }
    function renderData(goodslist){
        var cartlistStr = "";
        goodslist.forEach((value) => {
            var tr = "";
            if(value.ischecked === "true"){
                tr = `
                    <tr>
                        <td><input type="checkbox" name="" id="" class="ischecked" data-sku="${value.sku}" checked></td>
                        <td class="text-left">
                            <img src="${value.mainPic}" alt="" class="mainPic">
                            <span class="goodsName">
                            <a href="http://47.115.92.110/lining/html/details.html?classification=${value.classification}&sku=${value.sku}">${value.goodsName}</a>
                            </span>
                        </td>
                        <td><span class="price"></span>￥${value.price}</span></td>
                        <td>
                            <button class="btn minus" data-sku="${value.sku}">&minus;</button>
                            <input type="text" value="${value.buy_count}" class="count">
                            <button class="btn plus" data-sku="${value.sku}">&plus;</button>
                        </td>
                        <td><span class="preferential">￥${value.preferential * value.buy_count}</span></td>
                        <td><span class="subtotal">￥${value.price * value.buy_count}</span></td>
                        <td><span class="deleteGood" data-sku="${value.sku}">删除</span></td>
                    </tr>
                `;
            }else{
                tr = `
                <tr>
                    <td><input type="checkbox" name="" id="" class="ischecked" data-sku="${value.sku}"></td>
                    <td class="text-left">
                        <img src="${value.mainPic}" alt="" class="mainPic">
                        <span class="goodsName">
                        <a href="http://47.115.92.110/lining/html/details.html?classification=${value.classification}&sku=${value.sku}">${value.goodsName}</a>
                        </span>
                    </td>
                    <td><span class="price"></span>￥${value.price}</span></td>
                    <td>
                        <button class="btn minus" data-sku="${value.sku}">&minus;</button>
                        <input type="text" value="${value.buy_count}" class="count">
                        <button class="btn plus" data-sku="${value.sku}">&plus;</button>
                    </td>
                    <td><span class="preferential">￥${value.preferential * value.buy_count}</span></td>
                    <td><span class="subtotal">￥${value.price * value.buy_count}</span></td>
                    <td><span class="deleteGood" data-sku="${value.sku}">删除</span></td>
                </tr>
                `;
            }
            cartlistStr += tr;
        })
        $cartlist.html(cartlistStr);
    }
    function notLogin(){
        var cartfooterStr = `
            <div class="panel-body text-center">
                <h4 class="color-red">您还没登录账号</h4>
            </div>
        `;
        $cartfooter.html(cartfooterStr);
    }
    function cartNull(){
        var cartfooterStr = `
            <div class="panel-body text-center">
                <h4 class="color-red">您还没有添加商品到购物车</h4>
            </div>
        `;
        $cartfooter.html(cartfooterStr);
    }

    $cartlist.on("click", function(e) {
        if(e.target.className.includes("plus")){
            var data_sku = e.target.getAttribute("data-sku");
            item = [];
            $.ajaxSettings.async = false; // 异步变同步
            selectGood(data_sku);
            // 商品加1
            item[0].buy_count++;
            var updateCount = item[0].buy_count;
            buyCount(data_sku, updateCount);
            showcartInfo();
            hascheck()
            $.ajaxSettings.async = true; // 同步变异步
        }else if(e.target.className.includes("minus")){
            var data_sku = e.target.getAttribute("data-sku");
            item = [];
            $.ajaxSettings.async = false; // 异步变同步
            selectGood(data_sku);
            // 商品减1
            item[0].buy_count--;
            if(item[0].buy_count < 1){
                return;
            }
            var updateCount = item[0].buy_count;
            buyCount(data_sku, updateCount)
            showcartInfo();
            hascheck()
            $.ajaxSettings.async = true; // 同步变异步
        }else if(e.target.className.includes("deleteGood")){
            var data_sku = e.target.getAttribute("data-sku");
            romoveCart(data_sku);
            location.reload();
            hascheck()
            showcartInfo();
        }else if(e.target.className.includes("ischecked")){
            var data_sku = e.target.getAttribute("data-sku");
            item = [];
            $.ajaxSettings.async = false; // 异步变同步
            selectGood(data_sku);
            var ischecked = e.target.checked;
            ischeck(data_sku, ischecked);
            hascheck();
            showcartInfo();
            $.ajaxSettings.async = true; // 同步变异步
        }
    })

    $(".removeMany").on("click", function(){
        removeMany();
        location.reload();
        showcartInfo();
    })

    $(".totalBtn").on("click", function(){
        $.ajaxSettings.async = false; // 异步变同步
        hascheck();
        if(hascheckarr.length === 0){
            alert("抱歉，您还没选择商品！");
            return;
        }else(
            location.href="http://47.115.92.110/lining/html/orderInfo.html"
        )
        $.ajaxSettings.async = true; // 同步变异步
    })
})