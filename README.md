# ✦ GlowLife

Ton application de suivi d'habitudes personnelle — juin 2026 → juin 2027.

## Déploiement sur GitHub Pages

1. **Crée un nouveau repo** sur GitHub (ex: `glow-life`)
2. **Upload les fichiers** suivants dans le repo :
   - `index.html`
   - `app.js`
   - `data.js`
   - `manifest.json`
3. Va dans **Settings → Pages**
4. Source : `Deploy from a branch` → branche `main`, dossier `/ (root)`
5. Clique **Save**
6. Ton app sera disponible sur `https://TON-USERNAME.github.io/glow-life/`

## Fonctionnalités

- **Aujourd'hui** : toutes tes habitudes du jour à cocher (quotidiennes + hebdomadaires planifiées + mensuelles)
- **Semaine** : vue de la semaine + planification des habitudes hebdomadaires (tu choisis quel jour tu fais quoi)
- **Mois** : calendrier de progression + stats + nouvelles habitudes du mois
- **Cumul automatique** : chaque mois, les habitudes des mois précédents restent actives et s'accumulent
- **Missions ponctuelles** : les one-shots à accomplir dans le mois
- **Streak** : compteur de jours consécutifs complets

## Structure des données

Toutes les données sont sauvegardées localement dans le navigateur (`localStorage`).
Rien n'est envoyé sur un serveur — c'est 100% privé.

## Ajouter des icônes PWA (optionnel)

Pour que l'app s'installe proprement sur ton téléphone, ajoute deux images PNG :
- `icon-192.png` (192×192 px)
- `icon-512.png` (512×512 px)

Tu peux utiliser n'importe quelle image carrée (ton logo, une étoile ✦, etc.)
