/** Create a global stylesheet under an identifier so it is only added once */
export function addGlobalStyle(id, style) {
  if (document.getElementById(id)) return

  const elem = document.createElement('style')
  elem.id = id
  elem.innerHTML = style

  document.head.appendChild(elem)
}

/**
 * @param {TemplateStringsArray} strings
 * @param {unknown[]} args
 */
export function trimCss(strings, ...args) {
  const parts = []

  for (let i = 0; i < strings.length; i++) {
    parts.push(strings[i])

    if (i < args.length) {
      parts.push(args[i])
    }
  }

  return parts.join('').replace(/\s\s+/g, ' ').trim()
}
