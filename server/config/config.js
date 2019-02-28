var path = require('path')
var env = process.env.NODE_ENV || 'dev' // 这个process.env.NODE_ENV需要再服务器上配置为pro
env = env.toLocaleLowerCase()

var file = path.resolve(__dirname, 'config-' + env)
try {
    module.exports = require(file)
} catch (err) {
    throw err
}