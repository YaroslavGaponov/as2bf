pushi 77

call prompt
je win

lose:
print "you lose"
halt

win:
print "you win" 
halt

prompt:
pushi 0
loop 2
pushi 10
mul
read
pushi '0'
sub
add
next
ret