const PI180 = Math.PI / 180;
const PI2 = Math.PI * 2;
const HALFPI = Math.PI / 2;

class Utilities {
    static isType(obj: any, type: string): boolean {
        return Object.prototype.toString.call(obj).toLowerCase() === `[object ${type.toLowerCase()}]`;
    }

    static isFunction(fn: any): boolean {
        return Utilities.isType(fn, 'function');
    }

    static isString(str: any): boolean {
        return Utilities.isType(str, 'string');
    }

    static shallowClone<T extends object>(src: T): T {
        return { ...src };
    }

    static defaults<T extends object>(dest: T, src: Partial<T>): T {
        return { ...dest, ...src };
    }

    static degreesToRadians(degrees: number): number {
        if (!Utilities.isType(degrees, 'number')) {
            throw new TypeError('Degrees is not a number');
        }
        return degrees * PI180;
    }

    static getFn<T>(obj: Record<string, T>, name: T | string, def: string): T {
        if (Utilities.isFunction(name)) {
            return name as T;
        } else if (Utilities.isString(name) && Utilities.isFunction(obj[name as string])) {
            return obj[name as string];
        } else {
            return obj[def];
        }
    }
}

class Ease {
    static linear(percent: number, amplitude: number): number {
        return amplitude;
    }

    static sineIn(percent: number, amplitude: number): number {
        return amplitude * (Math.sin(percent * Math.PI - HALFPI) + 1) * 0.5;
    }

    static sineOut(percent: number, amplitude: number): number {
        return amplitude * (Math.sin(percent * Math.PI + HALFPI) + 1) * 0.5;
    }

    static sineInOut(percent: number, amplitude: number): number {
        return amplitude * (Math.sin(percent * PI2 - HALFPI) + 1) * 0.5;
    }
}

const Waves = {
    sine(x: number): number {
        return Math.sin(x);
    },
    sign(x: number): number {
        x = +x;
        if (x === 0 || isNaN(x)) {
            return x;
        }
        return x > 0 ? 1 : -1;
    },

    square(x: number): number {
        return Waves.sign(Math.sin(x * PI2));
    },

    sawtooth(x: number): number {
        return (x - Math.floor(x + 0.5)) * 2;
    },

    triangle(x: number): number {
        return Math.abs(Waves.sawtooth(x));
    },
    sin(x: number): number {
        return Math.sin(x);
    }
}

Waves.sin = Waves.sine;


interface WaveOptions {
    timeModifier?: number;
    amplitude?: number;
    wavelength?: number;
    segmentLength?: number;
    lineWidth?: number;
    strokeStyle?: string;
    type?: string;
    waveFn?: (x: number) => number;
}

class SineWaves {
    private options: any;
    private el: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private waves: WaveOptions[];
    private dpr: number;
    private width: number = 0;
    private height: number = 0;
    private waveWidth: number = 0;
    private waveLeft: number = 0;
    private yAxis: number = 0;
    private rotation: number;
    private easeFn: Function;
    private time: number = 0;
    private running: boolean = true;

    constructor(options: any) {
        this.options = Utilities.defaults({
            speed: 10,
            rotate: 0,
            ease: 'linear',
            wavesWidth: '95%',
        }, options);

        if (!options.el) throw new Error('No Canvas Selected');
        this.el = options.el;
        this.ctx = this.el.getContext('2d')!;
        this.waves = options.waves || [];
        if (!this.waves.length) throw new Error('No waves specified');

        this.dpr = window.devicePixelRatio || 1;
        this.updateDimensions();
        window.addEventListener('resize', () => this.updateDimensions());

        this.easeFn = Utilities.getFn(Ease, this.options.ease, 'linear');
        this.rotation = Utilities.degreesToRadians(this.options.rotate);
        this.running = !!this.options.running;
        this.setupWaveFns();
        this.loop();
    }

    private setupWaveFns(): void {
        this.waves.forEach(wave => {
            wave.waveFn = Utilities.getFn(Waves, wave.type || 'sine', 'sine');
        });
    }

    private updateDimensions(): void {
        this.width = this.el.width = this.el.clientWidth * this.dpr;
        this.height = this.el.height = this.el.clientHeight * this.dpr;
        this.waveWidth = this.width * (parseFloat(this.options.wavesWidth) / 100);
        this.waveLeft = (this.width - this.waveWidth) / 2;
        this.yAxis = this.height / 2;
    }

    private clear(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    private getPoint(time: number, position: number, options: WaveOptions) {
        const x = (time * this.options.speed) + (-this.yAxis + position) / options.wavelength!;
        const y = options.waveFn!(x);
        const amplitude = this.easeFn(position / this.waveWidth, options.amplitude);
        return { x: position + this.waveLeft, y: amplitude * y + this.yAxis };
    }

    private drawWave(time: number, options: WaveOptions): void {
        options = Utilities.defaults({
            timeModifier: 1,
            amplitude: 50,
            wavelength: 50,
            segmentLength: 10,
            lineWidth: 1,
            strokeStyle: 'rgba(255, 255, 255, 0.2)',
            type: 'sine'
        }, options);

        this.ctx.beginPath();
        this.ctx.moveTo(0, this.yAxis);
        for (let i = 0; i < this.waveWidth; i += options.segmentLength!) {
            const point = this.getPoint(time, i, options);
            this.ctx.lineTo(point.x, point.y);
        }
        this.ctx.stroke();
    }

    private update(): void {
        this.time -= 0.007;
        this.clear();
        this.ctx.save();
        this.waves.forEach(wave => this.drawWave(this.time * (wave.timeModifier || 1), wave));
        this.ctx.restore();
    }

    private loop(): void {
        if (this.running) this.update();
        requestAnimationFrame(() => this.loop());
    }
}

export default SineWaves;