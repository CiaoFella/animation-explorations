import { bottomSideClipPath, fullClipPath, topClipPath } from '../../variables.js'

window.addEventListener('load', () => {
  const mm = gsap.matchMedia()

  const visual = document.querySelector('[anm-intro=visual]')

  const headline = document.querySelector('[anm-intro=headline]')
  const texts = document.querySelectorAll('[anm-intro=text]')
  const cta = document.querySelector('[anm-intro=cta]')

  const indicator = document.querySelector('[anm-intro=indicator]')

  const navLogo = document.querySelector('[anm-intro=nav-logo]')

  const preloader = document.querySelector('[anm-intro=preloader]')
  const preloaderLogo = document.querySelector('[anm-intro=preloader-logo]')
  const preloaderDots = preloaderLogo.children

  const textSplit = new SplitType([headline, ...texts], { types: 'words' })
  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 2 }, paused: true })

  let xPercent

  mm.add('(max-width: 768px)', () => {
    xPercent = 0
  })

  mm.add('(min-width: 768px)', () => {
    xPercent = -25
  })

  function setInitialContentState() {
    gsap.set(preloaderDots, { scale: 0 })
    gsap.set(visual, { yPercent: -125, xPercent: xPercent })
    gsap.set(textSplit.words, { clipPath: topClipPath, yPercent: 100 })
    gsap.set([cta, navLogo, indicator], { opacity: 0, yPercent: 100 })
  }

  function setInitalPreloaderState() {
    gsap.set(preloader, { display: 'flex' })
  }

  const dotsTl = gsap.timeline({
    defaults: { duration: 0.75 },
    paused: true,
    repeat: 1,
    onComplete: () =>
      setTimeout(() => {
        gsap.set(preloader, { display: 'none' })
        tl.play()
      }, 250),
  })

  setInitialContentState()
  setInitalPreloaderState()

  dotsTl
    .to(preloaderDots, {
      scale: 1,
      ease: 'back.out(1.2)',
      stagger: {
        amount: 0.25,
        from: 'start',
      },
    })
    .to(preloaderDots, {
      scale: 0,
      ease: 'back.in(1.2)',
      stagger: {
        amount: 0.25,
        from: 'start',
      },
    })

  tl.to(visual, { yPercent: 0, ease: 'expo.inOut', duration: 2 })
  mm.add('(min-width: 768px)', () => {
    tl.to(visual, { xPercent: 0, ease: 'expo.inOut', duration: 1.5 }, '>-0.25')
  })
  tl.to(textSplit.words, { clipPath: fullClipPath, yPercent: 0, stagger: 0.1 }, '<+50%').to(
    [cta, navLogo, indicator],
    { opacity: 1, yPercent: 0, duration: 2, stagger: 0.25 },
    '<+50%'
  )

  dotsTl.play()
})
