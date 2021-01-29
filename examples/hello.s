stack 4

; call start
jmp start

; exit
done:
print "goodbye"
halt
start:
print "say: "

; 'd'+1='e'
pushi 'd'
pushi 1
add

; 'i'-1='h'
pushi 'i'
pushi 1
sub

; play with registers
swap
pop r1
pop r2
push r1
dub
push r2
dub

; print hhee
out
out
out
out

print "llo world"
jmp done