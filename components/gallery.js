import eventBus from '../utils/eventBus.js'

const styles = `
<style>
  :host {
    display: block;
  }

  menu {
    display: flex;
    margin: 0;
    flex-direction: row;
    gap: 16px;
    justify-content: center;
    padding: 64px 0;
    color: var(--gray-02);
  }

  menu > svg.active{
    color: var(--primary-color);
  }

  nav > ol {
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0 0 64px;
    gap: 16px;
    flex-wrap: wrap;
  }

  a {
    padding: 8px 32px;
    text-decoration: none;
    color: var(--gray-03);
  }

  a.active {
    background-color: var(--primary-color);
    color: var(--white);

  }

  article {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 28px;
    margin: 0 auto;
    width: fit-content;
    max-width: 1160px;
    padding: 0 16px;
  }

  article.list {
    grid-template-columns: 1fr;
    gap: 0;
  }

  article > div > img {
    width: 100%;
    margin: 0 0 28px;
  }


  button {
    display: block;
    width: 170px;
    background-color: var(--primary-color);
    color: var(--white);
    border: none;
    letter-spacing: 2px;
    padding: 8px 0;
    margin: 28px auto 0;
  }
  
</style>
`

const html = `
<main>
  <menu>
    <svg class="active" width="14" height="14">
      <rect x="0" y="0" width="6" height="6" fill="currentColor"/>
      <rect x="8" y="0" width="6" height="6" fill="currentColor" />
      <rect x="0" y="8" width="6" height="6" fill="currentColor" />
      <rect x="8" y="8" width="6" height="6" fill="currentColor" />
    </svg>
    <svg width="14" height="14">
      <rect x="0" y="0" width="14" height="5" fill="currentColor" />
      <rect x="0" y="9" width="14" height="5" fill="currentColor" />
    </svg>
  </menu>
  <nav>
    <ol>
      <li>
        <a class="category active" data-category="all" href="#gallery">All</a>
      </li>
      <li>
        <a class="category" data-category="branding" href="#gallery">Branding</a>
      </li>
      <li >
        <a class="category" data-category="web" href="#gallery">Web</a>
      </li>
      <li >
        <a class="category" data-category="photography" href="#gallery">Photography</a>
      </li>
      <li >
        <a class="category" data-category="app" href="#gallery">App</a>
      </li>
    </ol>
  </nav>
  <article id="all">
    <div></div>
    <div></div>
    <div></div>
  </article>

  <button>Show me more</button>
</main>
`
const clientId = 'MBIjKgk9Q-nm1ec5N0VL23Cwf-1ayKnCzaFl9gKNZkE'

const getImages = async (topic, page) => {
  console.log('-- get images --')
  const url = `https://api.unsplash.com/search/photos?page=${page}&per_page=9&query=${topic}&client_id=${clientId}`
  console.log(url)
  return fetch(url)
    .then((response) => response.json())
}

export class Gallery extends window.HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.innerHTML = `${styles}${html}`
    this.select = 'all'
    this.page = 1
    this.categories = Array.from(this.shadow.querySelectorAll('ol > li > a.category '))
    this.columms = Array.from(this.shadow.querySelectorAll('article > div'))
    this.more = this.shadow.querySelector('button')
    this.grid = this.shadow.querySelector('menu > svg:first-of-type')
    this.list = this.shadow.querySelector('menu > svg:nth-of-type(2)')
    this.article = this.shadow.querySelector('article')
    this.handleImages()
  }

  connectedCallback () {
    eventBus.subscribe('my-header.category', ({ category }) => {
      this.select = category
      this.page = 1
      this.columms.forEach(columm => {
        columm.innerHTML = ''
      })
      this.handleCategory()
      this.handleImages()
    })

    this.categories.map(c => c.addEventListener('click', () => {
      this.select = c.getAttribute('data-category')
      this.page = 1
      this.columms.forEach(columm => {
        columm.innerHTML = ''
      })
      this.handleCategory()
      this.handleImages()
      eventBus.publish('my-gallery.category', { category: this.select })
    }))

    this.more.addEventListener('click', () => {
      this.handleImages()
    })

    this.grid.addEventListener('click', () => {
      this.list.classList.remove('active')
      this.grid.classList.add('active')
      this.article.classList.remove('list')
    })

    this.list.addEventListener('click', () => {
      this.list.classList.add('active')
      this.grid.classList.remove('active')
      this.article.classList.add('list')
    })
  }

  handleImages () {
    getImages(this.select, this.page)
      .then(data => {
        this.page = this.page + 1
        data.results.forEach((img, i) => {
          this.columms[i % 3].innerHTML += `<img src="${img.urls.small}" />`
        })
      })
  }

  handleCategory () {
    console.log('ok gallery category')
    console.log(this.columms)

    this.categories
      .map(category => this.select === category.getAttribute('data-category')
        ? category.classList.add('active')
        : category.classList.remove('active')
      )
  }
}

window.customElements.define('my-gallery', Gallery)
