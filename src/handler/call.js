module.exports = function    call(pc, brainfuck, label) {
    if (!(label in this.labels)) {
        throw new Error(`Label ${label} is not found.`);
    }
    this.ret_stack.push(pc + 1);
    return this.labels[label] + 1;
}