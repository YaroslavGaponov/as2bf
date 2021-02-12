
; begin main
mov r0 0 ; do_help
call func

mov r0 1 ; do_work
call func
halt
; end main

; begin func
func:
print "begin->"
cmp r0 0
je do_help
do_work:
call work
jmp exit
do_help:
call help
jmp exit
exit:
print "end;"
ret ; return from func
help:
print "help->"
ret
work:
print "work->"
ret
; end func