export default class ElmMapGeolocationAlert extends HTMLElement {
  constructor() {
    super();
    this._lPopstate = e => this.popstate(e);

    this._lGeolocationAlerShow = (e) => {
      if (!this._isShown) return this.show(e.detail.value)
    };

    this._lGeolocationAlerHide = () => this.popstate(null);

    this._lModaHide = () => {
      return this.hide()
    };

    this._isShown = false;
    this.initElm();
    this._noneBtn = this.querySelector("#geolocationAlertBtn");
    this._modalMessage = this.querySelector("#mapGeoAlertModalMessage")
  };

  connectedCallback() {
    window.addEventListener("popstate", this._lPopstate);

    Events.connect(
      "#app",
      ElmMapGeolocationAlert.ENVS.show,
      this._lGeolocationAlerShow
    );

    Events.connect(
      "#app",
      ElmMapGeolocationAlert.ENVS.hide,
      this._lGeolocationAlerHide
    );

    return Events.connect(
      "#geolocationAlertModal",
      "hide.bs.modal",
      this._lModaHide
    )
  };

  disconnectedCallback() {
    window.removeEventListener("popstate", this._lPopstate);

    Events.disconnect(
      "#app",
      ElmMapGeolocationAlert.ENVS.show,
      this._lGeolocationAlerShow
    );

    Events.disconnect(
      "#app",
      ElmMapGeolocationAlert.ENVS.hide,
      this._lGeolocationAlerHide
    );

    return Events.disconnect(
      "#geolocationAlertModal",
      "hide.bs.modal",
      this._lModaHide
    )
  };

  popstate(event) {
    return Events.emit("#geolocationAlertModal", "modal.hide")
  };

  show(code) {
    this._isShown = true;

    if (code === 1) {
      this._modalMessage.innerHTML = "Prosím, zapněte GPS pro získání vaší polohy."
    } else {
      this._modalMessage.innerHTML = `Unable to retrieve your location (code ${message.code}).`
    };

    return this._noneBtn.click()
  };

  hide() {
    this._isShown = false;
    return this._isShown
  };

  initElm() {
    let template = `${`
<input id='geolocationAlertBtn' type='button' data-bs-toggle='modal' data-bs-target='#geolocationAlertModal' style='display: none;'>
<div class='modal fade' id='geolocationAlertModal' tabindex='-1' aria-labelledby='geolocationAlertModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='geolocationAlertModalLabel'>
          <i class='bi bi-exclamation-triangle'></i>
          Geolokace
        </h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
      </div>
      <div class='modal-body text-center'>
        <i class='bi bi-geo-fill h1'></i>
        <p id='mapGeoAlertModalMessage' class='lead mt-3'></p>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
};

ElmMapGeolocationAlert.ENVS = {
  show: "geolocationAlerShow",
  hide: "geolocationAlerHide"
}