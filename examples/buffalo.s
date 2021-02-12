; The goal is to output Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo.
; https://codegolf.stackexchange.com/questions/218284/output-buffalo-buffalo-buffalo-buffalo-buffalo-buffalo-buffalo-buffalo

mov r1 'B'
mov r2 'b'
mov r0 0
loop 4
inc r0
cmp r0 3
je l1
out r1
jmp l2
l1:
out r2
l2:
print "uffalo buffalo "
next

