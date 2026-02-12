/**
 * CLARINETTE MAESTRO - LOGIQUE PRINCIPALE
 */
import { AudioEngine } from './audio-engine.js';
import { NOTE_DATA, FINGERINGS, getClarinetSVG } from './data.js';

let audioEngine = null;
let isRunning = false;

let gameState = {
    currentNote: null,
    currentNoteIndex: 0,
    notesPool: [],
    validating: false
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialisation visuelle
    const container = document.getElementById('clarinet-svg-container');
    if (container) container.innerHTML = getClarinetSVG();
    
    renderStaff([]); 

    document.getElementById('btn-start').onclick = startExercise;
    document.getElementById('btn-stop').onclick = stopExercise;
});

async function startExercise() {
    if (isRunning) return;
    
    if (!audioEngine) {
        audioEngine = new AudioEngine();
    }
    
    const diff = document.getElementById('difficulty-level').value;
    const useAlt = document.getElementById('alterations-check').checked;
    
    gameState.notesPool = generateNotesPool(diff, useAlt);
    gameState.currentNoteIndex = 0;
    
    document.getElementById('btn-start').disabled = true;
    document.getElementById('btn-stop').disabled = false;

    try {
        await audioEngine.startMicrophone((freq) => {
            if (isRunning) handleAudioInput(freq);
        });
        isRunning = true;
        nextNote();
    } catch (err) {
        alert("Impossible d'accéder au micro.");
        stopExercise();
    }
}

function generateNotesPool(difficulty, useAlt) {
    let maxLvl = 2;
    if (difficulty === 'intermediaire') maxLvl = 3;
    if (difficulty === 'difficile') maxLvl = 4;
    if (difficulty === 'tres-difficile') maxLvl = 5;
    if (difficulty === 'tres-facile') maxLvl = 1;

    let avail = NOTE_DATA.filter(n => n.level <= maxLvl);
    if (!useAlt) {
        avail = avail.filter(n => !n.note.includes('#') && !n.note.includes('b'));
    }

    let p = [];
    for(let i=0; i<20; i++) {
        p.push(avail[Math.floor(Math.random()*avail.length)]);
    }
    return p;
}

function nextNote() {
    if (gameState.currentNoteIndex >= 20) {
        alert("Série terminée ! Bravo.");
        stopExercise();
        return;
    }
    
    gameState.currentNote = gameState.notesPool[gameState.currentNoteIndex];
    
    document.getElementById('progress-count').textContent = gameState.currentNoteIndex + 1;
    document.getElementById('target-note-name').textContent = gameState.currentNote.note + gameState.currentNote.octave;
    document.getElementById('target-note-name').style.color = "red";
    
    renderStaff([gameState.currentNote.vexKey]);
    updateClarinetVisual(gameState.currentNote);
    gameState.validating = false;
}

function handleAudioInput(freq) {
    if (freq === -1 || !gameState.currentNote) return;

    const targetFreq = gameState.currentNote.freq;
    const cents = 1200 * Math.log2(freq / targetFreq);
    
    document.getElementById('detected-freq').textContent = Math.round(freq);
    const bar = document.getElementById('tuner-bar');
    bar.style.left = Math.max(0, Math.min(100, 50 + cents)) + "%";

    if (Math.abs(cents) < 15) {
        bar.style.backgroundColor = "green";
        if (!gameState.validating) {
            gameState.validating = true;
            setTimeout(() => {
                if (gameState.validating && isRunning) {
                    document.getElementById('target-note-name').style.color = "green";
                    gameState.currentNoteIndex++;
                    nextNote();
                }
            }, 800);
        }
    } else {
        bar.style.backgroundColor = "#d35400";
        gameState.validating = false;
    }
}

function updateClarinetVisual(noteObj) {
    document.querySelectorAll('.cl-active').forEach(el => el.classList.remove('cl-active'));
    const noteKey = noteObj.note + noteObj.octave;
    const fingering = FINGERINGS[noteKey];
    
    if (fingering && fingering.keys) {
        fingering.keys.forEach(k => {
            let id = k.match(/^\d+$/) ? "hole-" + k : (k === "T" ? "hole-T" : (k.startsWith("key-") ? k : "key-" + k));
            const el = document.getElementById(id);
            if (el) el.classList.add('cl-active');
        });
    }
}

function renderStaff(notesKeys) {
    const div = document.getElementById('staff-container');
    div.innerHTML = "";
    const VF = Vex.Flow;
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(250, 130);
    const context = renderer.getContext();
    const stave = new VF.Stave(10, 10, 230);
    stave.addClef("treble").setContext(context).draw();
    
    if (notesKeys.length > 0) {
        const notes = [new VF.StaveNote({ keys: notesKeys, duration: "w" })];
        notes.forEach(n => {
            const key = n.getKeys()[0];
            if (key.includes('#')) n.addModifier(new VF.Accidental("#"), 0);
            if (key.includes('b')) n.addModifier(new VF.Accidental("b"), 0);
        });
        VF.Formatter.FormatAndDraw(context, stave, notes);
    }
}

function stopExercise() {
    isRunning = false;
    if (audioEngine) audioEngine.stop();
    document.getElementById('btn-start').disabled = false;
    document.getElementById('btn-stop').disabled = true;
    document.getElementById('target-note-name').textContent = "Prêt ?";
    document.getElementById('target-note-name').style.color = "black";
}