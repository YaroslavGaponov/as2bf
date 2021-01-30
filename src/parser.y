

%{
    const Assembler = require('./assembler');
    const asm = new Assembler();
%}

%start program

%%

program
    : instructions EOF
    {
        return $1;
    }
    ;

instructions
    : 
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
    | T_OUT
    {
        $$ = asm.out();
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
    ;