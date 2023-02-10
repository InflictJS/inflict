import * as fs from 'fs'

function type(data): string {
  return Object.prototype.toString.call(data).slice(8, -1)
}

function isObject(data): boolean {
  return type(data) === 'Object' && Object.getPrototypeOf(data).constructor === Object && Object.getPrototypeOf(data) === Object.prototype
}

function execute(code: string, locals: Record<string, any>, dir: string) {
  let s = ''
  for (const [k, v] of Object.entries(locals)) {
    if (type(v) === 'Array') {
      s += `const ${k} = [${v.join(', ')}];\n`
      continue
    }
    if (type(v) === 'String') {
      s += `let ${k} = "${v}";\n`
      continue
    }
    if (type(v) === 'Number') {
      s += `let ${k} = ${v};\n`
      continue
    }
    if (isObject(v)) {
      s += `let ${k} = ${JSON.stringify(v)};\n`
      continue
    }
  }
  try {
    const forge = new Function('process', 'eval', 'Function', 'Object', 'include', `${s} return ${code.match(/(?<=#{)(.|\n)+?(?=})/g)};`)
    let output = forge(null, null, null, Object, (file) => render(dir, file, locals))
    return output
  } catch (e) {
    console.log(e)
    return ''
  }
}

function render(dir: string = 'views', file: string, locals: Record<string, any>): string {
  if (!file) file = 'index.html'
  if (!file.endsWith('.html')) file += '.html'
  let html = fs.readFileSync(`${dir}/${file}`, 'utf-8')
  const matches = Array.from(html.matchAll(/#{(.|\n)+?}/g))
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    console.log(`\x1b[32mMatched: ${match[0]}`)
    html = html.replace(match[0], execute(match[0], locals, dir))
  }
  return html
}

export {
  render,
}