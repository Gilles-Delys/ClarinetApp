export class AudioEngine {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.mediaStreamSource = null;
        this.isPlaying = false;
        this.callback = null;
    }

    async init() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    async startMicrophone(callback) {
        await this.init();
        this.callback = callback;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 2048;
            this.mediaStreamSource.connect(this.analyser);
            this.isPlaying = true;
            this.loop();
        } catch (e) {
            console.error("Erreur micro:", e);
            alert("Accès micro refusé.");
        }
    }

    stop() {
        this.isPlaying = false;
        if (this.mediaStreamSource) {
            // Désactiver les tracks
        }
    }

    autoCorrelate(buffer, sampleRate) {
        let SIZE = buffer.length;
        let rms = 0;
        for (let i = 0; i < SIZE; i++) {
            const val = buffer[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.01) return -1; // Pas assez de signal

        let r1 = 0, r2 = SIZE - 1, thres = 0.2;
        for (let i = 0; i < SIZE / 2; i++) {
            if (Math.abs(buffer[i]) < thres) { r1 = i; break; }
        }
        for (let i = 1; i < SIZE / 2; i++) {
            if (Math.abs(buffer[SIZE - i]) < thres) { r2 = SIZE - i; break; }
        }

        buffer = buffer.slice(r1, r2);
        SIZE = buffer.length;

        let c = new Array(SIZE).fill(0);
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE - i; j++) {
                c[i] = c[i] + buffer[j] * buffer[j + i];
            }
        }

        let d = 0; while (c[d] > c[d + 1]) d++;
        let maxval = -1, maxpos = -1;
        for (let i = d; i < SIZE; i++) {
            if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
        }
        let T0 = maxpos;

        return sampleRate / T0;
    }

    loop() {
        if (!this.isPlaying) return;
        const buffer = new Float32Array(this.analyser.fftSize);
        this.analyser.getFloatTimeDomainData(buffer);
        const frequency = this.autoCorrelate(buffer, this.audioContext.sampleRate);
        
        if (this.callback) this.callback(frequency);
        
        requestAnimationFrame(() => this.loop());
    }
}