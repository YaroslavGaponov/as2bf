const MM = require('../mm'); 
module.exports = function read(pc, brainfuck) {
    this._rshift(brainfuck)
        .right(MM.STACK_HEAD)
        .in()
        .left(MM.STACK_HEAD)
        ;
    return pc + 1;
}