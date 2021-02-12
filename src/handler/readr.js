const MM = require('../mm');

module.exports = function readr(pc, brainfuck, reg) {
    reg += MM.R0;
    brainfuck
        .right(reg)
        .in()
        .left(reg)
        ;
    return pc + 1;
}