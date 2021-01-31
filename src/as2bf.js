const fs = require('fs');
const Translator = require('./translator');
const parse = require('./parser').parse;

function log(s) { process.stdout.write(s); }

log(`as2bf Assembler to Brainfuck traslator [https://github.com/YaroslavGaponov/as2bf]`);
switch (process.argv.length) {
    case 3:
    case 4:
        log('\nloading...');
        const program = fs.readFileSync(process.argv[2], 'utf8');
        log('👍🏻');
        log('\nparsing...');
        const assembler = parse(program);
        log('👍🏻');
        log('\n--- start ---\n' + assembler.toString() + '\n--- end ---');
        log('\ntranslating...');
        const translator = new Translator(assembler);
        const brainfuck = translator.trasform();
        log('👍🏻');
        const result = brainfuck.toString();
        log(`\nresult is ${result.length} bytes`)
        if (process.argv[3]) fs.writeFileSync(process.argv[3], result);
        else log('\n' + result);
        log('\ndone');
        process.exit(0);
    default:
        log('\n👉🏻 help: as2bf source {target}');
        process.exit(-1);
}

