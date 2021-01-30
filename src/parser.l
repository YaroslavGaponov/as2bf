

id              [_a-zA-Z0-9*?]+
digits          [0-9]+
string          \"[^\"]*\"   
char            \'[^\']*\'
label           {id}\:

%%
\;[^\n]*\n                  /* skip comments */
[  \t]+                     /* skip whitespace */      
[\n]+                       /* skip new line */
".stack"                    return 'T_DOT_STACK';
"pushi"                     return 'T_PUSHI';
"swap"                      return 'T_SWAP';
"dub"                       return 'T_DUB';
"out"                       return 'T_OUT';
"add"                       return 'T_ADD';
"sub"                       return 'T_SUB';
"jnz"                       return 'T_DOT_JNZ'; 
"jz"                        return 'T_DOT_JZ';
"jmp"                       return 'T_DOT_JMP';  
"halt"                      return 'T_DOT_HALT'; 
"print"                     return 'T_PRINT';
"push"                      return 'T_PUSH';
"pop"                       return 'T_POP';
r0|r1|r2|r3|r4              yytext = +yytext.substr(1,yyleng-1); return 'T_REG';
{digits}                    yytext = +yytext; return 'T_NUMBER';
{label}                     yytext = yytext.substr(0,yyleng-1); return 'T_LABEL';
{char}                      yytext = yytext.charCodeAt(1); return 'T_NUMBER';
{string}                    yytext = yytext.substr(1,yyleng-2); return 'T_STRING';
{id}                        return 'T_NAME';
.                           return 'INVALID';
<<EOF>>                     return 'EOF';