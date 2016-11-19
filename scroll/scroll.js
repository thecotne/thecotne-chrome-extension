/* eslint-env browser */
/* global chrome */

chrome.storage.sync.get('scrollTop', ({ scrollTop }) => {
  if (scrollTop) {
    const scrollTopBtn = document.createElement('a')

    scrollTopBtn.classList.add('thecotne-scroll-top-btn')
    scrollTopBtn.addEventListener('click', () => {
      scrollLoop((new Date()).getTime(), 200, document.body.scrollTop)
    })

    document.body.appendChild(scrollTopBtn)

    document.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1'
        scrollTopBtn.style.pointerEvents = 'all'
      } else {
        scrollTopBtn.style.opacity = '0'
        scrollTopBtn.style.pointerEvents = 'none'
      }
    })
  }
})

function scrollLoop (beginTime, duration, scrollFrom) {
  const timePassed = (new Date()).getTime() - beginTime
  const timeLeft = duration - timePassed

  document.body.scrollTop = timeLeft * (scrollFrom / duration)

  if (timePassed < duration) {
    requestAnimationFrame(() => scrollLoop(beginTime, duration, scrollFrom))
  }
}
