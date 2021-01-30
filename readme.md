as2bf
===========
assembler to brainfuck translator

# How to run example?

```sh
npm i
npm run build
npm run abc
```

# Example

##  Print alphabet [abc.s](examples/abc.s)

```asm
.stack 3

; first symbol
pushi 'a'

; counter = 26
pushi 26

; start cycle
next:
swap

; print 
dub
out

; next symbol
pushi 1
add
swap

; counter = counter - 1
pushi 1
sub

; if count > 0 goto next
dub
.jnz next

; done
.halt
```

## Result brainfuck program [abc.bf](examples/abc.bf)

[Run abc.bf](https://tio.run/##7dJBCsIwEADAB4X6gqUfKTmoIIjgQfD91dqmh0qtUCoeZk@bkGQ3yxxu@/P1dD9e2rYu0VQ5mqpOkWeytHWsayJe8TxSvtNvpH6Zu41U5yjHhl8P1yJ/OYdJlbFMqfNWIU1L7LrLfTMz2cIExuzDKxHxm3kMDVVLDW091T8ZBx544IEHHnjggQceeOCBBx544IEHHnjggQceeOCBBx544IEHHnjggQceeOCBBx544IEHHnjggQceeOCBBx544IHHSh5t@wA "brainfuck – Try It Online")

## Opcodes


| Opcode 	 | Argument 	 | Description               |
|--------	 |----------	 |-------------------------- |
| .stack 	 | number    	 | set stack size            |
| print  	 | string    	 | string → console          |
| out    	 | -         	 | top → console	         |
| pushi      | number | char | I → top                   |
| push       | reg           | reg → top                 |
| pop        | reg           | top → reg                 |
| dup        | -             | top → top top             |
| swap       | -             | next top → top next       |
| drop       | -             | next top → next           |
| add        | -             | next + top → top          |
| sub        | -             | next - top → top          |
| .jmp       | label         | label → pc                |
| .halt      | -             | exit                      | 
| .jnz       | label         | top <> 0 ? label → pc     |
| .jz        | label         | top == 0 ? label → pc     |


## General registers

The virtual stack machine has 5 general purpose registers: `r0, r1, r2, r3, r4`

## Stack

The stack size is set by the opcode `.stack <size>`