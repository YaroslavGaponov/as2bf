const MM = require('../mm');

module.exports = function pop(pc, brainfuck, reg) {
    reg += MM.R0;

    brainfuck
        // reg=0;
        .right(reg)
        .zero()
        .left(reg)

        // reg=head; head=0;
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