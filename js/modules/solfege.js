import { NOTES_DATA, GAMMES_MAJEURES } from '../data.js';
import { getNoteFromFrequency } from '../utils.js';

export class SolfegeModule {
    constructor(renderer, audioEngine) {
        this.renderer = renderer;
        this.audio = audioEngine;
        this.currentSeries = [];
        this.currentIndex = 0;
        this.targetNote = null;
        this.score = 0;
    }

    // --- OPTION 1: JEU DES NOTES ---
    startNotesGame(difficulty, useAccidentals) {
        // Génération de 20 notes aléatoires basées sur la difficulté
        this.currentSeries = [];
        for(let i=0; i<20; i++) {
            const randomNote = NOTES_DATA[Math.floor(Math.random() * NOTES_DATA.length)];
            this.currentSeries.push(randomNote);
        }
        this.currentIndex = 0;
        this.score = 0;
        this.nextNote();
        
        // Démarrage Audio
        this.audio.startMicrophone((freq) => this.checkPitch(freq));
    }

    nextNote() {
        if (this.currentIndex >= this.currentSeries.length) {
            alert("Série terminée ! Score : " + this.score + "/20");
            // Afficher bouton Recommencer
            return;
        }
        this.targetNote = this.currentSeries[this.currentIndex];
        
        // Affichage
        this.renderer.drawNote(this.targetNote.note, this.targetNote.octave);
        this.renderer.drawClarinet(this.targetNote.keys);
        
        document.getElementById("note-detected").innerText = "?";
        document.getElementById("tuner-bar").className = "tuner-bar-fill";
    }

    checkPitch(freq) {
        if (freq === -1 || !this.targetNote) return;

        // Affichage Fréquence
        document.getElementById("frequency-display").innerText = Math.round(freq) + " Hz";

        // Tolérance (plus large pour débutant, environ 3% d'écart)
        const targetFreq = this.targetNote.freq; // Attention: C'est la fréquence concert pitch
        const diff = Math.abs(freq - targetFreq);
        
        // Calcul position barre tuner (simple)
        const percent = Math.max(0, Math.min(100, 50 + (freq - targetFreq))); 
        const bar = document.getElementById("tuner-bar");
        bar.style.left = percent + "%";

        if (diff < 5) { // Si très proche (< 5Hz)
            bar.classList.add("in-tune");
            document.getElementById("note-detected").innerText = this.targetNote.note;
            document.getElementById("note-detected").style.color = "green";
            
            // On attend 0.5s avant la suivante
            if (!this.waiting) {
                this.waiting = true;
                setTimeout(() => {
                    this.score++;
                    this.currentIndex++;
                    this.waiting = false;
                    this.nextNote();
                }, 500);
            }
        } else {
            bar.classList.remove("in-tune");
        }
    }

    // --- OPTION 2: GAMMES ---
    renderGammesUI() {
        const controls = document.getElementById("controls-area");
        controls.innerHTML = `
            <div class="scale-buttons" id="scale-btns"></div>
            <div class="scale-display" id="scale-notes"></div>
        `;

        const btnContainer = document.getElementById("scale-btns");
        const notesContainer = document.getElementById("scale-notes");
        
        // Création boutons
        ["Do", "Ré", "Mi", "Fa", "Sol", "La", "Si"].forEach(note => {
            const btn = document.createElement("div");
            btn.className = "scale-btn";
            btn.innerText = note;
            btn.onclick = () => this.showScale(note, btnContainer, notesContainer);
            btnContainer.appendChild(btn);
        });
    }

    showScale(rootNote, btnContainer, notesContainer) {
        // Highlight bouton
        Array.from(btnContainer.children).forEach(b => b.classList.remove("active"));
        Array.from(btnContainer.children).find(b => b.innerText === rootNote).classList.add("active");

        // Affiche les 8 cases
        notesContainer.innerHTML = "";
        const scaleNotes = GAMMES_MAJEURES[rootNote];
        
        scaleNotes.forEach(n => {
            const box = document.createElement("div");
            box.className = "note-box";
            box.innerText = n;
            // Interaction: Cliquer sur une note de la gamme affiche son doigté
            box.onclick = () => {
                // Trouver la donnée de cette note (simplification: prend la 1ere occurrence octave 4)
                const noteData = NOTES_DATA.find(d => d.note === n) || NOTES_DATA[0];
                this.renderer.drawNote(noteData.note, noteData.octave);
                this.renderer.drawClarinet(noteData.keys);
            };
            notesContainer.appendChild(box);
        });

        // Affiche la première note par défaut
        const first = scaleNotes[0];
        const noteData = NOTES_DATA.find(d => d.note === first) || NOTES_DATA[0];
        this.renderer.drawNote(noteData.note, noteData.octave);
        this.renderer.drawClarinet(noteData.keys);
    }
}