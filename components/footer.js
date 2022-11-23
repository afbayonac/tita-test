const styles = `
<style>
  :host {
    color: var(--gray-02);
    text-align: center;
    display: block;
  }

  footer {
    padding: 40px 0 72px;
  }

  footer > ul {
    list-style: none;
    display: flex;
    align-items: center;
    flex-direction: row;
    font-family: var(--fa-style-family-brands);
    justify-content: center;
    padding: 40px 0 0;
  }

  mark {
    color: var(--primary-color);
    background-color: transparent;
  }

  a {
    text-decoration: none;
    color: var(--gray-02);
    font-size: 16px;
    width: 32px;
    text-align: center;
    display: block;
  }

  a:hover {
    text-decoration: none;
    color: var(--primary-color);
  }

  p {
    font-size: 14px;
  }
</style>
`

const html = `
<footer >
  <p> &copy; 2021 - <mark>Sneak</mark> All Right Reserved </p>
  <ul class="social-media" id="social-media">
  <li>
    <a href="https://afbayonac.github.io/cv/" rel="noreferrer" target="_blank" >
      &#xf39e;
    </a>
  </li>
  <li>
    <a href="https://afbayonac.github.io/cv/" rel="noreferrer" target="_blank" >
      &#xf099;
    </a>
  </li>
  <li>
    <a href="https://afbayonac.github.io/cv/" rel="noreferrer" target="_blank" >
      &#xf17d;
    </a>
  </li>
  <li>
    <a href="https://afbayonac.github.io/cv/" rel="noreferrer" target="_blank" >
      &#xf0d5;
    </a>
  </li>
  <li>
    <a href="https://afbayonac.github.io/cv/" rel="noreferrer" target="_blank" >
      &#xf0d5;
    </a>
  </li>
  </ul>
</footer>
`

class Footer extends window.HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.shadow.innerHTML = `${styles}${html}`
  }
}

window.customElements.define('my-footer', Footer)
