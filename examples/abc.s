

mov r0 'a'
call print_abc

mov r0 'A'
call print_abc

halt

; func print abc
print_abc:
loop 26
call func_print
inc r0
next
ret

; func print symbol
func_print:
out r0
ret
