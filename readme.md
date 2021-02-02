as2bf
===========
assembler to brainfuck translator

# How to run?

## Dev environment

```shell
npm i
npm run build
```

## Other 

Run binary file for [linux](release/as2bf-linux), [windows](release/as2bf-win.exe) or [macos](release/as2bf-macos)


## Run example

```shell
node src/as2bf.js examples/func.s examples/func.bf
```
```shell
release/as2bf-macos examples/func.s examples/func.bf
```

## Output 

```output
as2bf Assembler to Brainfuck traslator [https://github.com/YaroslavGaponov]
loading...ok
parsing...ok
--- start ---
0	pushi   0	
1	dub	
2	call	func
3	not	
4	call	func
5	halt	
6	label	func
7	print	begin->
8	jz	do_help
9	label	do_work
10	call	work
11	jmp	exit
12	label	do_help
13	call	help
14	jmp	exit
15	label	exit
16	print	end;
17	ret	
18	label	help
19	print	help->
20	ret	
21	label	work
22	print	work->
23	ret	
--- end ---
translating...ok
result is 2542 bytes
done
```

# Example

##  Simple assembler code

```asm
; begin main
pushi 0 ; do_help
dub
call func

not ; do_work
call func
halt
; end main

; begin func
func:
print "begin->"
jz do_help
do_work:
call work
jmp exit
do_help:
call help
jmp exit
exit:
print "end;"
ret ; return from func
help:
print "help->"
ret
work:
print "work->"
ret
; end func
```

## Result brainfuck program

[Try it online!](https://tio.run/##7VRbCsQgDDxQMCcIXqTko11YWAr7UdjzW0Pqo9iPLd26pTgoxGiQmQwZpv71fn4eo3NW0RmWTZ2xQEwKScb7JUcQUuGV1CjA1y5gXwunA3XrktgcBZZ/JBWiCLCWQLjmMvp7ThFFnaposi1Uzi8c8Ayp6tApie2hgzbZOlh@FUGMim5u9JXu43X7jY2biy/iYvUs@w7VbApmquFvnNiGSRsmbZj8fZgwOTcD "brainfuck – Try It Online")


```brainfuck
>>>>>>>[-]>[-]<[->+<]<<<<<<<[-]>>>>>>>>[-<<<<<<<<+>>>>>>>>]<<<<<<<<[->>>>>>>+>+<<<<<<<<][-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++.++.++.+++++.-----------------------------------------------------------------.+++++++++++++++++.[-]>>>>>>>[-<<<<<<<+>>>>>>>]<<<<<<[-]+>>>>>>[-]>[-<+>][-]>[-<+>]<<<<<<<<<[[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.--------.+++.-------.--------------------------------------------------------------.+++++++++++++++++.[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++.----------.-----------------------------------------.>>>>>>>>>[-]<[->+<][-]<[->+<][-]+[->+<][-]>[-<+>][-]>[-<+>][-]>[-<+>]<<<<<<<<<<[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++.++.++.+++++.-----------------------------------------------------------------.+++++++++++++++++.>>>>>>>[-]>[-<+>][-]>[-<+>]<<<<<<<<<[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.--------.+++.-------.--------------------------------------------------------------.+++++++++++++++++.[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++.----------.-----------------------------------------.>[-]<[-]]>[<[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.---.+++++++.++++.-------------------------------------------------------------------.+++++++++++++++++.[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++.----------.-----------------------------------------.>>>>>>>>>[-]<[->+<][-]<[->+<][-]+[->+<][-]>[-<+>][-]>[-<+>][-]>[-<+>]<<<<<<<<<<[-]++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++.++.++.+++++.-----------------------------------------------------------------.+++++++++++++++++.>>>>>>>[-]>[-<+>][-]>[-<+>]<<<<<<<<<[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.--------.+++.-------.--------------------------------------------------------------.+++++++++++++++++.[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.+++++++++.----------.-----------------------------------------.>[-]]<
```


# About virtual machine and virtual assembler

## Opcodes


| Opcode 	 | Argument 	 | Description               |
|--------	 |----------	 |-------------------------- |
| print  	 | string    	 | string → console          |
| out    	 | -         	 | top → console	         |
| pushi      | number or char| I → top                   |
| push       | reg           | reg → top                 |
| pop        | reg           | top → reg                 |
| dup        | -             | top → top top             |
| swap       | -             | next top → top next       |
| drop       | -             | next top → next           |
| add        | -             | next + top → top          |
| sub        | -             | next - top → top          |
| jmp        | label         | label → pc                |
| halt       | -             | exit                      | 
| jnz        | label         | top <> 0 ? label → pc     |
| jz         | label         | top == 0 ? label → pc     |
| not        | -             | not top → top             |
| call       | label         | label → pc                |
| ret        | -             | call pc + 1 → pc          |
| mul        | -             | next * top → top          |
| div        | -             | next / top → top          |
| inc        | -             | top + 1 → top             |
| dec        | -             | top - 1 → top             |
| loop       | number        | number {loop->next}       |
| next       | -             | loop pc -> pc             |

## General register

The virtual stack machine has 5 general purpose registers: `r0, r1, r2, r3, r4`


