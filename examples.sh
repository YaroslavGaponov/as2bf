rm -f examples/*.bf

node src/as2bf.js examples/hello.s examples/hello.bf
node src/as2bf.js examples/abc.s examples/abc.bf
node src/as2bf.js examples/func.s examples/func.bf
node src/as2bf.js examples/calc.s examples/calc.bf
node src/as2bf.js examples/buffalo.s examples/buffalo.bf