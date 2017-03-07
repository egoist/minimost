const minimost = require('../')

test('main', () => {
  expect(minimost(['--foo-bar', 'foo'])).toEqual({
    input: [],
    flags: {
      fooBar: 'foo',
      '--': []
    }
  })
})

test('exclude', () => {
  expect(minimost(['--foo-bar', 'foo', '--', '--bar-foo', 'bar'])).toEqual({
    input: [],
    flags: {
      fooBar: 'foo',
      '--': ['--bar-foo', 'bar']
    }
  })
})
