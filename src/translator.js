const fs = require("fs");
const path = require('path');
const Brainfuck = require('./brainfuck');
const MM = require('./mm');

module.exports = class Translator {

    constructor(assembler) {
        this.ret_stack = [];
        this.assembler = assembler;

        this._initialize();

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
            pc = this[inst.op](pc, brainfuck, inst.param, inst.param2);
        }
        return brainfuck;
    }

    _initialize() {
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
                ;
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
                ;
        }
        brainfuck.left(MM.STACK_HEAD);
        return brainfuck;
    }





















}