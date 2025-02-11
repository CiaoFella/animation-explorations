import { bottomSideClipPath, fullClipPath, topClipPath } from '../../variables.js'

window.addEventListener('load', () => {
  const bgLight = document.querySelector('[anm-intro=bg-light]')
  const visualWrap = document.querySelector('[anm-intro=visual-wrap]')
  const visualOne = document.querySelector('[anm-intro=visual-1]')

  const svgs = document.querySelectorAll('[anm-intro=svg]')
  const svgChars = [...svgs].map((svg) => svg.children)

  const texts = document.querySelectorAll('[anm-intro=text]')

  const indicator = document.querySelector('[anm-intro=indicator]')

  const preloader = document.querySelector('[anm-intro=preloader]')
  const preloaderText = document.querySelector('[anm-intro=preloader-text]')
  const preloaderTextContent = document.querySelector('[anm-intro=preloader-text-content]')

  const textSplit = new SplitType(texts, { types: 'lines' })

  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 2 }, paused: true })

  function setInitialContentState() {
    preloaderTextContent.textContent = 0
    tl.set(preloader, { display: 'flex' })
      .set(visualOne, { opacity: 1 })
      .set(bgLight, { clipPath: 'polygon(25% 0%, 50% 0%, 50% 0%, 25% 0%)' })
      .set(visualWrap, { yPercent: 150, scale: 0.75 })
      .set(svgChars, { yPercent: 110 })
      .set(textSplit.lines, { opacity: 0, yPercent: 100 })
      .set(indicator, { yPercent: 100 })
  }

  function setInitalPreloaderState() {}

  setInitialContentState()
  setInitalPreloaderState()

  tl.to(preloaderTextContent, { textContent: 100, snap: { textContent: 1 }, duration: 3, ease: 'expo.out' }, '<+0.1')
    .to(preloaderText, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '>-20%')
    .to(preloader, { yPercent: -100, ease: 'expo.inOut', duration: 1.5 }, '<')
    .to(visualWrap, { yPercent: 0, scale: 1, duration: 2.5 }, '<+33%')
    .to(svgChars, { yPercent: 0, stagger: { from: 'start', each: 0.05 }, ease: 'expo.out' }, '<+33%')
    .to(bgLight, { clipPath: 'polygon(25% 0%, 50% 0%, 65% 100%, 10% 100%)' }, '<+0.1')
    .to(visualOne, { opacity: 0 }, '<')
    .to(textSplit.lines, { opacity: 1, stagger: 0.1, yPercent: 0 }, '<')
    .to(indicator, { yPercent: 0 }, '<')

  tl.play()
})
