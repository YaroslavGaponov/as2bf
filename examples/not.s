

push 0
not
pop r0
cmp r0 0
jne ok1
error1:
print "error1"
jmp _next
ok1:
print "ok1"

_next:

push 1
not
pop r0
cmp r0 0
je ok2
error2:
print "error2"
halt
ok2:
print "ok2"
halt