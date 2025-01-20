window.addEventListener('load', () => {
  const imgWrap = document.querySelector('[anm-intro=img-wrap]')
  const imgsScroller = document.querySelector('[anm-intro=scroller]')
  const imgs = Array.from(imgsScroller.children)
  const headline = document.querySelector('[anm-intro=headline]')
  const text = document.querySelector('[anm-intro=text]')
  const btn = document.querySelector('[anm-intro=btn]')
  const nav = document.querySelector('[anm-intro=nav]')
  const indicator = document.querySelector('[anm-intro=indicator]')

  const headlineSplit = new SplitType(headline, { types: 'lines' })
  const textSplit = new SplitType(text, { types: 'lines' })

  const tl = gsap.timeline({ defaults: { ease: 'expo.inOut', duration: 2 } })

  gsap.set(imgWrap, { scale: 0.5 }, 0)

  imgs.forEach((img, index) => {
    const isFirstImage = index === 0
    const duration = 6 - index * (1.1 / imgs.length)
    const startTime = isFirstImage ? 0.3 : 0
    tl.fromTo(img, { yPercent: -600 }, { yPercent: 0, ease: 'expo.inOut', duration: duration }, startTime)
  })

  tl.to(imgWrap, { scale: 1 }, '>-15%')
    .from(headlineSplit.lines, { yPercent: 300, stagger: 0.25, ease: 'expo.out' }, '<+50%')
    .from(textSplit.lines, { yPercent: 100, opacity: 0, stagger: 0.1, ease: 'expo.out' }, '<+25%')
    .from(btn, { opacity: 0, yPercent: 50, duration: 1, ease: 'expo.out' }, '<+25%')
    .from(nav, { opacity: 0, yPercent: 50, duration: 1, ease: 'expo.out' }, '<+25%')
    .from(indicator, { opacity: 0, yPercent: 50, duration: 1, ease: 'expo.out' }, '<')
})
