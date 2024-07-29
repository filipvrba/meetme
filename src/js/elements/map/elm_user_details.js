import CDatabase from "../../components/elm-user-details/database";

export default class ElmMapUserDetails extends HTMLElement {
  constructor() {
    super();
    this._lPopstate = e => this.popstate(e);
    this._hAvatarClick = e => this.updateElement(e.detail.value);
    this.initElm();
    this._img = this.querySelector("#userDetailImg");
    this._fullName = this.querySelector("#userDetailName");
    this._bio = this.querySelector("#userDetailBio");
    this._cDatabase = new CDatabase
  };

  connectedCallback() {
    window.addEventListener("popstate", this._lPopstate);
    return Events.connect("#app", "avatarClick", this._hAvatarClick)
  };

  disconnectedCallback() {
    window.removeEventListener("popstate", this._lPopstate);
    return Events.disconnect("#app", "avatarClick", this._hAvatarClick)
  };

  popstate(event) {
    return Events.emit("#userDetailModal", "modal.hide")
  };

  updateElement(userId) {
    this._img.src = "https://via.placeholder.com/150";
    this._fullName.innerHTML = "";
    this._bio.innerHTML = "";

    return this._cDatabase.getDetails(userId, (row) => {
      this._img.src = row.image_base64;
      this._fullName.innerHTML = row.full_name.decodeBase64();
      return this._bio.innerHTML = row.bio.decodeBase64()
    })
  };

  initElm() {
    let template = `${`
<div class='modal fade' id='userDetailModal' tabindex='-1' aria-labelledby='profileModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='profileModalLabel'>Profilová karta</h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
      </div>
      <div class='modal-body'>
        <div class='card' style='border: none;'>
          <img id='userDetailImg' src='https://via.placeholder.com/150' class='mx-auto rounded-circle' width='256' height='256' alt='Profilová fotka'>
          <div class='card-body'>
              <h5 id='userDetailName' class='card-title'></h5>
              <p id='userDetailBio' class='card-text'></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}