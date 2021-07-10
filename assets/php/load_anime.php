<?php

// FICHIER load_anime.php

// ouvre anime.TXT et récupère les données dans $sContenu
$sContenu= file_get_contents("../txt/anime.txt");
/* 
RÉSULTAT : 
ID_01:::Le Château dans le ciel:::天空の城ラピュタ:::Tenkū no shiro Rapyuta:::Hayao Miyazaki:::1986\n
ID_02:::Mon voisin Totoro:::となりのトトロ:::Tonari no Totoro:::Hayao Miyazaki:::1988\n
ID_03:::Le Tombeau des lucioles:::火垂るの墓:::Hotaru no haka:::Isao Takahata:::1988\n
*/

// créé un tableau $aOflines avec les données en le découpant par le saut de ligne
$aOflines= explode("\n", $sContenu);
/* 
RÉSULTAT : 
$aOflines[0]= "ID_01:::Le Château dans le ciel:::天空の城ラピュタ:::Tenkū no shiro Rapyuta:::Hayao Miyazaki:::1986"
$aOflines[1]= "ID_02:::Mon voisin Totoro:::となりのトトロ:::Tonari no Totoro:::Hayao Miyazaki:::1988"
$aOflines[2]= "ID_03:::Le Tombeau des lucioles:::火垂るの墓:::Hotaru no haka:::Isao Takahata:::1988"
*/

// créé un tableau structuré $aOfDonnes avec aOflines en le découpant par la chaine ':::'
$aOfDonnes= [];
for ($i=0; $i<count($aOflines); $i++)	
{
	list($ID_Anim, $Titre, $Kanji, $Jap, $Reali, $Annee)= explode(":::", $aOflines[$i]);
	$aOfDonnes[$i]["ID_Anim"]= $ID_Anim;
	$aOfDonnes[$i]["Titre"]= $Titre;
	$aOfDonnes[$i]["Kanji"]= $Kanji;
    $aOfDonnes[$i]["Jap"]= $Jap;
	$aOfDonnes[$i]["Reali"]= $Reali;
	$aOfDonnes[$i]["Annee"]= $Annee;
}
/* 
RÉSULTAT :
$aOfDonnes[0]["ID_Anim"]= ID_01
$aOfDonnes[0]["Titre"]= Le Château dans le ciel
$aOfDonnes[0]["Kanji"]= 天空の城ラピュタ
$aOfDonnes[0]["Jap"]= Tenkū no shiro Rapyuta
$aOfDonnes[0]["Reali"]= Hayao Miyazaki
$aOfDonnes[0]["Annee"]= 1986
$aOfDonnes[1]["ID_Anim"]= ID_02
$aOfDonnes[1]["Titre"]= Mon voisin Totoro
$aOfDonnes[1]["Kanji"]= となりのトトロ
[...]
$aOfDonnes[2]["Annee"]= 1988
*/

// renvoie le tableau de données à la page .JS
echo json_encode($aOfDonnes);
/* 
RÉSULTAT :
[
{"ID_Anim":"ID_01","Titre":"Le Ch\u00e2teau dans le ciel","Kanji":"\u5929\u7a7a\u306e\u57ce\u30e9\u30d4\u30e5\u30bf","Jap":"Tenk\u016b no shiro Rapyuta","Reali":"Hayao Miyazaki","Annee":"1986\r"},
{"ID_Anim":"ID_02","Titre":"Mon voisin Totoro","Kanji":"\u3068\u306a\u308a\u306e\u30c8\u30c8\u30ed","Jap":"Tonari no Totoro","Reali":"Hayao Miyazaki","Annee":"1988\r"},
{"ID_Anim":"ID_03","Titre":"Le Tombeau des lucioles","Kanji":"\u706b\u5782\u308b\u306e\u5893","Jap":"Hotaru no haka","Reali":"Isao Takahata","Annee":"1988\r"}
]
*/

?>
