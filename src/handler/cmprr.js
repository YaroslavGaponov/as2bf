const MM = require('../mm');

module.exports = function cmprr(pc, brainfuck, reg1, reg2) {
    reg1 += MM.R0;
    reg2 += MM.R0;


    brainfuck

        // s0=0;
        .right(MM.S0).zero().left(MM.S0)

        // s1=0;
        .right(MM.S1).zero().left(MM.S1)

        // s0=s1=reg1; reg1=0;
        .right(reg1)
        .while()
        .dec(1)
        .left(reg1)
        .right(MM.S0)
        .inc(1)
        .left(MM.S0)
        .right(MM.S1)
        .inc()
        .left(MM.S1)
        .right(reg1)
        .end()
        .left(reg1)

        // reg1=s0; s0=0;
        .right(MM.S0)
        .while()
        .dec(1)
        .left(MM.S0)
        .right(reg1)
        .inc(1)
        .left(reg1)
        .right(MM.S0)
        .end()
        .left(MM.S0)


        // s0=reg2; s1=reg1-reg2; reg2=0;
        .right(reg2)
        .while()
        .dec(1)
        .left(reg2)
        .right(MM.S0)
        .inc(1)
        .left(MM.S0)
        .right(MM.S1)
        .dec(1)
        .left(MM.S1)
        .right(reg2)
        .end()
        .left(reg2)

        // reg2=s0; s0=0;
        .right(MM.S0)
        .while()
        .dec(1)
        .left(MM.S0)
        .right(reg2)
        .inc(1)
        .left(reg2)
        .right(MM.S0)
        .end()
        .left(MM.S0)

        // flags=s1?0:1;
        .right(MM.FLAGS).set(1).left(MM.FLAGS)
        .right(MM.S1)
        .while()
        .left(MM.S1)
        .right(MM.FLAGS)
        .zero()
        .left(MM.FLAGS)
        .right(MM.S1)
        .zero()
        .end()
        .left(MM.S1)

    return pc + 1;
}
