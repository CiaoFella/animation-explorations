const bottomLeftClipPath = 'inset(100% 100% 0% 0% round 1rem 1rem 1rem 1rem)'
const fullClipPath = 'inset(0% 0% 0% 0% round 1rem 1rem 1rem 1rem)'
const topRightClipPath = 'inset(0% 0% 100% 100% round 1rem 1rem 1rem 1rem)'

window.addEventListener('load', () => {
  initEasingAnimation()

  const cards = document.querySelectorAll('[anm-motion="card"]')

  const tl = gsap.timeline({ defaults: { ease: 'expo.inOut', duration: 2 }, paused: true })

  tl.fromTo(
    cards,
    { clipPath: bottomLeftClipPath, scale: 0.2 },
    { clipPath: fullClipPath, scale: 1, transformOrigin: 'bottom left', stagger: { from: 2, amount: 0.2 } }
  )
  tl.fromTo(
    cards,
    { clipPath: fullClipPath, scale: 1 },
    { clipPath: topRightClipPath, scale: 0.2, transformOrigin: 'top right', stagger: { from: 3, amount: 0.2 } },
    '+=5'
  )

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
  console.log('initEasingAnimation')
  const easePath = document.querySelector('#easePath')
  const circle = document.querySelector('#circle')

  // Get attributes from SVG element
  const svgElement = document.querySelector('[anm-motion="easing-visualizer"]')
  const easingType = svgElement.getAttribute('anm-ease') || 'expo.inOut'

  // Create the easing curve path using the SVG's easing type
  const pathData = createEasingCurve(gsap.parseEase(easingType))
  easePath.setAttribute('d', pathData)

  // Initialize the MotionPath animation
  gsap.to(circle, {
    motionPath: {
      path: '#easePath',
      align: '#easePath',
      autoRotate: false,
      alignOrigin: [0.5, 0.5],
    },
    duration: 2,
    ease: easingType, // Using none here since the path already represents the easing
    repeat: -1,
  })
}
