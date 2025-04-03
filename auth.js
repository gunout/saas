document.addEventListener('DOMContentLoaded', function() {
    // Gestion de l'affichage des champs pro
    const userTypeRadios = document.querySelectorAll('input[name="userType"]');
    const proFields = document.getElementById('proFields');
    
    if(userTypeRadios.length > 0) {
        userTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                proFields.style.display = this.value === 'professional' ? 'block' : 'none';
            });
        });
    }

    // Gestion du formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                
                if(response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'dashboard.html';
                } else {
                    alert(data.message || 'Erreur de connexion');
                }
            } catch (err) {
                console.error('Erreur:', err);
                alert('Erreur réseau');
            }
        });
    }

    // Gestion du formulaire d'inscription
    const registerForm = document.getElementById('registerForm');
    if(registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const userType = document.querySelector('input[name="userType"]:checked').value;
            const userData = {
                email: document.getElementById('registerEmail').value,
                password: document.getElementById('registerPassword').value,
                role: userType
            };
            
            if(userType === 'professional') {
                userData.companyName = document.getElementById('companyName').value;
                userData.siret = document.getElementById('siret').value;
            }
            
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
                
                const data = await response.json();
                
                if(response.ok) {
                    window.location.href = 'thank-you.html?type=registration';
                } else {
                    alert(data.message || 'Erreur lors de l\'inscription');
                }
            } catch (err) {
                console.error('Erreur:', err);
                alert('Erreur réseau');
            }
        });
    }

    // Personnalisation du message de remerciement
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    if(confirmationMessage && type === 'registration') {
        confirmationMessage.innerHTML = `
            <p>Votre inscription a bien été prise en compte.</p>
            <p>Un email de confirmation vous a été envoyé.</p>
        `;
    }
});
