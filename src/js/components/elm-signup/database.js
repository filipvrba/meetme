import ElmAlert from "../../elements/elm_alert";

export default class CDatabase {
  constructor(elmSignup) {
    this._elmSignup = elmSignup;
    this._elmSignup.setSpinnerDisplay(false)
  };

  addNewUser(options) {
    this._elmSignup.setSpinnerDisplay(true);
    let fullName = options.fullName.value.encodeBase64();
    let email = options.email.value;
    let hashPassword = options.password.value.encodeMd5();
    let query = `INSERT INTO users (full_name, email, hash_password) VALUES ('${fullName}', '${email}', '${hashPassword}');`;
    _BefDb.isVerbose = false;

    return _BefDb.set(query, (isRegistered) => {
      if (isRegistered) {
        this._elmSignup.linkSignin.click()
      } else {
        Events.emit("#app", ElmAlert.ENVS.SHOW, {
          endTime: 7,
          message: "<i class='bi bi-exclamation-triangle-fill me-2'></i> Registraci nelze dokončit, protože zadaný e-mail již je registrován.",
          style: "warning"
        })
      };

      _BefDb.isVerbose = true;
      return this._elmSignup.setSpinnerDisplay(false)
    })
  }
}