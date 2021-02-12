const MM = require('../mm');
const Brainfuck = require('../brainfuck');

module.exports = function print(pc, brainfuck, str) {

    brainfuck.right(MM.S0).zero().left(MM.S0);

    str
        .split('')
        .map(e => e.charCodeAt(0))
        .reduce((a, e, i, arr) => a.push(i === 0 ? e : e - arr[i - 1]) && a, [])
        .forEach(e => brainfuck.add(e >= 0 ? up(e) : down(e)));

    return pc + 1;
}


function up(e) {
    e = Math.abs(e);

    const bf1 = new Brainfuck()
        .right(MM.S0)
        .inc(e)
        .out()
        .left(MM.S0);

    const a = Math.floor(Math.sqrt(e));
    const b = e - a * a;
    const bf2 = new Brainfuck()
        .right(MM.S0)
        .inc(b)
        .left(MM.S0)
        .right(MM.S1)
        .set(a)
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
        .out()
        .left(MM.S0);

    return bf1.size < bf2.size ? bf1 : bf2;
}

function down(e) {
    e = Math.abs(e);

    const bf1 = new Brainfuck()
        .left(MM.S0)
        .dec(e)
        .out()
        .left(MM.S0);

    const a = Math.floor(Math.sqrt(e));
    const b = e - a * a;
    const bf2 = new Brainfuck()
        .right(MM.S0)
        .dec(b)
        .left(MM.S0)
        .right(MM.S1)
        .set(a)
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
        .out()
        .left(MM.S0);

    return bf1.size < bf2.size ? bf1 : bf2;
}
