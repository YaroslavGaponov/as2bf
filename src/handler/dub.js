const MM = require('../mm');

module.exports = function dub(pc, brainfuck) {
    this.
        _rshift(brainfuck)

        // s0=0;
        .right(MM.S0)
        .zero()
        .left(MM.S0)

        // s0=head+1, head+1 = 0;
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

        // head=head+1=s0; s0=0;
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