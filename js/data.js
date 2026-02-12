// Fréquence de référence La4 = 440Hz
// Mapping simplifié pour l'exemple. Doigtés représentés par des ID de clés.

export const NOTES_DATA = [
    // Octave 3 (Chalumeau grave) - Note écrite Clarinette
    { note: "Mi", octave: 3, freq: 146.83, keys: ["T", "1", "2", "3", "4", "5", "6"] }, // Réel Ré3
    { note: "Fa", octave: 3, freq: 155.56, keys: ["T", "1", "2", "3", "4", "5", "6", "F"] },
    { note: "Sol", octave: 3, freq: 174.61, keys: ["T", "1", "2", "3", "4", "5"] },
    { note: "La", octave: 3, freq: 196.00, keys: ["T", "1", "2", "3", "4"] },
    { note: "Si", octave: 3, freq: 220.00, keys: ["T", "1", "2", "3"] },
    // Octave 4 (Clairon)
    { note: "Do", octave: 4, freq: 233.08, keys: ["T", "1", "2", "3"] }, // Réel Sib3
    { note: "Ré", octave: 4, freq: 261.63, keys: ["T", "1", "2"] },
    { note: "Mi", octave: 4, freq: 293.66, keys: ["T", "1"] },
    { note: "Fa", octave: 4, freq: 311.13, keys: ["T"] },
    { note: "Sol", octave: 4, freq: 349.23, keys: [] }, // Vide
    { note: "La", octave: 4, freq: 392.00, keys: ["A"] },
    { note: "Si", octave: 4, freq: 440.00, keys: ["R", "1", "2", "3", "4", "5"] }, // + clé registre
    { note: "Do", octave: 5, freq: 466.16, keys: ["R", "1", "2", "3", "4"] }
    // On peut étendre cette liste pour le mode Expert
];

export const GAMMES_MAJEURES = {
    "Do": ["Do", "Ré", "Mi", "Fa", "Sol", "La", "Si", "Do"],
    "Ré": ["Ré", "Mi", "Fa#", "Sol", "La", "Si", "Do#", "Ré"],
    "Mi": ["Mi", "Fa#", "Sol#", "La", "Si", "Do#", "Ré#", "Mi"],
    "Fa": ["Fa", "Sol", "La", "Si b", "Do", "Ré", "Mi", "Fa"],
    "Sol": ["Sol", "La", "Si", "Do", "Ré", "Mi", "Fa#", "Sol"],
    "La": ["La", "Si", "Do#", "Ré", "Mi", "Fa#", "Sol#", "La"],
    "Si": ["Si", "Do#", "Ré#", "Mi", "Fa#", "Sol#", "La#", "Si"]
};

// Correspondance Note Anglaise (pour VexFlow) <-> Note Française
export const TRANSLATION = {
    "Do": "c", "Ré": "d", "Mi": "e", "Fa": "f", "Sol": "g", "La": "a", "Si": "b",
    "Do#": "c#", "Fa#": "f#", "Sol#": "g#", "Si b": "bb"
};