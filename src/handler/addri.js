const MM = require('../mm');

module.exports = function addri(pc, brainfuck, reg, imm) {
    reg += MM.R0;
    brainfuck
        .right(reg)
        .inc(imm)
        .left(reg);

    return pc + 1;
}