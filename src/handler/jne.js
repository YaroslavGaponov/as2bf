const MM = require('../mm');

module.exports = function jne(pc, brainfuck, label) {
    if (!(label in this.labels)) {
        throw new Error(`Label ${label} is not found.`);
    }

    brainfuck
        // s0=flags;
        .right(MM.FLAGS)
        .while()
        .left(MM.FLAGS)
        .right(MM.S0)
        .set(1)
        .left(MM.S0)
        .right(MM.S1)
        .set(1)
        .left(MM.S1)
        .left(MM.FLAGS)
        .zero()
        .end()
        .left(MM.FLAGS)
        .right(MM.S1)
        .while()
        .zero()
        .left(MM.S1)
        .right(MM.FLAGS)
        .set(1)
        .left(MM.FLAGS)
        .right(MM.S1)
        .end()
        .left(MM.S1)

        // s1=1
        .right(MM.S1)
        .zero()
        .inc()
        .left(MM.S1)

        // pc=s0?pc+1:label+1;
        .right(MM.S0)
        .while()
        .left(MM.S0)
        .add(this.trasform(pc + 1))
        .right(MM.S1)
        .zero()
        .left(MM.S1)
        .right(MM.S0)
        .zero()
        .end()
        .left(MM.S0)
        .right(MM.S1)
        .while()
        .left(MM.S1)
        .add(this.trasform(this.labels[label] + 1))
        .right(MM.S1)
        .zero()
        .end()
        .left(MM.S1);

    return Number.MAX_VALUE;

}
