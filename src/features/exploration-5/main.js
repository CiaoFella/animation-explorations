window.addEventListener('load', () => {
  const containers = document.querySelectorAll('.moving_gradients_container')
  if (containers.length === 0) return

  containers.forEach((container) => {
    container.addEventListener('mousemove', (e) => move(container, e))
  })

  function move(container, e) {
    const interBubble = container.querySelector('.moving_gradient_interactive')
    const moveX = gsap.quickTo(interBubble, 'left', { duration: 0.5, ease: 'power2.out' })
    const moveY = gsap.quickTo(interBubble, 'top', { duration: 0.5, ease: 'power2.out' })

    const containerRect = container.getBoundingClientRect()
    const relativeX = e.clientX - containerRect.left
    const relativeY = e.clientY - containerRect.top

    if (relativeX >= 0 && relativeX <= containerRect.width && relativeY >= 0 && relativeY <= containerRect.height) {
      moveX(relativeX)
      moveY(relativeY)
    }
  }
})
