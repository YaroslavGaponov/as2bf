const MM = require('../mm');

module.exports = function movrr(pc, brainfuck, reg, reg2) {
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