<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
    <title>Angatu</title>
    <link rel="stylesheet" href="./css/item/styles.css">
    <link rel="stylesheet" href="./css/global/global.css">
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
    <link rel="icon" href="./assets/HomePage/logo.png">


</head>

<body>

    <header>

        <nav id="nav">
            <img src="./assets/HomePage/Logo.png" alt="Logo image">
            <a href="index.html" class="logo">Angatu</a>

            <div class="mobile-nav">
                <div class="l1"></div>
                <div class="l2"></div>
                <div class="l3"></div>
            </div>
            <ul class="nav-list">
                <li><a href="index.html">Home</a></li>
                <li><a href="Como Funciona.html">Como funciona</a></li>
                <li><a href="Blog.php?search">Blog</a></li>
                <li><a href="Sobre Nós.html">Sobre nós</a></li>
                <li><a href="contato.html" class="ctn-btn">Contato</a></li>
                <li><a href="Login.html" class="sing-btn">Entrar</a></li>

            </ul>
        </nav>

    </header>

    <section id="container">

        <div id="main">




            <div class="post-container">


                <h2 class="title">Ultimas postagens</h2>


                <!-- Display the posts  -->
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

                if (!isset($_POST['botao'])) {
                    $id_post = $_GET['id'];

                    // get the data
                    $GetData = "SELECT id_post,Post_title, post_category, Release_date,Post_content, post_image FROM posts where id_post = $id_post";

                    $Result = mysqli_query($connection, $GetData) or die("Error executing the GetQuery:" . mysqli_connect_error());

                    list($id_post, $Post_title, $Post_category, $date_Release, $Post_content, $post_image) = mysqli_fetch_row($Result);

                    // get the data
                    $Result = mysqli_query($connection, $GetData) or die("Error executing the GetQuery:" . mysqli_connect_error());


                    echo "

                    <a href='edit.php?category=$Post_category'>Editar</a>
                    
                    <div class='posts'>
                        
                    <img class='post-image' src='phpImages/" . $post_image . "' height='120px' width='120px'>
                    <p class='post-text'>$Post_title - ".date("d/m/Y", strtotime($date_Release))."</p>


                    <p class='post-text-2'>$Post_content</p>
                     <a id='link'><button class='btn-post' onClick='history.back()'> <img src='./assets/meditation/Vector.png'></button></a>

                    </div>

                     ";
                }
                ?>

            </div>
        </div>
        </div>

    </section>


    <footer id="footer">

        <div class="logo-footer">
            <img class="imgFooter" src="./assets/HomePage/Logo.png" alt="Logo Angatu">
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
<script src="./javascript/main.js"></script>

</html>