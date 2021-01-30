.stack 1

pushi 0     ; code = 0
jmp main    ; call main

; print ok
ok:
print "ok"
jmp done

; print error
error:
print "error"
jmp done

main:
jz ok       ; if code == 0 then print ok
jmp error   ; else print error

; exit
done:
halt