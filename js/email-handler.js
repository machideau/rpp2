document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = 'Envoi en cours...';

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    emailjs.send("service_2w1u3rh", "template_i227tug", templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            const sendMessage = document.getElementById('sendmessage');
            sendMessage.classList.add('show');
            document.getElementById('errormessage').classList.remove('show');
            document.getElementById('contactForm').reset();
            
            // Faire disparaître le message après 1 seconde
            setTimeout(() => {
                sendMessage.classList.remove('show');
            }, 1000);
        }, function(error) {
            console.log('FAILED...', error);
            document.getElementById('sendmessage').classList.remove('show');
            document.getElementById('errormessage').classList.add('show');
            document.getElementById('errormessage').innerHTML = 
                "Erreur: " + (error.text || "Une erreur s'est produite lors de l'envoi du message.");
        })
        .finally(function() {
            button.disabled = false;
            button.innerHTML = originalText;
        });
});



