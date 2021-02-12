const MM = require('../mm');

module.exports = function movrr(pc, brainfuck, reg1, reg2) {
    reg1 += MM.R0;
    reg2 += MM.R0;

    brainfuck
        // s0=0; 
        .right(MM.S0)
        .zero()
        .left(MM.S0)

        // reg1=0;
        .right(reg1)
        .zero()
        .left(reg1)

        // s0=reg2; reg2=0;
        .right(reg2)
        .while()
        .dec()
        .left(reg2)
        .right(MM.S0)
        .inc()
        .left(MM.S0)
        .right(reg2)
        .end()
        .left(reg2)

        // reg1=s0; reg2=s0; s0=0;
        .right(MM.S0)
        .while()
        .dec()
        .left(MM.S0)
        .right(reg1)
        .inc()
        .left(reg1)
        .right(reg2)
        .inc()
        .left(reg2)
        .right(MM.S0)
        .end()
        .left(MM.S0)
        ;

    return pc + 1;
}