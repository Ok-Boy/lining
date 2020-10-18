<?php
    header("content-type: text/html;charset=utf-8");
    $username = $_POST["username"];
    $sku = $_POST["sku"];
    $price = $_POST["price"];
    $buy_count = $_POST["buy_count"];
    $goodsName = $_POST["goodsName"];
    $mainPic = $_POST["mainPic"];
    $preferential = $_POST["preferential"];
    $classification = $_POST["classification"];
    mysql_connect("localhost", "root", "root");
    mysql_select_db("lining");
    $sql = "INSERT INTO 
        shopcart (username, sku, price, buy_count, goodsName, mainPic, preferential, classification) 
        VALUES('$username', '$sku', '$price', '$buy_count', '$goodsName', '$mainPic', '$preferential', '$classification')";
    $result = mysql_query($sql);
    if($result){
        echo json_encode(array("error" => 0, "msg" => "商品加入购物车成功！"));
    }else{
        echo json_encode(array("error" => 1, "msg" => "商品加入购物车失败！"));
    }
    mysql_close();
?>