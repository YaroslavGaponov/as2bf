module.exports = class VirtulMachine {
    constructor() {
        this.stack = [];
        this.regs = [0, 0, 0, 0];
        this.flags = new Set();
    }

    clone() {
        const vm = new VirtulMachine();
        vm.stack = this.stack.slice();
        vm.regs = this.regs.slice();
        vm.flags = new Set([...this.flags]); 
        return vm;
    }

    check(pc) {
        if(this.flags.has(pc)) return true;
        this.flags.add(pc);
        return false;
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
        const next = this.stack.pop();
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
        const next = this.stack.pop();
        this.stack.push(head + next);
    }
    sub() {
        const head = this.stack.pop();
        const next = this.stack.pop();
        this.stack.push(next - head);
    }

    print() { }
    label() { }

    dotjmp() { }
    dotjnz() { }
    dotjz() { }
    dothalt() { }

    jz() {
        this.stack.pop();
    }

    jnz() {
        this.stack.pop();
    }
}