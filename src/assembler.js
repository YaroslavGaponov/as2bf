module.exports = class Assembler {
    constructor() {
        this.stack_size = 5;
        this.program = [];
    }
    size() {
        return this.program.length;
    }
    get(pc) {
        return this.program[pc];
    }
    stack(size) {
        this.stack_size = size;
        return this;
    }
    label(name) {
        this.program.push({ op: 'label', param: name });
        return this;
    }
    pushi(imm) {
        this.program.push({ op: 'pushi', param: imm });
        return this;
    }
    push(reg) {
        this.program.push({ op: 'push', param: reg });
        return this;
    }
    add() {
        this.program.push({ op: 'add' });
        return this;
    }
    drop() {
        this.program.push({ op: 'drop' });
        return this;
    }
    dub() {
        this.program.push({ op: 'dub' });
        return this;
    }
    pop(reg) {
        this.program.push({ op: 'pop', param: reg });
        return this;
    }
    print(str) {
        this.program.push({ op: 'print', param: str });
        return this;
    }
    sub() {
        this.program.push({ op: 'sub' });
        return this;
    }
    out() {
        this.program.push({ op: 'out' });
        return this;
    }
    swap() {
        this.program.push({ op: 'swap' });
        return this;
    }
    jnz(label) {
        this.program.push({ op: 'jnz', param: label });
        return this;
    }
    jz(label) {
        this.program.push({ op: 'jz', param: label });
        return this;
    }
    jmp(label) {
        this.program.push({ op: 'jmp', param: label });
        return this;
    }
    halt() {
        this.program.push({ op: 'halt' });
        return this;
    }

    toString() {
        const s = [];
        for (let i = 0; i < this.program.length; i++) {
            const instr = this.program[i];
            s.push(`${i}\t${instr.op}\t${instr.param ? instr.param : ''}`)
        }
        return s.join('\n');
    }

}

