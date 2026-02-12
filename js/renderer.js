import { TRANSLATION } from './data.js';

// Importation de VexFlow via un CDN compatible avec les modules ES
import 'https://cdn.jsdelivr.net/npm/vexflow@4.2.2/build/cjs/vexflow.js';

export class Renderer {
    constructor() {
        // VexFlow s'enregistre globalement dans window.Vex
        this.VF = window.Vex.Flow;
        this.divStaff = document.getElementById("staff-container");
        this.divFinger = document.getElementById("fingering-container");
    }

    /**
     * Dessine la note sur une portée en clé de sol
     */
    drawNote(noteName, octave) {
        if (!this.divStaff) return;
        this.divStaff.innerHTML = ""; // Efface le contenu précédent

        const renderer = new this.VF.Renderer(this.divStaff, this.VF.Renderer.Backends.SVG);
        renderer.resize(250, 200);
        const context = renderer.getContext();

        // Dessin de la portée
        const stave = new this.VF.Stave(10, 40, 200);
        stave.addClef("treble").setContext(context).draw();

        // Traduction de la note (ex: Do -> c) et formatage pour VexFlow
        const baseNote = TRANSLATION[noteName] || "c";
        const key = `${baseNote}/${octave}`;

        try {
            const note = new this.VF.StaveNote({
                clef: "treble",
                keys: [key],
                duration: "w"
            });

            // Ajout du nom de la note en dessous
            note.addModifier(new this.VF.Annotation(noteName)
                .setVerticalJustification(this.VF.Annotation.VerticalJustify.BOTTOM), 0);

            // Gestion des altérations (# ou b)
            if (noteName.includes("#")) {
                note.addModifier(new this.VF.Accidental("#"), 0);
            } else if (noteName.includes("b")) {
                note.addModifier(new this.VF.Accidental("b"), 0);
            }

            const voice = new this.VF.Voice({ num_beats: 4, beat_value: 4 });
            voice.addTickables([note]);

            new this.VF.Formatter().joinVoices([voice]).format([voice], 150);
            voice.draw(context, stave);
        } catch (e) {
            console.error("Erreur VexFlow sur la note :", key, e);
        }
    }

    /**
     * Dessine une clarinette SVG détaillée avec clés de trille et clés de côté
     */
    drawClarinet(activeKeys = []) {
        if (!this.divFinger) return;
        
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 120 450");
        svg.setAttribute("style", "height: 100%; max-height: 400px;");

        // --- Corps de l'instrument ---
        const body = document.createElementNS(svgNS, "rect");
        body.setAttribute("x", "45"); body.setAttribute("y", "10");
        body.setAttribute("width", "30"); body.setAttribute("height", "430");
        body.setAttribute("rx", "5"); body.setAttribute("fill", "#2c3e50");
        svg.appendChild(body);

        // --- Définition des clés ---
        const keys = [
            // Clés arrières
            { id: "R", type: "rect", x: 35, y: 30, w: 10, h: 20, label: "Reg" }, // Registre
            { id: "T", type: "circle", cx: 60, cy: 55, r: 7 },                // Pouce

            // Clés de devant (Haut)
            { id: "A", type: "circle", cx: 60, cy: 30, r: 5 },                // Clé de La
            { id: "1", type: "circle", cx: 60, cy: 90, r: 8 },                // Trou 1
            { id: "2", type: "circle", cx: 60, cy: 120, r: 8 },               // Trou 2
            { id: "3", type: "circle", cx: 60, cy: 150, r: 8 },               // Trou 3

            // Clés de trille (Côté droit en haut)
            { id: "Tr1", type: "rect", x: 75, y: 80, w: 8, h: 12 },
            { id: "Tr2", type: "rect", x: 75, y: 95, w: 8, h: 12 },
            { id: "Tr3", type: "rect", x: 75, y: 110, w: 8, h: 12 },
            { id: "Tr4", type: "rect", x: 75, y: 125, w: 8, h: 12 },

            // Clés de devant (Bas)
            { id: "4", type: "circle", cx: 60, cy: 210, r: 8 },               // Trou 4
            { id: "5", type: "circle", cx: 60, cy: 240, r: 8 },               // Trou 5
            { id: "6", type: "circle", cx: 60, cy: 270, r: 8 },               // Trou 6

            // Clés de petit doigt (Main gauche)
            { id: "E", type: "rect", x: 30, y: 300, w: 12, h: 15 },           // Mi grave
            { id: "F", type: "rect", x: 30, y: 320, w: 12, h: 15 },           // Fa
            { id: "F#", type: "rect", x: 30, y: 340, w: 12, h: 15 },          // Fa#

            // Clés de petit doigt (Main droite)
            { id: "Ab", type: "rect", x: 78, y: 300, w: 12, h: 15 },
            { id: "F_R", type: "rect", x: 78, y: 320, w: 12, h: 15 }
        ];

        // --- Rendu des clés ---
        keys.forEach(k => {
            let el;
            if (k.type === "circle") {
                el = document.createElementNS(svgNS, "circle");
                el.setAttribute("cx", k.cx);
                el.setAttribute("cy", k.cy);
                el.setAttribute("r", k.r);
            } else {
                el = document.createElementNS(svgNS, "rect");
                el.setAttribute("x", k.x);
                el.setAttribute("y", k.y);
                el.setAttribute("width", k.w);
                el.setAttribute("height", k.h);
                el.setAttribute("rx", "2");
            }

            // Style par défaut (clé non pressée)
            el.setAttribute("stroke", "#ecf0f1");
            el.setAttribute("stroke-width", "1");
            
            if (activeKeys.includes(k.id)) {
                el.setAttribute("fill", "#e74c3c"); // Rouge pour les clés actives
            } else {
                el.setAttribute("fill", "#7f8c8d"); // Gris pour les clés inactives
            }

            svg.appendChild(el);
        });

        this.divFinger.innerHTML = "";
        this.divFinger.appendChild(svg);
    }
}