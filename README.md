# Inflict

A flexible HTML web framework!

## Import

```sh
npm install inflict
```

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
  res.send(render('views', '', { message: 'Hello!' })) // views/index.html is rendered
})

app.listen(3000)
```

Templates are placed inside `#{}` hash brackets that return strings as plain text. 
> **Warning**
> The `eval()` function has been disabled because it is unsafe and client-side JavaScript can not be rendered like `document` 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  #{ include('meta.html') }
  <title>Inflict</title>
</head>
<body>
  <main>
    #{ message }
  </main>
</body>
</html>
```