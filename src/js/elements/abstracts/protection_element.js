export default class AProtectionElement extends HTMLElement {
  constructor() {
    super();

    this._hVisibilityChange = (_) => {
      return this.visibilityChange()
    };

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

          return this.visibilityChange(() => {
            return this.initializeProtected()
          })
        } else {
          return this.goToSignin()
        }
      })
    } else {
      this.goToSignin()
    }
  };

  goToSignin() {
    return this.visibilityChange(() => location.hash = "signin")
  };

  setSpinnerDisplay(isDisabled) {
    if (this._spinnerOverlay) {
      return this._spinnerOverlay.style.display = isDisabled ? "" : "none"
    }
  };

  connectedCallback() {
    return document.addEventListener(
      "visibilitychange",
      this._hVisibilityChange
    )
  };

  disconnectedCallback() {
    return document.removeEventListener(
      "visibilitychange",
      this._hVisibilityChange
    )
  };

  visibilityChange(callback) {
    let isLogged = document.hidden ? 0 : 1;
    let query = `UPDATE user_details SET is_logged = ${isLogged} WHERE user_id = ${this._userId};`;

    return _BefDb.set(query, (isUpdated) => {
      if (isUpdated) return callback.call()
    })
  };

  initializeProtected() {
    return null
  }
}