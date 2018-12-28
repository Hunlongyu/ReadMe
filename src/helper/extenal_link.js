import { shell } from 'electron'

const externalLink = event => {
  let href
  let isExternal = false

  const checkDomElement = element => {
    if (element.nodeName === 'A') {
      href = element.getAttribute('href')
    }

    if (element.classList.contains('external-link')) {
      isExternal = true
    }

    if (href && isExternal) {
      shell.openExternal(href)
      event.preventDefault()
    } else if (element.parentElement) {
      checkDomElement(element.parentElement)
    }
  }
  checkDomElement(event.target)
}

document.addEventListener('click', externalLink, false)
