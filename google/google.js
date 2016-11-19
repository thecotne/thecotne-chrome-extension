function translateLink (text) {
  return `https://translate.google.com/#auto/auto/${encodeURIComponent(text)}`
}

function createElement (tagName, props, ...childs) {
  const element = document.createElement(tagName)
  for (const propName in props) {
    element[propName] = props[propName]
  }
  for (const child of childs) {
    element.appendChild(child)
  }
  return element
}

function insertTranslateButton () {
  const input = document.getElementById('lst-ib')
  const moreButton = document.getElementById('hdtb-more')
  const translateButtonCheck = !document.querySelector('.thecotne-translate-btn')

  if (input && moreButton && translateButtonCheck) {
    const translateButtonA = createElement('a', {
      className: 'q qs thecotne-translate-btn',
      href: translateLink(input.value),
      innerText: 'Translate'
    })
    const translateButton = createElement('div', {
      className: 'hdtb-mitem hdtb-imb'
    }, translateButtonA)

    input.addEventListener('keyup', e => {
      translateButtonA.href = translateLink(e.target.value)
    })

    moreButton.parentNode.insertBefore(translateButton, moreButton)
  }
}

document.addEventListener('DOMContentLoaded', insertTranslateButton)
document.addEventListener('DOMNodeInserted', insertTranslateButton)
