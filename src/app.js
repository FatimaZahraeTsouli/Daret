// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.


const form = document.getElementById("daret-form");
const nomCercle = document.getElementById("nom-cercle");
const Cotisation = document.getElementById("cotisation");
const periodicite = document.getElementById("periodicite");
const dateDebut = document.getElementById("date-debut");
const errorNom = document.getElementById("nom-cercle-erreur");
const errorCotisation = document.getElementById("cotisation-erreur");
const errorPeriodecite = document.getElementById("periodicite-erreur");
const errorDate = document.getElementById("date-debut-erreur");
const ajouter = document.getElementById("ajouter-participant");
const listeParticipants = document.getElementById("participants-liste");
const errorParticipant = document.getElementById("participants-erreur");
const participantsCompteur = document.getElementById("participants-compteur");
const generer = document.getElementById("generer");
const nomRegex = /^[\p{L}\p{M}0-9 -]+$/u ;
const aujourdHui = new Date().toISOString().slice(0, 10);



function validerNom(nom) {
    if (nom.length < 2 ) {
        errorNom.textContent = "Le nom est trés court!";
        errorNom.classList.remove("hidden");
        nomCercle.setAttribute("aria-invalid", "true");
        return false;
    } else if (nom.length > 40){
        errorNom.textContent = "Le nom est trés long!";
        errorNom.classList.remove("hidden");
        nomCercle.setAttribute("aria-invalid", "true");
        return false;
    } else if (!nomRegex.test(nom)){
        errorNom.textContent = "Le nom contient des caractéres non autorisés!";
        errorNom.classList.remove("hidden");
        nomCercle.setAttribute("aria-invalid", "true");
        return false;
    }

    errorNom.textContent = "";
    errorNom.classList.add("hidden");
    nomCercle.setAttribute("aria-invalid", "false");
    return true;
}
nomCercle.addEventListener("input", function () {
    const nom = nomCercle.value.trim();
    validerNom(nom);
});

function validerCotisation(montant){

    if (!Number.isInteger(montant)) {
        errorCotisation.textContent = "La cotisation doit être un nombre entier.";
        Cotisation.setAttribute("aria-invalid", "true");
        errorCotisation.classList.remove("hidden");
    return false;
    }
    else if (montant < 100){
        errorCotisation.textContent = "la cotisation doit être au minimum de 100 MAD!";
        Cotisation.setAttribute("aria-invalid", "true");
        errorCotisation.classList.remove("hidden");
        return false
    }
    else if (montant > 50000){
        errorCotisation.textContent = "la cotisation ne doit pas dépasser 50000 MAD!";
        Cotisation.setAttribute("aria-invalid", "true");
        errorCotisation.classList.remove("hidden");
        return false;
    }

    errorCotisation.textContent = "";
    errorCotisation.classList.add("hidden");
    Cotisation.setAttribute("aria-invalid", "false");
    return true;

}
Cotisation.addEventListener("input", function(){
    const montant = Number(Cotisation.value);
    validerCotisation(montant);
})

function validerDate(dateUtilisateur){

    if (dateUtilisateur < aujourdHui){
        errorDate.textContent = "veuillez choisir une date valable!";
        dateDebut.setAttribute("aria-invalid", "true");
        errorDate.classList.remove("hidden");
        return false;
    }

    errorDate.textContent = "";
    dateDebut.setAttribute("aria-invalid", "false");
    return true;
}

dateDebut.addEventListener("input", function(){
    const dateUtilisateur = dateDebut.value;
    validerDate(dateUtilisateur);
})

function ajouterparticipants(){
    const liste = document.createElement("li");
    const input = document.createElement("input");
    const buttonR = document.createElement("button");
  
    input.type = "text";
    input.name = "participants";
    input.placeholder = "Prénom du participant";


    buttonR.textContent  = "Retirer";
    buttonR.type = "button";

    buttonR.addEventListener("click", function(){
        if (listeParticipants.querySelectorAll("input").length <= 3){
            errorParticipant.textContent = "vous devez gardez au moins trois participants!";
            errorParticipant.classList.remove("hidden");
            return ;
        }
        liste.remove();
        if (!validerPrenom){
            return;
        }

        participantsCompteur.textContent =
    listeParticipants.querySelectorAll("input").length + " participants"; 
    });

    liste.appendChild(buttonR);
    liste.appendChild(input);
    listeParticipants.appendChild(liste);

    participantsCompteur.textContent =
    listeParticipants.querySelectorAll("input").length + " participants";
}
ajouterparticipants();
ajouterparticipants();
ajouterparticipants();

ajouter.addEventListener("click", function () {
    if(listeParticipants.querySelectorAll("input").length >=20){
        errorParticipant.textContent = "vous ne pouvez pas dépasser 20participants!";
        errorParticipant.classList.remove("hidden");
        return;
    }
    ajouterparticipants();
})

    function validerPrenom(){
    const inputs = listeParticipants.querySelectorAll("input");
    const prenomRegex = /^[\p{L}\p{M}]+(?:['-][\p{L}\p{M}]+)*$/u;
    const nomsVus = new Set();

    for (const input of inputs){
        const prenom = input.value.trim();
        if (prenom === ""){
            errorParticipant.textContent = "veuillez remplire ce champ!";
            errorParticipant.classList.remove("hidden");
            input.setAttribute("aria-invalid", "true");
            input.focus();
            return false;
        }
        if (prenom.length < 2){
            errorParticipant.textContent = "le nom doit contenir au moins trois caracteres!";
            errorParticipant.classList.remove("hidden");
            input.setAttribute("aria-invalid", "true");
            input.focus();
            return false;
        }
        if (prenom.length > 30){
            errorParticipant.textContent = "le nom ne doit pas dépasser trente caracteres!";
            errorParticipant.classList.remove("hidden");
            input.setAttribute("aria-invalid", "true");
            input.focus();
            return false;
        
        }
        if (!prenomRegex.test(prenom)){
        errorParticipant.textContent = "le nom ne doit pas contenire des caracteres invalides";
        errorParticipant.classList.remove("hidden");
        input.focus();
        return false;
        }
        const prenomNormalise = prenom.toLowerCase();
        if (nomsVus.has(prenomNormalise)){
        errorParticipant.textContent = "ce nom existe deja";
        errorParticipant.classList.remove("hidden");
        input.focus();
        return false;
        }
        nomsVus.add(prenomNormalise);
    }
    
    errorParticipant.textContent = "";
    errorParticipant.classList.add("hidden");
    return true;
}


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nom = nomCercle.value.trim();
    const nomValide = validerNom(nom);

    const montant = Number(Cotisation.value);
    const cotisationValide = validerCotisation(montant);

    const dateUtilisateur = dateDebut.value;
    const dateValide = validerDate(dateUtilisateur);

    const participantsValide = validerParticipants();

    if (!nomValide) {
        nomCercle.focus();
        return;
    }

    if (!cotisationValide) {
        Cotisation.focus();
        return;
    }
    if (!dateValide){
        dateDebut.focus();
        return;
    }
    if (!participantsValide){
        ajouter.focus();
        return;
    }

});
