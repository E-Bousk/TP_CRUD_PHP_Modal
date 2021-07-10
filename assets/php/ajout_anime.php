<?php

// FICHIER ajout_anime.php

// verifie que tous les champs soient remplis (et reçus). Si c'est le cas :
if ((isset($_POST["ID_Anim"]) && $_POST["ID_Anim"] !== "ID_") && (isset($_POST["Titre"]) && $_POST["Titre"] !== "") && (isset($_POST["Kanji"]) && $_POST["Kanji"] !== "") && (isset($_POST["Jap"]) && $_POST["Jap"] !== "") && (isset($_POST["Reali"]) && $_POST["Reali"] !== "") && (isset($_POST["Annee"]) && $_POST["Annee"] !== ""))
{
    // indique pas d'erreur
    $array_res[0] = array(
        'error' => 0
    );

    // concatène les valeurs reçues dans $nouvelleEntree (avec un saut de ligne au début)
    $nouvelleEntree ="\n".$_POST["ID_Anim"];
    $nouvelleEntree .=":::".$_POST["Titre"];
    $nouvelleEntree .=":::".$_POST["Kanji"];
    $nouvelleEntree .=":::".$_POST["Jap"];
    $nouvelleEntree .=":::".$_POST["Reali"];
    $nouvelleEntree .=":::".$_POST["Annee"].":::";
    
    // ouvre anime.TXT et ajoute les valeurs récupérées (en fin de fichier avec 'FILE_APPEND')
    file_put_contents("../txt/anime.txt", $nouvelleEntree, FILE_APPEND);
    
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
