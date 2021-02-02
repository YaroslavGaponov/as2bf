; read first number
call read_digit

; read operation + or -
read
dub
call is_plus
jnz do_plus
call is_minus
jnz do_minus
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

is_plus:
pushi '+'
sub
not
ret

is_minus:
pushi '-'
sub
not
ret

print_digit:
pushi '0'
add
out
ret