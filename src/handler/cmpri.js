const MM = require('../mm');

module.exports = function    cmpri(pc, brainfuck, reg, imm) {
        reg += MM.R0;

        brainfuck

            // s0=imm;
            .right(MM.S0).set(imm).left(MM.S0)

            // s1=0
            .right(MM.S1).zero().left(MM.S1)

            // s0-=reg; s1=reg; reg=0;
            .right(reg)
            .while()
            .dec(1)
            .left(reg)
            .right(MM.S0).dec(1).left(MM.S0)
            .right(MM.S1).inc(1).left(MM.S1)
            .right(reg)
            .end()
            .left(reg)

            // reg=s1; s1=0;
            .right(MM.S1)
            .while()
            .dec(1)
            .left(MM.S1)
            .right(reg)
            .inc(1)
            .left(reg)
            .right(MM.S1)
            .end()
            .left(MM.S1)

            // flags=1;
            .right(MM.FLAGS).zero().inc(1).left(MM.FLAGS)

            // flags=s0?0:1;
            .right(MM.S0)
            .while()
            .left(MM.S0)
            .right(MM.FLAGS).zero().left(MM.FLAGS)
            .right(MM.S0)
            .zero()
            .end()
            .left(MM.S0)

        return pc + 1;
    }