// ─── DONNÉES HABITUDES ─────────────────────────────────────────────
// Structure : chaque mois introduit de NOUVELLES habitudes qui s'accumulent
// Les habitudes des mois précédents restent actives

const HABITS_DATA = {
  "2026-06": {
    daily: [
      { id: "d_brossage_soir", label: "Brossage dents soir", icon: "🦷", category: "beauté" },
      { id: "d_brossage_matin", label: "Brossage dents matin", icon: "🦷", category: "beauté" },
      { id: "d_brossette_soir", label: "Brossette soir", icon: "✨", category: "beauté" },
      { id: "d_bdc_coco", label: "Bain de bouche huile de coco soir", icon: "🥥", category: "beauté" },
      { id: "d_bdc_normal", label: "Bain de bouche normal matin", icon: "💧", category: "beauté" },
      { id: "d_boutons", label: "Arrêter de toucher mes boutons", icon: "🚫", category: "beauté" },
      { id: "d_deficit", label: "Déficit calorique", icon: "🥗", category: "santé" },
      { id: "d_sport", label: "Séance de sport", icon: "💪", category: "sport" },
      { id: "d_10k", label: "10 000 pas", icon: "👟", category: "sport" },
      { id: "d_journal", label: "Journal des émotions", icon: "📓", category: "mental" },
      { id: "d_anglais", label: "Apprendre l'anglais", icon: "🇬🇧", category: "growth" },
    ],
    weekly: [
      { id: "w_mamie", label: "Passer voir mamie", icon: "👵", category: "relations" },
      { id: "w_laver", label: "Laver", icon: "🧺", category: "maison" },
    ],
    monthly: [
      { id: "m_photos", label: "Photos évolutions", icon: "📸", category: "beauté" },
      { id: "m_maquillage", label: "Nettoyer maquillage", icon: "💄", category: "beauté" },
    ],
    oneshot: [
      { id: "o_coiffeur_juin", label: "Aller chez le coiffeur (27 juin)", icon: "✂️", date: "2026-06-27" },
      { id: "o_rdv_endo", label: "Prendre RDV endocrinologue", icon: "🏥" },
      { id: "o_therapie", label: "Commencer thérapie", icon: "🧠" },
    ]
  },
  "2026-07": {
    daily: [
      { id: "d_serum_cheveux", label: "Sérum pousse cheveux", icon: "💆", category: "beauté" },
      { id: "d_coif_prot_nuit", label: "Coiffure protectrice nuit", icon: "🌙", category: "beauté" },
      { id: "d_coif_prot_jour", label: "Coiffure protectrice journée", icon: "☀️", category: "beauté" },
      { id: "d_soin_boucles", label: "Prendre soin des boucles", icon: "🌀", category: "beauté" },
      { id: "d_protec_soleil_chev", label: "Protecteur cheveux soleil", icon: "🌞", category: "beauté" },
      { id: "d_solaire_visage", label: "Protection solaire visage", icon: "🧴", category: "beauté" },
      { id: "d_routine_boucle", label: "Routine boucle", icon: "💫", category: "beauté" },
      { id: "d_taie_satin", label: "Taie oreiller en satin", icon: "🛏️", category: "beauté" },
    ],
    weekly: [
      { id: "w_masque_chev", label: "Masque cheveux dimanche", icon: "🧴", category: "beauté" },
      { id: "w_lavage_sechage", label: "Lavage + séchage + styliser cheveux (2x/sem)", icon: "💇", category: "beauté" },
    ],
    monthly: [],
    oneshot: [
      { id: "o_routine_boucle", label: "Trouver routine boucle", icon: "🌀" },
      { id: "o_routine_visage", label: "Trouver routine visage", icon: "🪞" },
      { id: "o_rdv_urologue", label: "RDV urologue 9 juillet", icon: "🏥", date: "2026-07-09" },
    ]
  },
  "2026-08": {
    daily: [
      { id: "d_hydratation_peau", label: "Hydratation peau entière", icon: "🧴", category: "beauté" },
      { id: "d_gua_sha", label: "Gua sha", icon: "💎", category: "beauté" },
      { id: "d_serum_cils", label: "Sérum pousse cils", icon: "👁️", category: "beauté" },
      { id: "d_supplementer", label: "Me supplémenter", icon: "💊", category: "santé" },
    ],
    weekly: [
      { id: "w_manucure", label: "Manucure", icon: "💅", category: "beauté" },
      { id: "w_pedicure", label: "Pédicure", icon: "🦶", category: "beauté" },
      { id: "w_gommage", label: "Gommage", icon: "✨", category: "beauté" },
      { id: "w_massage_lymph", label: "Massage lymphatique", icon: "🤲", category: "santé" },
    ],
    monthly: [
      { id: "m_formation", label: "Suivre une formation", icon: "📚", category: "growth" },
    ],
    oneshot: [
      { id: "o_suppl_rech", label: "Comprendre la supplémentation", icon: "🔬" },
      { id: "o_livre_mamie", label: "Faire remplir livre mamie", icon: "📖" },
    ]
  },
  "2026-09": {
    daily: [
      { id: "d_meditation", label: "Méditation", icon: "🧘", category: "mental" },
      { id: "d_sentir_bon", label: "Sentir bon tout le temps", icon: "🌸", category: "beauté" },
      { id: "d_lecture", label: "Lire", icon: "📚", category: "growth" },
      { id: "d_respiration", label: "Exercice de respiration", icon: "🌬️", category: "mental" },
    ],
    weekly: [
      { id: "w_zone_confort", label: "Sortir de sa zone de confort", icon: "🚀", category: "growth" },
      { id: "w_posture", label: "Exercice posture droite (2-3x/sem)", icon: "🏋️", category: "sport" },
      { id: "w_bilan_finance", label: "Bilan finances", icon: "💰", category: "finances" },
    ],
    monthly: [],
    oneshot: [
      { id: "o_routine_makeup", label: "Trouver routine maquillage quotidien", icon: "💄" },
      { id: "o_sentir_bon_how", label: "Trouver comment sentir bon", icon: "🌹" },
      { id: "o_sopk", label: "Trouver alimentation SOPK", icon: "🥗" },
    ]
  },
  "2026-10": {
    daily: [
      { id: "d_massage_poitrine", label: "Massage raffermissant poitrine", icon: "💗", category: "beauté" },
      { id: "d_souplesse", label: "Exercice souplesse", icon: "🤸", category: "sport" },
      { id: "d_sommeil_8h", label: "Dormir 8h par nuit", icon: "😴", category: "santé" },
    ],
    weekly: [
      { id: "w_new_personne", label: "Parler à une nouvelle personne", icon: "🤝", category: "relations" },
    ],
    monthly: [
      { id: "m_rdv_max", label: "Sortir avec Max — RDV réguliers", icon: "💑", category: "relations" },
    ],
    oneshot: [
      { id: "o_browlift", label: "Faire un browlift", icon: "✨" },
      { id: "o_rehaussement_cils", label: "Faire un rehaussement de cils", icon: "👁️" },
    ]
  },
  "2026-11": {
    daily: [
      { id: "d_yoga_visage", label: "Yoga du visage", icon: "🧘", category: "beauté" },
      { id: "d_soignee", label: "Toujours être soignée", icon: "👑", category: "beauté" },
    ],
    weekly: [],
    monthly: [],
    oneshot: [
      { id: "o_cuisine", label: "Apprendre à cuisiner", icon: "👩‍🍳" },
    ]
  },
  "2026-12": {
    daily: [],
    weekly: [
      { id: "w_oui_experience", label: "Dire oui à une expérience", icon: "🎉", category: "growth" },
      { id: "w_voir_copains", label: "Voir les copains", icon: "👫", category: "relations" },
    ],
    monthly: [],
    oneshot: [
      { id: "o_tatouage", label: "Me faire tatouer", icon: "🎨" },
      { id: "o_sorties", label: "Proposer des sorties", icon: "🗓️" },
      { id: "o_conversations", label: "Initier des conversations", icon: "💬" },
    ]
  },
  "2027-01": {
    daily: [
      { id: "d_screen_time", label: "Moins de 2h de téléphone", icon: "📵", category: "mental" },
    ],
    weekly: [],
    monthly: [
      { id: "m_autobronzant", label: "Autobronzant", icon: "🌟", category: "beauté" },
    ],
    oneshot: []
  },
  "2027-02": {
    daily: [],
    weekly: [
      { id: "w_pilates", label: "Pilates (2x/semaine)", icon: "🤸", category: "sport" },
    ],
    monthly: [
      { id: "m_tenter_nouveau", label: "Tenter quelque chose de nouveau", icon: "🌈", category: "growth" },
    ],
    oneshot: [
      { id: "o_pole_dance", label: "Tester pole dance", icon: "💃" },
      { id: "o_enduro", label: "Découvrir l'enduro", icon: "🏍️" },
      { id: "o_image_corporelle", label: "Travailler l'image corporelle", icon: "🪞" },
    ]
  },
  "2027-03": {
    daily: [],
    weekly: [],
    monthly: [
      { id: "m_activite_creative", label: "Faire une activité créative", icon: "🎨", category: "growth" },
      { id: "m_randonnee", label: "Faire des randonnées", icon: "🏔️", category: "sport" },
    ],
    oneshot: [
      { id: "o_bijoux", label: "Acheter des bijoux", icon: "💍" },
      { id: "o_detartrage", label: "Détartrage dents", icon: "🦷" },
    ]
  },
  "2027-04": {
    daily: [],
    weekly: [],
    monthly: [],
    oneshot: [
      { id: "o_passerelle_moto", label: "Passer ma passerelle MOTO", icon: "🏍️" },
    ]
  },
  "2027-05": {
    daily: [],
    weekly: [],
    monthly: [],
    oneshot: [
      { id: "o_piste_moto", label: "Essayer la piste moto", icon: "🏁" },
    ]
  },
  "2027-06": {
    daily: [],
    weekly: [],
    monthly: [],
    oneshot: [
      { id: "o_garde_robe", label: "Renouveler garde-robe", icon: "👗" },
      { id: "o_style", label: "Trouver un style que j'aime", icon: "✨" },
      { id: "o_coiffeur_juin27", label: "Aller chez le coiffeur", icon: "✂️" },
      { id: "o_browlift_juin27", label: "Faire un browlift", icon: "✨" },
      { id: "o_cils_juin27", label: "Faire un rehaussement de cils", icon: "👁️" },
    ]
  }
};

// Retourne toutes les habitudes actives pour un mois donné (cumul des mois précédents)
function getActiveHabits(yearMonth) {
  const months = Object.keys(HABITS_DATA).sort();
  const activeDaily = [];
  const activeWeekly = [];
  const activeMonthly = [];
  const activeOneshot = [];
  const seen = new Set();

  for (const m of months) {
    if (m > yearMonth) break;
    const data = HABITS_DATA[m];
    if (!data) continue;

    for (const h of data.daily) {
      if (!seen.has(h.id)) { seen.add(h.id); activeDaily.push(h); }
    }
    for (const h of data.weekly) {
      if (!seen.has(h.id)) { seen.add(h.id); activeWeekly.push(h); }
    }
    for (const h of data.monthly) {
      if (!seen.has(h.id)) { seen.add(h.id); activeMonthly.push(h); }
    }
    for (const h of data.oneshot) {
      if (!seen.has(h.id)) { seen.add(h.id); activeOneshot.push(h); }
    }
  }

  return { daily: activeDaily, weekly: activeWeekly, monthly: activeMonthly, oneshot: activeOneshot };
}

// Formate une date en clé YYYY-MM-DD
function toKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

// Formate en YYYY-MM
function toMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}`;
}

function getDayOfWeek(date) {
  // 0=Sun,1=Mon...6=Sat
  return date.getDay();
}

function getWeekNumber(date) {
  const d = new Date(date);
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
