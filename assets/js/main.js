/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navToggleIcon = document.getElementById('nav-toggle-icon')

const setMenuState = (isOpen) => {
  navMenu.classList.toggle('show-menu', isOpen)
  navToggleIcon.className = isOpen ? 'ri-close-line' : 'ri-menu-4-line'
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu')
  navToggle.setAttribute('aria-expanded', isOpen)
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    setMenuState(!navMenu.classList.contains('show-menu'))
  })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
  setMenuState(false)
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== THEME TOGGLE ===============*/
const themeToggle = document.getElementById('theme-toggle'),
      lightTheme = 'light-theme',
      selectedTheme = localStorage.getItem('selected-theme')

const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark'

const updateThemeLabel = () => {
  if (themeToggle) {
    const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark'
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`)
    themeToggle.setAttribute('aria-pressed', getCurrentTheme() === 'light')
  }
}

if (selectedTheme === 'light') {
  document.body.classList.add(lightTheme)
}

updateThemeLabel()

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle(lightTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    updateThemeLabel()
  })
}

/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
  const header = document.getElementById('header')
  window.scrollY >= 50 ? header.classList.add('blur-header')
                      : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const sendEmail = (e) => {
  e.preventDefault()

  const name = contactForm.user_name.value.trim()
  const email = contactForm.user_email.value.trim()
  const message = contactForm.user_project.value.trim()
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`)
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)

  window.location.href = `mailto:saurav1729k@gmail.com?subject=${subject}&body=${body}`
  contactMessage.textContent = 'Opening your email client...'

  setTimeout(() => {
    contactMessage.textContent = ''
  }, 5000)

  contactForm.reset()
}

contactForm.addEventListener('submit', sendEmail)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up')
  window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                      : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollDown = window.scrollY

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id'),
          sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

    if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
      sectionsClass.classList.add('active-link')
    } else {
      sectionsClass.classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400
})

sr.reveal('.home__data, .projects__container, .footer__container')
sr.reveal('.home__image', { origin: 'bottom' })
sr.reveal('.home__social, .contact__container', { origin: 'bottom' })
sr.reveal('.about__image, .skills__data', { origin: 'left' })
sr.reveal('.about__data, .skills__content', { origin: 'right' })
sr.reveal('.services__card', { interval: 100 })
