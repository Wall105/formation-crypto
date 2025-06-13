// FAQ toggle avec gestion aria-expanded
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement;
    const answer = parent.querySelector('.faq-answer');
    const isActive = parent.classList.toggle('active');
    btn.setAttribute('aria-expanded', isActive);
    if (isActive) {
      answer.removeAttribute('hidden');
    } else {
      answer.setAttribute('hidden', '');
    }
  });
});

// Compte à rebours (3 jours à partir d'aujourd'hui)
const countdown = document.getElementById('countdown');
const endDate = new Date();
endDate.setDate(endDate.getDate() + 3);

function updateCountdown() {
  const now = new Date();
  const diff = endDate - now;
  if (diff <= 0) {
    countdown.textContent = "L'offre est terminée !";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdown.textContent = `${days}j ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Prix par durée pour chaque pack
const prixPacks = {
  debutant: {
    "1": 69,
    "3": 169,
    "6": 269
  },
  pro: {
    "1": 89,
    "3": 269,
    "6": 369
  },
  ultime: {
    "1": 169,
    "3": 589,
    "6": 669
  }
};

// Fonction pour mettre à jour le prix affiché pour un pack donné
function updatePrix(pack) {
  const radios = document.querySelectorAll(`input[name='${pack}-duration']`);
  let selectedValue = null;
  radios.forEach(radio => {
    if (radio.checked) selectedValue = radio.value;
  });
  if (selectedValue) {
    const prixElement = document.getElementById(`${pack}-price`);
    if (prixElement) {
      prixElement.textContent = prixPacks[pack][selectedValue] + "€";
    }
  }
}

// Ajouter écouteur à chaque groupe de radios pour chaque pack
['debutant', 'pro', 'ultime'].forEach(pack => {
  document.querySelectorAll(`input[name='${pack}-duration']`).forEach(radio => {
    radio.addEventListener('change', () => updatePrix(pack));
  });
  // Mise à jour initiale
  updatePrix(pack);
});

// Fonction unique pour récupérer la durée sélectionnée et rediriger
function goToPack(pack) {
  const radios = document.querySelectorAll(`input[name='${pack}-duration']`);
  let selectedValue = null;
  radios.forEach(radio => {
    if (radio.checked) selectedValue = radio.value;
  });
  if (selectedValue) {
    alert(`Vous avez choisi le pack ${pack} pour ${selectedValue} mois au prix de ${prixPacks[pack][selectedValue]}€.`);
    // Redirection vers la page pack.html avec paramètre duration
    window.location.href = `${pack}.html?duration=${selectedValue}`;
  } else {
    alert("Veuillez sélectionner une durée.");
  }
}
