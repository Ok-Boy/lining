<?php
    $username = $_POST["username"];
    $sku = $_POST["sku"];

    mysql_connect("localhost", "root", "root");
    mysql_select_db("lining");
    $sql = "DELETE FROM shopcart WHERE username='$username' AND sku='$sku'";
    $result = mysql_query($sql);
    if($result){
        echo json_encode(array("error" => 0, "msg" => "删除成功！"));
    }else{
        echo json_encode(array("error" => 1, "msg" => "删除失败！"));
    }
    mysql_close();
?>