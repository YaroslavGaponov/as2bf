

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
    : T_PUSH T_NUMBER 
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
    | T_ADD T_REG T_REG
    {
        $$ = asm.addrr($2, $3);
    }
    | T_ADD T_REG T_NUMBER
    {
        $$ = asm.addri($2, $3);
    }
    | T_SUB
    {
        $$ = asm.sub();
    }
    | T_SUB T_REG T_REG
    {
        $$ = asm.subrr($2, $3);
    }
    | T_SUB T_REG T_NUMBER
    {
        $$ = asm.subri($2, $3);
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
        $$ = asm.pushr($2);
    }
    | T_POP T_REG
    {
        $$ = asm.pop($2);
    }
    | T_LABEL
    {
        $$ = asm.label($1);
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
    | T_MUL T_REG T_REG
    {
        $$ = asm.mulrr($2, $3);
    }
    | T_MUL T_REG T_NUMBER
    {
        $$ = asm.mulri($2, $3);
    }
    | T_DIV
    {
        $$ = asm.div();
    }
    | T_DIV T_REG T_REG
    {
        $$ = asm.divrr($2, $3);
    }
    | T_DIV T_REG T_NUMBER
    {
        $$ = asm.divri($2, $3);
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
    | T_DEC T_REG
    {
        $$ = asm.decr();
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
    | T_READ T_REG
    {
        $$ = asm.readr($2);
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
    | T_CMP T_REG T_REG
    {
        $$ = asm.cmprr($2, $3);
    }
    | T_CMP T_REG T_NUMBER
    {
        $$ = asm.cmpri($2, $3);
    }
    ; 