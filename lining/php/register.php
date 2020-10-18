<?php
    header("content-type: text/html;charset=utf-8");
    $username = $_POST["username"];
    $password = $_POST["password"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    mysql_connect("localhost", "root", "root");
    mysql_select_db("lining");
    $sql = "INSERT INTO user VALUES ('$username', '$password', '$phone', '$email')";
    $result = mysql_query($sql);
    if($result){
        echo json_encode(array("error" => 0, "msg" => "注册成功！"));
    }else{
        echo json_encode(array("error" => 1, "msg" => "注册失败！"));
    }
    mysql_close();
?>