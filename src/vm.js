module.exports = class VirtulMachine {
    constructor() {
        this.stack = [];
        this.regs = [0, 0, 0, 0];
        this.ret_stack = [];
        this.loop_next = [];
    }

    clone() {
        const vm = new VirtulMachine();
        vm.stack = this.stack.slice();
        vm.regs = this.regs.slice();
        vm.ret_stack = [...this.ret_stack];
        vm.loop_next = [...this.loop_next];
        return vm;
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


    drop() {
        this.stack.pop();
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

    inc() {
        const head = this.stack.pop();
        this.stack.push(head + 1);
    }
    dec() {
        const head = this.stack.pop();
        this.stack.push(head - 1);
    }
    mul() {
        const head = this.stack.pop();
        const next = this.stack.pop();
        this.stack.push(Math.floor(head * next));
    }
    div() {
        const head = this.stack.pop();
        const next = this.stack.pop();
        this.stack.push(Math.floor(next / head));
    }
    not() {
        const head = this.stack.pop();
        this.stack.push(head == 0 ? 1 : 0);
    }

    print() { }
    label() { }

    jmp() { }
    halt() { }
    jz() {
        this.stack.pop();
    }
    jnz() {
        this.stack.pop();
    }

    call() { }
    ret() { }

    loop() { }
    next() { }
}