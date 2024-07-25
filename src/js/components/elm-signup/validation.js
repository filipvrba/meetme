export default class CValidation {
  constructor(fullName, email, password) {
    this._fullName = fullName;
    this._email = email;
    this._password = password
  };

  validations(callback) {
    let valFullName = this.validationFullName();
    let valEmail = this.validationEmail();
    let valPassword = this.validationPassword();

    if (valFullName && valEmail && valPassword) {
      if (callback) return callback.call()
    }
  };

  validationFullName() {
    let isFullNameValid = this._fullName.value !== "";
    this.updateValidationFullName(isFullNameValid);
    return isFullNameValid
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

  updateValidationFullName(isValid) {
    return isValid ? this._fullName.classList.remove("is-invalid") : this._fullName.classList.add("is-invalid")
  };

  updateValidationEmail(isValid) {
    return isValid ? this._email.classList.remove("is-invalid") : this._email.classList.add("is-invalid")
  };

  updateValidationPassword(isValid) {
    return isValid ? this._password.classList.remove("is-invalid") : this._password.classList.add("is-invalid")
  }
};

CValidation.REG_EMAIL_VALIDATION = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/m