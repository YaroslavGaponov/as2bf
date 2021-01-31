

id              [_a-zA-Z0-9*?]+
digits          [0-9]+
string          \"[^\"]*\"   
char            \'[^\']*\'
label           {id}\:

%%
\;[^\n]*\n                  /* skip comments */
[  \t]+                     /* skip whitespace */      
[\n]+                       /* skip new line */
"pushi"                     return 'T_PUSHI';
"swap"                      return 'T_SWAP';
"dub"                       return 'T_DUB';
"out"                       return 'T_OUT';
"add"                       return 'T_ADD';
"sub"                       return 'T_SUB';
"jnz"                       return 'T_JNZ'; 
"jz"                        return 'T_JZ';
"jmp"                       return 'T_JMP';  
"halt"                      return 'T_HALT'; 
"print"                     return 'T_PRINT';
"push"                      return 'T_PUSH';
"pop"                       return 'T_POP';
"not"                       return 'T_NOT';
"call"                      return 'T_CALL';
"ret"                       return 'T_RET';
"mul"                       return 'T_MUL';
"div"                       return 'T_DIV';
r0|r1|r2|r3|r4              yytext = +yytext.substr(1,yyleng-1); return 'T_REG';
{digits}                    yytext = +yytext; return 'T_NUMBER';
{label}                     yytext = yytext.substr(0,yyleng-1); return 'T_LABEL';
{char}                      yytext = yytext.charCodeAt(1); return 'T_NUMBER';
{string}                    yytext = yytext.substr(1,yyleng-2); return 'T_STRING';
{id}                        return 'T_NAME';
.                           return 'INVALID';
<<EOF>>                     return 'EOF';