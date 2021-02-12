const MM = require('../mm');

module.exports = function print(pc, brainfuck, str) {
    brainfuck.right(MM.S0).zero();
    let n = 0;
    for (let i = 0; i < str.length; i++) {
        const diff = str.charCodeAt(i) - n;
        if (diff >= 0) {
            if (diff > 25) {
                const a = Math.floor(Math.sqrt(diff));
                const b = diff - a * a;
                brainfuck
                    .inc(b)
                    .left(MM.S0)
                    .right(MM.S1)
                    .zero()
                    .inc(a)
                    .while()
                    .dec()
                    .left(MM.S1)
                    .right(MM.S0)
                    .inc(a)
                    .left(MM.S0)
                    .right(MM.S1)
                    .end()
                    .left(MM.S1)
                    .right(MM.S0)
            } else {
                brainfuck.inc(diff);
            }
        } else {
            const pdiff = -diff;
            if (pdiff > 25) {
                const a = Math.floor(Math.sqrt(pdiff));
                const b = pdiff - a * a;
                brainfuck
                    .dec(b)
                    .left(MM.S0)
                    .right(MM.S1)
                    .zero()
                    .inc(a)
                    .while()
                    .dec()
                    .left(MM.S1)
                    .right(MM.S0)
                    .dec(a)
                    .left(MM.S0)
                    .right(MM.S1)
                    .end()
                    .left(MM.S1)
                    .right(MM.S0)
            } else {
                brainfuck.dec(pdiff);
            }
        }
        brainfuck.out(1);
        n = str.charCodeAt(i);
    }
    brainfuck.left(MM.S0);
    return pc + 1;
}
