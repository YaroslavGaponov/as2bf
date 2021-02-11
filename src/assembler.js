const MM = require('./mm');
module.exports = class Assembler {
    constructor() {
        this.program = [];
    }

    size() {
        return this.program.length;
    }
    get(pc) {
        return this.program[pc];
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
    outr(reg) {
        this.program.push({ op: 'outr', param: reg });
        return this;
    }
    swap() {
        this.program.push({ op: 'swap' });
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
    jz(label) {
        this.program.push({ op: 'jz', param: label });
        return this;
    }
    jnz(label) {
        this.program.push({ op: 'jnz', param: label });
        return this;
    }
    not() {
        this.program.push({ op: 'not' });
        return this;
    }
    call(label) {
        this.program.push({ op: 'call', param: label });
        return this;
    }
    ret() {
        this.program.push({ op: 'ret' });
        return this;
    }
    mul() {
        this.program.push({ op: 'mul' });
        return this;
    }
    div() {
        this.program.push({ op: 'div' });
        return this;
    }
    inc() {
        this.program.push({ op: 'inc' });
        return this;
    }
    incr(reg) {
        this.program.push({ op: 'incr', param: reg });
        return this;
    }
    dec() {
        this.program.push({ op: 'dec' });
        return this;
    }
    loop(counter) {
        this.program.push({ op: 'loop', param: counter });
        return this;
    }
    next() {
        this.program.push({ op: 'next' });
        return this;
    }
    read() {
        this.program.push({ op: 'read' });
        return this;
    }
    je(label) {
        this.program.push({ op: 'je', param: label });
        return this;
    }
    jne(label) {
        this.program.push({ op: 'jne', param: label });
        return this;
    }
    movri(reg, imm) {
        this.program.push({ op: 'movri', param: reg, param2: imm });
        return this;
    }
    movrr(reg1, reg2) {
        this.program.push({ op: 'movrr', param: reg1, param2: reg2 });
        return this;
    }
    cmprr(reg1, reg2) {
        this.program.push({ op: 'cmprr', param: reg1, param2: reg2 });
        return this;
    }
    cmpri(reg, imm) {
        this.program.push({ op: 'cmpri', param: reg, param2: imm });
        return this;
    }
    toString() {
        const s = [];
        for (let i = 0; i < this.program.length; i++) {
            const instr = this.program[i];
            s.push(`${i}\t${instr.op}\t${instr.param !== undefined ? instr.param : ''}\t${instr.param2 !== undefined ? instr.param2 : ''}`);
        }
        return s.join('\n');
    }

}

