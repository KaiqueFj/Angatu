<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
    <title>Angatu</title>
    <link rel="stylesheet" href="./css/Blog/blog.css">
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

    <section class="header-of-posts">

        <div id="main">
            <div class="date-time">

                <!-- Display the current date and time -->
                <?php
                setlocale(LC_TIME, 'pt_BR',  'pt_BR.utf-8', 'portuguese');

                date_default_timezone_set('America/Sao_Paulo');
                echo " <h3 class='today-time'>Hoje é " . strftime('%A, %d de %B de %Y', strtotime('today  ')) . ' - ' . date('H:i') . " </h3>";
                ?>

            </div>

            <div class="categories">

                <!-- Get Categories -->

                <?php
                $server = "localhost"; // local connection;
                $user = "root";
                $password = "";
                $database = "Angatu";

                $count = 0;
                $max = 4;

                // 2 Create the connection with the database
                $connection = mysqli_connect($server, $user, $password, $database);
                mysqli_set_charset($connection, 'utf8');

                // 3 Verify if the connection is established and working properly

                if (!$connection) {
                    // show the error message and stop the connection
                    die('Error with the connection:' . mysqli_connect_error());
                };

                // Get the category option choose by theuser 

                if (!isset($_GET['search'])) {
                    $data = $_GET['search'];
                    $GetData = "SELECT DISTINCT post_category FROM posts  where post_category LIKE 'Dicas' ORDER BY post_category Limit 10";
                } else {
                    $GetData = 'SELECT DISTINCT post_category FROM posts  ORDER BY post_category DESC Limit 10';
                }
                $Result = mysqli_query($connection, $GetData) or die("Error executing the GetQuery:" . mysqli_connect_error());
                while (($user_data  = mysqli_fetch_array($Result)) and ($count < $max)) {

                    echo "  <a id='link' href='Blog.php?search=" . $user_data['post_category'] . " '> <button class='btn-post'>" . $user_data['post_category'] . " </button></a>";
                    $count++;
                }

                ?>
            </div>

    </section>

    <!-- Create the container for the posts and also displays the search bar -->
    <section id="container">
        <div class="post-container">
            <div id="search-box">
                <input type="search" name="search" id="search" placeholder="Pesquise por um post">
                <button onClick="searchData()" class="btn-post-search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </button>
            </div>

            <h2 class="title">Ultimas postagens</h2>

            <!-- Retrieve the data from the back-end, also, has the query to search for what the user types -->

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


            if (!empty($_GET['search'])) {
                $data = $_GET['search'];
                $GetData = "SELECT  * FROM posts WHERE id_post LIKE '%$data%' OR Post_content LIKE '%$data%' or Post_title LIKE '$data' or post_category LIKE '$data' ORDER BY Release_date DESC Limit 10";

                echo "<h2 class='search-result'> Resultado da busca por:  $data </h2>";
            } else {
                $GetData = 'SELECT*FROM posts  ORDER BY Release_date DESC Limit 10';
            }

            $Result = mysqli_query($connection, $GetData) or die("Error executing the GetQuery:" . mysqli_connect_error());


            while ($user_data = mysqli_fetch_assoc($Result)) {
                echo "<div class='posts'>";
                echo "<img class='post-image' src='assets/" . $user_data['post_image'] . "' height='120px' width='120px'>";
                echo "<p class='post-text'>" . $user_data['Post_title'] . ' - ' . date("d/m/Y", strtotime($user_data['Release_date'])) . "</p>";
                echo "<p class='post-text-2'>" . $user_data['Post_content'] . "</p>";
                echo "<a id='link' href='item.php?id=" . $user_data['id_post'] . "'> <button class='btn-post'>Leia mais</button></a>";
                echo "</div>";
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

<script>
let search = document.getElementById('search');

search.addEventListener("keydown", function(e) {
    if (e.key === 'Enter') {
        searchData();
    }
});

function searchData() {
    window.location = 'Blog.php?search=' + search.value;
}
</script>

}

</html>