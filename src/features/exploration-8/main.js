window.addEventListener('load', () => {
  // DOM elements
  const container = document.querySelector('.virus-reveal-container')
  const textElement = document.querySelector('.virus-reveal-text')
  const svgContainer = document.querySelector('.virus-svg-container')

  // Create SVG with namespace
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')
  svg.setAttribute('viewBox', '0 0 100 100')
  svg.setAttribute('preserveAspectRatio', 'none')
  svg.classList.add('virus-svg')

  svgContainer.appendChild(svg)

  // Create mask
  const mask = document.createElementNS(svgNS, 'mask')
  mask.setAttribute('id', 'virusMask')
  svg.appendChild(mask)

  // Create background rectangle for the mask
  const maskRect = document.createElementNS(svgNS, 'rect')
  maskRect.setAttribute('x', '0')
  maskRect.setAttribute('y', '0')
  maskRect.setAttribute('width', '100')
  maskRect.setAttribute('height', '100')
  maskRect.setAttribute('fill', 'white')
  mask.appendChild(maskRect)

  // Generate random tendrils for virus effect
  const tendrils = []
  const tendrilCount = 20
  const growthPoints = []

  // Create initial growth points
  function createGrowthPoints(count) {
    for (let i = 0; i < count; i++) {
      const x = 50 + (Math.random() * 10 - 5)
      const y = 50 + (Math.random() * 10 - 5)
      growthPoints.push({ x, y })

      // Create initial circle at growth point
      const circle = document.createElementNS(svgNS, 'circle')
      circle.setAttribute('cx', x)
      circle.setAttribute('cy', y)
      circle.setAttribute('r', '0.5')
      circle.setAttribute('fill', 'black')
      mask.appendChild(circle)

      // Add to tendrils array for animation
      tendrils.push(circle)
    }
  }

  // Function to create a new tendril segment
  function createTendrilSegment(startX, startY, angle, length) {
    const endX = startX + Math.cos(angle) * length
    const endY = startY + Math.sin(angle) * length

    const line = document.createElementNS(svgNS, 'line')
    line.setAttribute('x1', startX)
    line.setAttribute('y1', startY)
    line.setAttribute('x2', endX)
    line.setAttribute('y2', endY)
    line.setAttribute('stroke', 'black')
    line.setAttribute('stroke-width', '0.5')
    mask.appendChild(line)

    return { element: line, endX, endY }
  }

  // Apply mask to text
  function applyMask() {
    textElement.style.webkitMaskImage = `url(#virusMask)`
    textElement.style.maskImage = `url(#virusMask)`
  }

  // Initialize animation
  function initAnimation() {
    createGrowthPoints(5)
    applyMask()

    // GSAP timeline
    const tl = gsap.timeline()

    // Animate initial growth points
    tl.to(tendrils, {
      attr: { r: 2 },
      duration: 1,
      ease: 'power2.out',
      stagger: 0.2,
      onComplete: growTendrils,
    })

    function growTendrils() {
      // For each growth point, create branches
      growthPoints.forEach((point, index) => {
        const branchCount = 3 + Math.floor(Math.random() * 5)

        for (let i = 0; i < branchCount; i++) {
          const angle = Math.random() * Math.PI * 2
          const length = 3 + Math.random() * 7

          const newSegment = createTendrilSegment(point.x, point.y, angle, length)
          tendrils.push(newSegment.element)

          // Add new growth point
          growthPoints.push({ x: newSegment.endX, y: newSegment.endY })

          // Animate new segment
          gsap.from(newSegment.element, {
            attr: { x2: point.x, y2: point.y },
            duration: 0.5 + Math.random() * 1,
            ease: 'power1.out',
            onComplete: () => {
              if (tendrils.length < tendrilCount) {
                // Continue growing if we haven't reached the limit
                const subBranchProb = Math.random()
                if (subBranchProb > 0.5) {
                  const subAngle = angle + (Math.random() * 1 - 0.5)
                  const subLength = length * (0.5 + Math.random() * 0.5)

                  const subSegment = createTendrilSegment(newSegment.endX, newSegment.endY, subAngle, subLength)
                  tendrils.push(subSegment.element)

                  gsap.from(subSegment.element, {
                    attr: { x2: newSegment.endX, y2: newSegment.endY },
                    duration: 0.3 + Math.random() * 0.7,
                    ease: 'power1.out',
                  })
                }
              }
            },
          })
        }
      })

      // Create final reveal effect
      gsap.to('.virus-reveal-container', {
        delay: 3,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          // Optional: add final effects here
          gsap.to('.virus-reveal-text', {
            scale: 1.05,
            duration: 0.5,
            ease: 'back.out(1.7)',
          })
        },
      })
    }
  }

  // Start the animation
  initAnimation()
})
