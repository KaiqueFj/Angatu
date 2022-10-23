<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
    <title>Edição dos posts</title>
    <link rel="stylesheet" href="./styles/edit/styles.css">
    <link rel="stylesheet" href="../css/global/global.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" />
    <link rel="icon" href="./assets/HomePage/logo.png">

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


    <section class="container">
        <div id="main">

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

            if (!isset($_POST['post_button'])) {
                $id_post = $_GET['id'];

                // get the data
                $GetData = "SELECT id_post,Post_title, post_category, Release_date,Post_content, post_image FROM posts where id_post = $id_post";

                $Result = mysqli_query($connection, $GetData) or die("Error executing the GetQuery:" . mysqli_connect_error());

                list($id_post, $Post_title, $Post_category, $Release_date, $Post_content, $post_image) = mysqli_fetch_row($Result);
            } else {
                //1 Get the form values

                $id_post = $_POST['id_post'];
                $Post_title = $_POST['Post_title'];
                $Post_category = $_POST['Post_category'];
                $Release_date = $_POST['Release_date'];
                $Post_content = $_POST['Post_content'];
                $filename = $_FILES["post_image"]["name"];
                $tempname = $_FILES["post_image"]["tmp_name"];
                
                $folder = "../../Angatu/assets/phpImages/" . $filename;
                
                $GetData = "UPDATE posts set Post_title='$Post_title',Post_category='$Post_category',Release_date='$Release_date',Post_content='$Post_content',post_image='$folder' WHERE id_post = $id_post";

                $Result = mysqli_query($connection, $GetData) or die("Error executing the GetQuery:" . mysqli_connect_error());
                echo "<h2>Titulo $Post_title Alterado com sucesso!</h2>";
            }

            ?>


            <div class="information">

                <div class="form">
                    <div class="contact-form">
                        <button class="button-return" onClick='history.back()'> <img
                                src="../assets/meditation/Vector.png" alt="left-arrow"></button>

                        <form action="edit.php" method="POST" enctype="multipart/form-data">
                            <h3>Editar dados</h3>

                            <div class="user-box">
                                <label for="">Titulo</label>
                                <input type="text" name="Post_title" value="<?php echo $Post_title; ?>" size="50"><br>
                            </div>



                            <div class="user-box">
                                <label for="">Categoria</label>

                                <input type="text" name="Post_category" value="<?php echo $Post_category; ?>" size="50">
                                <br>

                            </div>

                            <div class="user-box">
                                <label for="">Data de lançamento</label>
                                <input type="date" name="Release_date" value="<?php echo $Release_date; ?>"><br>

                            </div>

                            <div class="user-box">
                                <label for="">Conteúdo</label>
                                <input type="text" name="Post_content" value="<?php echo $Post_content; ?>"><br>

                            </div>

                            <div class="user-box">
                                <label for="">Imagem</label>

                                <input type="file" name="post_image" id="fileToUpload" value="<?php echo $folder; ?>">

                            </div>

                            <input type="hidden" name="id_post" value="<?php echo $id_post ?>">



                            <input type="submit" name="post_button" value="Atualizar" class="btn-send">
                            <p><a href=" listar.php">Voltar</a></p>

                        </form>
                    </div>
                </div>
            </div>
    </section>

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