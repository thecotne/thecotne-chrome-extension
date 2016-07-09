function translateLink(text) {
  return `https://translate.google.com/#auto/auto/${encodeURIComponent(text)}`
}

function insertTranslateButton() {
  const input = document.getElementById('lst-ib')
  const moreButton = document.getElementById('hdtb-more')
  const translateButtonCheck = ! document.querySelector('.thecotne-translate-btn')

  if (input && moreButton && translateButtonCheck) {
    const translateButton = document.createElement('div')
    translateButton.className = 'hdtb-mitem hdtb-imb'

    const translateButtonA = document.createElement('a')
    translateButtonA.className = 'q qs thecotne-translate-btn'
    translateButtonA.href = translateLink(input.value)
    translateButtonA.innerText = 'Translate'

    translateButton.appendChild(translateButtonA)

    input.addEventListener('keyup', e => {
      translateButtonA.href = translateLink(e.target.value)
    })

    moreButton.parentNode.insertBefore(translateButton, moreButton)
  }
}

document.addEventListener('DOMContentLoaded', insertTranslateButton)
document.addEventListener('DOMNodeInserted', insertTranslateButton)
