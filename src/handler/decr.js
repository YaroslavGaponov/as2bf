const MM = require('../mm');

module.exports = function decr(pc, brainfuck, reg) {
    reg += MM.R0;
    brainfuck
        .right(reg)
        .dec(1)
        .left(reg);

    return pc + 1;
}