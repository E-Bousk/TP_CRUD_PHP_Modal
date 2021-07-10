<?php

// FICHIER edit_anime.php

// verifie que tous les champs soient remplis (et reçus). Si c'est le cas :
if ((isset($_POST["ID_Anim"]) && $_POST["ID_Anim"] !== "ID_") && (isset($_POST["Titre"]) && $_POST["Titre"] !== "") && (isset($_POST["Kanji"]) && $_POST["Kanji"] !== "") && (isset($_POST["Jap"]) && $_POST["Jap"] !== "") && (isset($_POST["Reali"]) && $_POST["Reali"] !== "") && (isset($_POST["Annee"]) && $_POST["Annee"] !== ""))
{
    // indique pas d'erreur
    $array_res[0] = array(
        'error' => 0
    );


    // ouvre anime.TXT et récupère les données dans $sContenu
    $sContenu= file_get_contents("../txt/anime.txt");

    // concatène les nouvelles valeurs reçues dans $nouvelleEntree (avec un saut de ligne au début)
    $nouvelleEntree= "\n".$_POST["ID_Anim"];
    $nouvelleEntree .= ":::".$_POST["Titre"];
    $nouvelleEntree .= ":::".$_POST["Kanji"];
    $nouvelleEntree .= ":::".$_POST["Jap"];
    $nouvelleEntree .= ":::".$_POST["Reali"];
    $nouvelleEntree .= ":::".$_POST["Annee"].":::";

    // récupère les valeurs à remplacer
    $ancienneEntree=  $_POST["ancienneEntree"];

    // remplace les valeurs
    $remplacement= str_replace($ancienneEntree, $nouvelleEntree, $sContenu);

    // appliques ce nouveau contenu à anime.TXT
    file_put_contents("../txt/anime.txt",$remplacement);
   
    // renvoie à la page JS le tableau avec erreur=0
    echo json_encode ($array_res);
}

// sinon (s'il manque un(des) champs et/ou pas reçu(s))
else
{
    // indique erreur
    $array_res[0] = array(
        'error' => 1
    );

    // renvoie à la page JS le tableau avec erreur=1
    echo json_encode ($array_res);
}

?> 