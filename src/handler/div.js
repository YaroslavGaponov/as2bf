const MM = require('../mm');

module.exports = function div(pc, brainfuck) {
    brainfuck
        // temp0[-]
        .right(MM.S0).zero().left(MM.S0)
        // temp1[-]
        .right(MM.S1).zero().left(MM.S1)
        // temp2[-]
        .right(MM.S2).zero().left(MM.S2)
        // temp3[-]
        .right(MM.S3).zero().left(MM.S3)

        // x[temp0+x-]
        .right(MM.STACK_HEAD + 1).while().left(MM.STACK_HEAD + 1).right(MM.S0).inc().left(MM.S0).right(MM.STACK_HEAD + 1).dec().end().left(MM.STACK_HEAD + 1)
        // temp0[
        .right(MM.S0).while().left(MM.S0)
        // y[temp1+temp2+y-]
        .right(MM.STACK_HEAD).while().left(MM.STACK_HEAD).right(MM.S1).inc().left(MM.S1).right(MM.S2).inc().left(MM.S2).right(MM.STACK_HEAD).dec().end().left(MM.STACK_HEAD)
        // temp2[y+temp2-]
        .right(MM.S2).while().left(MM.S2).right(MM.STACK_HEAD).inc().left(MM.STACK_HEAD).right(MM.S2).dec().end().left(MM.S2)
        // temp1[
        .right(MM.S1).while().left(MM.S1)
        // temp2+
        .right(MM.S2).inc().left(MM.S2)
        // temp0-[temp2[-]temp3+temp0-]
        .right(MM.S0).dec().while().left(MM.S0).right(MM.S2).zero().left(MM.S2).right(MM.S3).inc().left(MM.S3).right(MM.S0).dec().end().left(MM.S0)
        // temp3[temp0+temp3-]
        .right(MM.S3).while().left(MM.S3).right(MM.S0).inc().left(MM.S0).right(MM.S3).dec().end().left(MM.S3)
        // temp2[
        .right(MM.S2).while().left(MM.S2)
        // temp1-
        .right(MM.S1).dec()
        // [x-temp1[-]]+
        .while().left(MM.S1).right(MM.STACK_HEAD + 1).dec().left(MM.STACK_HEAD + 1).right(MM.S1).zero().end().inc().left(MM.S1)
        // temp2-]
        .right(MM.S2).dec().end().left(MM.S2)
        // temp1-]
        .right(MM.S1).dec().end().left(MM.S1)
        // x+
        .right(MM.STACK_HEAD + 1).inc().left(MM.STACK_HEAD + 1)
        // temp0]
        .right(MM.S0).end().left(MM.S0)


    this._lshift(brainfuck);
    return pc + 1;
}