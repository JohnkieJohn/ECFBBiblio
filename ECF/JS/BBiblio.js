var jureLog = [null];
var jurePass = [null];
var auteurLog = [null];
var auteurPass = [null];
pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; /* Regex de l'email en page index */
mdp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{10,}$/ /* Regex du mot de passe en pages profil juré et profil auteur/éditeur */


/* ---------------------------------------------  FONCTIONS PAGE INDEX --------------------------------------------- */

function message()
{
    document.getElementById("confirm").innerHTML="Vous souhaitez vous inscrire en tant que juré ou auteur/éditeur ?";
    document.getElementById("mail").value = "";
}

/* Page index :
Vérifie la valeur entrée dans l'input email. Si le test du Regex est bon, génère un login et un mot de passe. Sinon, renvoie un message d'erreur.
Rentre le login et le mot de passe générés dans un tableau (une fonction pour auteur/éditeur et une pour juré). */

function auteurIdentifiants()
{
    var email = document.getElementById("mail").value;
    if (email.match(pattern))
    {
        var password = Math.random().toString(36).substring(7);
        var login = Math.random().toString(36).substring(7);
        auteurLog.push(login);
        auteurPass.push(password);
        document.getElementById("confirm").innerHTML="Login: "+login+"  Mot de passe: "+password;
    }
    else
    {
        document.getElementById("confirm").innerHTML="Email non valide";
        return pattern;
    }
}

function jureIdentifiants()
{
    var email = document.getElementById("mail").value;
    if (email.match(pattern))
    {
        var password = Math.random().toString(36).substring(7);
        var login = Math.random().toString(36).substring(7);
        jureLog.push(login);
        jurePass.push(password);
        document.getElementById("confirm").innerHTML="Login: "+login+"  Mot de passe: "+password;
    }
    else
    {
        document.getElementById("confirm").innerHTML="Email non valide";
        return pattern;
    }
}

/* Vérifie que les valeurs rentrées dans l'input login et mot de passe soient égales à celles rentrées dans les tableaux précédemment.
Si c'est le cas, génère un lien profil juré ou auteur selon le choix précédent. Sinon, renvoie un message d'erreur. */

function checkLog()
{
    for (i=0; i < jureLog.length; i++)
    {
        if (document.getElementById("login").value == jureLog[i] && document.getElementById("mdp").value == jurePass[i])
        {
            var a = document.createElement('a');
            var linkText = document.createTextNode("Profil juré");
            a.appendChild(linkText);
            a.title = "Profil juré";
            a.href = "BBiblioProfilJure.html";
            document.getElementById("profil").appendChild(a);
            document.getElementById("signIn").hidden = true;
            document.getElementById("login").remove();
            document.getElementById("mdp").remove();
            document.getElementById("link").innerHTML="";
            return;
        }
    }
    for (j=0; j < auteurLog.length; j++)
    {
        if (document.getElementById("login").value === auteurLog[j] && document.getElementById("mdp").value === auteurPass[j])
        {
            var a = document.createElement('a');
            var linkText = document.createTextNode("Profil auteur");
            a.appendChild(linkText);
            a.title = "Profil auteur";
            a.href = "BBiblioProfilAuteur.html";
            document.getElementById("profil").appendChild(a);
            document.getElementById("signIn").hidden = true;
            document.getElementById("login").remove();
            document.getElementById("mdp").remove();
            document.getElementById("link").innerHTML="";
            return;
        }
    }
    if (document.getElementById("login").value !== auteurLog[j] && document.getElementById("mdp").value !== auteurPass[j])
    {
        document.getElementById("link").innerHTML="identifiants incorrects";
        document.getElementById("login").value="";
        document.getElementById("mdp").value="";
    }
}

/* ---------------------------------------------  FONCTIONS PAGE PROFIL AUTEUR --------------------------------------------- */

/* Si le nouveau mot de passe est conforme au Regex, valide les infos rentrées et renvoie un message de réussite. Sinon, renvoie un message d'erreur.
(les autres champs des inputs sont vérifiés via le addEventListener plus bas)  */

function getInfosA()
{
    newMdp = document.getElementsByName("newmdp")[0].value;
    if (newMdp.match(mdp))
    {
        checkradio = document.getElementsByName("autedit");
        for (i=0; i < checkradio.length; i++)
        {
            if (checkradio[i].checked == true)
            {
                document.getElementById("auteur").innerHTML="Vous êtes: "+checkradio[i].value;
            }
        }
        if (!checkradio[0].checked && !checkradio[1].checked)
        {
            return;
        }
        var nomA = document.getElementById("infosA").elements[0];
        document.getElementById("nom").innerHTML="Votre nom: "+nomA.value;
        var prenomA = document.getElementById("infosA").elements[1];
        document.getElementById("prenom").innerHTML="Votre prénom: "+prenomA.value;
        var anneeA = document.getElementById("infosA").elements[2];
        document.getElementById("year").innerHTML="Votre année de naissance: "+anneeA.value;
        nomA.remove();
        prenomA.remove();
        anneeA.remove();
        checkradio[0].remove();
        checkradio[0].remove();
        document.getElementById("editeur").remove();
        document.getElementById("infosAuteur").hidden = true;
        document.getElementById("mdplabel").innerHTML="Nouveau mot de passe enregistré!"
        document.getElementsByName("newmdp")[0].remove();
        enabledDepot();
    }
    else
    {
        document.getElementById("msginfoA").innerHTML="Profil auteur/éditeur (mot de passe non valide, se référer à l'infobulle)";
        return;
    }
}

/* Active la possibilité de déposer une oeuvre */

function enabledDepot()
{
    var depotElem = document.getElementById("depotOeuvre").elements;
    for (i=0; i < depotElem.length; i++)
    {
        depotElem[i].disabled = false;
    }
}

/* Traite les infos pour le dépôt de l'oeuvre */

function getAddOeuvre()
{
    var title = document.getElementById("depotOeuvre").elements[0];
    var autor = document.getElementById("depotOeuvre").elements[1];
    var cat = document.getElementById("categorieDepot").options[document.getElementById("categorieDepot").selectedIndex].value;
    document.getElementById("titre").innerHTML="Merci, "+title.value+" de "+autor.value+" a bien été déposé"
    document.getElementById("auteurD").innerHTML=" dans la catégorie: "+cat+".";
    title.remove();
    autor.remove();
    document.getElementById("categorieDepot").remove();
    document.getElementById("chooseFile").remove();
    document.getElementById("addOeuvre").hidden = true;
}

/* -------------------------------------------  FONCTIONS PAGE PROFIL JURÉ  ------------------------------------ */

/* Si le nouveau mot de passe est conforme au Regex, valide les infos rentrées et renvoie un message de réussite. Sinon, renvoie un message d'erreur.
(les autres champs des inputs sont vérifiés via le addEventListener plus bas)  */

function getInfosJ()
{
    newMdp = document.getElementsByName("newmdp")[0].value;
    if (newMdp.match(mdp))
    {
        var checkCat = "";
        var checkboxes = document.getElementsByName("cat");
        for (i=0; i < checkboxes.length; i++)
        {
            if (checkboxes[i].checked == true)
            {
                checkCat += checkboxes[i].value + "/ ";
                document.getElementById("jurecat").innerHTML="Catégorie(s): "+checkCat;
                document.getElementsByClassName("catTab")[i].hidden = false;
            }
        }
        if (!checkboxes[0].checked && !checkboxes[1].checked && !checkboxes[2].checked && !checkboxes[3].checked)
        {
            return;
        }
        var nomJ = document.getElementById("infosJ").elements[0];
        document.getElementById("nom2").innerHTML="Votre nom: "+nomJ.value;
        var prenomJ = document.getElementById("infosJ").elements[1];
        document.getElementById("prenom2").innerHTML="Votre prénom: "+prenomJ.value;
        var anneeJ = document.getElementById("infosJ").elements[2];
        document.getElementById("year2").innerHTML="Votre année de naissance: "+anneeJ.value;
        nomJ.remove();
        prenomJ.remove();
        anneeJ.remove();
        checkboxes[0].remove();
        checkboxes[0].remove();
        checkboxes[0].remove();
        checkboxes[0].remove();
        document.getElementById("cat1").remove();
        document.getElementById("cat2").remove();
        document.getElementById("cat3").remove();
        document.getElementById("cat4").remove();
        document.getElementById("infosJure").hidden = true;
        document.getElementById("mdplabel").innerHTML="Nouveau mot de passe enregistré!"
        document.getElementsByName("newmdp")[0].remove();
        document.getElementById("tabCat").hidden = false;
    }
    else
    {
        document.getElementById("msginfoJ").innerHTML="Profil juré (mot de passe non valide, se référer à l'infobulle)";
        return;
    }
}

/* ------------------------------------------  EVENT PAGE INDEX  ----------------------------------------------- */

document.getElementById("jure").addEventListener("click", jureIdentifiants);

document.getElementById("auteur").addEventListener("click", auteurIdentifiants);

document.getElementById("mail").addEventListener("focus", message);

document.getElementById("signIn").addEventListener("click", checkLog);

/* ------------------------------------------  EVENT PAGE PROFIL AUTEUR  ----------------------------------------------- */

/* Si tous les champs ne sont pas remplis dans la page profil, ainsi que dans le dépôt de l'oeuvre, renvoie un message d'erreur. */

document.getElementById("infosAuteur").addEventListener("click", function()
{
    if (document.getElementById("infosA").elements[0].value != "" && document.getElementById("infosA").elements[1].value != "" && document.getElementById("infosA").elements[2].value != "")
    {
        getInfosA();
    }
    else
    {
        document.getElementById("msginfoA").innerHTML="Profil auteur/éditeur (veuillez renseigner tous les champs)";
        return;
    }

})

document.getElementById("addOeuvre").addEventListener("click", function()
{
    if (document.getElementById("depotOeuvre").elements[0].value != "" && document.getElementById("depotOeuvre").elements[1].value != "" && document.getElementById("categorieDepot").selectedIndex != 0)
    {
        getAddOeuvre();
    }
    else
    {
        document.getElementById("msginfoA2").innerHTML="-Déposer une oeuvre- (veuillez renseigner tous les champs)";
        return;
    }
})

/* ------------------------------------------  EVENT PAGE PROFIL JURÉ  ------------------------------------------------ */

/* Si tous les champs ne sont pas remplis dans la page profil, renvoie un message d'erreur. */

document.getElementById("infosJure").addEventListener("click", function()
{
    if (document.getElementById("infosJ").elements[0].value != "" && document.getElementById("infosJ").elements[1].value != "" && document.getElementById("infosJ").elements[2].value != "")
    {
        getInfosJ();
    }
    else
    {
        document.getElementById("msginfoJ").innerHTML="Profil juré (veuillez renseigner tous les champs)";
        return;
    }
})