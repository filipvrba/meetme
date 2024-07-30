export default class ElmDashboardFooter extends HTMLElement {
  constructor() {
    super();
    this._userId = this.getAttribute("user-id");
    this.initElm();
    this._iconMap = this.querySelector("#dashboardFooterIconMap");
    let query = `SELECT id FROM image_avatars WHERE user_id = ${this._userId};`;

    _BefDb.get(query, (rows) => {
      if (rows.length > 0) return this._iconMap.classList.remove("disabled-link")
    })
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
      <div class='col'>
        <a href='#dashboard' class='text-dark'>
          <i class='bi bi-speedometer2 icon-large'></i>
        </a>
      </div>
      <div class='col'>
        <a href='#mapa' id='dashboardFooterIconMap' class='text-dark disabled-link'>
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