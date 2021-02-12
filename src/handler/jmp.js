module.exports = function jmp(pc, brainfuck, label) {
    if (!(label in this.labels)) {
        throw new Error(`Label ${label} is not found.`);
    }
    return this.labels[label] + 1;
}