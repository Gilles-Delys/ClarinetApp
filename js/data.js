/**
 * DONNÉES ET SVG CLARINETTE
 */
export const NOTE_DATA = [
    {note:"Mi", octave:3, freq:146.83, vexKey:"e/3", level:1},
    {note:"Fa", octave:3, freq:174.61, vexKey:"f/3", level:1},
    {note:"Fa#", octave:3, freq:185.00, vexKey:"f#/3", level:1},
    {note:"Sol", octave:3, freq:196.00, vexKey:"g/3", level:1},
    {note:"Sol#", octave:3, freq:207.65, vexKey:"g#/3", level:1},
    {note:"La", octave:3, freq:220.00, vexKey:"a/3", level:1},
    {note:"Sib", octave:3, freq:233.08, vexKey:"bf/3", level:2},
    {note:"Si", octave:3, freq:246.94, vexKey:"b/3", level:2},
    {note:"Do", octave:4, freq:261.63, vexKey:"c/4", level:2},
    {note:"Do#", octave:4, freq:277.18, vexKey:"c#/4", level:2},
    {note:"Ré", octave:4, freq:293.66, vexKey:"d/4", level:2},
    {note:"Ré#", octave:4, freq:311.13, vexKey:"d#/4", level:2},
    {note:"Mi", octave:4, freq:329.63, vexKey:"e/4", level:2},
    {note:"Fa", octave:4, freq:349.23, vexKey:"f/4", level:2},
    {note:"Fa#", octave:4, freq:369.99, vexKey:"f#/4", level:2},
    {note:"Sol", octave:4, freq:392.00, vexKey:"g/4", level:1},
    {note:"Sol#", octave:4, freq:415.30, vexKey:"g#/4", level:2},
    {note:"La", octave:4, freq:440.00, vexKey:"a/4", level:2},
    {note:"Sib", octave:4, freq:466.16, vexKey:"bf/4", level:2},
    {note:"Si", octave:4, freq:493.88, vexKey:"b/4", level:3},
    {note:"Do", octave:5, freq:523.25, vexKey:"c/5", level:3},
    {note:"Do#", octave:5, freq:554.37, vexKey:"c#/5", level:3},
    {note:"Ré", octave:5, freq:587.33, vexKey:"d/5", level:3},
    {note:"Ré#", octave:5, freq:622.25, vexKey:"d#/5", level:3},
    {note:"Mi", octave:5, freq:659.25, vexKey:"e/5", level:3},
    {note:"Fa", octave:5, freq:698.46, vexKey:"f/5", level:3},
    {note:"Fa#", octave:5, freq:739.99, vexKey:"f#/5", level:3},
    {note:"Sol", octave:5, freq:783.99, vexKey:"g/5", level:3},
    {note:"Sol#", octave:5, freq:830.61, vexKey:"g#/5", level:4},
    {note:"La", octave:5, freq:880.00, vexKey:"a/5", level:4},
    {note:"Sib", octave:5, freq:932.33, vexKey:"bf/5", level:4},
    {note:"Si", octave:5, freq:987.77, vexKey:"b/5", level:4},
    {note:"Do", octave:6, freq:1046.50, vexKey:"c/6", level:4},
    {note:"Do#", octave:6, freq:1108.73, vexKey:"c#/6", level:5},
    {note:"Ré", octave:6, freq:1174.66, vexKey:"d/6", level:5},
    {note:"Ré#", octave:6, freq:1244.51, vexKey:"d#/6", level:5},
    {note:"Mi", octave:6, freq:1318.51, vexKey:"e/6", level:5},
    {note:"Fa", octave:6, freq:1396.91, vexKey:"f/6", level:5},
    {note:"Sol", octave:6, freq:1567.98, vexKey:"g/6", level:5},
    {note:"La", octave:6, freq:1760.00, vexKey:"a/6", level:5},
    {note:"Do", octave:7, freq:2093.00, vexKey:"c/7", level:5}
];

export const FINGERINGS = {
    "Mi3": { keys: ["T","R","1","2","3","4","5","6","L_E","R_F"] },
    "Fa3": { keys: ["T","1","2","3","4","5","6","R_F"] },
    "Fa#3": { keys: ["T","1","2","3","4","5","6","R_E"] },
    "Sol3": { keys: ["T","1","2","3","4","5","6"] },
    "Sol#3": { keys: ["T","1","2","3","4","5","6","L_Ab"] },
    "La3": { keys: ["T","1","2","3","4","5"] },
    "Sib3": { keys: ["T","1","2","3","4","Side_Bb"] },
    "Si3": { keys: ["T","1","2","3","5","6","R_F"] },
    "Do4": { keys: ["T","1","2","3"] },
    "Do#4": { keys: ["T","1","2","3","L_Db"] },
    "Ré4": { keys: ["T","1","2"] },
    "Ré#4": { keys: ["T","1","2","Side_Eb"] },
    "Mi4": { keys: ["T","1"] },
    "Fa4": { keys: ["T"] },
    "Fa#4": { keys: ["2","3"] },
    "Sol4": { keys: [] },
    "Sol#4": { keys: ["key-A_key","key-Ab_key"] },
    "La4": { keys: ["key-A_key"] },
    "Sib4": { keys: ["key-A_key","R"] },
    "Si4": { keys: ["R","T","1","2","3","4","5","6","L_E"] },
    "Do5": { keys: ["R","T","1","2","3","4","5","6"] },
    "Do#5": { keys: ["R","T","1","2","3","4","5","6","L_Db"] },
    "Ré5": { keys: ["R","T","1","2","3","4","5"] },
    "Ré#5": { keys: ["R","T","1","2","3","4","5","Side_Eb"] },
    "Mi5": { keys: ["R","T","1","2","3"] },
    "Fa5": { keys: ["R","T","1","2"] },
    "Fa#5": { keys: ["R","T","1","3"] },
    "Sol5": { keys: ["R","T","1"] },
    "Sol#5": { keys: ["R","T","1","key-Ab_key"] },
    "La5": { keys: ["R","T","2","3"] },
    "Sib5": { keys: ["R","T","3"] },
    "Si5": { keys: ["R","1","2","3","L_E"] },
    "Do6": { keys: ["R","1","2","3"] },
    "Do#6": { keys: ["R","1","2","L_Db"] },
    "Ré6": { keys: ["R","2","3","L_Ab"] },
    "Ré#6": { keys: ["R","2","3","Side_Eb"] },
    "Mi6": { keys: ["R","2","3","Side_Eb","L_E"] },
    "Fa6": { keys: ["R","1","4","5","L_Ab"] },
    "Sol6": { keys: ["R","1","3","4","6"] },
    "La6": { keys: ["R","2","3","4","5"] },
    "Do7": { keys: ["R","1","2","3","4","5","6","Side_Eb"] }
};

export function getClarinetSVG() {
    return `
    <svg viewBox="0 0 150 700" xmlns="http://www.w3.org/2000/svg">
        <rect id="key-R" x="35" y="40" width="15" height="8" rx="2" class="cl-contour" />
        <circle id="hole-T" cx="42" cy="75" r="10" class="cl-hole-bg" />
        <rect id="key-A_key" x="65" y="85" width="20" height="8" rx="2" class="cl-contour" />
        <rect id="key-Ab_key" x="65" y="105" width="18" height="8" rx="2" class="cl-contour" />
        <circle id="hole-1" cx="75" cy="140" r="12" class="cl-hole-bg" />
        <circle id="hole-2" cx="75" cy="185" r="12" class="cl-hole-bg" />
        <circle id="hole-3" cx="75" cy="230" r="12" class="cl-hole-bg" />
        <rect id="key-Side_Bb" x="95" y="135" width="8" height="25" rx="2" class="cl-contour" />
        <rect id="key-Side_Eb" x="95" y="165" width="8" height="25" rx="2" class="cl-contour" />
        <circle id="hole-4" cx="75" cy="350" r="12" class="cl-hole-bg" />
        <circle id="hole-5" cx="75" cy="370" r="12" class="cl-hole-bg" />
        <circle id="hole-6" cx="75" cy="440" r="12" class="cl-hole-bg" />
        <path id="key-L_E" d="M 35 480 L 55 480 L 55 510 L 35 510 Z" class="cl-contour" />
        <path id="key-L_Ab" d="M 35 520 L 55 520 L 55 550 L 35 550 Z" class="cl-contour" />
        <path id="key-R_F" d="M 95 480 L 115 480 L 115 510 L 95 510 Z" class="cl-contour" />
        <path id="key-R_E" d="M 95 520 L 115 520 L 115 550 L 95 550 Z" class="cl-contour" />
        <path id="key-L_Db" d="M 35 560 L 55 560 L 55 590 L 35 590 Z" class="cl-contour" />
    </svg>`;
}