var selectMenu = document.getElementsByClassName("menuSelect");
var style = document.getElementsByName("style");
var emotion = document.getElementsByName("emotion");
var illustration = document.getElementsByName("illu");
var misePage = document.getElementsByName("miseEnPage");
var moyenne = document.getElementsByName("moyenne");
var options = document.getElementsByClassName("options");
var selectedOptions = [0, 0, 0, 0];
var notSelectedOptions = [0, 1, 2, 3];
var menuOptions = ["-", "oeuvre1", "oeuvre2", "oeuvre3"];
var linkPDF = ["", "<a href='pdf1.pdf' download>PDF œuvre 1</a>", "<a href='pdf2.pdf' download>PDF œuvre 2</a>", "<a href='pdf3.pdf' download>PDF œuvre 3</a>"]

/* Ajoute une ligne de formulaire */

function addSelect()
{
	var newSelect = document.createElement("select");
	newSelect.setAttribute("class", "menuSelect");
	document.getElementsByClassName("column")[0].appendChild(newSelect);
	for (i=0; i < menuOptions.length; i++)
	{
		var newOption = document.createElement("option");
		newOption.text = options[i].textContent;
		newSelect.appendChild(newOption);
	}
}

function addInputStyle()
{
	var newStyle = document.createElement("input");
	newStyle.setAttribute("name", "style");
	newStyle.setAttribute("type", "number");
    newStyle.setAttribute("value", 0);
    newStyle.setAttribute("min", 0);
    newStyle.setAttribute("max", 10);
	newStyle.setAttribute("disabled", "");
	document.getElementsByClassName("column")[2].appendChild(newStyle);
}

function addInputIllu()
{
	var newIllu = document.createElement("input");
	newIllu.setAttribute("name", "illu");
	newIllu.setAttribute("type", "number");
	newIllu.setAttribute("value", 0);
    newIllu.setAttribute("min", 0);
    newIllu.setAttribute("max", 10);
	newIllu.setAttribute("disabled", "");
	document.getElementsByClassName("column")[3].appendChild(newIllu);
}

function addInputMiseEnPage()
{
	var newMiseEnPage = document.createElement("input");
	newMiseEnPage.setAttribute("name", "miseEnPage");
	newMiseEnPage.setAttribute("type", "number");
	newMiseEnPage.setAttribute("value", 0);
    newMiseEnPage.setAttribute("min", 0)
    newMiseEnPage.setAttribute("max", 10)
	newMiseEnPage.setAttribute("disabled", "");
	document.getElementsByClassName("column")[4].appendChild(newMiseEnPage);
}

function addInputEmotion()
{
	var newEmotion = document.createElement("input");
	newEmotion.setAttribute("name", "emotion");
	newEmotion.setAttribute("type", "number");
	newEmotion.setAttribute("value", 0);
	newEmotion.setAttribute("min", 0);
    newEmotion.setAttribute("max", 10);
	newEmotion.setAttribute("disabled", "");
	document.getElementsByClassName("column")[5].appendChild(newEmotion);
}

function addInputMoyenne()
{
    var newMoyenne = document.createElement("input");
	newMoyenne.setAttribute("name", "moyenne");
	newMoyenne.setAttribute("type", "number");
	newMoyenne.setAttribute("value", 0);
	newMoyenne.setAttribute("disabled", "");
	document.getElementsByClassName("column")[6].appendChild(newMoyenne);
}

/* Rend possible ou non l'activation du bouton #addLine en fonction du nombre de ligne de formulaire (pas plus de lignes que d'options) */

function setAddLine()
{
    if (selectMenu.length >= selectMenu[0].options.length-1)
    {
        document.getElementById("addLine").disabled = true;
    }
    else
    {
        document.getElementById("addLine").disabled = false;
    }
}

/* Rend possible ou non l'activation du bouton #removeLine en fonction du nombre de ligne de formulaire (pas moins d'une ligne) */

function setRemoveLine()
{
    if(selectMenu.length > 1)
    {
        document.getElementById("removeLine").disabled = false;
    }
    else
    {
        document.getElementById("removeLine").disabled = true;
    }
}

/* Réinitialise le selectedIndex du menu qui s'apprête à être supprimé à 0 (évite que l'option reste grisée dans les autres menus select après suppression 
de la ligne du formulaire) */

function beforeRemove()
{
    selectMenu[selectMenu.length-1].selectedIndex = 0;
}

/* Retire une ligne du formulaire */

function removeLine()
{
    selectMenu[selectMenu.length-1].remove();
    style[style.length-1].remove();
    illustration[illustration.length-1].remove();
    misePage[misePage.length-1].remove();
    emotion[emotion.length-1].remove();
    moyenne[moyenne.length-1].remove();
    document.getElementsByClassName("pdfLink")[selectMenu.length].innerHTML=linkPDF[0]
}

/* j = menu select où l'évènement change a eu lieu, indique globalement la ligne du formulaire où effectuer les changements. Active les inputs
de la ligne quand une autre option que l'option par défaut est sélectionnée. */

function choiceByMenu(j)
{
    document.getElementsByClassName("pdfLink")[j].innerHTML=linkPDF[selectMenu[j].selectedIndex]
	moyenne[j].value = (parseInt(illustration[j].value) + parseInt(emotion[j].value) + parseInt(style[j].value) + parseInt(misePage[j].value))/ 4;
	emotion[j].disabled = false;
    illustration[j].disabled = false;
    misePage[j].disabled = false;
    style[j].disabled = false;
}

/* Dans le tableau selectedOptions, on remplace la valeur à l'index égal à selectMenu[j].selectedIndex par une valeur égale à selectMenu[j].selectedIndex
On compare les valeurs des deux tableaux selectedOptions et notSelectedOptions à index égal. Lorsque les valeurs sont les mêmes, les options dont l'index
correspond à l'index des valeurs sont désactivées, lorsqu'il y a différence les options sont activées. */

function optionsDisabled(j)
{
	var elem = selectMenu[j].selectedIndex;
	selectedOptions.splice(elem, 1, elem);
    console.log(selectedOptions);
	for (i=0; i < selectMenu.length; i++)
	{
		for (j=1; j < notSelectedOptions.length; j++)
		{
			if (selectedOptions[j] != notSelectedOptions[j])
			{
				selectMenu[i].options[notSelectedOptions[j]].disabled = false;
			}
			if (selectedOptions[j] == notSelectedOptions[j])
			{
				selectMenu[i].options[selectedOptions[j]].disabled = true;
			}
		}
	}
}

/* Réinitialisation des valeurs des champs des input[j] dans le cas où l'option par défaut est sélectionnée */

function reinitChoice(j)
{
	style[j].value = 0;
	illustration[j].value = 0;
	misePage[j].value = 0;
    emotion[j].value = 0;
    document.getElementsByClassName("pdfLink")[j].innerHTML=linkPDF[0]
	emotion[j].disabled = true;
    style[j].disabled = true;
    illustration[j].disabled = true;
    misePage[j].disabled = true;
}

/* Réinitialisation du tableau d'options sélectionnées */

function reinitOptions()
{
    selectedOptions = [0, 0, 0, 0];
}

/* Calcul de la moyenne d'une ligne du formulaire par la somme des valeurs des input divisé par 4 */

function calculMoyenne (j)
{
	moyenne[j].value = (parseInt(illustration[j].value) + parseInt(emotion[j].value) + parseInt(style[j].value) + parseInt(misePage[j].value))/ 4;
}

function start()
{
    for (i = 0; i < selectMenu.length; i++)
    {
        selectMenu[i].addEventListener("change", function()
        {
            for (j = 0; j < selectMenu.length; j++)
            {
                for (k = 0; k < selectMenu[j].options.length; k++)
                {
                    if (selectMenu[j].options[k].selected == true && k != 0)
                    {
                        choiceByMenu(j);
                    }
                    else
                    {
                        if (selectMenu[j].options[k].selected == true && k == 0)
                        {
                            reinitChoice(j);
                            calculMoyenne(j);
                        }
                    }
                }
                optionsDisabled(j);
            }
            reinitOptions();
        })
        emotion[i].addEventListener("change", function()
        {
            for (j = 0; j < selectMenu.length; j++)
            {
                calculMoyenne(j);
            }
            reinitOptions();
        })
        style[i].addEventListener("change", function()
        {
            for (j = 0; j < selectMenu.length; j++)
            {
                calculMoyenne(j);
            }
            reinitOptions();
        })
        misePage[i].addEventListener("change", function()
        {
            for (j = 0; j < selectMenu.length; j++)
            {
                calculMoyenne(j);
            }
            reinitOptions();
        })
        illustration[i].addEventListener("change", function()
        {
            for (j = 0; j < selectMenu.length; j++)
            {
                calculMoyenne(j);
            }
            reinitOptions();
        })
    }
}

/* Applique la fonction start() au chargement de la page */

window.onload = start;

for (i=0; i < document.getElementsByTagName("input").length; i++)
{
    document.getElementsByTagName("input")[i].addEventListener("keydown", function() 
    {
        return false;
    })
}

/* Applique un addEventListener au bouton #addLine. À l'évènement "click", lance les fonctions d'ajout de ligne de formulaire. Lance la fonction 
optionDisabled afin de griser les options du nouveau menu select, en fonction des options déjà sélectionnées dans les autres menus select présents 
avant l'évènement. Et lance la fonction start afin d'appliquer l'addEventListener "change" sur le nouveau menu select.
Active ou désactive les bouton - et + avec les fonctions setAddLine et setRemoveLine. */

document.getElementById("addLine").addEventListener("click", function()
{
	addSelect();
	addInputStyle();
	addInputIllu();
	addInputMiseEnPage();
	addInputEmotion();
    addInputMoyenne();
    for (j = 0; j < selectMenu.length; j++)
    {
        optionsDisabled(j)
    }
    start();
    setAddLine();
    setRemoveLine();
})

/* Applique un addEventListener au bouton #removeLine. Lance la fonction beforeRemove avant de lancer la fonction optionsDisabled, afin d'éviter
que l'option sélectionnée du menu qui s'apprête à être supprimé ne reste grisée dans les autres menus restants après suppression. Lance la fonction
de suppresion de la ligne du formulaire. Enfin, active ou désactive les bouton - et + avec les fonctions setAddLine et setRemoveLine. */

document.getElementById("removeLine").addEventListener("click", function()
{
    beforeRemove()
    for (j = 0; j < selectMenu.length; j++)
    {
        optionsDisabled(j)
    }
	removeLine();
    setAddLine();
    setRemoveLine();
    reinitOptions();
})

/* Réinitialise l'ensemble du formulaire à l'évènement "click" du bouton #reinitAll */

document.getElementById("reinitAll").addEventListener("click", function()
{
	document.getElementById("myForm").reset();
})