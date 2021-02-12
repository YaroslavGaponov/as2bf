const Brainfuck = require('./brainfuck');
const MM = require('./mm');

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

    trasform(pc = 0) {
        const brainfuck = new Brainfuck();
        while (pc < this.assembler.size()) {
            const inst = this.assembler.get(pc);
            if (!this[inst.op]) {
                throw new Error(`Opcode ${inst.op} is not supported.`);
            }
            if (DEBUG) console.log(`${pc}\t${inst.op}\t${inst.param ? inst.param : ''}\t${inst.param2 ? inst.param2 : ''}`);
            pc = this[inst.op](pc, brainfuck, inst.param, inst.param2);
        }
        return brainfuck;
    }

    _lshift(brainfuck) {
        brainfuck.right(MM.STACK_HEAD);
        for (let i = 0; i < MM.STACK_SIZE; i++) {
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
        brainfuck.left(MM.STACK_HEAD + MM.STACK_SIZE);
        return brainfuck;
    }

    _rshift(brainfuck) {
        brainfuck.right(MM.STACK_HEAD + MM.STACK_SIZE);
        for (let i = 0; i < MM.STACK_SIZE; i++) {
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

    pushi(pc, brainfuck, imm) {
        this._rshift(brainfuck);

        if (imm >= 49) {
            const n = Math.floor(Math.sqrt(imm));
            const r = imm - n * n;
            brainfuck
                .right(MM.STACK_HEAD)
                .zero()
                .inc(r)
                .left(MM.STACK_HEAD)
                .right(MM.S0)
                .zero()
                .inc(n)
                .while()
                .dec()
                .left(MM.S0)
                .right(MM.STACK_HEAD)
                .inc(n)
                .left(MM.STACK_HEAD)
                .right(MM.S0)
                .end()
                .left(MM.S0)
                ;

        } else {
            brainfuck
                .right(MM.STACK_HEAD)
                .zero()
                .inc(imm)
                .left(MM.STACK_HEAD);
        }
        return pc + 1;
    }

    pushr(pc, brainfuck, reg) {

        reg += MM.R0;

        this
            ._rshift(brainfuck)
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

    inc(pc, brainfuck) {
        brainfuck
            .right(MM.STACK_HEAD)
            .inc(1)
            .left(MM.STACK_HEAD);

        return pc + 1;
    }

    incr(pc, brainfuck, reg) {
        reg = reg + MM.R0;
        brainfuck
            .right(reg)
            .inc(1)
            .left(reg);

        return pc + 1;
    }

    movrr(pc, brainfuck, reg, reg2) {
        reg = reg + MM.R0;
        reg2 = reg2 + MM.R0;

        brainfuck
            .right(MM.S0)
            .zero()
            .left(MM.S0)

            .right(reg)
            .zero()
            .left(reg)

            .right(reg2)
            .while()
            .dec()
            .left(reg2)
            .right(MM.S0)
            .inc()
            .left(MM.S0)
            .right(reg2)
            .end()
            .left(reg2)

            .right(MM.S0)
            .while()
            .dec()
            .left(MM.S0)
            .right(reg)
            .inc()
            .left(reg)
            .right(reg2)
            .inc()
            .left(reg2)
            .right(MM.S0)
            .end()
            .left(MM.S0)
            ;

        return pc + 1;
    }

    movri(pc, brainfuck, reg, imm) {
        reg += MM.R0;

        if (imm < 25) {
            brainfuck
                .right(reg)
                .zero()
                .inc(imm)
                .left(reg)
                ;
        } else {
            const n = Math.floor(Math.sqrt(imm));
            const r = imm - n * n;
            brainfuck
                .right(MM.S0)
                .zero()
                .inc(n)
                .left(MM.S0)
                .right(reg)
                .zero()
                .inc(r)
                .left(reg)
                .right(MM.S0)
                .while()
                .dec()
                .left(MM.S0)
                .right(reg)
                .inc(n)
                .left(reg)
                .right(MM.S0)
                .end()
                .left(MM.S0)
                ;
        }
        return pc + 1;
    }

    dec(pc, brainfuck) {
        brainfuck
            .right(MM.STACK_HEAD)
            .dec(1)
            .left(MM.STACK_HEAD);

        return pc + 1;
    }

    add(pc, brainfuck) {
        brainfuck
            .right(MM.STACK_HEAD)
            .while()
            .dec(1)
            .right(1)
            .inc(1)
            .left(1)
            .end()
            .left(MM.STACK_HEAD);

        this._lshift(brainfuck);

        return pc + 1;
    }

    addri(pc, brainfuck, reg, imm) {
        reg += MM.R0;
        brainfuck
            .right(reg)
            .inc(imm)
            .left(reg);

        return pc + 1;
    }
    addrr(pc, brainfuck, reg1, reg2) {
        reg1 += MM.R0;
        reg2 += MM.R0;
        brainfuck
            // r0=0;
            .right(MM.S0).zero().left(MM.S0)

            // reg1+=reg1; s0=reg2; reg2=0;
            .right(reg2)
            .while()
            .dec(1)
            .left(reg2)
            .right(MM.S0)
            .inc(1)
            .left(MM.S0)
            .right(reg1)
            .inc(1)
            .left(reg1)
            .right(reg2)
            .end()
            .left(reg2)

            // reg2=s0; s0=0;
            .right(MM.S0)
            .while()
            .dec(1)
            .left(MM.S0)
            .right(reg2)
            .inc(1)
            .left(reg2)
            .right(MM.S0)
            .end()
            .left(MM.S0)
            ;

        return pc + 1;
    }

    drop(pc, brainfuck) {
        this._lshift(brainfuck);
        return pc + 1;
    }

    dub(pc, brainfuck) {
        this.
            _rshift(brainfuck)

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

    out(pc, brainfuck) {
        brainfuck
            .right(MM.STACK_HEAD)
            .out(1)
            .left(MM.STACK_HEAD);

        this._lshift(brainfuck);

        return pc + 1;
    }

    outr(pc, brainfuck, reg) {
        reg = reg + MM.R0;
        brainfuck
            .right(reg)
            .out(1)
            .left(reg);

        return pc + 1;
    }

    pop(pc, brainfuck, reg) {
        reg += MM.R0;

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

        this._lshift(brainfuck);

        return pc + 1;
    }

    print(pc, brainfuck, str) {
        brainfuck.right(MM.S0).zero();
        let n = 0;
        for (let i = 0; i < str.length; i++) {
            const diff = str.charCodeAt(i) - n;
            if (diff >= 0) {
                if (diff > 25) {
                    const a = Math.floor(Math.sqrt(diff));
                    const b = diff - a * a;
                    brainfuck
                        .inc(b)
                        .left(MM.S0)
                        .right(MM.S1)
                        .zero()
                        .inc(a)
                        .while()
                        .dec()
                        .left(MM.S1)
                        .right(MM.S0)
                        .inc(a)
                        .left(MM.S0)
                        .right(MM.S1)
                        .end()
                        .left(MM.S1)
                        .right(MM.S0)
                } else {
                    brainfuck.inc(diff);
                }
            } else {
                const pdiff = -diff;
                if (pdiff > 25) {
                    const a = Math.floor(Math.sqrt(pdiff));
                    const b = pdiff - a * a;
                    brainfuck
                        .dec(b)
                        .left(MM.S0)
                        .right(MM.S1)
                        .zero()
                        .inc(a)
                        .while()
                        .dec()
                        .left(MM.S1)
                        .right(MM.S0)
                        .dec(a)
                        .left(MM.S0)
                        .right(MM.S1)
                        .end()
                        .left(MM.S1)
                        .right(MM.S0)
                } else {
                    brainfuck.dec(pdiff);
                }
            }
            brainfuck.out(1);
            n = str.charCodeAt(i);
        }
        brainfuck.left(MM.S0);
        return pc + 1;
    }

    sub(pc, brainfuck) {
        brainfuck
            .right(MM.STACK_HEAD)
            .while()
            .dec(1)
            .right(1)
            .dec(1)
            .left(1)
            .end()
            .left(MM.STACK_HEAD);

        this._lshift(brainfuck);

        return pc + 1;
    }

    subri(pc, brainfuck, reg, imm) {
        reg += MM.R0;
        brainfuck
            .right(reg)
            .dec(imm)
            .left(reg);

        return pc + 1;
    }
    subrr(pc, brainfuck, reg1, reg2) {
        reg1 += MM.R0;
        reg2 += MM.R0;
        brainfuck
            // r0=0;
            .right(MM.S0).zero().left(MM.S0)

            // reg1-=reg1; s0=reg2; reg2=0;
            .right(reg2)
            .while()
            .dec(1)
            .left(reg2)
            .right(MM.S0)
            .inc(1)
            .left(MM.S0)
            .right(reg1)
            .dec(1)
            .left(reg1)
            .right(reg2)
            .end()
            .left(reg2)

            // reg2=s0; s0=0;
            .right(MM.S0)
            .while()
            .dec(1)
            .left(MM.S0)
            .right(reg2)
            .inc(1)
            .left(reg2)
            .right(MM.S0)
            .end()
            .left(MM.S0)
            ;

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
        if (!(label in this.labels)) {
            throw new Error(`Label ${label} is not found.`);
        }
        return this.labels[label] + 1;
    }

    halt() {
        return Number.MAX_VALUE;
    }

    loop(pc, brainfuck, counter) {
        let loop_next;
        for (let i = 0; i < counter; i++) {
            brainfuck.add(this.trasform(pc + 1));
            loop_next = this.ret_stack.pop();
        }
        return loop_next;
    }

    next(pc, brainfuck) {
        this.ret_stack.push(pc + 1);
        return Number.MAX_VALUE;
    }

    call(pc, brainfuck, label) {
        if (!(label in this.labels)) {
            throw new Error(`Label ${label} is not found.`);
        }
        this.ret_stack.push(pc + 1);
        return this.labels[label] + 1;
    }

    ret(pc, brainfuck) {
        return this.ret_stack.pop();
    }

    mul(pc, brainfuck) {
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

        this._lshift(brainfuck);

        return pc + 1;
    }

    div(pc, brainfuck) {
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


        this._lshift(brainfuck);
        return pc + 1;
    }

    read(pc, brainfuck) {
        this._rshift(brainfuck)
            .right(MM.STACK_HEAD)
            .in()
            .left(MM.STACK_HEAD)
            ;
        return pc + 1;
    }

    readr(pc, brainfuck,reg) {
        reg+=MM.R0;
       brainfuck
            .right(reg)
            .in()
            .left(reg)
            ;
        return pc + 1;
    }

    je(pc, brainfuck, label) {
        if (!(label in this.labels)) {
            throw new Error(`Label ${label} is not found.`);
        }

        brainfuck
            // s0=flags;
            .right(MM.FLAGS)
            .while()
            .left(MM.FLAGS)
            .right(MM.S0)
            .set(1)
            .left(MM.S0)
            .right(MM.S1)
            .set(1)
            .left(MM.S1)
            .left(MM.FLAGS)
            .zero()
            .end()
            .left(MM.FLAGS)
            .right(MM.S1)
            .while()
            .zero()
            .left(MM.S1)
            .right(MM.FLAGS)
            .set(1)
            .left(MM.FLAGS)
            .right(MM.S1)
            .end()
            .left(MM.S1)

            // s1=1
            .right(MM.S1)
            .zero()
            .inc()
            .left(MM.S1)

            // pc=s0?label+1:pc+1;
            .right(MM.S0)
            .while()
            .left(MM.S0)
            .add(this.trasform(this.labels[label] + 1))
            .right(MM.S1)
            .zero()
            .left(MM.S1)
            .right(MM.S0)
            .zero()
            .end()
            .left(MM.S0)
            .right(MM.S1)
            .while()
            .left(MM.S1)
            .add(this.trasform(pc + 1))
            .right(MM.S1)
            .zero()
            .end()
            .left(MM.S1);

        return Number.MAX_VALUE;

    }
    jne(pc, brainfuck, label) {
        if (!(label in this.labels)) {
            throw new Error(`Label ${label} is not found.`);
        }

        brainfuck
            // s0=flags;
            .right(MM.FLAGS)
            .while()
            .left(MM.FLAGS)
            .right(MM.S0)
            .set(1)
            .left(MM.S0)
            .right(MM.S1)
            .set(1)
            .left(MM.S1)
            .left(MM.FLAGS)
            .zero()
            .end()
            .left(MM.FLAGS)
            .right(MM.S1)
            .while()
            .zero()
            .left(MM.S1)
            .right(MM.FLAGS)
            .set(1)
            .left(MM.FLAGS)
            .right(MM.S1)
            .end()
            .left(MM.S1)

            // s1=1
            .right(MM.S1)
            .zero()
            .inc()
            .left(MM.S1)

            // pc=s0?pc+1:label+1;
            .right(MM.S0)
            .while()
            .left(MM.S0)
            .add(this.trasform(pc + 1))
            .right(MM.S1)
            .zero()
            .left(MM.S1)
            .right(MM.S0)
            .zero()
            .end()
            .left(MM.S0)
            .right(MM.S1)
            .while()
            .left(MM.S1)
            .add(this.trasform(this.labels[label] + 1))
            .right(MM.S1)
            .zero()
            .end()
            .left(MM.S1);

        return Number.MAX_VALUE;

    }

    cmprr(pc, brainfuck, reg1, reg2) {
        reg1 += MM.R0;
        reg2 += MM.R0;


        throw new Error("cmprr");

        return pc + 1;
    }

    cmpri(pc, brainfuck, reg, imm) {
        reg += MM.R0;

        brainfuck

            // s0=imm;
            .right(MM.S0).set(imm).left(MM.S0)

            // s1=0
            .right(MM.S1).zero().left(MM.S1)

            // s0-=reg; s1=reg; reg=0;
            .right(reg)
            .while()
            .dec(1)
            .left(reg)
            .right(MM.S0).dec(1).left(MM.S0)
            .right(MM.S1).inc(1).left(MM.S1)
            .right(reg)
            .end()
            .left(reg)

            // reg=s1; s1=0;
            .right(MM.S1)
            .while()
            .dec(1)
            .left(MM.S1)
            .right(reg)
            .inc(1)
            .left(reg)
            .right(MM.S1)
            .end()
            .left(MM.S1)

            // flags=1;
            .right(MM.FLAGS).zero().inc(1).left(MM.FLAGS)

            // flags=s0?0:1;
            .right(MM.S0)
            .while()
            .left(MM.S0)
            .right(MM.FLAGS).zero().left(MM.FLAGS)
            .right(MM.S0)
            .zero()
            .end()
            .left(MM.S0)

        return pc + 1;
    }
}