import { getNoteFromFrequency } from '../utils.js';

export class PartitionModule {
    constructor(audioEngine) {
        this.audio = audioEngine;
        this.recordedNotes = [];
        this.isRecording = false;
        
        // Paramètres de rythme (basés sur un tempo de 60 BPM pour la simplicité)
        // 1 seconde = 1 Noire
        this.startTime = 0;
        this.lastNoteDetected = null;
        this.noteStartTime = 0;
    }

    renderUI(sourceType) {
        const controls = document.getElementById("controls-area");
        controls.innerHTML = `
            <div class="transcription-config">
                <p>Tempo : 60 BPM (1s = ♩)</p>
                ${sourceType === 'file' ? '<input type="file" id="audio-file" accept="audio/*">' : ''}
                <button id="btn-start" class="btn">🔴 Démarrer l'enregistrement</button>
                <button id="btn-stop" class="btn" disabled>⬛ Stop & Export (.docx)</button>
            </div>
            <div id="live-staff"></div>
            <div id="transcription-status">Prêt...</div>
        `;

        document.getElementById("btn-start").onclick = () => this.startTranscription();
        document.getElementById("btn-stop").onclick = () => this.stopAndExport();
    }

    startTranscription() {
        this.recordedNotes = [];
        this.isRecording = true;
        this.noteStartTime = Date.now();
        
        document.getElementById("btn-start").disabled = true;
        document.getElementById("btn-stop").disabled = false;
        
        // On lance l'analyse micro
        this.audio.startMicrophone((freq) => {
            if (!this.isRecording) return;
            this.processFrequency(freq);
        });
    }

    processFrequency(freq) {
        const detected = getNoteFromFrequency(freq);
        const now = Date.now();

        // Si aucune note n'est détectée (silence) ou changement de note
        if (!detected || (this.lastNoteDetected && detected.name !== this.lastNoteDetected.name)) {
            if (this.lastNoteDetected) {
                const durationMs = now - this.noteStartTime;
                const rhythmicType = this.calculateRhythm(durationMs);
                
                if (durationMs > 200) { // On ignore les bruits parasites < 0.2s
                    this.recordedNotes.push({
                        name: this.lastNoteDetected.name,
                        octave: this.lastNoteDetected.octave,
                        duration: rhythmicType,
                        ms: durationMs
                    });
                    this.updateStatus();
                }
            }
            this.lastNoteDetected = detected;
            this.noteStartTime = now;
        }
    }

    /**
     * Convertit la durée en MS en symbole de solfège
     */
    calculateRhythm(ms) {
        if (ms < 400) return "croche";  // ~0.3s
        if (ms < 850) return "noire";   // ~0.5s - 0.8s
        if (ms < 1700) return "blanche"; // ~1s - 1.5s
        return "ronde";                 // > 1.6s
    }

    updateStatus() {
        const status = document.getElementById("transcription-status");
        const last = this.recordedNotes[this.recordedNotes.length - 1];
        status.innerHTML = `Dernière note : <strong>${last.name}</strong> (${last.duration})`;
    }

    async stopAndExport() {
        this.isRecording = false;
        this.audio.stop();
        
        // Génération du document avec docx.js
        const { Document, Packer, Paragraph, TextRun } = window.docx;
        
        const children = [
            new Paragraph({
                children: [new TextRun({ text: "Partition Clarinette Sib", bold: true, size: 28 })]
            }),
            new Paragraph({ text: `Date : ${new Date().toLocaleDateString()}` }),
            new Paragraph({ text: "" })
        ];

        // Construction de la ligne de notes
        const notesLine = this.recordedNotes.map(n => `${n.name} (${n.duration})`).join(" — ");
        children.push(new Paragraph({ children: [new TextRun(notesLine)] }));

        const doc = new Document({ sections: [{ children }] });
        const blob = await Packer.toBlob(doc);
        
        // Téléchargement
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "Ma_Partition.docx";
        link.click();
        
        document.getElementById("btn-start").disabled = false;
        document.getElementById("btn-stop").disabled = true;
    }
}