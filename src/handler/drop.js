module.exports = function drop(pc, brainfuck) {
    this._lshift(brainfuck);
    return pc + 1;
}