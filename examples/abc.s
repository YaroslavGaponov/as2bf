

push 'a'
call print_abc

push 'A'
call print_abc

halt

; func print abc
print_abc:
loop 26
call func_print
inc
next
ret

; func print symbol
func_print:
dub
out
ret
