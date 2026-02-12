import { AudioEngine } from './audio-engine.js';
import { Renderer } from './renderer.js';
import { SolfegeModule } from './modules/solfege.js';
import { PartitionModule } from './modules/partition.js';
import { getNoteFromFrequency } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    // Initialisation des Singletons
    const audio = new AudioEngine();
    const renderer = new Renderer();
    const solfege = new SolfegeModule(renderer, audio);
    const partition = new PartitionModule(audio);

    // DOM Elements
    const mainMenu = document.getElementById("main-menu");
    const subMenuSolf = document.getElementById("sub-menu-solfege");
    const subMenuPart = document.getElementById("sub-menu-partition");
    const controlsArea = document.getElementById("controls-area");
    const noteDisplay = document.getElementById("note-detected");
    const tunerBar = document.getElementById("tuner-bar");
    const freqDisplay = document.getElementById("frequency-display");

    // --- ACTIVATION DU TUNER PERMANENT ---
    // On lance le micro immédiatement pour l'accordeur global
    audio.startMicrophone((freq) => {
        if (freq && freq !== -1) {
            const detected = getNoteFromFrequency(freq);
            if (detected) {
                noteDisplay.innerText = detected.name + detected.octave;
                freqDisplay.innerText = Math.round(freq) + " Hz";
                
                // Calcul de la barre (position 50% = juste)
                const offset = detected.cents; // de -50 à +50
                const percent = 50 + offset; 
                tunerBar.style.left = Math.max(0, Math.min(100, percent)) + "%";

                if (Math.abs(offset) < 10) {
                    tunerBar.classList.add("in-tune");
                    noteDisplay.style.color = "green";
                } else {
                    tunerBar.classList.remove("in-tune");
                    noteDisplay.style.color = "black";
                }
            }
        } else {
            noteDisplay.innerText = "--";
            freqDisplay.innerText = "0 Hz";
            tunerBar.style.left = "50%";
        }
    });

    // --- GESTION DES MENUS ---

    mainMenu.addEventListener("change", (e) => {
        const mode = e.target.value;
        subMenuSolf.classList.toggle("hidden", mode !== "solfege");
        subMenuPart.classList.toggle("hidden", mode !== "partition");
        handleSubMenu();
    });

    subMenuSolf.addEventListener("change", handleSubMenu);
    subMenuPart.addEventListener("change", handleSubMenu);

    function handleSubMenu() {
        controlsArea.innerHTML = "";
        const mode = mainMenu.value;
        
        if (mode === "solfege") {
            const sub = subMenuSolf.value;
            if (sub === "notes") {
                // On prépare l'interface en haut comme demandé
                controlsArea.innerHTML = `
                    <div class="ui-top-bar">
                        <label><input type="checkbox" id="accidental-check"> Avec Altérations</label>
                        <select id="level-select">
                            <option value="debutant">Débutant (Chalumeau)</option>
                            <option value="inter">Intermédiaire</option>
                            <option value="expert">Expert (Complet)</option>
                        </select>
                        <button id="btn-start-game" class="btn-play">▶ Commencer la série</button>
                        <button id="btn-stop-game" class="btn-stop">⬛ Arrêter</button>
                    </div>
                `;
                
                document.getElementById("btn-start-game").onclick = () => {
                    const diff = document.getElementById("level-select").value;
                    const useAcc = document.getElementById("accidental-check").checked;
                    solfege.startNotesGame(diff, useAcc);
                };

                document.getElementById("btn-stop-game").onclick = () => {
                    location.reload(); // Moyen simple de tout réinitialiser proprement
                };

            } else if (sub === "gammes") {
                solfege.renderGammesUI();
            }
        } 
        else if (mode === "partition") {
            partition.renderUI(subMenuPart.value);
        }
    }

    handleSubMenu();
});