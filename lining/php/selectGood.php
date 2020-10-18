<?php
    $username = $_GET["username"];
    $sku = $_GET["sku"];

    mysql_connect("localhost", "root", "root");
    mysql_select_db("lining");
    $sql = "SELECT * FROM shopcart WHERE username='$username' AND sku='$sku'";
    $result = mysql_query($sql);
    $arr = array();
    while($row = mysql_fetch_array($result)){
        array_push($arr, $row);
    }
    echo json_encode(array("error" => 0, "data" => $arr));
    mysql_close();
?>