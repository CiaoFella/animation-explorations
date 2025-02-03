import { bottomSideClipPath, fullClipPath, leftSideClipPath, rightSideClipPath } from '../../variables.js'

window.addEventListener('load', () => {
  const targetVisual = document.querySelector('[anm-intro=target-visual]')

  const svgs = document.querySelectorAll('[anm-intro=svg]')
  const svgChars = [...svgs].map((svg) => svg.children)

  const navItems = document.querySelector('[anm-intro=nav-list]').children

  const indicator = document.querySelector('[anm-intro=indicator]')
  const text = document.querySelector('[anm-intro=text]')
  const cta = document.querySelector('[anm-intro=cta]')

  const textSplit = new SplitType(text, { types: 'lines' })

  const tl = gsap.timeline({ defaults: { ease: 'expo.inOut', duration: 2 }, paused: true })

  function setInitialContentState() {
    tl.set(svgChars, { yPercent: 110 })
    tl.set([navItems, cta, indicator, textSplit.lines], { yPercent: 175 })
  }

  function setInitalPreloaderState() {
    targetVisual.classList.toggle('is-normal')
    tl.set(targetVisual, { clipPath: bottomSideClipPath })
  }

  setInitialContentState()
  setInitalPreloaderState()

  const state = Flip.getState(targetVisual, { props: 'width, height, borderRadius' })

  tl.to(targetVisual, { clipPath: fullClipPath, duration: 2 })
    .call(() => {
      targetVisual.classList.toggle('is-normal')
      Flip.from(state, {
        duration: 2,
        ease: 'expo.inOut',
      })
    })
    .from(targetVisual.querySelector('video'), { scale: 1.1, ease: 'expo.inOut' }, '>+0.25')
    .to(svgChars, { yPercent: 0, ease: 'expo.out', stagger: { from: 'center', amount: -0.075 } }, '<+33%')
    .to(navItems, { yPercent: 0, ease: 'expo.out', stagger: { from: 'center', amount: 0.3 } }, '<')
    .to([indicator, cta, textSplit.lines], { yPercent: 0, duration: 2, ease: 'expo.out', stagger: { from: 'center', amount: 0.3 } }, '<')

  tl.play()
})
