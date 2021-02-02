; read first number
call read_digit

; read operation + or -
read
dub
pushi '+'
je do_plus
pushi '-'
je do_minus
print "only +/-"
halt

; plus operation
do_plus:
drop
call read_digit
add
call print_digit
halt

; minus operation
do_minus:
call read_digit
sub
call print_digit
halt

read_digit:
read
pushi '0'
sub
ret


print_digit:
pushi '0'
add
out
ret