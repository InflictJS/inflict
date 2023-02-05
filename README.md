# Inflict

A server-side HTML rendering web framework!

## Import

```sh
npm install inflict
```

```js
const inflict = require('inflict')
```

## Get Started

Create an express server and render an `html` template that is **not** the `express.static()` folder. 

```js
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.send(render('views', 'index.html', { message: 'Hello!' })) // views/index.html is rendered
})

app.listen(3000)
```



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