import { fullClipPath, leftSideClipPath, rightSideClipPath } from '../../variables.js'

window.addEventListener('load', () => {
  const preloader = document.querySelector('[anm-intro=preloader]')

  const visualWrap = document.querySelector('[anm-intro=visual-wrap]')
  const visual = visualWrap.querySelector('img')

  const contentVisual = document.querySelector('[anm-intro=content-visual]')
  const contentVisualImg = contentVisual.querySelector('img')

  const logoChars = document.querySelector('[anm-intro=logo-svg]').children

  const headline = document.querySelector('[anm-intro=headline]')
  const text = document.querySelector('[anm-intro=text]')
  const cta = document.querySelector('[anm-intro=cta]')
  const indicator = document.querySelector('[anm-intro=indicator]')

  const headlineSplit = new SplitType(headline, { types: 'words' })
  const textSplit = new SplitType(text, { types: 'lines' })

  const tl = gsap.timeline({ defaults: { ease: 'expo.inOut', duration: 3 }, paused: true })

  function setInitialContentState() {
    tl.set(logoChars, { clipPath: leftSideClipPath, x: '-10rem' })
      .set(contentVisual, { clipPath: leftSideClipPath, x: '-10rem' })
      .set(contentVisualImg, { scale: 1.5 })
      .set(visualWrap, { clipPath: rightSideClipPath, x: '10rem' })
      .set(visual, { scale: 1.5 })
      .set(textSplit.lines, { y: '5rem' })
      .set(headlineSplit.words, { yPercent: 210 })
      .set(cta, { opacity: 0, y: '2.5rem' })
      .set(indicator, { opacity: 0, y: '2.5rem' })
  }

  function setInitalPreloaderState() {
    tl.set(preloader, { display: 'flex' })
  }
  setInitialContentState()
  setInitalPreloaderState()

  tl.to(preloader, { scaleX: 0, transformOrigin: 'right center' }, 'preloader')
    .to(visualWrap, { clipPath: fullClipPath, ease: 'expo.inOut', x: 0 }, 'preloader')
    .to(logoChars, { clipPath: fullClipPath, x: 0, stagger: -0.025, transformOrigin: 'top left' }, '<+0.1')
    .to(contentVisual, { clipPath: fullClipPath, x: 0 }, '<')
    .to(contentVisualImg, { scale: 1 }, '<')
    .to(visual, { scale: 1 }, '<')
    .to(headlineSplit.words, { yPercent: 0, stagger: 0.05, duration: 1.5, ease: 'expo.out' }, '<+2')
    .to(textSplit.lines, { y: '0rem', stagger: 0.1, duration: 1.5, ease: 'expo.out' }, '<+0.25')
    .to(cta, { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' }, '<+0.25')
    .to(indicator, { opacity: 0.5, y: 0, duration: 1.5, ease: 'expo.out' }, '<+1')

  tl.play()
})
