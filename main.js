

const header = document.getElementById('siteHeader')
const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')
const yearEl = document.getElementById('year')

if (yearEl) yearEl.textContent = new Date().getFullYear()

const onScroll = () => {
  if (window.scrollY > 12) header.classList.add('scrolled')
  else header.classList.remove('scrolled')
}
onScroll()
window.addEventListener('scroll', onScroll, { passive: true })

const closeMenu = () => {
  navLinks.classList.remove('open')
  navToggle.setAttribute('aria-expanded', 'false')
}
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open')
  navToggle.setAttribute('aria-expanded', String(open))
})
navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu))

const sections = Array.from(document.querySelectorAll('main section[id]'))
const navAnchors = Array.from(document.querySelectorAll('.nav-link'))
const linkFor = (id) => navAnchors.find((a) => a.getAttribute('href') === `#${id}`)

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      navAnchors.forEach((a) => a.classList.remove('active'))
      const link = linkFor(entry.target.id)
      if (link) link.classList.add('active')
    })
  },
  { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
)
sections.forEach((s) => navObserver.observe(s))

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view')
        obs.unobserve(entry.target)
      }
    })
  },
  { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
)
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))
