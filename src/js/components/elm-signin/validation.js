export default class CValidation {
  constructor(email, password) {
    this._email = email;
    this._password = password
  };

  validations(callback) {
    let valEmail = this.validationEmail();
    let valPassword = this.validationPassword();
    if (valEmail && valPassword) if (callback) return callback.call()
  };

  validationEmail() {
    let isEmailCorrect = CValidation.REG_EMAIL_VALIDATION.test(this._email.value);
    this.updateValidationEmail(isEmailCorrect);
    return isEmailCorrect
  };

  validationPassword() {
    let isPasswordCorrect = this._password.value !== "";
    this.updateValidationPassword(isPasswordCorrect);
    return isPasswordCorrect
  };

  updateValidationEmail(isValid) {
    return isValid ? this._email.classList.remove("is-invalid") : this._email.classList.add("is-invalid")
  };

  updateValidationPassword(isValid) {
    return isValid ? this._password.classList.remove("is-invalid") : this._password.classList.add("is-invalid")
  }
};

CValidation.REG_EMAIL_VALIDATION = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/m