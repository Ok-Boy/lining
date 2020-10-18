<?php
    header("content-type: text/html;charset=utf-8");
    $username = $_POST["username"];
    $res = $_POST["res"];
    mysql_connect("localhost", "root", "root");
    mysql_select_db("lining");
    $sql = "UPDATE shopcart SET ischecked = '${res}' WHERE username = '$username'";
    $result = mysql_query($sql);
    if($result){
        echo json_encode(array("error" => 0, "msg" => "成功！"));
    }else{
        echo json_encode(array("error" => 1, "msg" => "失败！"));
    }
    mysql_close();
?>