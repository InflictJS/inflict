import * as fs from 'fs'

fs.renameSync('dist/cjs/index.js', 'dist/cjs/index.cjs')
fs.renameSync('dist/esm/index.js', 'dist/esm/index.mjs')