const MM = require('../mm');

module.exports = function add(pc, brainfuck) {
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