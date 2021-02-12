const MM = require('../mm');
const Brainfuck = require('../brainfuck');

module.exports = function movri(pc, brainfuck, reg, imm) {
    reg += MM.R0;

    // case #1
    const bf1 =
        new Brainfuck()
            .right(reg)
            .set(imm)
            .left(reg)
        ;

    // case #2
    const a = Math.floor(Math.sqrt(imm));
    const b = imm - a * a;
    const bf2 =
        new Brainfuck()
            // s0=a;
            .right(MM.S0)
            .set(a)
            .left(MM.S0)

            // reg=b;
            .right(reg)
            .set(b)
            .left(reg)

            // reg+=a*a
            .right(MM.S0)
            .while()
            .dec()
            .left(MM.S0)
            .right(reg)
            .inc(a)
            .left(reg)
            .right(MM.S0)
            .end()
            .left(MM.S0)
        ;

    // add only smaller
    brainfuck.add(bf1.size < bf2.size ? bf1 : bf2);

    return pc + 1;
}