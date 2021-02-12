; read first number
call read_digit
mov r1 r0

; read operation + or -
read r0
cmp r0 '+'
je do_plus
cmp r0 '-'
je do_minus
print "only +/-"
halt

; plus operation
do_plus:
call read_digit
add r0 r1
call print_digit
halt

; minus operation
do_minus:
call read_digit
sub r1 r0
mov r0 r1
call print_digit
halt

read_digit:
read r0
sub r0 '0'
ret


print_digit:
add r0 '0'
out r0
ret