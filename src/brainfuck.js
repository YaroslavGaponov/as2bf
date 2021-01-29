module.exports = class Brainfuck {
    constructor() {
        this.program = [];
    }
    right(n = 1) {
        for (let i = 0; i < n; i++) {
            this.program.push('>');
        }
        return this;
    }
    left(n = 1) {
        for (let i = 0; i < n; i++) {
            this.program.push('<');
        }
        return this;
    }
    inc(n = 1) {
        for (let i = 0; i < n; i++) {
            this.program.push('+');
        }
        return this;
    }
    dec(n = 1) {
        for (let i = 0; i < n; i++) {
            this.program.push('-');
        }
        return this;
    }
    out(n = 1) {
        for (let i = 0; i < n; i++) {
            this.program.push('.');
        }
        return this;
    }
    in(n = 1) {
        for (let i = 0; i < n; i++) {
            this.program.push(',');
        }
        return this;
    }
    while() {
        this.program.push('[');
        return this;
    }

    end() {
        this.program.push(']');
        return this;
    }
    zero() {
        this.while().dec().end();
        return this;
    }
    toString() {
        let s = this.program.join('');
        let length = s.length;
        do {
            length = s.length;
            s = s
                .replace(/\<\>/g, "")
                .replace(/\>\</g, "")
                .replace(/\+\-/g, "")
                .replace(/\-\+/g, "");

        } while (s.length < length);
        return s;
    }
}