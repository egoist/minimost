import minimost from '../src'

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

test('unknown', () => {
  const options = {
    boolean: ['foo'],
    unknown: jest.fn()
  }
  expect(minimost(['--foo', 'bar'], options)).toEqual({
    input: ['bar'],
    flags: {
      foo: true,
      '--': []
    }
  })
  expect(options.unknown).not.toHaveBeenCalled()

  options.unknown.mockClear()
  minimost(['--foo', '--bar'], options)
  expect(options.unknown).toHaveBeenCalledWith('--bar')

  options.unknown.mockClear()
  minimost(['--foo', '-b'], options)
  expect(options.unknown).toHaveBeenCalledWith('-b')

  options.unknown.mockClear()
  minimost(['--foo', '-'], options)
  expect(options.unknown).not.toHaveBeenCalled()
})
