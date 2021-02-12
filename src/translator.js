const Brainfuck = require('./brainfuck');
const MM = require('./mm');
const fs = require("fs");
const path = require('path');

const DEBUG = false;

module.exports = class Translator {

    constructor(assembler) {
        this.assembler = assembler;

        this._load();

        this.ret_stack = [];

        this.labels = Object.create(null);
        for (let i = 0; i < this.assembler.size(); i++) {
            const inst = this.assembler.get(i);
            if (inst.op === "label") {
                this.labels[inst.param] = i;
            }
        }

    }

    trasform(pc = 0) {
        const brainfuck = new Brainfuck();
        while (pc < this.assembler.size()) {
            const inst = this.assembler.get(pc);
            if (!this[inst.op]) {
                throw new Error(`Opcode ${inst.op} is not supported.`);
            }
            if (DEBUG) console.log(`${pc}\t${inst.op}\t${inst.param ? inst.param : ''}\t${inst.param2 ? inst.param2 : ''}`);
            pc = this[inst.op](pc, brainfuck, inst.param, inst.param2);
        }
        return brainfuck;
    }

    _load() {
        const dir = path.join(__dirname, 'handler');
        fs
            .readdirSync(dir)
            .map(name => require(path.join(dir, name)))
            .forEach(handler => this[handler.name] = handler.bind(this));
    }

    _lshift(brainfuck) {
        brainfuck.right(MM.STACK_HEAD);
        for (let i = 0; i < MM.STACK_SIZE; i++) {
            brainfuck
                .zero()
                .right(1)
                .while()
                .dec(1)
                .left(1)
                .inc(1)
                .right(1)
                .end()
        }
        brainfuck.left(MM.STACK_HEAD + MM.STACK_SIZE);
        return brainfuck;
    }

    _rshift(brainfuck) {
        brainfuck.right(MM.STACK_HEAD + MM.STACK_SIZE);
        for (let i = 0; i < MM.STACK_SIZE; i++) {
            brainfuck
                .zero()
                .left(1)
                .while()
                .dec(1)
                .right(1)
                .inc(1)
                .left(1)
                .end()
        }
        brainfuck.left(MM.STACK_HEAD);
        return brainfuck;
    }

    label(pc, brainfuck, label) {
        return pc + 1;
    }

    jmp(pc, brainfuck, label) {
        if (!(label in this.labels)) {
            throw new Error(`Label ${label} is not found.`);
        }
        return this.labels[label] + 1;
    }

    halt() {
        return Number.MAX_VALUE;
    }

    loop(pc, brainfuck, counter) {
        let loop_next;
        for (let i = 0; i < counter; i++) {
            brainfuck.add(this.trasform(pc + 1));
            loop_next = this.ret_stack.pop();
        }
        return loop_next;
    }

    next(pc, brainfuck) {
        this.ret_stack.push(pc + 1);
        return Number.MAX_VALUE;
    }

    call(pc, brainfuck, label) {
        if (!(label in this.labels)) {
            throw new Error(`Label ${label} is not found.`);
        }
        this.ret_stack.push(pc + 1);
        return this.labels[label] + 1;
    }

    ret(pc, brainfuck) {
        return this.ret_stack.pop();
    }











}