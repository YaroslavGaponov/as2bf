pushi 3

loop1:
print "["

pushi 4
loop2:
print "*"
dec
dub
jnz loop2
drop

print "]"
dec
dub
jnz loop1
drop
halt
