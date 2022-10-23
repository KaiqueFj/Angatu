<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
    <title>Angatu</title>
    <link rel="stylesheet" href="./styles/insert/styles.css">
    <link rel="stylesheet" href="../css/global/global.css">
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
    <section class="container">

        <div id="main">

            <div class="options">
                <button class="button-return" onClick='history.back()'> <img src="../assets/meditation/Vector.png">
            </div>



            <div class="information">

                <div class="form">
                    <div class="contact-info">
                        <h3 class="title">Bem-vindo administrador</h3>
                        <h4 class="text">insira aqui as informações do post</h4>



                    </div>

                    <div class="contact-form">
                        <form action="inserir.php" method="POST" enctype="multipart/form-data">
                            <h3>Inserir dados</h3>

                            <div class="user-box">
                                <input type="text" name="Post_title" class="input">
                                <label for="">Titulo</label>
                            </div>

                            <div class="user-box">
                                <select name="Post_category">
                                    <option value="">Escolha uma categoria:</option>
                                    <option value="Tecnologia">Tecnologia</option>
                                    <option value="Curiosidades">Curiosidades</option>
                                    <option value="Dicas">Dicas</option>
                                    <option value="Ajuda mental">Ajuda mental</option>

                                </select>
                            </div>

                            <div class="user-box">
                                <input type="date" name="Release_date" class="input">
                            </div>

                            <div class="user-box">
                                <label for="">Conteúdo</label>
                                <textarea name="Post_content" id="textarea" class="input"></textarea>
                            </div>

                            <div class="user-box">
                                <input type="file" name="post_image" id="fileToUpload">
                            </div>

                            <input type="submit" name="post_button" value="Enviar" class="btn-send">
                        </form>




                    </div>
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