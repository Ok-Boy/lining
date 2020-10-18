;(function(){
    // 获取ul
    var $uls = $(".list-group");
    // 获取分页组件
    var $pagination = $(".pagination");
    // 定义一个变量用于设置每一页的商品数量
    var dataCount = 24;
    // 定义一个变量用于设置当前页
    var currentPage = 0;
    // 定义一个变量用于设置总共多少页
    let allPage = 0;
    // 定义一个数组用于存放所有数据
    var alldata = [];

    // 获取url
    var urlArr = location.search.slice(1).split("&");
    var searchStr = "";
    // 遍历
    urlArr.forEach(function(value){
        if(value.split("=")[0] === "search"){
            searchStr = value.split("=")[1];
        }
    })
    searchStr = decodeURIComponent(searchStr);
    console.log(searchStr);
    $(function(){
        $.get("http://47.115.92.110/lining/php/search.php", {searchStr: searchStr}, function({error, data}){
            if(!error){
                // 获取所有数据
                alldata = data;
                // 截取数据
                var arr = alldata.slice(currentPage * dataCount, currentPage * dataCount + dataCount);
                // 渲染页面
                renderData(arr);
                // 计算总页数
                allPage = Math.ceil(alldata.length / dataCount);
                // 渲染分页器
                renderPagination(currentPage);
            }else{
                console.log("数据加载失败！");
            }
        }, "json");
    })

    // 渲染页面
    function renderData(arr){
        // 每次渲染页面之前先将页面清空
        for (let i = 0; i < $uls.length; i++){
            $uls[i].innerHTML = "";
        }
        // 循环渲染数据
        for (let i = 0; i < arr.length; i++){
            // 定义一个变量用于存放第i个商品数据
            let item = arr[i];
            // 定义字符串模板
            let str = `
                <li class="list-group-item">
                    <a href="http://47.115.92.110/lining/html/details.html?classification=${item.classification}&sku=${item.sku}">
                        <img src="${item.mainPic}" class="img-responsive">
                        <p class="goodsName">${item.goodsName.slice(0, -9)}</p>
                        <p class="discountPrice text-right">￥${item.discountPrice}</p>
                    </a>
                </li>
            `;
            // 渲染
            $uls[i % 4].innerHTML += str;
        }
    }
    // 分页器
    function renderPagination(currentPage){
        // 显示当前页从第几件商品到第几件商品及总商品数量
        let showNum = `
            <span>显示${currentPage * dataCount + 1} - ${currentPage * dataCount + dataCount}个产品（共${alldata.length}个）</span>
        `;
        // 首页
        let firstPage = `<span class="firstPage">首页</span>`;
        // 上一页
        let prevPage = `<span class="prevPage">上一页</span>`;
        // 页码
        let pageNum = "";
        // 如果总页数小于等于6
        if(allPage <= 6){
            // 设置页码
            for (let i = 1; i <= allPage; i++){
                pageNum += `<span class="pageNum">${i}</span>`;
            }
        }else if(allPage > 6){
            // 如果总页数大于6
            // 如果当前页小于5时
            if((currentPage + 1) < 5){
                let pageSix = "";
                // 设置1-6页码
                for (let i = 1; i <= 6; i++){
                    pageSix += `<span class="pageNum">${i}</span>`;
                }
                // 设置最后一页
                let pageLast = `<span class="pageNum">${allPage}</span>`;
                // 页码拼接
                pageNum = pageSix + "..." + pageLast;
            }else if((currentPage + 1) >= 5){
                // 如果当前页大于等于5时
                // 设置第一页
                let firstPage = `<span class="pageNum">1</span>`;
                // 设置当前页的前两页
                let prevTwo = "";
                for (let i = currentPage -1 ; i < currentPage + 1; i++){
                    prevTwo += `<span class="pageNum">${i}</span>`;
                }
                // 设置当前页
                let nowPage = `<span class="pageNum">${currentPage + 1}</span>`
                // 设置当前页的后两页
                let nextTwo = "";
                for (let i = currentPage + 2 ; i < currentPage + 4; i++){
                    nextTwo += `<span class="pageNum">${i}</span>`;
                }
                // 设置最后一页
                let pageLast = `<span class="pageNum">${allPage}</span>`;
                // 页码拼接
                pageNum = firstPage + "..." + prevTwo + nowPage + nextTwo + "..." + pageLast;
            }
        }
        // 下一页
        let nextPage = `<span class="nextPage">下一页</span>`;
        // 末页
        let lastPage = `<span class="lastPage">末页</span>`;
        // 当前页
        let nowPage = `<span class="nowPage">当前页${currentPage + 1}</span>`
        // 总页数
        let allPageNum = `<span class="allPageNum">共${allPage}页</span>`; 

        // 拼接
        let pageBtn = showNum + firstPage + prevPage + pageNum + nextPage + lastPage + nowPage + allPageNum;
        // 渲染
        $pagination.html(pageBtn);
    }
    // 分页器点击事件
    $pagination.on("click", function(e){
        // 上一页
        if(e.target.className === "prevPage"){
            currentPage--;
            if(currentPage < 0){
                currentPage = 0;
                return;
            }
            var arr = alldata.slice(currentPage * dataCount, currentPage * dataCount + dataCount);
            // 渲染页面
            renderData(arr);
            // 渲染分页器
            renderPagination(currentPage);
        }else if(e.target.className === "nextPage"){
            // 下一页
            currentPage++;
            if(currentPage > allPage){
                currentPage = allPage;
                return;
            }
            var arr = alldata.slice(currentPage * dataCount, currentPage * dataCount + dataCount);
            // 渲染页面
            renderData(arr);
            // 渲染分页器
            renderPagination(currentPage);
        }else if(e.target.className === "firstPage"){
            // 首页
            currentPage = 0;
            var arr = alldata.slice(currentPage * dataCount, currentPage * dataCount + dataCount);
            // 渲染页面
            renderData(arr);
            // 渲染分页器
            renderPagination(currentPage);
        }else if(e.target.className === "lastPage"){
            currentPage = allPage - 1;
            var arr = alldata.slice(currentPage * dataCount, currentPage * dataCount + dataCount);
            // 渲染页面
            renderData(arr);
            // 渲染分页器
            renderPagination(currentPage);
        }else if(e.target.className === "pageNum"){
            // 页码
            if(currentPage === e.target.innerHTML - 1){
                return;
            }
            currentPage = e.target.innerHTML - 1;
            var arr = alldata.slice(currentPage * dataCount, currentPage * dataCount + dataCount);
            // 渲染页面
            renderData(arr);
            // 渲染分页器
            renderPagination(currentPage);
        }
    })
})();
