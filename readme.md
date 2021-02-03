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
> node src/as2bf.js examples/calc.s examples/calc.bf

as2bf Assembler to Brainfuck traslator [https://github.com/YaroslavGaponov/as2bf]
loading...👍🏻
parsing...👍🏻
--- start ---
0       call    read_digit
1       read
2       dub
3       call    is_plus
4       jnz     do_plus
5       call    is_minus
6       jnz     do_minus
7       print   only +/-
8       halt
9       label   do_plus
10      drop
11      call    read_digit
12      add
13      call    print_digit
14      halt
15      label   do_minus
16      call    read_digit
17      sub
18      call    print_digit
19      halt
20      label   read_digit
21      read
22      pushi   48
23      sub
24      ret
25      label   is_plus
26      pushi   43
27      sub
28      not
29      ret
30      label   is_minus
31      pushi   45
32      sub
33      not
34      ret
35      label   print_digit
36      pushi   48
37      add
38      out
39      ret
--- end ---
translating...👍🏻
result is 1959 bytes
done
```

# Example

##  Simple assembler code

```asm
; read first number
call read_digit

; read operation + or -
read
dub
call is_plus
jnz do_plus
call is_minus
jnz do_minus
print "only +/-"
halt

; plus operation
do_plus:
drop
call read_digit
add
call print_digit
halt

; minus operation
do_minus:
call read_digit
sub
call print_digit
halt

read_digit:
read
pushi '0'
sub
ret

is_plus:
pushi '+'
sub
not
ret

is_minus:
pushi '-'
sub
not
ret

print_digit:
pushi '0'
add
out
ret
```

## Result brainfuck program

[Try it online!](https://tio.run/##5VPLCgIxDPygNjl4E0J/pPSggiCCB8Hvr@m6ttmlSx9aL84p2zCZyWOP98Pldn6crt6bCG0sOLJgFDmOVCOYCBORy5AyIqJUV5ulyBxRRGAlMD9BiYRghBIRiqslyFJ54d6Ot5vNDmCBoCRcbfTOH5O7lBVdLjhuxctOzOXlG3xbU8vKjVd/eQGdW4hSrf773JW1iLAw@ZcHx5lRx/zv51wcp66a@K/ueNVQ4@5GmFdtt4P1a0rHTx3WPgQCAuDqaRSkDs5S@P5tHHm/h51/Ag "brainfuck – Try It Online")


```brainfuck
>>>>>>>>>>,>[-]<[->+<][-]++++++++++++++++++++++++++++++++++++++++++++++++[->-<][-]>[-<+>][-]>[-<+>]<[-]<[->+<],>>[-]<[->+<][-]<[->+<]<<<<<<<<<<[-]>>>>>>>>>>>[-<<<<<<<<<<<+>>>>>>>>>>>]<<<<<<<<<<<[->>>>>>>>>>+>+<<<<<<<<<<<]>>>>>>>>>>>>>[-]<[->+<][-]<[->+<][-]<[->+<][-]+++++++++++++++++++++++++++++++++++++++++++[->-<][-]>[-<+>][-]>[-<+>][-]>[-<+>][-]>[-<+>]<<<<<<<<<<<<<<[-]+>>>>>>>>>>[<<<<<<<<<<[-]>>>>>>>>>>[-]][-]<<<<<<<<<<[>>>>>>>>>>+<<<<<<<<<<[-]][-]>>>>>>>>>>[-<<<<<<<<<<+>>>>>>>>>>]<<<<<<<<<[-]+>>>>>>>>>[-]>[-<+>][-]>[-<+>][-]>[-<+>]<<<<<<<<<<<<<[>>>>>>>>>>[-]>[-<+>][-]>[-<+>][-]>[-<+>]<[-]<[->+<][-]<[->+<],>>>[-]<[->+<][-]<[->+<][-]<[->+<][-]++++++++++++++++++++++++++++++++++++++++++++++++[->-<][-]>[-<+>][-]>[-<+>][-]>[-<+>][-]>[-<+>]<<<<[->+<][-]>[-<+>][-]>[-<+>][-]>[-<+>]<[-]<[->+<][-]<[->+<][-]++++++++++++++++++++++++++++++++++++++++++++++++[->+<][-]>[-<+>][-]>[-<+>][-]>[-<+>]<<<.[-]>[-<+>][-]>[-<+>]<<<<<<<<<<<[-]<[-]]>[>>>>>>>>>>>>[-]<[->+<][-]<[->+<][-]<[->+<][-]+++++++++++++++++++++++++++++++++++++++++++++[->-<][-]>[-<+>][-]>[-<+>][-]>[-<+>][-]>[-<+>]<<<<<<<<<<<<<<[-]+>>>>>>>>>>[<<<<<<<<<<[-]>>>>>>>>>>[-]][-]<<<<<<<<<<[>>>>>>>>>>+<<<<<<<<<<[-]][-]>>>>>>>>>>[-<<<<<<<<<<+>>>>>>>>>>]<<<<<<<<<[-]+>>>>>>>>>[-]>[-<+>][-]>[-<+>][-]>[-<+>]<<<<<<<<<<<<<[>>>>>>>>>>>>>[-]<[->+<][-]<[->+<][-]<[->+<],>>>>[-]<[->+<][-]<[->+<][-]<[->+<][-]<[->+<][-]++++++++++++++++++++++++++++++++++++++++++++++++[->-<][-]>[-<+>][-]>[-<+>][-]>[-<+>][-]>[-<+>][-]>[-<+>]<<<<<[->-<][-]>[-<+>][-]>[-<+>][-]>[-<+>][-]>[-<+>]<[-]<[->+<][-]<[->+<][-]<[->+<][-]++++++++++++++++++++++++++++++++++++++++++++++++[->+<][-]>[-<+>][-]>[-<+>][-]>[-<+>][-]>[-<+>]<<<<.[-]>[-<+>][-]>[-<+>][-]>[-<+>]<<<<<<<<<<<<[-]<[-]]>[<[-]+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.-.--.+++++++++++++.-----------------------------------------------------------------------------------------.+++++++++++.++++.--.>[-]][-]]<
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
| je         | label         | top == next ? label → pc  |
| jne        | label         | top <> next ? label → pc  |
| not        | -             | not top → top             |
| call       | label         | label → pc                |
| ret        | -             | call pc + 1 → pc          |
| mul        | -             | next * top → top          |
| div        | -             | next / top → top          |
| inc        | -             | top + 1 → top             |
| dec        | -             | top - 1 → top             |
| loop       | number        | number {loop->next}       |
| next       | -             | loop pc -> pc             |
| mov        | reg imm       | imm -> reg                |
| mov        | reg1 reg2     | reg2 -> reg1              |
| outr       | reg           | reg -> console            |
| incr       | reg           | reg -> reg + 1            |


## General register

The virtual stack machine has 5 general purpose registers: `r0, r1, r2, r3, r4`


