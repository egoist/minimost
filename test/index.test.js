const minimost = require('../')

test('main', () => {
  expect(minimost(['--foo-bar', 'foo', '--a-bc-de'])).toEqual({
    input: [],
    flags: {
      aBcDe: true,
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
