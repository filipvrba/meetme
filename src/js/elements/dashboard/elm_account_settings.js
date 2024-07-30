import CDatabase from "../../components/elm-account-settings/database";
import CFiles from "../../components/elm-account-settings/files";
import ElmAlert from "../elm_alert";

export default class ElmDashboardAccountSettings extends HTMLElement {
  get userId() {
    return this._userId
  };

  get cFiles() {
    return this._cFiles
  };

  constructor() {
    super();

    this._hBefError = (err) => {
      this.errorSaveChanges();
      return console.log(err.detail.value.stack)
    };

    this._hBioInput = () => {
      return this.bioAutoResize()
    };

    this._userId = this.getAttribute("user-id");
    this.initElm();
    this._fullName = this.querySelector("#dashAccSettingsFullName");
    this._email = this.querySelector("#dashAccSettingsEmail");
    this._bio = this.querySelector("#dashAccSettingsBio");
    this._mirrorBio = this.querySelector("#dashAccSettingsMirrorBio");
    this._profilePicture = this.querySelector("#dashAccSettingsProfilePicture");
    this._spinnerOverlay = this.querySelector("#dashAccSettingsSpinner");
    window.dashAccSettingsSaveChangesClick = this.dashAccSettingsSaveChangesClick.bind(this);
    this._cDatabase = new CDatabase(this);
    this._cFiles = new CFiles(this._profilePicture, this._cDatabase);
    this._cDatabase.getUserDetails(options => this.updateInitElm(options))
  };

  connectedCallback() {
    Events.connect("#app", "befError", this._hBefError);
    return this._bio.addEventListener("input", this._hBioInput)
  };

  disconnectedCallback() {
    Events.disconnect("#app", "befError", this._hBefError);
    return this._bio.removeEventListener("input", this._hBioInput)
  };

  errorSaveChanges() {
    this.setSpinnerDisplay(false);

    return Events.emit("#app", ElmAlert.ENVS.SHOW, {
      endTime: 15,
      message: "Uložení účtu nebylo úspěšné. Pravděpodobnou příčinou chyby je příliš velká profilová fotografie.",
      style: "danger"
    })
  };

  bioAutoResize() {
    let styles = window.getComputedStyle(this._bio);
    this._mirrorBio.style.fontFamily = styles.fontFamily;
    this._mirrorBio.style.fontSize = styles.fontSize;
    this._mirrorBio.style.lineHeight = styles.lineHeight;
    this._mirrorBio.style.padding = styles.padding;
    this._mirrorBio.style.border = styles.border;
    this._mirrorBio.style.width = styles.width;
    this._mirrorBio.textContent = `${this._bio.value}\n`;
    let mirrorHeight = this._mirrorBio.offsetHeight;
    return this._bio.style.height = `${mirrorHeight}px`
  };

  dashAccSettingsSaveChangesClick() {
    let fullName = this._fullName.value.encodeBase64();
    let email = this._email.value;
    let bio = this._bio.value.encodeBase64();

    return this._cDatabase.saveChanges(fullName, email, bio, () => (
      Events.emit("#app", ElmAlert.ENVS.SHOW, {
        endTime: 7,
        message: "Vaše profilová data byla úspěšně uložena.",
        style: "success"
      })
    ))
  };

  initElm() {
    let template = `${`
<elm-dashboard-header user-id='${this._userId}'></elm-dashboard-header>
<div class='card'>
  <div class='card-body'>
    <h1 class='card-title text-center'>Nastavení účtu</h1>

    <div class='form-container'>
      <elm-spinner class='spinner-overlay' id='dashAccSettingsSpinner'></elm-spinner>
    
      <div class='mb-3'>
        <label for='dashAccSettingsFullName' class='form-label'>Celé jméno</label>
        <input type='text' class='form-control' id='dashAccSettingsFullName' required>
      </div>
      <div class='mb-3'>
        <label for='dashAccSettingsEmail' class='form-label'>Email</label>
        <input type='email' class='form-control' id='dashAccSettingsEmail' required>
      </div>
      <div class='mb-3'>
        <label for='dashAccSettingsBio' class='form-label'>Bio</label>
        <textarea class='form-control' id='dashAccSettingsBio' rows='1'></textarea>
        <div id='dashAccSettingsMirrorBio' class='mirror-div'></div>
      </div>
      <div class='mb-3'>
        <label for='dashAccSettingsProfilePicture' class='form-label'>Profilová fotka</label>
        <input type='file' class='form-control' id='dashAccSettingsProfilePicture' accept='image/*'>
      </div>
      <button class='btn btn-primary w-100' onclick='dashAccSettingsSaveChangesClick()'>Uložit změny</button>
    </div>
  </div>
</div>
<canvas id='canvas' style='display: none;'></canvas>
    `}`;
    return this.innerHTML = template
  };

  updateInitElm(options) {
    this._fullName.value = options.full_name.decodeBase64();
    this._email.value = options.email;
    this._bio.value = options.bio.decodeBase64();
    return this.bioAutoResize()
  };

  setSpinnerDisplay(isDisabled) {
    return this._spinnerOverlay.style.display = isDisabled ? "" : "none"
  }
}