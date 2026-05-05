import { useEffect, useRef, useState } from 'react'
import backgroundSvg from './assets/pages/page1/background.svg'
import commandSvg from './assets/pages/page1/command.svg'
import iconsSvg from './assets/pages/page1/icons.svg'
import girlSvg from './assets/pages/page1/girl.svg'
import pointerSvg from './assets/pages/page1/pointer.svg'
import resumeIconSvg from './assets/pages/page1/tree.svg'
import zCardSvg from './assets/pages/page1/Z.svg'

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      className={`toggle-switch ${theme === 'dark' ? 'is-dark' : ''}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      onClick={onToggle}
    >
      <span className="toggle-knob" />
    </button>
  )
}

function TiltCard({ className = '', children, maxTilt = 8 }) {
  const cardRef = useRef(null)

  const onMove = (event) => {
    const el = cardRef.current
    if (!el) {
      return
    }

    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * maxTilt * 2
    const rotateX = (0.5 - py) * maxTilt * 2
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const onLeave = () => {
    const el = cardRef.current
    if (el) {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    }
  }

  return (
    <div ref={cardRef} className={className} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  )
}

function BouncyNote({ className, children, delay = 0 }) {
  return (
    <div className={`${className} note-bounce`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function InteractiveToolbox({ src }) {
  const tips = [
    { text: 'Pen Tool', top: '14%', left: '14%' },
    { text: 'Shape Builder', top: '34%', left: '62%' },
    { text: 'Brush', top: '53%', left: '22%' },
    { text: 'Type Tool', top: '77%', left: '56%' },
  ]

  return (
    <TiltCard className="hero-deco-right" maxTilt={10}>
      <img className="hero-deco-toolbar" src={src} alt="" />
      {tips.map((tip) => (
        <span
          key={tip.text}
          className="tool-tip-hotspot"
          style={{ top: tip.top, left: tip.left }}
          aria-hidden="true"
        >
          <span className="tool-tip">{tip.text}</span>
        </span>
      ))}
    </TiltCard>
  )
}

function App() {
  const [theme, setTheme] = useState('light')
  const [isIntroDone, setIsIntroDone] = useState(false)
  const pointerRef = useRef(null)

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setIsIntroDone(true)
    }, 1300)

    return () => window.clearTimeout(introTimer)
  }, [])

  useEffect(() => {
    if (!isIntroDone) {
      return undefined
    }

    const pointerEl = pointerRef.current
    if (!pointerEl) {
      return undefined
    }

    let rafId = 0
    let latestX = window.innerWidth / 2
    let latestY = window.innerHeight / 2

    const draw = () => {
      pointerEl.style.transform = `translate3d(${latestX}px, ${latestY}px, 0)`
      pointerEl.classList.add('is-active')
      rafId = 0
    }

    const onMouseMove = (event) => {
      latestX = event.clientX
      latestY = event.clientY

      if (!rafId) {
        rafId = window.requestAnimationFrame(draw)
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [isIntroDone])

  return (
    <main className="hero-shell" data-theme={theme}>
      <section className="hero-canvas" aria-label="Portfolio hero page">
        <img
          ref={pointerRef}
          className={`cursor-follower ${isIntroDone ? 'is-enabled' : ''}`}
          src={pointerSvg}
          alt=""
          aria-hidden="true"
        />
        <img className="hero-grid" src={backgroundSvg} alt="" aria-hidden="true" />

        <header className="hero-topbar">
          <div className="brand-block">
            <span className="brand-name">jyoti</span>
            <ThemeToggle
              theme={theme}
              onToggle={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
            />
          </div>

          <div className="hero-actions">
            <div className="company-stack" aria-hidden="true">
              <span>Notion</span>
              <span>Figma</span>
              <span>Slack</span>
            </div>
            <a className="resume-pill" href="/resume.html" target="_blank" rel="noreferrer">
              <span className="resume-pill-icon">
                <img src={resumeIconSvg} alt="" aria-hidden="true" />
              </span>
              <span>Resume</span>
            </a>
            <a className="talk-pill" href="/contact.html">
              Let&apos;s Talk!
            </a>
          </div>
        </header>

        <TiltCard className="floating-card floating-card-bottom" maxTilt={12}>
          <img src={girlSvg} alt="" aria-hidden="true" />
        </TiltCard>

        <BouncyNote className="hero-note hero-note-right" delay={180}>
          <span>Recently built Pregnancy App</span>
          <span>design by understand user pain</span>
          <span>point in real life</span>
        </BouncyNote>

        <BouncyNote className="hero-note hero-note-left" delay={40}>
          <span>Hey, there !</span>
          <span>I am a Design Builder</span>
        </BouncyNote>

        <div className="hero-body">
          <div className="hero-main">
            <div className="hero-center-tag">UX Design Portfolio</div>

            <div className="hero-message">
              <div className="hero-headline-band">
                <aside className="hero-deco-left" aria-hidden="true">
                  <img className="hero-deco-z" src={zCardSvg} alt="" />
                  <img className="hero-deco-cmd" src={commandSvg} alt="" />
                </aside>
                <h1>
                  <span>All about people, ideas,</span>
                  <span>impact</span>
                  <span>and a little bit of</span>
                </h1>
                <InteractiveToolbox src={iconsSvg} />
              </div>
              <div className="magic-badge-wrap">
                <div className="magic-badge">magic</div>
                {!isIntroDone && (
                  <img className="intro-pointer" src={pointerSvg} alt="" aria-hidden="true" />
                )}
              </div>
              <div className={`name-chip ${isIntroDone ? 'is-visible' : ''}`}>Jyoti</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
