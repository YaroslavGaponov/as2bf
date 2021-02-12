const MM = require('../mm');

module.exports = function subri(pc, brainfuck, reg, imm) {
    reg += MM.R0;
    brainfuck
        .right(reg)
        .dec(imm)
        .left(reg);

    return pc + 1;
}