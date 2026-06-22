import React, { useEffect, useRef } from 'react'

const GLYPHS = ['A', 'ñ', 'ç', 'ß', 'Ä', 'É', 'Ω', 'θ', 'λ', 'π', 'Я', 'ж', 'Д', 'ю', 'ع', 'ك', 'م', 'א', 'ש', 'ל', 'あ', 'か', 'ん', '文', '语', '学', '한', '글', 'क', 'भ', 'ก']
const COLORS = ['rgba(199,91,44,', 'rgba(194,145,59,', 'rgba(164,69,31,', 'rgba(110,106,60,']

const createBird = (width, height, dpr, initial) => {
  const speed = (Math.random() * 0.3 + 0.22) * dpr
  const pitch = Math.random() * 0.8 - 0.4
  const direction = Math.random() < 0.5 ? 1 : -1
  const vx = Math.cos(pitch) * speed * direction
  const vy = Math.sin(pitch) * speed * (Math.random() < 0.5 ? 1 : -1)

  return {
    vx,
    vy,
    x: initial ? Math.random() * width : (vx >= 0 ? -70 * dpr : width + 70 * dpr),
    y: initial ? (Math.random() * height * 0.9 + height * 0.05) : (Math.random() * height * 0.84 + height * 0.08),
    size: (Math.random() * 9 + 12) * dpr,
    flap: Math.random() * Math.PI * 2,
    flapSpeed: Math.random() * 0.09 + 0.11,
    alpha: Math.random() * 0.2 + 0.14,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
  }
}

const drawBird = (ctx, x, y, size, flap, heading, color, alpha) => {
  const wingLift = Math.sin(flap)
  const tipY = -0.1 - 0.55 * wingLift

  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(heading + Math.PI / 2)
  ctx.scale(size, size)
  ctx.fillStyle = color + alpha + ')'

  ctx.beginPath()
  ctx.ellipse(0, 0.05, 0.115, 0.32, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(0, -0.32, 0.14, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(-0.03, -0.16)
  ctx.bezierCurveTo(-0.45, tipY - 0.1, -0.85, tipY - 0.02, -1.05, tipY + 0.06)
  ctx.bezierCurveTo(-0.72, tipY + 0.3, -0.4, 0.22, -0.05, 0.2)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(0.03, -0.16)
  ctx.bezierCurveTo(0.45, tipY - 0.1, 0.85, tipY - 0.02, 1.05, tipY + 0.06)
  ctx.bezierCurveTo(0.72, tipY + 0.3, 0.4, 0.22, 0.05, 0.2)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

const CanvasBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return undefined
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = mediaQuery.matches
    let animationFrameId = null
    let width = 0
    let height = 0
    let dpr = 1
    let birds = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth * dpr
      height = window.innerHeight * dpr
      canvas.width = width
      canvas.height = height
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'

      const count = Math.max(6, Math.round(window.innerWidth / 185))
      birds = Array.from({ length: count }, () => createBird(width, height, dpr, true))
    }

    const renderFrame = () => {
      context.clearRect(0, 0, width, height)

      birds.forEach((bird) => {
        if (!reducedMotion) {
          bird.x += bird.vx
          bird.y += bird.vy
          bird.flap += bird.flapSpeed
        }

        if (
          bird.x < -100 * dpr ||
          bird.x > width + 100 * dpr ||
          bird.y < -100 * dpr ||
          bird.y > height + 100 * dpr
        ) {
          Object.assign(bird, createBird(width, height, dpr, false))
        }

        const heading = Math.atan2(bird.vy, bird.vx)
        const magnitude = Math.hypot(bird.vx, bird.vy) || 1
        const trailX = -bird.vx / magnitude
        const trailY = -bird.vy / magnitude
        const glyphX = bird.x + trailX * bird.size * 1.8
        const glyphY = bird.y + trailY * bird.size * 1.8

        context.strokeStyle = bird.color + Math.min(0.26, bird.alpha * 0.7) + ')'
        context.lineWidth = Math.max(0.6, bird.size / 24)
        context.beginPath()
        context.moveTo(bird.x + trailX * bird.size * 0.55, bird.y + trailY * bird.size * 0.55)
        context.lineTo(glyphX, glyphY)
        context.stroke()

        drawBird(context, bird.x, bird.y, bird.size, bird.flap, heading, bird.color, bird.alpha)

        context.fillStyle = bird.color + Math.min(0.36, bird.alpha * 1.3) + ')'
        context.font = bird.size * 1.05 + "px 'Newsreader', Georgia, serif"
        context.textAlign = 'center'
        context.textBaseline = 'middle'
        context.fillText(bird.glyph, glyphX, glyphY)
      })

      if (!reducedMotion) {
        animationFrameId = window.requestAnimationFrame(renderFrame)
      }
    }

    const handleMotionChange = (event) => {
      reducedMotion = event.matches

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
        animationFrameId = null
      }

      renderFrame()
    }

    resize()
    renderFrame()

    window.addEventListener('resize', resize)
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleMotionChange)
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleMotionChange)
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleMotionChange)
      } else if (typeof mediaQuery.removeListener === 'function') {
        mediaQuery.removeListener(handleMotionChange)
      }
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-50 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/></svg>")`,
        }}
      />
    </>
  )
}

export default CanvasBackground