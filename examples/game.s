
call prompt
pop r1
cmp r1 77 ; magic number is 77
je win

lose:
print "you lose"
halt

win:
print "you win" 
halt

prompt:
push 0
loop 2
push 10
mul
read
push '0'
sub
add
next
ret