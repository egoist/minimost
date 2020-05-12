import minimist, { Opts } from 'minimist'

const kebab2camel = (input: string) => {
  return input.replace(/([a-z])-([a-z])/g, (_, p1, p2) => {
    return p1 + p2.toUpperCase()
  })
}

export default function (argv: string[], options?: Opts) {
  options = Object.assign({ '--': true }, options)

  const unknown = options.unknown
  if (typeof unknown === 'function') {
    options.unknown = function (input) {
      if (input === '-' || !input.startsWith('-')) return
      return unknown.call(this, input)
    }
  }

  const parsed = minimist(argv, options)
  const input = parsed._
  delete parsed._

  const flags: {[k: string]: any} = {}
  // eslint-disable-next-line guard-for-in
  for (const key in parsed) {
    flags[kebab2camel(key)] = parsed[key]
  }

  return { input, flags }
}

export { Opts }
