module.exports = function    next(pc, brainfuck) {
    this.ret_stack.push(pc + 1);
    return Number.MAX_VALUE;
}