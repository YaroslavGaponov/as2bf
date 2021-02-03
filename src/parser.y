

%{
    const Assembler = require('./assembler');
    const asm = new Assembler();
%}

%start program

%%

program
    : EOF
    | instructions EOF
    {
        return $1;
    }
    ;

instructions
    : EOL
    | instruction
    {
        $$ = $1
    }
    | instructions EOL
    | instructions instruction
    {
        $$ = $2;
    }
    ;

instruction
    : T_PUSHI T_NUMBER 
    {
        $$ = asm.pushi($2) 
    }
    | T_SWAP 
    {
        $$ = asm.swap();
    }
    | T_DUB 
    {
        $$ = asm.dub();
    }
    | T_DROP
    {
        $$ = asm.drop();
    }
    | T_OUT
    {
        $$ = asm.out();
    }
    | T_OUT T_REG
    {
        $$ = asm.outr($2);
    }
    | T_ADD
    {
        $$ = asm.add();
    }
    | T_SUB
    {
        $$ = asm.sub();
    }
    | T_JNZ T_NAME
    {
        $$ = asm.jnz($2);
    }
    | T_JZ T_NAME
    {
        $$ = asm.jz($2);
    }
    | T_JMP T_NAME
    {
        $$ = asm.jmp($2);
    }
    | T_HALT 
    {
        $$ = asm.halt();
    }
    | T_PRINT T_STRING
    {
        $$ = asm.print($2);
    }
    | T_PUSH T_REG
    {
        $$ = asm.push($2);
    }
    | T_POP T_REG
    {
        $$ = asm.pop($2);
    }
    | T_LABEL
    {
        $$ = asm.label($1);
    }
    | T_NOT
    {
        $$ = asm.not();
    }
    | T_CALL T_NAME
    {
        $$ = asm.call($2);
    }
    | T_RET
    {
        $$ = asm.ret();
    }
    | T_MUL
    {
        $$ = asm.mul();
    }
    | T_DIV
    {
        $$ = asm.div();
    }
    | T_INC
    {
        $$ = asm.inc();
    }
    | T_INC T_REG
    {
        $$ = asm.incr($2);
    }
    | T_DEC
    {
        $$ = asm.dec();
    }
    | T_LOOP T_NUMBER
    {
        $$ = asm.loop($2);
    }
    | T_NEXT
    {
        $$ = asm.next();
    }
    | T_READ
    {
        $$ = asm.read();
    }
    | T_JE T_NAME
    {
        $$ = asm.je($2);
    }
    | T_JNE T_NAME
    {
        $$ = asm.jne($2);
    }
    | T_MOV T_REG T_NUMBER
    {
        $$ = asm.movri($2, $3);
    }
    | T_MOV T_REG T_REG 
    {
        $$ = asm.movrr($2, $3);
    }
    ;