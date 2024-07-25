import CValidation from "../components/elm-signin/validation";
import CDatabase from "../components/elm-signin/database";
import CProtect from "../components/elm-signin/protect";

export default class ElmSignin extends HTMLElement {
  get cValidation() {
    return this._cValidation
  };

  get cToken() {
    return this._cToken
  };

  constructor() {
    super();
    this.initElm();
    window.signinBtnClick = this.signinBtnClick.bind(this)
  };

  connectedCallback() {
    this._email = this.querySelector("#signinEmail");
    this._password = this.querySelector("#signinPassword");
    this._spinnerOverlay = this.querySelector(".spinner-overlay");
    this._cValidation = new CValidation(this._email, this._password);
    this._cDatabase = new CDatabase(this);
    this._cProtect = new CProtect();
    return this._cProtect
  };

  disconnectedCallback() {
    return null
  };

  signinBtnClick() {
    return this._cValidation.validations(() => (
      this._cDatabase.signin(
        {email: this._email, password: this._password},

        (userId) => {
          let [token, date] = this._cProtect.writeNewToken();

          return this._cDatabase.addToken(
            {id: userId, token, date},
            () => location.hash = "dashboard"
          )
        }
      )
    ))
  };

  initElm() {
    let template = `${`
<div class='col-md-6 mx-auto'>
  <elm-spinner class='spinner-overlay' id='spinnerOverlay'></elm-spinner>

  <div class='mb-4'>
    <label class='mb-1' for='signinEmail'>Email</label>
    <input type='email' class='form-control' id='signinEmail'>
    <div id='signinValidationEmailFeedback' class='invalid-feedback'>
      Zadejte prosím platnou emailovou adresu.
    </div>
  </div>
  <div class='mb-4'>
    <label class='mb-1' for='signinPassword'>Heslo</label>
    <input type='password' class='form-control' id='signinPassword'>
    <div id='signinValidationPasswordFeedback' class='invalid-feedback'>
      Zadejte prosím heslo.
    </div>
  </div>
  <div class='d-flex justify-content-between mb-4'>
    <a class='link-custom'>Zapoměl jsi heslo?</a>
    <a href='#signup' id='signinLinkSignUp' class='link-custom'>Potřebuješ účet?</a>
  </div>
  <button class='btn btn-primary btn-lg w-100' onclick='signinBtnClick()' style='font-size: 18px;'>Přihlásit se</button>
</div>
    `}`;
    return this.innerHTML = template
  };

  setSpinnerDisplay(isDisabled) {
    return this._spinnerOverlay.style.display = isDisabled ? "" : "none"
  }
}