import { render } from './dist/esm/index'
import express from 'express'
const app = express()

app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.send(render('views', '', { message: 'Hello!' })) // views/index.html is rendered
})

app.listen(3000)