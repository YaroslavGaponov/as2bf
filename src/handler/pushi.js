const MM = require("../mm");
const Brainfuck = require('../brainfuck');

module.exports = function pushi(pc, brainfuck, imm) {

    this._rshift(brainfuck);

    // case #1
    const bf1 = new Brainfuck()
        .right(MM.STACK_HEAD)
        .set(imm)
        .left(MM.STACK_HEAD);

    // case #2
    const a = Math.floor(Math.sqrt(imm));
    const b = imm - a * a;
    const bf2 = new Brainfuck()
        .right(MM.STACK_HEAD)
        .zero()
        .inc(b)
        .left(MM.STACK_HEAD)
        .right(MM.S0)
        .zero()
        .inc(a)
        .while()
        .dec()
        .left(MM.S0)
        .right(MM.STACK_HEAD)
        .inc(a)
        .left(MM.STACK_HEAD)
        .right(MM.S0)
        .end()
        .left(MM.S0)
        ;

    brainfuck.add(bf1.size < bf2.size ? bf1 : bf2);

    return pc + 1;
}
