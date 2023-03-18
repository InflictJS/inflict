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

## File Inclusion Syntax

Relative paths are used by default. Absolute paths using `$` refer to the first folder `views` unless specified when using the `render()` function. This feature is useful because `render()` carries over the `dir` parameter when using `include()` in templates. 

```html
<!-- views/page/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inflict</title>
</head>
<body>
  <!-- views/widget.html -->
  #{ include('$widget.html') }#
  <!-- coming soon... -->
  <script src="$script.js"></script>
</body>
</html>
```