import { AudioEngine } from './audio-engine.js';
import { Renderer } from './renderer.js';
import { SolfegeModule } from './modules/solfege.js';
import { PartitionModule } from './modules/partition.js';

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

    // Gestion Menu Principal
    mainMenu.addEventListener("change", (e) => {
        if (e.target.value === "solfege") {
            subMenuSolf.classList.remove("hidden");
            subMenuPart.classList.add("hidden");
            handleSubMenu();
        } else {
            subMenuSolf.classList.add("hidden");
            subMenuPart.classList.remove("hidden");
            handleSubMenu();
        }
    });

    // Gestion Sous-Menus
    subMenuSolf.addEventListener("change", handleSubMenu);
    subMenuPart.addEventListener("change", handleSubMenu);

    function handleSubMenu() {
        // Reset UI
        audio.stop();
        controlsArea.innerHTML = "";
        
        const mode = mainMenu.value;
        
        if (mode === "solfege") {
            const sub = subMenuSolf.value;
            if (sub === "notes") {
                controlsArea.innerHTML = `
                    <label><input type="checkbox" id="accidental-check"> Avec Altérations</label>
                    <select id="level-select">
                        <option value="debutant">Débutant (Chalumeau)</option>
                        <option value="inter">Intermédiaire</option>
                    </select>
                    <button id="btn-start-game">Commencer la série</button>
                `;
                document.getElementById("btn-start-game").onclick = () => {
                    const diff = document.getElementById("level-select").value;
                    solfege.startNotesGame(diff, false);
                };
            } else if (sub === "gammes") {
                solfege.renderGammesUI();
            }
        } 
        else if (mode === "partition") {
            const sub = subMenuPart.value;
            partition.renderUI(sub);
        }
    }

    // Init par défaut
    handleSubMenu();
});