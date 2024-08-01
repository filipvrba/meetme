import ElmAlert from "../elm_alert";
import CNotifications from "../../components/elm-dashboard-footer/notifications";

export default class ElmDashboardFooter extends HTMLElement {
  get userId() {
    return this._userId
  };

  get notification() {
    return this._notification
  };

  constructor() {
    super();
    this._hAlertShow = e => this.alertShow(e.detail.value);

    this._hIconDashboardClick = () => {
      return this.iconDashboardClick()
    };

    this._userId = this.getAttribute("user-id");
    this.initElm();
    this._iconDashboard = this.querySelector("#dashboardFooterIconDashboard");
    this._iconMap = this.querySelector("#dashboardFooterIconMap");
    this._iconChat = this.querySelector("#dashboardFooterIconChat");
    this._notification = this.querySelector("#dashFooterNotification");
    this._cNotifications = new CNotifications(this);
    this.updateSubinitElm()
  };

  connectedCallback() {
    Events.connect("#app", ElmAlert.ENVS.SHOW, this._hAlertShow);

    return this._iconDashboard.addEventListener(
      "click",
      this._hIconDashboardClick
    )
  };

  disconnectedCallback() {
    Events.disconnect("#app", ElmAlert.ENVS.SHOW, this._hAlertShow);

    this._iconDashboard.removeEventListener(
      "click",
      this._hIconDashboardClick
    );

    return this._cNotifications.dispose()
  };

  iconDashboardClick() {
    return URLParams.set("m-index", 0)
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
        <a href='#dashboard' id='dashboardFooterIconDashboard' class='text-dark'>
          <i class='bi bi-speedometer2 icon-large'></i>
        </a>
      </div>
      <div class='col'>
        <a href='#chat' id='dashboardFooterIconChat' class='text-dark disabled-link'>
          <i class='bi bi-chat icon-large'>
            <span id='dashFooterNotification' style='top: 10px;' class='position-absolute translate-middle p-2 bg-danger border border-light rounded-circle notification-display'>
              <span class='visually-hidden'>New alerts</span>
            </span>
          </i>
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
        this._iconChat.classList.remove("disabled-link");
        return this._cNotifications.update()
      }
    })
  }
}