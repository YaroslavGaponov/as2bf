const Brainfuck = require('./brainfuck');
const MM = require('./mm');
const VirtulMachine = require('./vm');

module.exports = class Translator {

    constructor(assembler) {
        this.assembler = assembler;
        this.stack_size = assembler.stack_size || MM.STACK_SIZE;

        this.labels = Object.create(null);
        for (let i = 0; i < this.assembler.size(); i++) {
            const inst = this.assembler.get(i);
            if (inst.op === "label") {
                this.labels[inst.param] = i;
            }
        }

    }

    trasform() {
        this.pc = 0;
        this.vm = new VirtulMachine();

        let brainfuck = new Brainfuck();
        while (this.pc < this.assembler.size()) {
            const inst = this.assembler.get(this.pc);
            if (inst.op == "halt") {
                break;
            }
            if (!this[inst.op] || !this.vm[inst.op]) {
                throw new Error(`Opcode ${inst.op} is not supported.`);
            }

            brainfuck = this[inst.op](brainfuck, inst.param);
            this.vm[inst.op](inst.param);
        }
        return brainfuck;
    }

    lshift(brainfuck) {
        brainfuck.right(MM.STACK_HEAD);
        for (let i = 0; i < this.stack_size; i++) {
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
        brainfuck.left(MM.STACK_HEAD + this.stack_size);
        return brainfuck;
    }

    rshift(brainfuck) {
        brainfuck.right(MM.STACK_HEAD + this.stack_size);
        for (let i = 0; i < this.stack_size; i++) {
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

    label(brainfuck, label) {
        this.pc++;
        return brainfuck;
    }

    pushi(brainfuck, imm) {
        this.pc++;
        this.rshift(brainfuck)

        brainfuck
            .right(MM.STACK_HEAD)
            .zero()
            .inc(imm)
            .left(MM.STACK_HEAD);

        return brainfuck;
    }

    push(brainfuck, reg) {
        this.pc++;
        this.rshift(brainfuck)

        brainfuck
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

        return brainfuck;
    }

    add(brainfuck) {
        this.pc++;

        brainfuck
            .right(MM.STACK_HEAD)
            .while()
            .dec(1)
            .right(1)
            .inc(1)
            .left(1)
            .end()
            .left(MM.STACK_HEAD);

        this.lshift(brainfuck);

        return brainfuck;
    }

    drop(brainfuck) {
        this.pc++;
        return this.lshift(brainfuck);
    }

    dub(brainfuck) {
        this.pc++;
        this.rshift(brainfuck);

        brainfuck
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

        return brainfuck;
    }

    out(brainfuck) {
        this.pc++;
        brainfuck
            .right(MM.STACK_HEAD)
            .out(1)
            .left(MM.STACK_HEAD);

        this.lshift(brainfuck);

        return brainfuck;
    }

    pop(brainfuck, reg) {
        this.pc++;
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

        this.lshift(brainfuck);

        return brainfuck;
    }

    print(brainfuck, str) {
        this.pc++;
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
        return brainfuck;
    }

    sub(brainfuck) {
        this.pc++;

        brainfuck
            .right(MM.STACK_HEAD)
            .while()
            .dec(1)
            .right(1)
            .dec(1)
            .left(1)
            .end()
            .left(MM.STACK_HEAD);

        this.lshift(brainfuck);

        return brainfuck;
    }

    swap(brainfuck) {
        this.pc++;
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

        return brainfuck;
    }

    jnz(brainfuck, label) {
        if (this.vm.stack.pop() !== 0) {
            this.pc = this.labels[label];
        }
        this.drop(brainfuck);
        return brainfuck;
    }


    jz(brainfuck, label) {
        if (this.vm.stack.pop() === 0) {
            this.pc = this.labels[label];
        }
        this.drop(brainfuck);
        return brainfuck;
    }

    jmp(brainfuck, label) {
        this.pc = this.labels[label];
        return brainfuck;
    }
}