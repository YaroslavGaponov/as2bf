const MM = require('../mm');

module.exports = function out(pc, brainfuck) {
    brainfuck
        .right(MM.STACK_HEAD)
        .out(1)
        .left(MM.STACK_HEAD);

    this._lshift(brainfuck);

    return pc + 1;
}