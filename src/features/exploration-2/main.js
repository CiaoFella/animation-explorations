window.addEventListener('load', () => {
  const preloader = document.querySelector('[anm-intro=preloader]')
  const preloaderLogo = document.querySelector('[anm-intro=preloader-logo]')
  const preloaderLogoTop = document.querySelectorAll('[anm-intro=logo-top]')
  const preloaderLogoRoot = document.querySelector('[anm-intro=logo-root]')
  const preloaderText = document.querySelector('[anm-intro=preloader-text]')
  const preloaderTextContent = document.querySelector('[anm-intro=preloader-text-content]')

  const visualWrap = document.querySelector('[anm-intro=visual-wrap]')
  const visual = document.querySelector('[anm-intro=visual]')
  const video = visual.querySelector('video')
  const headline = document.querySelector('[anm-intro=headline]')
  const text = document.querySelector('[anm-intro=text]')
  const cta = document.querySelector('[anm-intro=cta]')
  const indicator = document.querySelector('[anm-intro=indicator]')

  const navLogo = document.querySelector('[anm-intro=nav-logo]')
  const navText = document.querySelector('[anm-intro=nav-text]')

  const headlineSplit = new SplitType(headline, { types: 'words' })
  const textSplit = new SplitType(text, { types: 'lines' })

  const tl = gsap.timeline({ defaults: { ease: 'expo.inOut', duration: 2 } })

  function setInitialContentState() {
    tl.set(headlineSplit.words, { yPercent: 200 }, 0)
    tl.set(textSplit.lines, { y: '2.5rem', opacity: 0 }, 0)
    tl.set(cta, { opacity: 0, y: '2.5rem' }, 0)
    tl.set(indicator, { opacity: 0, y: '2.5rem' }, 0)
    tl.set(navText, { y: '2.5rem', opacity: 0 }, 0)
  }

  function setInitalPreloaderState() {
    tl.set(preloader, { display: 'flex' })
    tl.set(visual, { scale: 1 })
    tl.set(visualWrap, { width: 0, height: 0, rotate: 30, clipPath: 'polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)' })
    preloaderTextContent.textContent = 0
    tl.set(preloaderText, { yPercent: 1250 })
    tl.set(preloaderLogoRoot, { y: '8rem' })
    tl.set(preloaderLogoTop, { y: '-7rem' })
    video.pause()
  }

  setInitialContentState()
  setInitalPreloaderState()

  const contentDuration = 1.5
  const contentEase = 'expo.inOut'

  tl.to(preloaderLogoRoot, { y: 0, duration: 3 })
    .to(preloaderLogoTop, { y: 0, duration: 3 }, '<')
    .to(preloaderText, { yPercent: 0, duration: 3 }, '<+0.1')
    .to(preloaderTextContent, { textContent: 100, snap: { textContent: 1 }, duration: 3 }, '<+0.1')
    .to(preloaderText, { yPercent: 100, opacity: 0, duration: 1 })
    .to(preloaderLogoRoot, { y: `8rem`, duration: contentDuration }, '<+0.1')
    .to(preloaderLogoTop, { y: `-7rem`, duration: contentDuration }, '<')
    .call(
      () => {
        setTimeout(() => {
          video.play()
        }, 1250)
      },
      [],
      '<'
    )
    .to(visualWrap, { width: '30rem', height: '30rem', rotate: 0, duration: contentDuration }, '<+0.2 ')
    .to(visualWrap, { width: '100%', height: '100%', duration: contentDuration, ease: contentEase }, '>-0.2')
    .to(visualWrap, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: contentDuration, ease: contentEase }, '<+0.1')
    .call(
      () => {
        const state = Flip.getState(preloaderLogo, { props: 'color, width, height' })
        navLogo.replaceWith(preloaderLogo)

        Flip.from(state, {
          duration: contentDuration,
          toggleClass: 'is-flipping',
          ease: contentEase,
          onStart: () => {
            gsap.to(preloaderLogoRoot, { y: `-1.5rem`, duration: contentDuration, ease: contentEase })
            gsap.to(preloaderLogoTop, { y: `-1.5rem`, duration: contentDuration, ease: contentEase })
          },
          onComplete: () => {
            gsap.set(preloader, { display: 'none' })
          },
        })
      },
      [],
      '<'
    )
    .to(visual, { scale: 1, duration: contentDuration, ease: contentEase }, '<+0.25')
    .to(navText, { y: 0, opacity: 1, duration: contentDuration, ease: 'expo.out' }, '>-50%')
    .to(headlineSplit.words, { yPercent: 0, duration: contentDuration, stagger: 0.15, ease: 'expo.out' }, '<+0.1')
    .to(textSplit.lines, { y: 0, opacity: 1, duration: contentDuration, stagger: 0.1, ease: 'expo.out' }, '<+0.5')
    .to(cta, { opacity: 1, y: 0, duration: contentDuration, ease: 'expo.out' }, '<+0.1')
    .to(indicator, { opacity: 1, y: 0, duration: contentDuration, ease: 'expo.out' }, '<+0.1')
})
