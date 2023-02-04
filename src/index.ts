import * as fs from 'fs'

function type(data): string {
  return Object.prototype.toString.call(data).slice(8, -1)
}

function isObject(data): boolean {
  return type(data) === 'Object' && Object.getPrototypeOf(data).constructor === Object && Object.getPrototypeOf(data) === Object.prototype
}

function execute(code: string, locals: Record<string, any>) {
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
    let output = forge(null, null, null, Object, (file) => fs.readFileSync(`views/${file}`, 'utf-8'))
    return output
  } catch (e) {
    console.log(e)
    return ''
  }
}

function render(file, locals) {
  let html = fs.readFileSync(file, 'utf-8')
  const matches = html.matchAll(/#{(.|\n)+?}/g)
  for (const match of matches) {
    console.log(match[0])
    html = html.replace(match[0], execute(match[0], locals))
  }
  return html
}