const inflict = require('./dist/cjs/index')

console.log(inflict.render('views', '', { message: 'Hello, World!' }))