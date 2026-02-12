/**
 * Utilitaires pour la conversion Fréquence <-> Notes
 */

// Liste des noms de notes pour le calcul du demi-ton
const NOTE_NAMES_INDEX = ["Do", "Do#", "Ré", "Ré#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"];

/**
 * Calcule la note la plus proche d'une fréquence donnée
 * @param {number} frequency - Fréquence en Hz détectée par le micro
 * @returns {Object} { name: "Do", octave: 4, cents: -5 }
 */
export function getNoteFromFrequency(frequency) {
    if (!frequency || frequency <= 0) return null;

    // Formule mathématique : n = 12 * log2(f / 440) + 69
    // 69 est le numéro MIDI pour La4 (440Hz)
    const n = 12 * Math.log2(frequency / 440) + 69;
    const midiNum = Math.round(n);
    
    // Calcul de l'octave (Le Do3 commence à 48 en MIDI, Do4 à 60)
    const octave = Math.floor(midiNum / 12) - 1;
    
    // Nom de la note (Français)
    const name = NOTE_NAMES_INDEX[midiNum % 12];
    
    // Calcul de la justesse en cents (100 cents = 1 demi-ton)
    const cents = Math.floor(1200 * Math.log2(frequency / getFrequencyFromMidi(midiNum)));

    return { name, octave, cents, midi: midiNum };
}

/**
 * Retourne la fréquence théorique parfaite d'un numéro MIDI
 */
export function getFrequencyFromMidi(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
}

/**
 * Formate le score pour l'affichage (ex: "18 sur 20") 
 * pour éviter les erreurs d'interprétation de date dans LibreOffice
 */
export function formatScore(value, total) {
    return `${value} sur ${total}`;
}