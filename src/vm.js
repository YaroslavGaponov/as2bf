module.exports = class VirtulMachine {
    constructor() {
        this.stack = [];
        this.regs = [0,0,0,0];
    }
    pushi(imm) {
        this.stack.push(imm);
    }

    push(reg) {
        this.stack.push(this.regs[reg]);
    }
    
    pop(reg) {
        this.regs[reg] = this.stack.pop();
    }   

    swap() {
        const head = this.stack.pop();
        const next =this.stack.pop();
        this.stack.push(head);
        this.stack.push(next);
    }
    dub() {
        const head = this.stack.pop();
        this.stack.push(head);
        this.stack.push(head);
    }
    out() {
       this.stack.pop();
    }
    add() {
        const head = this.stack.pop();
        const next =this.stack.pop();
        this.stack.push(head+next);
    }
    sub() {
        const head = this.stack.pop();
        const next =this.stack.pop();
        this.stack.push(next-head);
    }

    print() {}
    label() {}
    jmp() {}
    jnz() {}
    jz() {}
    halt() {}
}