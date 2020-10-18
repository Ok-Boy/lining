<?php
    $username = $_POST["username"];
    mysql_connect("localhost", "root", "root");
    mysql_select_db("lining");
    $sql = "SELECT * FROM user WHERE username = '$username'";
    $result = mysql_query($sql);
    $row = mysql_fetch_array($result);
    if($row){
        echo json_encode(array('error' => 1, 'msg' => '用户已存在'));
    }else{
        echo json_encode(array('error' => 0, 'msg' => '用户名通过！'));
    }
    mysql_close();
?>