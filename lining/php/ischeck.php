<?php
    header("content-type: text/html;charset=utf-8");
    $username = $_POST["username"];
    $sku = $_POST["sku"];
    $ischecked = $_POST["ischecked"];
    mysql_connect("localhost", "root", "root");
    mysql_select_db("lining");
    $sql = "UPDATE shopcart SET ischecked = '$ischecked' WHERE username = '$username' AND sku = '$sku'";
    $result = mysql_query($sql);
    if($result){
        echo json_encode(array("error" => 0, "msg" => "成功！"));
    }else{
        echo json_encode(array("error" => 1, "msg" => "失败！"));
    }
    mysql_close();
?>