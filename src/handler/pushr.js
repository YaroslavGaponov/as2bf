const MM = require('../mm');

module.exports = function pushr(pc, brainfuck, reg) {

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