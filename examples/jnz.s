
; case # 1
print "case #1 (not_zero)->"
pushi 1 ; <- not zero
jnz not_zero1    
jmp zero1     
not_zero1:       
print "not zero "
jmp done1
zero1:        
print "zero "
jmp done1
done1:
print "done1;"


; case # 2
print "case #2 (zero)->"
pushi 0 ; <- zero
jnz not_zero2 
jmp zero2        
not_zero2:       
print "not zero "
jmp done2
zero2:        
print "zero "
jmp done2
done2:
print "done2;"


; case # 3
print "case #3 (zero)->"
jmp case3
zero3:
print "zero "
jmp done3
not_zero3:
print "not_zero "
jmp done3
case3:
pushi 0 ; <- zero
jnz not_zero3
jmp zero3
done3:
print "done3;"

; case # 4
print "case #4 (not zero)->"
jmp case4
zero4:
print "zero "
jmp done4
not_zero4:
print "not_zero "
jmp done4
case4:
pushi 1 ; <- not zero
jnz not_zero4
jmp zero4
done4:
print "done4;"