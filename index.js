'use strict'
const minimist = require('minimist')

const kebab2camel = input => {
  return input.replace(/([a-z])-([a-z])/g, (_, p1, p2) => {
    return p1 + p2.toUpperCase()
  })
}

module.exports = function (argv, options) {
  const parsed = minimist(argv, Object.assign({
    '--': true
  }, options))

  const input = parsed._
  delete parsed._

  const flags = {}
  // eslint-disable-next-line guard-for-in
  for (const key in parsed) {
    flags[kebab2camel(key)] = parsed[key]
  }

  return { input, flags }
}
