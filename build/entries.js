const fs = require('fs')
const path = require('path')
const entryPath = path.resolve(__dirname, '../src/entries')

var entries = fs.readdirSync(entryPath).reduce(function (o, dirname) {
    o[dirname] = path.join(entryPath, dirname)
    return o
}, {})

module.exports = entries