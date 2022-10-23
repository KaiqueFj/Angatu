<?php
header("Content-Type: text/html; charset=UTF-8");
$server = "localhost"; // local connection;
$user = "root";
$password = "";
$database = "Angatu";




//1 Get the form values
$Post_title = $_POST['Post_title'];
$Post_category = $_POST['Post_category'];
$Release_date = $_POST['Release_date'];
$Post_content = $_POST['Post_content'];
$filename = $_FILES["post_image"]["name"];
$tempname = $_FILES["post_image"]["tmp_name"];

$folder = "../../Angatu/assets/phpImages/" . $filename;

// Move the temp image file to the images/ directory
move_uploaded_file($tempname, $folder);



// 2 Create the connection with the database
$connection = mysqli_connect($server, $user, $password, $database);
mysqli_set_charset($connection, 'utf8');

// 3 Verify if the connection is established and working properly

if (!$connection) {
    // show the error message and stop the connection
    die('Error with the connection:' . mysqli_connect_error());
}

// Create the data
$Data = "INSERT INTO posts(Post_title, post_category, Release_date,Post_content, post_image ) VALUES 
('$Post_title', '$Post_category','$Release_date','$Post_content', '$folder')";

echo ("Dados enviados com sucesso !");

$Result = mysqli_query($connection, $Data) or die("Error executing the query:" . mysqli_connect_error());