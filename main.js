// Initialisation des composants
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Ici vous ajouteriez la logique pour envoyer l'email à votre backend
            console.log('Email enregistré :', email);
            
            // Feedback utilisateur
            alert('Merci pour votre inscription à notre newsletter !');
            this.reset();
        });
    }

    // Animation des étapes
    const steps = document.querySelectorAll('.card');
    steps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.2}s`;
        step.classList.add('animate__animated', 'animate__fadeInUp');
    });
});

// Fonction pour la demande de devis (exemple)
function submitQuoteRequest(formData) {
    return fetch('/api/quotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
    });
}

// Exemple de fonction pour charger les professionnels
async function loadProfessionals(category) {
    try {
        const response = await fetch(`/api/professionals?category=${category}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du chargement des professionnels:', error);
        return [];
    }
}