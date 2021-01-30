const Brainfuck = require('./brainfuck');
const MM = require('./mm');
const VirtulMachine = require('./vm');

module.exports = class Translator {

    constructor(assembler) {
        this.assembler = assembler;

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

    dotjnz(pc, brainfuck, label, vm) {
        if (!this.labels[label]) {
            throw new Error(`Label ${label} is not found.`);
        }
        this._lshift(brainfuck, vm);
        if (vm.stack[vm.stack.length - 1] !== 0) {
            pc = this.labels[label] + 1;
        } else {
            pc = pc + 1;
        }
        return pc;
    }


    dotjz(pc, brainfuck, label, vm) {
        if (!this.labels[label]) {
            throw new Error(`Label ${label} is not found.`);
        }

        this._lshift(brainfuck, vm);
        if (vm.stack[vm.stack.length - 1] === 0) {
            pc = this.labels[label] + 1;
        } else {
            pc = pc + 1;
        }
        return pc;
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

        if (vm.check(pc)) {
            return this.dotjz(pc, brainfuck, label, vm);
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

        if (vm.check(pc)) {
            return this.dotjnz(pc, brainfuck, label, vm);
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

}