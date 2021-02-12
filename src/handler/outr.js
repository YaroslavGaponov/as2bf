
    const MM = require('../mm');
    
    module.exports = function outr(pc, brainfuck, reg) {
        reg = reg + MM.R0;
        brainfuck
            .right(reg)
            .out(1)
            .left(reg);

        return pc + 1;
    }