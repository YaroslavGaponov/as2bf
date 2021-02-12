const MM = require('../mm');

module.exports = function inc(pc, brainfuck) {
    brainfuck
        .right(MM.STACK_HEAD)
        .inc(1)
        .left(MM.STACK_HEAD);

    return pc + 1;
}