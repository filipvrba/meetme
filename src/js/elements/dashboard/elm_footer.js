export default class ElmDashboardFooter extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
<footer class='footer navbar-light bg-light'>
  <div class='container-fluid'>
    <div class='row text-center icons-padding'>
      <div class='col-sm'>
        <a href='#dashboard' class='text-dark'>
          <i class='bi bi-speedometer2 icon-large'></i>
        </a>
      </div>
      <div class='col-sm'>
        <a href='#mapa' class='text-dark'>
          <i class='bi bi-map icon-large'></i>
        </a>
      </div>
    </div>
  </div>
</footer>
    `}`;
    return this.innerHTML = template
  }
}