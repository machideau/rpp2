document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Afficher un indicateur de chargement
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = 'Envoi en cours...';

    // Préparer les paramètres du template
    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Envoyer l'email
    emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById('sendmessage').classList.add('show');
            document.getElementById('errormessage').classList.remove('show');
            document.getElementById('contactForm').reset();
        }, function(error) {
            console.log('FAILED...', error);
            document.getElementById('sendmessage').classList.remove('show');
            document.getElementById('errormessage').classList.add('show');
            document.getElementById('errormessage').innerHTML = "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.";
        })
        .finally(function() {
            // Restaurer le bouton
            button.disabled = false;
            button.innerHTML = originalText;
        });
});