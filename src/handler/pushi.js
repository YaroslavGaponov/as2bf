const MM = require("../mm");

module.exports = function pushi(pc, brainfuck, imm) {

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
