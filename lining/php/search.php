<?php
    $searchStr = $_GET["searchStr"];
    mysql_connect("localhost", "root", "root");
    mysql_select_db("lining");
    $sql = "SELECT * FROM productlist WHERE goodsName like '%$searchStr%'";
    $result = mysql_query($sql);
    $arr = array();
    while($row = mysql_fetch_array($result)){
        array_push($arr, $row);
    }
    echo json_encode(array("error" => 0, "data" => $arr));
    mysql_close();
?>