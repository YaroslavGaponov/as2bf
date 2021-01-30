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
jz done
jmp next

; done
halt
```

## Result brainfuck program [abc.bf](examples/abc.bf)

[run abc.bf](https://tio.run/##7dLBCsIwDADQDyrzC8J@ZPSggiCCB8Hvn45t9TDnBHV4eDmF0DZpeLvL9ng@XPentq1LNFWOpqpT5Jks/To@GyL6uJ8pHxpKaSjkrpTqHOXo@PfxcuR39zHp9mhX@j3plKatNt0b/WAz2cJGSvbilYhYdz/DYNXSYGtt@c/Wgw8@@OCDDz744IMPPvjggw8@@OCDDz744IMPPvjggw8@@OCDDz744IMPPvjggw8@@OCDDz744IMPPvjggw8@@OCDDz74fJ9P294A "brainfuck – Try It Online")


## Other examples

[abc.s](examples/abc.s)

[jz.s](examples/jz.s)

[jnz.s](examples/jnz.s)

[exit.s](examples/exit.s)

[hello.s](examples/hello.s)


# About virtual machine and virtual assembler

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
| jmp        | label         | label → pc                |
| halt       | -             | exit                      | 
| jnz        | label         | top == 0 ? label → pc     |
| jz         | label         | top == 0 ? label → pc     |

## General register

The virtual stack machine has 5 general purpose registers: `r0, r1, r2, r3, r4`

## Stack

The stack size is set by the opcode `.stack <size>`

