module.exports = function loop(pc, brainfuck, counter) {
    let loop_next;
    for (let i = 0; i < counter; i++) {
        brainfuck.add(this.trasform(pc + 1));
        loop_next = this.ret_stack.pop();
    }
    return loop_next;
}