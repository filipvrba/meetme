import ElmAlert from "../../elements/elm_alert";

export default class CDatabase {
  constructor(element) {
    this._element = element;
    this._element.setSpinnerDisplay(false)
  };

  signin(options, callback) {
    this._element.setSpinnerDisplay(true);
    let email = options.email.value;
    let hashPassword = options.password.value.encodeMd5();
    let query = `SELECT id FROM users WHERE email='${email}' AND hash_password='${hashPassword}';`;

    return _BefDb.get(query, (rows) => {
      let isSignin = rows.length > 0;

      if (isSignin) {
        let userId = rows[0].id;
        if (callback) callback(userId)
      } else {
        Events.emit("#app", ElmAlert.ENVS.SHOW, {
          endTime: 15,
          message: `${`\n          <i class='bi bi-x-circle me-2'></i> Nepodařilo se přihlásit! Možné důvody: Špatný email nebo špatné heslo.\n          `}`,
          style: "danger"
        })
      };

      return this._element.setSpinnerDisplay(false)
    })
  };

  addToken(options, callback) {
    let query = `INSERT INTO tokens (user_id, token, expires_at) VALUES (${options.id}, '${options.token}', '${options.date}')`;

    return _BefDb.set(query, (isWrite) => {
      if (isWrite) if (callback) return callback.call()
    })
  }
}