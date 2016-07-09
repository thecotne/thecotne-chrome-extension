function translateLink(text) {
  return `https://translate.google.com/#auto/auto/${encodeURIComponent(text)}`
}

function insertTranslateButton() {
  const input = document.getElementById('lst-ib')
  const moreButton = document.getElementById('hdtb-more')
  if (input && moreButton) {
    const translateButton = document.createElement('div')
    translateButton.className = 'hdtb-mitem hdtb-imb'

    const translateButtonA = document.createElement('a')
    translateButtonA.className = 'q qs'
    translateButtonA.href = translateLink(input.value)
    translateButtonA.innerText = 'Translate'

    translateButton.appendChild(translateButtonA)

    input.addEventListener('keyup', e => {
      translateButtonA.href = translateLink(e.target.value)
    })

    moreButton.parentNode.insertBefore(translateButton, moreButton)
  }
}

function DOMNodeInserted(e) {
  if (e.target.id === 'hdtb' || (e.target.querySelector && e.target.querySelector('#hdtb'))) {
    insertTranslateButton()
  }
}

document.addEventListener('DOMNodeInserted', DOMNodeInserted)
