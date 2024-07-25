import CValidation from "../components/elm-signup/validation";
import CDatabase from "../components/elm-signup/database";

export default class ElmSignup extends HTMLElement {
  get linkSignin() {
    return this._linkSignin
  };

  constructor() {
    super();
    this.initElm();
    window.signupBtnClick = this.signupBtnClick.bind(this)
  };

  connectedCallback() {
    this._fullName = this.querySelector("#signupFullName");
    this._email = this.querySelector("#signupEmail");
    this._password = this.querySelector("#signupPassword");
    this._spinnerOverlay = this.querySelector(".spinner-overlay");
    this._linkSignin = this.querySelector("#signupLinkSignIn");
    this._cValidation = new CValidation(this._fullName, this._email, this._password);
    this._cDatabase = new CDatabase(this);
    return this._cDatabase
  };

  disconnectedCallback() {
    return null
  };

  signupBtnClick() {
    return this._cValidation.validations(() => (
      this._cDatabase.addNewUser({
        fullName: this._fullName,
        email: this._email,
        password: this._password
      })
    ))
  };

  initElm() {
    let template = `${`
<div class='col-md-6 mx-auto'>
  <elm-spinner class='spinner-overlay' id='spinnerOverlay'></elm-spinner>

  <div class='mb-4'>
    <label class='mb-1' for='signupFullName'>Celé jméno</label>
    <input type='text' class='form-control' id='signupFullName'>
    <div id='signupValidationFullNameFeedback' class='invalid-feedback'>
      Zadejte prosím celé jméno.
    </div>
  </div>
  <div class='mb-4'>
    <label class='mb-1' for='signupEmail'>Email</label>
    <input type='email' class='form-control' id='signupEmail'>
    <div id='signupValidationEmailFeedback' class='invalid-feedback'>
      Zadejte prosím platnou emailovou adresu.
    </div>
  </div>
  <div class='mb-4'>
    <label class='mb-1' for='signupPassword'>Heslo</label>
    <input type='password' class='form-control' id='signupPassword'>
    <div id='signupValidationPasswordFeedback' class='invalid-feedback'>
      Zadejte prosím heslo.
    </div>
  </div>
  <div class='d-flex justify-content-between mb-4'>
    <a class='link-custom'>Forgot Your Password?</a>
    <a href='#signin' id='signupLinkSignIn' class='link-custom'>Have an Account?</a>
  </div>
  <button class='btn btn-primary btn-lg w-100' onclick='signupBtnClick()' style='font-size: 18px;'>Registrovat se</button>
</div>
    `}`;
    return this.innerHTML = template
  };

  setSpinnerDisplay(isDisabled) {
    return this._spinnerOverlay.style.display = isDisabled ? "" : "none"
  }
}