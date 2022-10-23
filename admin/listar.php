<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
    <title>Angatu</title>
    <link rel="stylesheet" href="../css/global/global.css">
    <link rel="stylesheet" href="../admin/styles/getInformation/styles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" />
    <link rel="icon" href="../assets/HomePage/logo.png">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">

</head>

<body>


    <header>

        <nav id="nav">
            <img src="../assets/HomePage/Logo.png" alt="Logo image">
            <a href="../index.html" class="logo">Angatu</a>

            <div class="mobile-nav">
                <div class="l1"></div>
                <div class="l2"></div>
                <div class="l3"></div>
            </div>
            <ul class="nav-list">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../Como Funciona.html">Como funciona</a></li>
                <li><a href="../Blog.php?search">Blog</a></li>
                <li><a href="../Sobre Nós.html">Sobre nós</a></li>
                <li><a href="../contato.html" class="ctn-btn">Contato</a></li>
                <li><a href="../Login.html" class="sing-btn">Entrar</a></li>

            </ul>
        </nav>

    </header>


    <div class="options">
        <button class="button-Return" onClick='history.back()'> <img src="../assets/meditation/Vector.png">
    </div>

    <table class="table">
        <thead>

            <tr>
                <th>ID</th>
                <th>Titulo</th>
                <th>Categoria</th>
                <th>Data de publicação</th>
                <th>Imagem</th>
                <th>Opções</th>
            </tr>
        </thead>



        <tbody>

            <?php
            $server = "localhost"; // local connection;
            $user = "root";
            $password = "";
            $database = "Angatu";


            // 2 Create the connection with the database
            $connection = mysqli_connect($server, $user, $password, $database);
            mysqli_set_charset($connection, 'utf8');

            // 3 Verify if the connection is established and working properly

            if (!$connection) {
                // show the error message and stop the connection
                die('Error with the connection:' . mysqli_connect_error());
            };

            // get the data
            $GetData = "SELECT id_post,Post_title, post_category, Release_date,Post_content, post_image FROM posts ORDER BY Release_date DESC";

            $Result = mysqli_query($connection, $GetData) or die("Error executing the GetQuery:" . mysqli_connect_error());

            // Display the information in the table area 
            while (list($id_post, $Post_title, $Post_category, $Release_date, $Post_content, $post_image) = mysqli_fetch_row($Result)) {
                echo "
            <tr>
            <td> $id_post</td>
            <td> $Post_title</td>
            <td> $Post_category</td>
            <td> " . date("d/m/Y", strtotime($Release_date)) . "</td>
            <td> <img src= '" . $post_image . "' height='120px' width='120px' ></td>
            <td>
            <a href='edit.php?id=$id_post'><img src='./assets/icons8-edit.svg'></a>
            <a href='remove.php?id=$id_post'><img src='./assets/icons8-trash.svg'></a>
            </td>
            
            </tr>";
            }

            ?>
        </tbody>
    </table>



    <footer id="footer">

        <div class="logo-footer">
            <img class="imgFooter" src="../assets/HomePage/Logo.png" alt="Logo Angatu">
            <h2 class="logoName">Angatu</p>
        </div>



        <div class="footer_socials">
            <a href="#" class="footer_icone">
                <i class='bx bxl-facebook-circle'></i>
            </a>
            <a href="# " class="footer_icone">
                <i class='bx bxl-instagram'></i>
            </a>
            <a href="#" class="footer_icone">
                <i class='bx bxl-youtube'></i>
            </a>

        </div>


        <p class="foot-p"> © 2022 Angatu copyright all right reserved</p>

    </footer>

    </div>

</body>

<script src="../javascript/focus-input.js"></script>
<script src="../javascript/main.js"></script>



</html>