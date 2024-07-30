export default class AProtectionElement extends HTMLElement {
  constructor() {
    super();
    this._hVisibilityChange = _ => this.visibilityChange(null);

    this._hSignout = () => {
      return this.signout()
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

          return this.visibilityChange(null, () => {
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
    return this.visibilityChange(0, () => location.hash = "signin")
  };

  setSpinnerDisplay(isDisabled) {
    if (this._spinnerOverlay) {
      return this._spinnerOverlay.style.display = isDisabled ? "" : "none"
    }
  };

  connectedCallback() {
    document.addEventListener(
      "visibilitychange",
      this._hVisibilityChange
    );

    return Events.connect("#app", "signout", this._hSignout)
  };

  disconnectedCallback() {
    document.removeEventListener(
      "visibilitychange",
      this._hVisibilityChange
    );

    return Events.disconnect("#app", "signout", this._hSignout)
  };

  visibilityChange(loggedId, callback) {
    let isLogged = undefined;

    if (loggedId === null) {
      isLogged = document.hidden ? 0 : 1
    } else {
      isLogged = loggedId
    };

    let query = `UPDATE user_details SET is_logged = ${isLogged} WHERE user_id = ${this._userId};`;

    return _BefDb.set(query, (isUpdated) => {
      if (isUpdated) if (callback) return callback.call()
    })
  };

  signout() {
    return this.visibilityChange(0)
  };

  initializeProtected() {
    return null
  }
}