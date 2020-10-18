$(function(){
    var username = $.cookie("username");
    var $new_address = $(".new_address");
    var $recipient_information_box = $(".recipient_information_box");
    var $new_address_save = $(".new_address_save");
    var $new_address_close = $(".new_address_close");
    var $coupon_btn = $(".coupon_btn");
    var $coupon_box = $(".coupon_box");
    var $freeCard_btn = $(".freeCard_btn");
    var $freeCard_box = $(".freeCard_box");
    var $cartlist = $(".cartlist");
    var $accounts_list = $(".accounts_list");
    var $total = $(".total");
    var province = document.getElementById("province");
    var cities = document.getElementById("cities");
    var county = document.getElementById("county");

    // 展开“使用新地址”
    $new_address.on("click", function(){
        $recipient_information_box.removeClass("hidden");
    })
    // 关闭“使用新地址”
    $new_address_close.on("click", function(){
        $recipient_information_box.addClass("hidden");
    })
    // 展开或关闭优惠券
    $coupon_btn.on("click", function(){
        if($(this).hasClass("isClose")){
            $(this).removeClass("isClose");
            $coupon_box.removeClass("hidden");
        }else{
            $(this).addClass("isClose");
            $coupon_box.addClass("hidden");
        }
    })
    // 展开或关闭免邮卡
    $freeCard_btn.on("click", function(){
        if($(this).hasClass("isClose")){
            $(this).removeClass("isClose");
            $freeCard_box.removeClass("hidden");
        }else{
            $(this).addClass("isClose");
            $freeCard_box.addClass("hidden");
        }
    })
    $new_address_save.on("click", function(){
        var $consignee = $(".consignee").val();
        var $province = $(".province").val();
        var $cities = $(".cities").val();
        var $county = $(".county").val();
        var $address = $(".address").val();
        var $mobile = $(".mobile").val();
        if($consignee === "" || $province === "" || $cities === "" || $county === "" || $address === "" || $mobile === ""){
            alert("抱歉，您输入的地址信息不全")
        }else{
            var addressStr = $consignee + "&" + $province + "&" + $cities + "&" + $county + "&" + $address + "&" + $mobile;

        }
    })
    // 渲染商品列表
    function renderData(hascheckarr){
        var cartlistStr = "";
        hascheckarr.forEach((value) => {
            cartlistStr += `<tr>
            <td class="text-left">
                <img src="${value.mainPic}"
                    alt="" class="mainPic">
                <span class="goodsName">
                <a href="http://47.115.92.110/lining/html/details.html?classification=${value.classification}&sku=${value.sku}">
                    ${value.goodsName}
                </a>
                </span>
            </td>
            <td>
                <span class="price">￥${value.price}</span>
            </td>
            <td>
                <span class="num">${value.buy_count}</span>
            </td>
            <td>
                <span class="preferential">￥${value.preferential * value.buy_count}</span>
            </td>
            <td>
                <span class="subtotal">￥${value.price * value.buy_count}</span>
            </td>
        </tr>`;
        })
        $cartlist.html(cartlistStr);
    }

    // 三级联动
    function addressfun(arr){
        // 根据数据渲染 省
        for (var i = 0; i < arr.length; i++){
            var option = document.createElement("option");
            option.value = arr[i].name;
            option.innerHTML = arr[i].name;
            province.appendChild(option);
        }
    
        // 给省选择框添加事件
        province.onchange = function(){
            // 清除城市和区的内部数据
            cities.innerHTML = '<option value="">--请选择--</option>';
            county.innerHTML = '<option value="">--请选择--</option>';
            // 获取value值
            var provinceName = this.value;
            // 获取到省的名称后，根据省的名称找到对应的城市
            var arr1 = arr.filter(function(value){
                return value.name === provinceName;
            });
            // arr1 现在是一个数组，数组里面放着我们选择到的省份的信息
            var provinceInfoObj = arr1[0];
            var city = provinceInfoObj["city"];
            // 如果选择的是 --请选择-- 肯定找不到数据 provinceInfoObj 就是一个 undefined
            if(!provinceInfoObj){
                // 重置城市和区
                cities.innerHTML = '<option value="">--请选择--</option>';
                county.innerHTML = '<option value="">--请选择--</option>';
                return;
            }
            // 如果代码可以执行到这里，说明选择的是有效数据
            // 循环这个city 渲染城市下拉框
            city.forEach(function(value){
                var option = document.createElement("option");
                option.value = value.name;
                option.innerHTML = value.name;
                cities.appendChild(option);
            })
        }
        // 给城市添加选择事件
        cities.onchange = function(){
            county.innerHTML = '<option value="">--请选择--</option>';
            // 获取到城市的名字
            var cityName = this.value;
            // 获取省的名字
            var provinceName = province.value;
            // 根据省获取省份信息
            var arr1 = arr.filter(function(value){
                return value.name === provinceName;
            })
            // 获取省份的信息对象
            var provinceInfoObj = arr1[0];
            // 获取省份的城市数组
            var city = provinceInfoObj["city"];
            // 根据城市数组和我们选中的城市名称，查找对应的城市信息
            var arr2 = city.filter(function(value){
                return value.name === cityName;
            })
            // 获取城市的信息对象
            var cityInfoObj = arr2[0];
            if(!cityInfoObj){
                return;
            }
            // 获取城市的区数组
            var countyArr = cityInfoObj["area"];
            countyArr.forEach(function(value){
                var option = document.createElement("option");
                option.value = value;
                option.innerHTML = value;
                county.appendChild(option);
            })
        }
    }

    // 渲染结算清单
    function listfun(hascheckarr){
        var zongjia = 0;
        var youhui = 0;
        hascheckarr.forEach((value) => {
            zongjia += value.price * value.buy_count;
            youhui += value.preferential * value.buy_count;
        })
        var accounts_list_str = `
            <p>商品金额：<span>${zongjia}</span></p>
            <p>优惠：<span>-${youhui}</span></p>
            <p>优惠券：<span>-0.00</span></p>
            <p>余额：<span>-0.00</span></p>
            <p>红包：<span>-0.00</span></p>
            <p>（中国大陆满280.00元免邮）运费：<span>0.00</span></p>
        `;
        $accounts_list.html(accounts_list_str);
        var totalStr = `${zongjia}`;
        $total.html(totalStr);
    }

    // 发送请求
    $.get("http://47.115.92.110/lining/php/hascheck.php", {username: username}, function({error, data}){
        if(!error){
            hascheckarr = data;
            renderData(hascheckarr);
            listfun(hascheckarr)
        }else{
            console.log(data);
        }
    }, 'json')

    $.ajax({
        url: 'http://47.115.92.110/lining/resource/json/address.json',
        type: 'get',
        dataType: 'json',
        success(data){
            arr = data;
            addressfun(arr);
        },
        error(){
            console.log("数据加载失败");
        },
        complete(){
            console.log("请求结束");
        }
    })
})