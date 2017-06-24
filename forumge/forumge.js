/* eslint-env browser */

const ClientID = 'c85f84102eecd3e'

const postInput = document.querySelector('[name=Post]')

const uploadButton = document.createElement('a')

uploadButton.classList.add('thecotne-imageupload')

const uploadInput = document.createElement('input')
uploadInput.type = 'file'
uploadInput.style.display = 'none'

postInput.parentNode.insertBefore(uploadButton, postInput)
postInput.parentNode.insertBefore(uploadInput, postInput)

uploadInput.addEventListener('change', () => {
  uploadButton.classList.add('loading')

  const formData = new FormData()
  formData.append('image', uploadInput.files[0])

  fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    body: formData,
    headers: new Headers({
      Accept: 'application/json',
      Authorization: `Client-ID ${ClientID}`
    })
  })
    .then(response => response.json())
    .then(response => {
      uploadButton.classList.remove('loading')
      insertText(`[IMG]${response.data.link}[/IMG]`, postInput)
    })
})

uploadButton.addEventListener('click', () => {
  const clickEvent = document.createEvent('HTMLEvents')
  clickEvent.initEvent('click', true, true)
  uploadInput.dispatchEvent(clickEvent)
})

function insertText (text, field) {
  if (field.selectionStart > -1) {
    field.focus()

    const beforeSelection = field.value.substring(0, field.selectionStart)
    const afterSelection = field.value.substring(field.selectionEnd, field.value.length)

    field.value = beforeSelection + text + afterSelection

    field.focus()

    field.selectionStart += text.length
    field.selectionEnd += text.length
  } else {
    field.focus()
    field.value += text
    field.focus()
  }
}
