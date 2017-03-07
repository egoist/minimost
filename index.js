'use strict'
const minimist = require('minimist')
const camelCaseKeys = require('camelcase-keys')

module.exports = function (argv, options) {
  const parsed = minimist(argv, Object.assign({
    '--': true
  }, options))

  const input = parsed._
  delete parsed._

  const flags = camelCaseKeys(parsed, { exclude: ['--'] })

  return { input, flags }
}
