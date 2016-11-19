/* global chrome */

const optionElems = document.querySelectorAll('[data-options]')

for (const elem of optionElems) {
  if (elem.type === 'checkbox') {
    elem.addEventListener('change', e => {
      chrome.storage.sync.set({
        [e.target.name]: e.target.checked
      })
    })

    chrome.storage.sync.get(elem.name, items => {
      elem.checked = items[elem.name] || false
    })
  }
}
