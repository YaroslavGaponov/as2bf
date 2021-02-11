push 77

call prompt
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