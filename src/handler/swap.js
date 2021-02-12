const MM = require('../mm');

module.exports = function     swap(pc, brainfuck) {
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