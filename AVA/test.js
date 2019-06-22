// import test from 'ava';
const test=require('ava')

test('foo', t => {
   console.log( t.pass())
});

test('bar', async t => {
  const bar = Promise.resolve('bar');

  t.is(await bar, 'bar');
});