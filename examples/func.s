
; begin main
pushi 0 ; do_help
dub
call func

not ; do_work
call func
halt
; end main

; begin func
func:
print "begin->"
jz do_help
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
