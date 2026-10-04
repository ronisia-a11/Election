document.addEventListener("DOMContentLoaded", function () {
    const ageInput = document.getElementById("age");
    const natInput = document.getElementById("nationalite");

    const ageError = document.getElementById("age-error");
    const natError = document.getElementById("nat-error");

    ageInput.addEventListener("blur", function () {
        const age = parseInt(ageInput.value);
        if (isNaN(age) || age < 21) {
            ageError.textContent = "Il faut au moins avoir 21 ans pour voter.";
        } else {
            ageError.textContent = "";
        }
    });

    natInput.addEventListener("blur", function () {
        const nat = natInput.value.trim().toLowerCase();
        if (nat !== "camerounais" && nat !== "camerounaise") {
            natError.textContent = "Il faut être camerounais pour voter.";
        } else {
            natError.textContent = "";
        }
    });
});

const inscriptionForm = document.getElementById('inscription-form');
const messageContainer = document.getElementById('message-container');

inscriptionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupérer les données du formulaire
    const formData = new FormData(inscriptionForm);
    const nom = formData.get('nom');
    const prenom = formData.get('prenom');
    const sexe = formData.get('sexe');

    // Afficher le message de confirmation
    const message = document.createElement('div');
    message.innerHTML = `
        <p>Vos informations ont été bien enregistrées.</p>
        <button id="ok-btn">Ok</button>
    `;
    messageContainer.appendChild(message);
    messageContainer.classList.add('show');

    // Gérer le clic sur le bouton Ok
    document.getElementById('ok-btn').addEventListener('click', () => {
        messageContainer.classList.remove('show');
        messageContainer.innerHTML = '';

        // Afficher le quitus
        const quitus = document.createElement('div');
        quitus.classList.add('quitus');
        quitus.innerHTML = `
            <p>Quitus d'inscription</p>
            <p>Nom : ${nom}</p>
            <p>Prénom : ${prenom}</p>
            <p>Sexe : ${sexe}</p>
            <button id="telecharger-btn">Télécharger</button>
        `;
        messageContainer.appendChild(quitus);
        messageContainer.classList.add('show');

        // Gérer le clic sur le bouton Télécharger
        document.getElementById('telecharger-btn').addEventListener('click', () => {
            // Simuler le téléchargement du quitus
            const quitusContent = `
                Quitus d'inscription
                Nom : ${nom}
                Prénom : ${prenom}
                Sexe : ${sexe}
            `;
            const blob = new Blob([quitusContent], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'quitus.txt';
            link.click();
            // Afficher le message de confirmation de téléchargement
            messageContainer.classList.remove('show');
            messageContainer.innerHTML = '';
            const confirmationMessage = document.createElement('div');
            confirmationMessage.innerHTML = `
                <p>Le quitus a bien été téléchargé.</p>
                <button id="ok-btn-2">Ok</button>
            `;
            messageContainer.appendChild(confirmationMessage);
            messageContainer.classList.add('show');

            // Gérer le clic sur le bouton Ok
            document.getElementById('ok-btn-2').addEventListener('click', () => {
                messageContainer.classList.remove('show');
                messageContainer.innerHTML = '';

                // Mettre à jour les statistiques
                let hommes = localStorage.getItem('hommes') || 0;
                let femmes = localStorage.getItem('femmes') || 0;
                let personnes = localStorage.getItem('personnes') || 0;

                if (sexe === 'homme') {
                    hommes++;
                } else if (sexe === 'femme') {
                    femmes++;
                }
                personnes++;

                localStorage.setItem('hommes', hommes);
                localStorage.setItem('femmes', femmes);
                localStorage.setItem('personnes', personnes);

                // Rediriger vers la page des résultats
                window.location.href = 'resultats.html';
            });
        });
    });
});
