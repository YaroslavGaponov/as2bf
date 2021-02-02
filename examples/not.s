

pushi 0
not
jnz ok1
error1:
print "error1"
jmp _next
ok1:
print "ok1"

_next:

pushi 1
not
jz ok2
error2:
print "error2"
halt
ok2:
print "ok2"
halt