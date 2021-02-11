; read first number
call read_digit

; read operation + or -
read
dub
push '+'
je do_plus
push '-'
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
push '0'
sub
ret


print_digit:
push '0'
add
out
ret