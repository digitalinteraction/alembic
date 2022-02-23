/** Create a global stylesheet under an identifier so it is only added once */
export function addGlobalStyle(id, style) {
  if (document.getElementById(id)) return

  const elem = document.createElement('style')
  elem.id = id
  elem.innerHTML = style.replace(/\s\s+/g, ' ').trim()

  document.head.appendChild(elem)
}
