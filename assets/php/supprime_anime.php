<?php

// FICHIER supprime_anime.php

// verifie la bonne reception de l'indice à supprimer. Si c'est le cas :
if (isset($_POST["idASupp"]) && $_POST["idASupp"] !== "")
{
    // indique pas d'erreur
    $array_res[0] = array(
        'error' => 0
    );

    // récupère le numéro d'indice à supprimer
    $idASupp = $_POST["idASupp"];

    // récupère le contenu d' anime.TXT
    $sContenu = file_get_contents('../txt/anime.txt');

    // explode le résultat obtenu, avec pour symbole séparateur le saut de ligne
    $aOfContenu = explode("\n",$sContenu);

    // supprime la ligne numero 'idASupp'
    array_splice($aOfContenu, $idASupp, 1);
    // unset($aOfContenu[$idASupp]);

    // rebranche les parties du tableau avec implode
    $sNewContenu = implode("\n",$aOfContenu);

    // appliques ce nouveau contenu d' anime.TXT
    file_put_contents("../txt/anime.txt",$sNewContenu);
    
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
