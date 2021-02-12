const MM = require('../mm');

module.exports = function dec(pc, brainfuck) {
    brainfuck
        .right(MM.STACK_HEAD)
        .dec(1)
        .left(MM.STACK_HEAD);

    return pc + 1;
}