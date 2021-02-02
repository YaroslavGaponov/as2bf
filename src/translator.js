const Brainfuck = require('./brainfuck');
const MM = require('./mm');
const VirtulMachine = require('./vm');

const DEBUG = false;

module.exports = class Translator {

    constructor(assembler) {
        this.assembler = assembler;

        this.ret_stack = [];

        this.labels = Object.create(null);
        for (let i = 0; i < this.assembler.size(); i++) {
            const inst = this.assembler.get(i);
            if (inst.op === "label") {
                this.labels[inst.param] = i;
            }
        }

    }

    trasform(pc = 0, vm = new VirtulMachine()) {
        const brainfuck = new Brainfuck();
        while (pc < this.assembler.size()) {
            const inst = this.assembler.get(pc);
            if (!this[inst.op] || !vm[inst.op]) {
                throw new Error(`Opcode ${inst.op} is not supported.`);
            }
            if (DEBUG) console.log(`${pc}\t${inst.op}\t${inst.param ? inst.param : ''}`);
            pc = this[inst.op](pc, brainfuck, inst.param, vm);
            vm[inst.op](inst.param);
        }
        return brainfuck;
    }

    _lshift(brainfuck, vm) {
        brainfuck.right(MM.STACK_HEAD);
        for (let i = 0; i < vm.stack.length; i++) {
            brainfuck
                .zero()
                .right(1)
                .while()
                .dec(1)
                .left(1)
                .inc(1)
                .right(1)
                .end()
        }
        brainfuck.left(MM.STACK_HEAD + vm.stack.length);
        return brainfuck;
    }

    _rshift(brainfuck, vm) {
        brainfuck.right(MM.STACK_HEAD + vm.stack.length);
        for (let i = 0; i < vm.stack.length; i++) {
            brainfuck
                .zero()
                .left(1)
                .while()
                .dec(1)
                .right(1)
                .inc(1)
                .left(1)
                .end()
        }
        brainfuck.left(MM.STACK_HEAD);
        return brainfuck;
    }

    label(pc, brainfuck, label) {
        return pc + 1;
    }

    pushi(pc, brainfuck, imm, vm) {
        this.
            _rshift(brainfuck, vm)
            .right(MM.STACK_HEAD)
            .zero()
            .inc(imm)
            .left(MM.STACK_HEAD);

        return pc + 1;
    }

    push(pc, brainfuck, reg, vm) {
        this
            ._rshift(brainfuck, vm)
            .right(MM.S0)
            .zero()
            .left(MM.S0)

            .right(reg)
            .while()
            .dec(1)
            .left(reg)
            .right(MM.S0)
            .inc(1)
            .left(MM.S0)
            .right(reg)
            .end()
            .left(reg)

            .right(MM.S0)
            .while()
            .dec(1)
            .left(MM.S0)
            .right(reg)
            .inc(1)
            .left(reg)
            .right(MM.STACK_HEAD)
            .inc(1)
            .left(MM.STACK_HEAD)
            .right(MM.S0)
            .end()
            .left(MM.S0);

        return pc + 1;
    }

    inc(pc, brainfuck, empty, vm) {
        brainfuck
            .right(MM.STACK_HEAD)
            .inc(1)
            .left(MM.STACK_HEAD);

        return pc + 1;
    }

    dec(pc, brainfuck, empty, vm) {
        brainfuck
            .right(MM.STACK_HEAD)
            .dec(1)
            .left(MM.STACK_HEAD);

        return pc + 1;
    }

    add(pc, brainfuck, empty, vm) {
        brainfuck
            .right(MM.STACK_HEAD)
            .while()
            .dec(1)
            .right(1)
            .inc(1)
            .left(1)
            .end()
            .left(MM.STACK_HEAD);

        this._lshift(brainfuck, vm);

        return pc + 1;
    }

    drop(pc, brainfuck, empty, vm) {
        this._lshift(brainfuck, vm);
        return pc + 1;
    }

    not(pc, brainfuck) {
        brainfuck
            .right(MM.S0)
            .zero()
            .inc()
            .left(MM.S0)

            .right(MM.STACK_HEAD)
            .while()
            .left(MM.STACK_HEAD)
            .right(MM.S0)
            .zero()
            .left(MM.S0)
            .right(MM.STACK_HEAD)
            .zero()
            .end()
            .zero()
            .left(MM.STACK_HEAD)

            .right(MM.S0)
            .while()
            .left(MM.S0)
            .right(MM.STACK_HEAD)
            .inc()
            .left(MM.STACK_HEAD)
            .right(MM.S0)
            .zero()
            .end()
            .left(MM.S0);

        return pc + 1;
    }

    dub(pc, brainfuck, empty, vm) {
        this.
            _rshift(brainfuck, vm)

            .right(MM.S0)
            .zero()
            .left(MM.S0)

            .right(MM.STACK_HEAD + 1)
            .while()
            .dec(1)
            .left(MM.STACK_HEAD + 1)
            .right(MM.S0)
            .inc(1)
            .left(MM.S0)
            .right(MM.STACK_HEAD + 1)
            .end()
            .left(MM.STACK_HEAD + 1)


            .right(MM.S0)
            .while()
            .dec(1)
            .left(MM.S0)
            .right(MM.STACK_HEAD)
            .inc(1)
            .right(1)
            .inc(1)
            .left(MM.STACK_HEAD + 1)
            .right(MM.S0)
            .end()
            .left(MM.S0);

        return pc + 1;
    }

    out(pc, brainfuck, empty, vm) {
        brainfuck
            .right(MM.STACK_HEAD)
            .out(1)
            .left(MM.STACK_HEAD);

        this._lshift(brainfuck, vm);

        return pc + 1;
    }

    pop(pc, brainfuck, reg, vm) {
        brainfuck
            .right(reg)
            .zero()
            .left(reg)

            .right(MM.STACK_HEAD)
            .while()
            .dec(1)
            .left(MM.STACK_HEAD)
            .right(reg)
            .inc(1)
            .left(reg)
            .right(MM.STACK_HEAD)
            .end()
            .left(MM.STACK_HEAD);

        this._lshift(brainfuck, vm);

        return pc + 1;
    }

    print(pc, brainfuck, str) {
        brainfuck.right(MM.S0).zero();
        let n = 0;
        for (let i = 0; i < str.length; i++) {
            const diff = str.charCodeAt(i) - n;
            if (diff >= 0) brainfuck.inc(diff);
            else brainfuck.dec(-diff);
            brainfuck.out(1);
            n = str.charCodeAt(i);
        }
        brainfuck.left(MM.S0);
        return pc + 1;
    }

    sub(pc, brainfuck, empty, vm) {
        brainfuck
            .right(MM.STACK_HEAD)
            .while()
            .dec(1)
            .right(1)
            .dec(1)
            .left(1)
            .end()
            .left(MM.STACK_HEAD);

        this._lshift(brainfuck, vm);

        return pc + 1;
    }

    swap(pc, brainfuck) {
        brainfuck
            .right(MM.S0)
            .zero()
            .left(MM.S0)

            .right(MM.STACK_HEAD)
            .while()
            .dec(1)
            .left(MM.STACK_HEAD)
            .right(MM.S0)
            .inc(1)
            .left(MM.S0)
            .right(MM.STACK_HEAD)
            .end()
            .left(MM.STACK_HEAD)

            .right(MM.STACK_HEAD + 1)
            .while()
            .dec(1)
            .left(1)
            .inc(1)
            .right(1)
            .end()
            .left(MM.STACK_HEAD + 1)

            .right(MM.S0)
            .while()
            .dec(1)
            .left(MM.S0)
            .right(MM.STACK_HEAD + 1)
            .inc(1)
            .left(MM.STACK_HEAD + 1)
            .right(MM.S0)
            .end()
            .left(MM.S0);

        return pc + 1;
    }

    jmp(pc, brainfuck, label) {
        if (!this.labels[label]) {
            throw new Error(`Label ${label} is not found.`);
        }
        return this.labels[label] + 1;
    }

    halt() {
        return Number.MAX_VALUE;
    }

    jz(pc, brainfuck, label, vm) {

        if (!this.labels[label]) {
            throw new Error(`Label ${label} is not found.`);
        }

        brainfuck
            .right(MM.S0).zero().left(MM.S0)
            .right(MM.STACK_HEAD).while().dec().left(MM.STACK_HEAD).right(MM.S0).inc().left(MM.S0).right(MM.STACK_HEAD).end().left(MM.STACK_HEAD)
            .right(MM.S1).zero().inc().left(MM.S1);

        this
            ._lshift(brainfuck, vm)
            .right(MM.S0)
            .while()
            .left(MM.S0)
            .add(this.trasform(pc + 1, vm.clone()))
            .right(MM.S1).zero().left(MM.S1)
            .right(MM.S0).zero()
            .end()
            .left(MM.S0)
            .right(MM.S1)
            .while()
            .left(MM.S1)
            .add(this.trasform(this.labels[label] + 1, vm.clone()))
            .right(MM.S1).zero()
            .end()
            .left(MM.S1)

        return Number.MAX_VALUE;
    }

    jnz(pc, brainfuck, label, vm) {

        if (!this.labels[label]) {
            throw new Error(`Label ${label} is not found.`);
        }

        brainfuck
            .right(MM.S0).zero().left(MM.S0)
            .right(MM.STACK_HEAD).while().dec().left(MM.STACK_HEAD).right(MM.S0).inc().left(MM.S0).right(MM.STACK_HEAD).end().left(MM.STACK_HEAD)
            .right(MM.S1).zero().inc().left(MM.S1);

        this
            ._lshift(brainfuck, vm)
            .right(MM.S0)
            .while()
            .left(MM.S0)
            .add(this.trasform(this.labels[label] + 1, vm.clone()))
            .right(MM.S1).zero().left(MM.S1)
            .right(MM.S0).zero()
            .end()
            .left(MM.S0)
            .right(MM.S1)
            .while()
            .left(MM.S1)
            .add(this.trasform(pc + 1, vm.clone()))
            .right(MM.S1).zero()
            .end()
            .left(MM.S1)

        return Number.MAX_VALUE;
    }

    loop(pc, brainfuck, counter, vm) {
        const vmclone = vm.clone();
        let next_pc;
        for (let i = 0; i < counter; i++) {
            brainfuck.add(this.trasform(pc + 1, vmclone));
            next_pc = vmclone.loop_next.pop()
        }
        return next_pc + 1;
    }

    next(pc, brainfuck, empty, vm) {
        vm.loop_next.push(pc);
        return Number.MAX_VALUE;
    }

    call(pc, brainfuck, label, vm) {
        if (!this.labels[label]) {
            throw new Error(`Label ${label} is not found.`);
        }
        vm.ret_stack.push(pc + 1);
        return this.labels[label] + 1;
    }

    ret(pc, brainfuck, empty, vm) {
        if (vm.ret_stack.length === 0) {
            throw new Error(`Opcode call is not found`);
        }
        return vm.ret_stack.pop();
    }

    mul(pc, brainfuck, empty, vm) {
        brainfuck
            // temp0[-]
            .right(MM.S0).zero().left(MM.S0)
            // temp1[-]
            .right(MM.S1).zero().left(MM.S1)
            // x[temp1+x-]
            .right(MM.STACK_HEAD + 1).while().left(MM.STACK_HEAD + 1).right(MM.S1).inc().left(MM.S1).right(MM.STACK_HEAD + 1).dec().end().left(MM.STACK_HEAD + 1)
            // temp1[
            .right(MM.S1).while().left(MM.S1)
            // y[x+temp0+y-]
            .right(MM.STACK_HEAD).while().left(MM.STACK_HEAD).right(MM.STACK_HEAD + 1).inc().left(MM.STACK_HEAD + 1).right(MM.S0).inc().left(MM.S0)
            .right(MM.STACK_HEAD).dec().end().left(MM.STACK_HEAD)
            // temp0[y+temp0-]
            .right(MM.S0).while().left(MM.S0)
            .right(MM.STACK_HEAD)
            .inc()
            .left(MM.STACK_HEAD)
            .right(MM.S0)
            .dec()
            .end()
            .left(MM.S0)
            // temp1-]
            .right(MM.S1)
            .dec()
            .end()
            .left(MM.S1)

        this._lshift(brainfuck, vm);

        return pc + 1;
    }

    div(pc, brainfuck, empty, vm) {
        brainfuck
            // temp0[-]
            .right(MM.S0).zero().left(MM.S0)
            // temp1[-]
            .right(MM.S1).zero().left(MM.S1)
            // temp2[-]
            .right(MM.S2).zero().left(MM.S2)
            // temp3[-]
            .right(MM.S3).zero().left(MM.S3)

            // x[temp0+x-]
            .right(MM.STACK_HEAD + 1).while().left(MM.STACK_HEAD + 1).right(MM.S0).inc().left(MM.S0).right(MM.STACK_HEAD + 1).dec().end().left(MM.STACK_HEAD + 1)
            // temp0[
            .right(MM.S0).while().left(MM.S0)
            // y[temp1+temp2+y-]
            .right(MM.STACK_HEAD).while().left(MM.STACK_HEAD).right(MM.S1).inc().left(MM.S1).right(MM.S2).inc().left(MM.S2).right(MM.STACK_HEAD).dec().end().left(MM.STACK_HEAD)
            // temp2[y+temp2-]
            .right(MM.S2).while().left(MM.S2).right(MM.STACK_HEAD).inc().left(MM.STACK_HEAD).right(MM.S2).dec().end().left(MM.S2)
            // temp1[
            .right(MM.S1).while().left(MM.S1)
            // temp2+
            .right(MM.S2).inc().left(MM.S2)
            // temp0-[temp2[-]temp3+temp0-]
            .right(MM.S0).dec().while().left(MM.S0).right(MM.S2).zero().left(MM.S2).right(MM.S3).inc().left(MM.S3).right(MM.S0).dec().end().left(MM.S0)
            // temp3[temp0+temp3-]
            .right(MM.S3).while().left(MM.S3).right(MM.S0).inc().left(MM.S0).right(MM.S3).dec().end().left(MM.S3)
            // temp2[
            .right(MM.S2).while().left(MM.S2)
            // temp1-
            .right(MM.S1).dec()
            // [x-temp1[-]]+
            .while().left(MM.S1).right(MM.STACK_HEAD + 1).dec().left(MM.STACK_HEAD + 1).right(MM.S1).zero().end().inc().left(MM.S1)
            // temp2-]
            .right(MM.S2).dec().end().left(MM.S2)
            // temp1-]
            .right(MM.S1).dec().end().left(MM.S1)
            // x+
            .right(MM.STACK_HEAD + 1).inc().left(MM.STACK_HEAD + 1)
            // temp0]
            .right(MM.S0).end().left(MM.S0)


        this._lshift(brainfuck, vm);
        return pc + 1;
    }

}