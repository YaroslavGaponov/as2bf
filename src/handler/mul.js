const MM = require('../mm');

module.exports = function     mul(pc, brainfuck) {
    brainfuck
        // temp0[-]
        .right(MM.S0).zero().left(MM.S0)
        // temp1[-]
        .right(MM.S1).zero().left(MM.S1)
        // x[temp1+x-]
        .right(MM.STACK_HEAD + 1).while().left(MM.STACK_HEAD + 1).right(MM.S1).inc().left(MM.S1).right(MM.STACK_HEAD + 1).dec().end().left(MM.STACK_HEAD + 1)
        // temp1[
        .right(MM.S1).while().left(MM.S1)
        // y[x+temp0+y-]
        .right(MM.STACK_HEAD).while().left(MM.STACK_HEAD).right(MM.STACK_HEAD + 1).inc().left(MM.STACK_HEAD + 1).right(MM.S0).inc().left(MM.S0)
        .right(MM.STACK_HEAD).dec().end().left(MM.STACK_HEAD)
        // temp0[y+temp0-]
        .right(MM.S0).while().left(MM.S0)
        .right(MM.STACK_HEAD)
        .inc()
        .left(MM.STACK_HEAD)
        .right(MM.S0)
        .dec()
        .end()
        .left(MM.S0)
        // temp1-]
        .right(MM.S1)
        .dec()
        .end()
        .left(MM.S1)

    this._lshift(brainfuck);

    return pc + 1;
}