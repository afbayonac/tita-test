
const styles = `
<style>
  :host {
    background-color: var(--primary-color);
    text-align: center;
    height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--white);
  }

  h1 {
    font-size: 40px;
    font-weight: bold;
    letter-spacing: 10px;
    text-align: center;
    margin-bottom: 50px;
  }

  p {
    font-size: 16px;
    letter-spacing: 3px;
    max-width: 620px;
    text-align: center;
    margin: 0 auto 60px;
    line-height: 1.6;
  }

  a {
    font-family: var(--questrial);
    font-size: 12px;
    color: var(--primary-color);
    background-color: var(--white);
    padding: 15px 50px;
    letter-spacing: 2px;
    text-decoration: none;
  }
</style>
`

const html = `
<section>
  <h1> EXPLORE BEYOND HORIZON </h1>
  <p> Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. </p>
  <a href="https://afbayonac.github.io/cv/" rel="noreferrer" target="_blank" > VIEW OUR WORK </a>
</section>
`
export class Hero extends window.HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.innerHTML = `${styles}${html}`
  }
}

window.customElements.define('my-hero', Hero)
