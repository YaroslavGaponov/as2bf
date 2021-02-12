

id              [_a-zA-Z0-9*?]+
digits          [0-9]+
string          \"[^\"]*\"   
char            \'[^\']*\'
label           {id}\:

%%
\;[^\n]*[^\n]+              return 'EOL';             
[  \t]+                     /* skip whitespace */      
[\n]+                       return 'EOL';
{label}                     yytext = yytext.substr(0,yyleng-1); return 'T_LABEL';
"swap"                      return 'T_SWAP';
"dub"                       return 'T_DUB';
"out"                       return 'T_OUT';
"add"                       return 'T_ADD';
"sub"                       return 'T_SUB';
"jmp"                       return 'T_JMP';  
"halt"                      return 'T_HALT'; 
"print"                     return 'T_PRINT';
"push"                      return 'T_PUSH';
"pop"                       return 'T_POP';
"call"                      return 'T_CALL';
"ret"                       return 'T_RET';
"mul"                       return 'T_MUL';
"div"                       return 'T_DIV';
"inc"                       return 'T_INC';
"dec"                       return 'T_DEC';
"drop"                      return 'T_DROP';
"loop"                      return 'T_LOOP';
"next"                      return 'T_NEXT';
"in"                        return 'T_IN';
"je"                        return 'T_JE';
"jne"                       return 'T_JNE';
"mov"                       return 'T_MOV';
"cmp"                       return 'T_CMP';
r0|r1|r2|r3|r4              yytext = +yytext.substr(1,yyleng-1); return 'T_REG';
{digits}                    yytext = +yytext; return 'T_NUMBER';
{char}                      yytext = yytext.charCodeAt(1); return 'T_NUMBER';
{string}                    yytext = yytext.substr(1,yyleng-2); return 'T_STRING';
{id}                        return 'T_NAME';
.                           return 'INVALID';
<<EOF>>                     return 'EOF';