const express = require('express');
const path = require('path');
const app = express();

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

// Middleware personnalisé pour vérifier les heures d'ouverture
function checkWorkingHours(req, res, next) {
    const now = new Date();
    const day = now.getDay(); // 0 pour dimanche, 1 pour lundi, etc.
    const hour = now.getHours();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next(); // Si c'est pendant les heures ouvrables, continuer
    } else {
        res.send("L'application est disponible uniquement pendant les heures ouvrables (Lundi - Vendredi, 9h - 17h).");
    }
}

// Appliquer le middleware à toutes les routes
app.use(checkWorkingHours);

// Servir les fichiers statiques (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes pour les différentes pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});


