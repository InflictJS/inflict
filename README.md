# Inflict

A flexible HTML web framework!

## Import

Install `inflict` with [npm](https://npmjs.com/package/inflict).

```sh
npm install inflict
```

> **Note**
> This package uses ESM by default but supports CJS 

### ESM 

```js
import { render } from 'inflict'
```

### CJS

```js
const { render } = require('inflict')
```

## Get Started

Create an express server and render an `html` template that is **not** in the `express.static()` folder. 

```js
import { render } from 'inflict'
import express from 'express'
const app = express()

app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.send(render('views', '', { message: 'Hello!', todo: ['Eat', 'Code'] })) // views/index.html is rendered
})

app.listen(3000)
```

Templates are placed inside `#{}#` hash brackets that return strings as plain text. 
> **Warning**
> Do not use `//` to comment or line breaks because code is evaluated in a single line

```html
<!DOCTYPE html>
<html lang="en">
<head>
  #{ include('meta.html') }#
  <title>Inflict</title>
  #{ include('cdn.html') }#
</head>
<body>
  <main>
    #{ message }#
    <ul>
      #{ loop(todo, (item, i) => element('li', item, { class: 'item' })) }#
    </ul>
  </main>
</body>
</html>
```