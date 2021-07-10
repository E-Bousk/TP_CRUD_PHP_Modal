// ///////////////////////////////////////////////////
// Création tableau de background-images pour affichage aléatoire
// ///////////////////////////////////////////////////
var imagesFond = ["background1.jpg", "background2.png", "background3.jpg", "background5.jpg", "background6.jpg"];
$("body").css({"background": "url(./assets/img/" + imagesFond[Math.floor(Math.random() * imagesFond.length)] + ") no-repeat center fixed", "background-size": "cover" });
var imagesModal = ["background3.jpg", "background5.jpg", "background7.jpg", "background8.jpg", "background9.jpg", "background10.jpg"];
$(".modal-body").css({"background-image": "url(./assets/img/" + imagesModal[Math.floor(Math.random() * imagesModal.length)] + ")" });
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// ////////// fonction constructTable() //////////////
// ///////////////////////////////////////////////////
// Construction du tableau en HTML
var aGhibli=[];
function constructTable()	
{
    var sHTML= "<thead>";
    sHTML+= "<tr>";
    sHTML+= "<td>ID</td>";
    sHTML+= "<td>Titre</td>";
    sHTML+= "<td>Titre en Kanji</td>";
    sHTML+= "<td>Réalisateur</td>";
    sHTML+= "<td>Année</td>";
    sHTML+= "<td>Editer</td>";
    sHTML+= "<td>Supprimer</td>";
    sHTML+= "</tr>";
    sHTML+= "</thead>";
    sHTML+= "<tbody>";
    
    //boucle dans variable structurée pour récuperer les données
    for (var i=0; i<aGhibli.length; i++)	
    {
        sHTML+= "<tr>";
        sHTML+= "<td>" + aGhibli[i]["ID_Anim"] + "</td>";
        sHTML+= "<td>" + aGhibli[i]["Titre"] + "</td>";
        sHTML+= "<td>" + aGhibli[i]["Kanji"] + "</td>";
        sHTML+= "<td>" + aGhibli[i]["Reali"] + "</td>";
        sHTML+= "<td>" + aGhibli[i]["Annee"] + "</td>";
        sHTML+= "<td data-bs-toggle=\"modal\" data-bs-target=\"#Modal\" onClick=\"editAnime(" + i + ")\"><img src=\"./assets/img/edit.png\" alt=\"edit\"></td>";
        sHTML+= "<td data-bs-toggle=\"modal\" data-bs-target=\"#Modal\" onClick=\"supprimAnim(" + i + ")\"><img src=\"./assets/img/delete.png\" alt=\"delete\"></td>";
        sHTML+= "</tr>";
    }
    sHTML+= "</tbody>";
    
    //affichage du tableau dans la <section><table id="table_film">
    $("#table_anime").html(sHTML);
}
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// /////////// fonction creerDataTable() /////////////
// ///////////////////////////////////////////////////
// pour créer le tableau DataTable
function creerDataTable()
{
    tables.clear(); 
    tables.destroy(); 
    constructTable();
    tables = $("#table_anime").DataTable(configuration);
}
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// ////////////// fonction loadAnim() ////////////////
// ///////////////////////////////////////////////////
function loadAnim()    
{
    // Affiche un GIF "chargement de la page"
    $("#working").show();

    $.ajax(
    {
        type: "GET", // method='GET' au lieu de 'POST' car rien ne sera envoyé
        url: "./assets/php/load_anime.php", // action="load_anime.php"
        async: true, // permet synchrone ou asynchrone plusieurs appels JS vers des PHP
        // data: datas, // pas besoin de cette ligne car rien ne sera envoyé
        dataType: "json", // format attendu du retour du PHP
        cache: false, // a ne jamais changer, pas de cache
    })

    .done(function(result) 
    {
        var iAnim= 0;
        for (var ligne in result)    
        {
            // je reconstruis mon tableau local en JS
            aGhibli[iAnim]= [];
            aGhibli[iAnim]["ID_Anim"]= result[ligne]["ID_Anim"];
            aGhibli[iAnim]["Titre"]= result[ligne]["Titre"];
            aGhibli[iAnim]["Kanji"]= result[ligne]["Kanji"];
            aGhibli[iAnim]["Jap"]= result[ligne]["Jap"];
            aGhibli[iAnim]["Reali"]= result[ligne]["Reali"];
            aGhibli[iAnim]["Annee"]= result[ligne]["Annee"];
            iAnim++;
        }
        
        // INIT DATATABLE :
        constructTable();
        tables = $("#table_anime").DataTable(configuration);

        // enlève le GIF "chargement de la page"
        $("#working").hide();
    })

    .fail(function(err) 
    {
        // Affichage d'erreur
        alert("error : " + err.status);

        // enlève le GIF "chargement de la page"
        $("#working").hide();
    });
}
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// ////////// fonction viderChampsInput() ////////////
// ///////////////////////////////////////////////////
// pour vider les champs input
function viderChampsInput()
{
    // vide les champs input
    $("#ID_Anim").val("");
    $("#Titre").val("");
    $("#Kanji").val("");
    $("#Jap").val("");
    $("#Reali").val("");
    $("#Annee").val("");
}
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// ///////// fonction afficheFormulaire() ////////////
// ///////////////////////////////////////////////////
function afficheFormulaire()
{
    // vide les champs input
    viderChampsInput();

    //Titre modal
    $("#ModalLabel").html("Ajouter un nouvel animé");
    $(".modal-header").css({"background-color": "blue", "color": "white"});

    //Couleurs du footer
    $(".modal-footer").css({"background-color": "blue", "color": "white"});

    // Inputs du modal
    $("#modalText").html("<div id=\"input\" class=\"hide\"><p>ID# :<br> <input type=\"text\" name=\"ID_Anim\" id=\"ID_Anim\" readonly></p><p>Titre :<br><input type=\"text\" name=\"Titre\" id=\"Titre\"></p><p>Titre en kanji :<br><input type=\"text\" name=\"Kanji\" id=\"Kanji\"></p><p>Titre en Japonais :<br><input type=\"text\" name=\"Jap\" id=\"Jap\"></p><p>Réalisateur :<br><input type=\"text\" name=\"Reali\" id=\"Reali\"></p><p>Année :<br><input type=\"number\" name=\"Annee\" id=\"Annee\"></p></div>")


    //affiche les inputs et boutton confirmation ajouter, cache message (eventuel) et autres bouttons confirmation
    $("#ID_Anim").val("ID_" + (aGhibli.length+1));
    $("#input").show();
    $("#message").hide();
    $("#btn_confAjouter").show();
    $("#btn_confEdit").hide();
    $("#btn_confSupp").hide();
}
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// ///////////// fonction ajoutAnim() ////////////////
// ///////////////////////////////////////////////////
function ajoutAnim()
{
    // Affiche un GIF "chargement de la page"
    $("#working").show();
           
    /* 'var datas' est l'equivalent de :
    <form method="POST" action="load_anime.php">
        <input type="text" name="ID_Anim" value=""></input>
        <input type="text" name="Titre" value=""></input>
        <input type="text" name="Kanji" value=""></input>
        <input type="text" name="Jap" value=""></input>
        <input type="text" name="Reali" value=""></input>
        <input type="text" name="Annee" value=""></input>
    </form>
    */
    var datas = 
    {
        ID_Anim: $("#ID_Anim").val(),
        Titre: $("#Titre").val(),
        Kanji: $("#Kanji").val(),
        Jap: $("#Jap").val(),
        Reali: $("#Reali").val(),
        Annee: $("#Annee").val(),
    }

    $.ajax(
    {
        type: "POST", // method="POST"
        url: "./assets/php/ajout_anime.php", // action="load_anime.php"
        async: true, // permet synchrone ou asynchrone plusieurs appels JS vers des PHP
        data: datas, // Je passe ma lise de variables à envoyer (datas)
        dataType: "json", // format attendu du retour du PHP
        cache: false, // a ne jamais changer, pas de cache
    })

    .done(function(result) 
    {
        var i= 0;
        var aError= [];
        for (var ligne in result)    
        {
            // je reconstruis mon tableau erreur
            aError[i]= [];
            aError[i]["error"]= result[ligne]["error"];
            i++;
        }
        
        if (aError[0]["error"] == 0)
        {
            //recuperation de l'indice à ajouter (car length = dernier indice+1)
            var iNew= aGhibli.length;
            aGhibli[iNew]= [];
            aGhibli[iNew]["ID_Anim"]= $("#ID_Anim").val();
            aGhibli[iNew]["Titre"]= $("#Titre").val();
            aGhibli[iNew]["Kanji"]= $("#Kanji").val();
            aGhibli[iNew]["Jap"]= $("#Jap").val();
            aGhibli[iNew]["Reali"]= $("#Reali").val();
            aGhibli[iNew]["Annee"]= $("#Annee").val();

            // (re)creation du tableau DataTable
            creerDataTable();

            // vide les champs input
            viderChampsInput();

            // confirme edition reussie
            $("#message").show();
            $("#message").html("<img class=\"img_warning\" src=\"assets/img/validation.png\" alt=\"réussite\"></img>" + "Les données ont bien été ajoutées");

            // enlève le GIF "chargement de la page"
            $("#working").hide();
        }

        else 
        {
            // affiche un message d'erreur
            $("#message").show();
            $("#message").html("<img class=\"img_warning\" src=\"assets/img/warning.png\" alt=\"attention\"></img>" + "Veuillez saisir tous les champs");
            
            // enlève le GIF "chargement de la page"
            $("#working").hide();
        }
    })

    .fail(function(err) 
    {
        // Affichage d'erreur
        alert("error : " + err.status);

        // affiche un message d'erreur
        $("#message").show();
        $("#message").html("<img class=\"img_warning\" src=\"assets/img/warning.png\" alt=\"attention\"></img>" + "erreur, dans le '.fail'");


        // enlève le GIF "chargement de la page"
        $("#working").hide();
    });   
}
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////


// ///////////////////////////////////////////////////
// //////////// fonction supprimAnim() ///////////////
// ///////////////////////////////////////////////////
// variable pour garder en mémoire sur quel indice on agit
var iIndiceEditionToKeep;
function supprimAnim(iIndiceSupp)
{
    // mise en memoire de l'indice sur laquelle on agit
    iIndiceEditionToKeep= iIndiceSupp;
    
    // vide les champs input
    viderChampsInput();

    //Titre modal et couleurs
    $("#ModalLabel").html("Supprimer un animé");
    $(".modal-header").css({"background-color": "red", "color": "white"});
    
    //Couleurs du footer
    $(".modal-footer").css({"background-color": "red", "color": "white"});

    //demande de confirmation avant d'effacer
    $("#message").html("<img class=\"img_warning\" src=\"assets/img/warning.png\" alt=\"attention\"></img>" + "Êtes-vous sûr de VRAIMENT vouloir supprimer<br> « " + aGhibli[iIndiceSupp]["Titre"] + " » ?");  

    // affiche message et boutton confirmation supprimer, cache les inputs et autres bouttons confirmation
    $("#input").hide();
    $("#message").show();
    $("#btn_confAjouter").hide();
    $("#btn_confEdit").hide();
    $("#btn_confSupp").show();
}
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// ////////// fonction confirmSuppAnime() ////////////
// ///////////////////////////////////////////////////
//pour effacer l'entrée selectionnée dans la variable structurée
function confirmSuppAnime()
{
   
    // Affiche un GIF "chargement de la page"
    $("#working").show();

    var datas = 
    {
        idASupp: iIndiceEditionToKeep,
    }

    $.ajax(
    {
        type: "POST", // method="POST"
        url: "./assets/php/supprime_anime.php", // action="supprime_anime.php"
        async: true, // permet synchrone ou asynchrone plusieurs appels JS vers des PHP
        data: datas, // Je passe ma lise de variables à envoyer (datas)
        dataType: "json", // format attendu du retour du PHP
        cache: false, // a ne jamais changer, pas de cache
    })

    .done(function(result) 
    {
        var i= 0;
        var aError= [];
        for (var ligne in result)    
        {
            // je reconstruis mon tableau erreur
            aError[i]= [];
            aError[i]["error"]= result[ligne]["error"];
            i++;
        }
        
        if (aError[0]["error"] == 0)
        {

            //efface 1 entrée depuis l'indice selectionné
            aGhibli.splice(iIndiceEditionToKeep,1);

            // (re)creation du tableau DataTable
            creerDataTable();

            // vide les champs input
            viderChampsInput();

            // enlève le GIF "chargement de la page"
            $("#working").hide();

        }

        else 
        {
            // affiche un message d'erreur
            $("#message").show();
            $("#message").html("<img class=\"img_warning\" src=\"assets/img/warning.png\" alt=\"attention\"></img>" + "erreur, données non éffacées");
            
            // enlève le GIF "chargement de la page"
            $("#working").hide();
        }
    })

    .fail(function(err) 
    {
        // Affichage d'erreur
        alert("error : " + err.status);

        // affiche un message d'erreur
        $("#message").show();
        $("#message").html("<img class=\"img_warning\" src=\"assets/img/warning.png\" alt=\"attention\"></img>" + "erreur, dans le '.fail'");


        // enlève le GIF "chargement de la page"
        $("#working").hide();
    });   
}
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// ////////////// fonction editAnim() ////////////////
// ///////////////////////////////////////////////////
var ancienneEntree
function editAnime(iIndiceEdition) 
{
    // mise en memoire de l'indice sur laquelle on agit
    iIndiceEditionToKeep= iIndiceEdition;

    //Titre modal et couleur
    $("#ModalLabel").html("Modifier un animé");
    $(".modal-header").css({"background-color": "green", "color": "white"});

    //Couleurs du footer
    $(".modal-footer").css({"background-color": "green", "color": "white"});

    // Input du modal
    $("#modalText").html("<div id=\"input\" class=\"hide\"><p>ID# :<br> <input type=\"text\" name=\"ID_Anim\" id=\"ID_Anim\" readonly></p><p>Titre :<br><input type=\"text\" name=\"Titre\" id=\"Titre\"></p><p>Titre en kanji :<br><input type=\"text\" name=\"Kanji\" id=\"Kanji\"></p><p>Titre en Japonais :<br><input type=\"text\" name=\"Jap\" id=\"Jap\"></p><p>Réalisateur :<br><input type=\"text\" name=\"Reali\" id=\"Reali\"></p><p>Année :<br><input type=\"number\" name=\"Annee\" id=\"Annee\"></p></div>")

    //affiche les valeurs dans les inputs
    $("#ID_Anim").val(aGhibli[iIndiceEdition]["ID_Anim"]);
    $("#Titre").val(aGhibli[iIndiceEdition]["Titre"]);
    $("#Kanji").val(aGhibli[iIndiceEdition]["Kanji"]);
    $("#Jap").val(aGhibli[iIndiceEdition]["Jap"]);
    $("#Reali").val(aGhibli[iIndiceEdition]["Reali"]);
    $("#Annee").val(aGhibli[iIndiceEdition]["Annee"]);

    // recupére les valeurs à modifier et concatene dans 'ancienneEntree'
    ancienneEntree= "\n" + $("#ID_Anim").val();
    ancienneEntree += ":::" + $("#Titre").val();
    ancienneEntree += ":::" + $("#Kanji").val();
    ancienneEntree += ":::" + $("#Jap").val();
    ancienneEntree += ":::" + $("#Reali").val();
    ancienneEntree += ":::" + $("#Annee").val() + ":::";


    //affiche les inputs et boutton confirmation editer, cache message (eventuel) et autres bouttons confirmation
    $("#input").show();
    $("#message").hide();
    $("#btn_confAjouter").hide();
    $("#btn_confEdit").show();
    $("#btn_confSupp").hide();
}
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// ////////// fonction confirmEditAnime() ////////////
// ///////////////////////////////////////////////////
function confirmEditAnime()
{
    // Affiche un GIF "chargement de la page"
    $("#working").show();

    var datas = 
    {
        ID_Anim: $("#ID_Anim").val(),
        Titre: $("#Titre").val(),
        Kanji: $("#Kanji").val(),
        Jap: $("#Jap").val(),
        Reali: $("#Reali").val(),
        Annee: $("#Annee").val(),
        ancienneEntree: ancienneEntree,
    }

    $.ajax(
    {
        type: "POST", // method="POST"
        url: "./assets/php/edit_anime.php", // action="edit_anime.php"
        async: true, // permet synchrone ou asynchrone plusieurs appels JS vers des PHP
        data: datas, // Je passe ma lise de variables à envoyer (datas)
        dataType: "json", // format attendu du retour du PHP
        cache: false, // a ne jamais changer, pas de cache
    })

    .done(function(result) 
    {
        var i= 0;
        var aError= [];
        for (var ligne in result)    
        {
            // je reconstruis mon tableau erreur
            aError[i]= [];
            aError[i]["error"]= result[ligne]["error"];
            i++;
        }
        
        if (aError[0]["error"] == 0)
        {
            // récupère et remplace les nouvelles valeurs dans la variable stucturée
            aGhibli[iIndiceEditionToKeep]= [];
            aGhibli[iIndiceEditionToKeep]["ID_Anim"]= $("#ID_Anim").val();
            aGhibli[iIndiceEditionToKeep]["Titre"]= $("#Titre").val();
            aGhibli[iIndiceEditionToKeep]["Kanji"]= $("#Kanji").val();
            aGhibli[iIndiceEditionToKeep]["Jap"]= $("#Jap").val();
            aGhibli[iIndiceEditionToKeep]["Reali"]= $("#Reali").val();
            aGhibli[iIndiceEditionToKeep]["Annee"]= $("#Annee").val();	
        
            // (re)creation du tableau DataTable
            creerDataTable();

            // vide les champs input
            viderChampsInput();
    
            // confirme edition reussie
            $("#message").show();
            $("#message").html("<img class=\"img_warning\" src=\"assets/img/validation.png\" alt=\"réussite\"></img>" + "Les données ont bien été editées");

            // enlève le GIF "chargement de la page"
            $("#working").hide();

        }

        else 
        {
            // affiche un message d'erreur
            $("#message").show();
            $("#message").html("<img class=\"img_warning\" src=\"assets/img/refuse.png\" alt=\"erreur\"></img>" + "Données non editées<br>Veuillez à remplir tous les champs");
            
            // enlève le GIF "chargement de la page"
            $("#working").hide();
        }
    })
    
    .fail(function(err) 
    {
        // Affichage d'erreur
        alert("error : " + err.status);

        // affiche un message d'erreur
        $("#message").show();
        $("#message").html("<img class=\"img_warning\" src=\"assets/img/warning.png\" alt=\"attention\"></img>" + "erreur, dans le '.fail'");

        // enlève le GIF "chargement de la page"
        $("#working").hide();
    });   
}
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// /// Création DataTable au chargement de la page ///
// ///////////////////////////////////////////////////
var tables;
//affiche le tableau DataTable lorsque la page est finie d'être chargée
$(document).ready(function() 
{
    // creation du tableau en HTML
    loadAnim();
});
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////

// ///////////////////////////////////////////////////
// //////////// CONFIGURATION DATATABLE //////////////
// ///////////////////////////////////////////////////
const configuration = 
{
    "stateSave": false,
    "order": [[0, "asc"]],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [[5, 10, 25, 50, 100, -1], ["Cinq", "Dix", "Vingt-cinq", "Cinquante", "Cent", "La totalité"]], 
    "language": 
    {
        "info": "Films animés _START_ à _END_ sur _TOTAL_ sélectionnés",
        "emptyTable": "Aucun utilisateur",
        "lengthMenu": "_MENU_ films animés par page",
        "search": "Rechercher dans tableau : ",
        "zeroRecords": "Aucun résultat pour cette recherche",
        "paginate": 
        {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty":      "Films 0 à 0 sur 0 sélectionné",
    },
    // ATTENTION : Une colonne sera cachée par la propriété 'columnDefs' qui suit...
    "columns": 
    [
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": false
        },
        {
            "orderable": false
        }
    ],
    "columnDefs": 
    [
        {
            // The `data` parameter refers to the data for the cell (defined by the
            // `data` option, which defaults to the column being worked with, in
            // this case `data: 0`.
            "render": function ( data, type, row ) {
                return data +" ["+ row[4]+"]";
            },
            "targets": 1
        },
        // La colonne n'est plus affichée
        { "visible": false,  "targets": [ 4 ] }
    ],
    "retrieve": true,
    // pour reproduire les fonctionnalités en haut et en bas (recherche, choix nbre d'élément, navigation)
    // "dom": "<'top'iflp<'clear'>>rt<'bottom'iflp<'clear'>>",
    
};
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////
// ///////////////////////////////////////////////////