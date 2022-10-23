<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Remover elemento</title>
</head>

<body>
    <button class="button-Return" onClick='history.back()'> <img src="../assets/meditation/Vector.png" style="
  background: transparent;
  border: none;
  text-align: left !important;
  padding-left: 1.2rem;    ">

</body>

</html>

<?php
header("Content-Type: text/html; charset=UTF-8");
$server = "localhost"; // local connection;
$user = "root";
$password = "";
$database = "Angatu";

$id_post = $_GET['id'];
$connection = mysqli_connect($server, $user, $password, $database);
mysqli_set_charset($connection, 'utf8');

// 3 Verify if the connection is established and working properly

if (!$connection) {
    // show the error message and stop the connection
    die('Error with the connection:' . mysqli_connect_error());
}

$Data = "DELETE FROM posts where id_post = $id_post";
$Result = mysqli_query($connection, $Data) or die("Error executing the query:" . mysqli_connect_error());
echo "<h2> O post foi removido com sucesso !</h2>:";

?>