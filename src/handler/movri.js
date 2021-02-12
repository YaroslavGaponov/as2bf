const MM = require('../mm');

module.exports = function movri(pc, brainfuck, reg, imm) {
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