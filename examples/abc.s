stack 3

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
jnz next

; done
halt
