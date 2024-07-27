export default class ElmDashboardAccountSettings extends HTMLElement {
  constructor() {
    super();
    this._userId = this.getAttribute("user-id");
    this.initElm();
    this._fullName = this.querySelector("#dashAccSettingsFullName");
    this._email = this.querySelector("#dashAccSettingsEmail");
    this._bio = this.querySelector("#dashAccSettingsBio");
    this._profilePicture = this.querySelector("#dashAccSettingsProfilePicture");
    window.dashAccSettingsSaveChangesClick = this.dashAccSettingsSaveChangesClick.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  dashAccSettingsSaveChangesClick() {
    return null
  };

  initElm() {
    let template = `${`
<elm-dashboard-header user-id='${this._userId}'></elm-dashboard-header>
<div class='card'>
  <div class='card-body'>
    <h1 class='card-title text-center'>Nastavení účtu</h1>
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
      <textarea class='form-control' id='dashAccSettingsBio' rows='3'></textarea>
    </div>
    <div class='mb-3'>
      <label for='dashAccSettingsProfilePicture' class='form-label'>Profilová fotka</label>
      <input type='file' class='form-control' id='dashAccSettingsProfilePicture' accept='image/*'>
    </div>
    <button class='btn btn-primary w-100' onclick='dashAccSettingsSaveChangesClick()'>Uložit změny</button>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  };

  updateInitElm(options) {
    return null
  }
}