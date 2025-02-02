const bottomLeftClipPath = 'inset(100% 100% 0% 0% round 1rem 1rem 1rem 1rem)'
const fullClipPath = 'inset(0% 0% 0% 0% round 1rem 1rem 1rem 1rem)'
const topRightClipPath = 'inset(0% 0% 100% 100% round 1rem 1rem 1rem 1rem)'

window.addEventListener('load', () => {
  initEasingAnimation()

  const section = document.querySelector('[anm-motion="section"]')
  const cards = document.querySelectorAll('[anm-motion="card"]')

  const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 2 }, paused: true })

  tl.from(section, { xPercent: 100 }).from(cards, { x: '25rem', stagger: { amount: 0.5 } }, '<')
  tl.to(cards, { x: '-25rem', ease: 'expo.inOut', stagger: { amount: 0.5 } }, '8').to(section, { xPercent: -100, ease: 'expo.inOut' }, '<')

  tl.play()
})

function createEasingCurve(ease) {
  const points = []
  const segments = 100

  for (let i = 0; i <= segments; i++) {
    const progress = i / segments
    const value = ease(progress)

    // Scale points to SVG viewport (10-90 range for both x and y)
    const x = 10 + progress * 80 // Maps 0-1 to 10-90 on x-axis
    const y = 90 - value * 80 // Maps 0-1 to 90-10 on y-axis (inverted for SVG)

    points.push(`${x},${y}`)
  }

  return `M${points.join(' L')}`
}

function initEasingAnimation() {
  // Get all SVG elements with the easing visualizer attribute
  const visualizers = document.querySelectorAll('[anm-motion="easing-visualizer"]')

  visualizers.forEach((svgElement) => {
    const easePath = svgElement.querySelector('[anm-motion="ease-path"]')
    const circle = svgElement.querySelector('[anm-motion="ease-circle"]')

    // Get easing type from SVG element
    const easingType = svgElement.getAttribute('anm-ease') || 'expo.inOut'

    // Create the easing curve path using the SVG's easing type
    const pathData = createEasingCurve(gsap.parseEase(easingType))
    easePath.setAttribute('d', pathData)

    // Initialize the MotionPath animation
    gsap.to(circle, {
      motionPath: {
        path: easePath, // Use the actual path element instead of ID selector
        align: easePath,
        autoRotate: false,
        alignOrigin: [0.5, 0.5],
      },
      duration: 2,
      ease: easingType,
      repeat: -1,
      repeatDelay: 0.1,
    })
  })
}
