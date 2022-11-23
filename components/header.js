import eventBus from '../utils/eventBus.js'

const styles = `
<style>
  :host {
    background-color: var(--white);
    display: block;
    width: 100%;
    height: 100px;
  }
  
  header {
    padding: 0 5vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100px;
    width: 90vw;
    position: absolute;
    top: 0;
    z-index: 3;
  }

  .logo {
    display: flex;
    align-items: center;
    width: 150px;
    z-index: 100;
    min-width: 200px;
  }
  
  .logo > figure {
    margin: 0;
    width: 33px;
    height: 36px;
  }
  
  .logo > figure:first-of-type > img:first-of-type {
    width: 100%;
    height: 100%;
  }
  
  .isotipo {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
  }
  
  .isotipo > span:first-of-type {
    color: var(--gray-03);
    font-size: 19px;
    font-weight: bold;
  }
  
  .isotipo > sub:first-of-type {
    color: var(--gray-02);
    font-size: 8px;
  }

  button {
    background-color: var(--white);
    font: var(--fa-font-solid);
    color: var(--gray-03);
    width: 32px;
    text-align: center;
    border: none;
    font-size: 24px;
    height: 100%;
    z-index: 3;
  }

  button::before {
    content: '\uf0c9';
  }

  button.active::before {
    content: '\uf00d';
  }

  nav {
    position: absolute;
    top: -300px;
    left: 0;
    width: 100vw;
    transition: top 300ms ease-in-out;
    z-index: 1;
  }

  nav.active {
    top: 99px;
  }

  ol {
    list-style: none;
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    margin: 0;
    padding: 24px 0 32px;
    justify-content: center;
    align-items: center;
    gap: 24px;
    color: var(--gray-03);
  }

  ol > li > a {
    padding: 8px 32px;
  }

  a {
    text-decoration: none;
    color: var(--gray-03);
  }

  a.active {
    background-color: var(--primary-color);
    color: var(--white);
  }

  #search > span:first-of-type { 
    font: var(--fa-font-solid);
    color: var(--primary-color);
    cursor: pointer;
    padding: 8px 32px;
  }

  #space {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--white);
    z-index: 2;
  }

  @media (min-width: 1024px) {
    button {
      display: none;
    }

    nav {
      position: relative;
      justify-content: right;
      top: 0;
      left: 0;
      height: 100%;
    }

    nav.active {
      top: 0;
    }

    nav > ol {
      flex-direction: row;
      background-color: var(--white);
      margin: 0;
      padding: 0;
      justify-content: right;
      align-items: center;
      gap: 0;
      height: 100%;
      color: var(--gray-03);
    }

    #space {
      display: none;
    }
  }



</style>
`

const html = `
<header class="header" id="header">
  <a class="logo" href="https://github.com/afbayonac">
    <figure >
      <img src="./assets/logo.webp" alt="logo">
    </figure>
    <div class="isotipo">
      <span>SNEAK</span>
      <sub>CREATIVE PORTFOLIO</sub>
    </div>
  </a>
  <button ></button>
  <div id="space"></div>
  <nav id="menu">
    <ol id="navbar-header">
      <li>
        <a class="category" data-category="all" href="#gallery">All</a>
      </li>
      <li>
        <a class="category" data-category="branding" href="#gallery">Branding</a>
      </li>
      <li>
        <a class="category" data-category="web" href="#gallery">Web</a>
      </li>
      <li>
        <a class="category" data-category="photography" href="#gallery">Photography</a>
      </li>
      <li>
        <a class="category" data-category="app" href="#gallery">App</a>
      </li>
      <li id="search">
        <span>&#xf002;</span>
      </li>
    </ol>
  </nav>
</header>
`

export class Header extends window.HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.innerHTML = `${styles}${html}`
    this.btn = this.shadow.querySelector('button')
    this.nav = this.shadow.querySelector('nav')
    this.select = ''
    this.categories = Array.from(this.shadow.querySelectorAll('nav > ol > li > a.category'))
  }

  connectedCallback () {
    this.btn.addEventListener('click', this.handleShowMenu.bind(this))

    eventBus.subscribe('my-gallery.category', ({ category }) => {
      this.select = category
      this.handleCategory()
    })

    this.categories.map(c => c.addEventListener('click', () => {
      this.handleShowMenu()
      this.select = c.getAttribute('data-category')
      this.handleCategory()
      eventBus.publish('my-header.category', { category: this.select })
    }))
  }

  handleShowMenu () {
    this.btn.classList.toggle('active')
    this.nav.classList.toggle('active')
  }

  handleCategory () {
    this.categories
      .map(c => c.getAttribute('data-category') === this.select
        ? c.classList.add('active')
        : c.classList.remove('active')
      )
  }
}

window.customElements.define('my-header', Header)
