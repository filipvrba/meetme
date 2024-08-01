import ElmAlert from "../elm_alert";

export default class ElmDashboardFooter extends HTMLElement {
  constructor() {
    super();
    this._hAlertShow = e => this.alertShow(e.detail.value);
    this._userId = this.getAttribute("user-id");
    this.initElm();
    this._iconMap = this.querySelector("#dashboardFooterIconMap");
    this._iconChat = this.querySelector("#dashboardFooterIconChat");
    this.updateSubinitElm()
  };

  connectedCallback() {
    return Events.connect("#app", ElmAlert.ENVS.SHOW, this._hAlertShow)
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmAlert.ENVS.SHOW,
      this._hAlertShow
    )
  };

  alertShow(data) {
    if (data.style === "success") return this.updateSubinitElm()
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
        <a href='#chat' id='dashboardFooterIconChat' class='text-dark disabled-link'>
          <i class='bi bi-chat icon-large'></i>
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
  };

  updateSubinitElm() {
    let query = `SELECT id FROM image_avatars WHERE user_id = ${this._userId};`;

    return _BefDb.get(query, (rows) => {
      if (rows.length > 0) {
        this._iconMap.classList.remove("disabled-link");
        return this._iconChat.classList.remove("disabled-link")
      }
    })
  }
}