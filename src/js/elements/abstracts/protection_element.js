export default class AProtectionElement extends HTMLElement {
  constructor() {
    super();
    this._userId = null;
    let token = Cookie.get("l-token");
    this._spinnerOverlay = document.querySelector(".spinner-overlay");

    if (token) {
      this.setSpinnerDisplay(true);
      let query = `SELECT user_id FROM tokens WHERE token = '${token}'`;

      _BefDb.get(query, (rows) => {
        let isAccessible = rows.length > 0;

        if (isAccessible) {
          this.setSpinnerDisplay(false);
          this._userId = parseInt(rows[0].user_id);
          return this.initializeProtected()
        } else {
          return this.goToSignin()
        }
      })
    } else {
      this.goToSignin()
    }
  };

  goToSignin() {
    return location.hash = "signin"
  };

  setSpinnerDisplay(isDisabled) {
    if (this._spinnerOverlay) {
      return this._spinnerOverlay.style.display = isDisabled ? "" : "none"
    }
  };

  initializeProtected() {
    return null
  }
}