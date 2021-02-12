const MM = require('../mm');

module.exports = function incr(pc, brainfuck, reg) {
    reg += MM.R0;
    brainfuck
        .right(reg)
        .inc(1)
        .left(reg);

    return pc + 1;
}